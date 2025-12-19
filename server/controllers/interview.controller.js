import { proModel, flashModel } from "../ai/geminiClient.js";
import {
  getInterviewSession,
  updateInterviewSession,
  createInterviewSession
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

export const startInterview = async (req, res) => {
  try {
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({
        message: "Candidate profile is required to start interview",
      });
    }

    const sessionId = createInterviewSession(profile);

    res.status(200).json({
      message: "Interview session started",
      sessionId,
    });
  } catch (error) {
    console.error("Start interview error:", error);
    res.status(500).json({
      message: "Failed to start interview",
    });
  }
};

export const getNextQuestion = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = getInterviewSession(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    // Check if interview is complete
    if (session.currentStep >= session.maxQuestions) {
      return res.status(200).json({
        message: "Interview completed"
      });
    }

    const prompt = `
You are a professional job interviewer.

Rules:
- Ask ONLY one interview question
- Do NOT include explanations or feedback
- Do NOT repeat previous questions
- Base the question on the candidate’s skills, experience, or leadership roles
- Adjust difficulty according to profile_level
- Keep the question clear and conversational
- Output ONLY the question text

Candidate Profile:
${JSON.stringify({
  ...session.candidateProfile,
  questions_asked: session.questionsAsked
}, null, 2)}
`;

    const result = await generateWithRetry(prompt);
    let question = result.response.text().trim();

    // Clean markdown if any
    if (question.startsWith("```")) {
      question = question.replace(/```/g, "").trim();
    }

    // Save question to session
    updateInterviewSession(sessionId, question);

    res.status(200).json({ question });

  } catch (error) {
    console.error("Interview question error:", error);

    if (
      error?.status === 503 ||
      error?.message?.toLowerCase().includes("overloaded")
    ) {
      return res.status(503).json({
        message:
          "The AI interviewer is temporarily overloaded. Please try again shortly."
      });
    }

    res.status(500).json({
      message: "Failed to generate interview question"
    });
  }
};
