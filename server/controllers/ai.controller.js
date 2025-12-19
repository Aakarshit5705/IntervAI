import { proModel, flashModel } from "../ai/geminiClient.js";

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

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    const prompt = `
You are a professional technical recruiter and resume analyst.

Your task is to analyze the resume text provided and extract structured information.

Rules:
- Output ONLY valid JSON
- Do NOT include explanations, comments, or markdown
- If a field is not present, use null
- Be accurate and conservative (do not hallucinate)

Extract the following fields:
- candidate_name
- profile_level (Student / Entry-level / Mid-level / Senior-level)
- skills (array)
- education (array)
- experience (array)
- leadership_roles (array)
- availability (string or null)
- strengths (array)

Resume Text:
<<<${resumeText}>>>
`;

const result = await generateWithRetry(prompt);
let responseText = result.response.text().trim();

// Remove ```json ``` or ``` wrappers if present
if (responseText.startsWith("```")) {
  responseText = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

const parsed = JSON.parse(responseText);

    res.status(200).json({
      message: "Resume analyzed successfully",
      profile: parsed,
    });
  } catch (error) {
  console.error("Resume analysis error:", error);

  // Gemini / Google overload handling
  if (
    error?.status === 503 ||
    error?.message?.toLowerCase().includes("overloaded")
  ) {
    return res.status(503).json({
      message:
        "The AI service is currently overloaded. Please try again in a few moments.",
    });
  }

  // Invalid JSON or unexpected AI output
  if (error instanceof SyntaxError) {
    return res.status(500).json({
      message:
        "AI returned an unexpected response. Please retry the analysis.",
    });
  }

  // Generic fallback
  res.status(500).json({
    message: "Resume analysis failed due to a server error.",
  });
  }
};
