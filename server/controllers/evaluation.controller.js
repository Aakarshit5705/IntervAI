import { proModel, flashModel } from "../ai/geminiClient.js";
import {
  getInterviewSession,
  saveAnswerEvaluation
} from "../ai/interviewSessions.js";

const generateWithRetry = async (prompt, retries = 2) => {
  try {
    return await proModel.generateContent(prompt);
  } catch (error) {
    if (error.status === 503 && retries > 0) {
      console.log("Pro model overloaded, retrying...");
      return generateWithRetry(prompt, retries - 1);
    }

    console.log("Falling back to flash model...");
    return flashModel.generateContent(prompt);
  }
};

export const evaluateAnswer = async (req, res) => {
  try {
    const { sessionId, question, answer } = req.body;

    if (!sessionId || !question || !answer) {
      return res.status(400).json({
        message: "sessionId, question, and answer are required"
      });
    }

    const session = getInterviewSession(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const prompt = `
You are a professional job interviewer.

Evaluate the candidate's answer to the interview question.

Rules:
- Return ONLY valid JSON
- No markdown, no explanations
- Score from 1 to 10
- Be fair and concise

Return JSON with:
- score (number)
- strengths (array of strings)
- improvements (array of strings)
- verdict (short string)

Interview Question:
"${question}"

Candidate Answer:
"${answer}"
`;

    const result = await generateWithRetry(prompt);
    let responseText = result.response.text().trim();

    // Remove markdown if present
    if (responseText.startsWith("```")) {
      responseText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    }

    let evaluation;
    try {
      evaluation = JSON.parse(responseText);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid evaluation format"
      });
    }

    saveAnswerEvaluation(sessionId, {
      question,
      answer,
      evaluation
    });

    res.status(200).json(evaluation);

  } catch (error) {
    console.error("Answer evaluation error:", error);

    if (
      error?.status === 503 ||
      error?.message?.toLowerCase().includes("overloaded")
    ) {
      return res.status(503).json({
        message:
          "AI evaluation service is currently overloaded. Please try again."
      });
    }

    res.status(500).json({
      message: "Failed to evaluate answer"
    });
  }
};
