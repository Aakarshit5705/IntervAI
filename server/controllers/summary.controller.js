import { proModel, flashModel } from "../ai/geminiClient.js";
import { getInterviewSession } from "../ai/interviewSessions.js";

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


export const generateInterviewSummary = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        message: "sessionId is required"
      });
    }

    const session = getInterviewSession(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Interview session not found"
      });
    }

    if (session.answers.length === 0) {
      return res.status(400).json({
        message: "No answers found for this interview"
      });
    }

    const prompt = `
You are a professional hiring interviewer.

Based on the complete interview below, generate a final interview summary.

Rules:
- Return ONLY valid JSON
- No markdown, no explanations
- Be fair and concise
- Overall score should be from 1 to 10

Return JSON with:
- overall_score (number)
- strengths (array of strings)
- weaknesses (array of strings)
- communication_level (Poor / Average / Good / Excellent)
- recommendation (short string)

Interview Data:
${JSON.stringify(
  {
    profile: session.candidateProfile,
    answers: session.answers,
    evaluations: session.evaluations
  },
  null,
  2
)}
`;

    const result = await generateWithRetry(prompt);
    let responseText = result.response.text().trim();

    // Clean markdown if present
    if (responseText.startsWith("```")) {
      responseText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    }

    let summary;
    try {
      summary = JSON.parse(responseText);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid summary format"
      });
    }

    res.status(200).json({
      message: "Interview summary generated successfully",
      summary
    });

  } catch (error) {
    console.error("Interview summary error:", error);

    if (
      error?.status === 503 ||
      error?.message?.toLowerCase().includes("overloaded")
    ) {
      return res.status(503).json({
        message:
          "AI summary service is currently overloaded. Please try again later."
      });
    }

    res.status(500).json({
      message: "Failed to generate interview summary"
    });
  }
};
