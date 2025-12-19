import api from "./axios";

export const uploadResume = (formData) =>
  api.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const analyzeResume = (resumeText) =>
  api.post("/ai/analyze-resume", { resumeText });

export const startInterview = (profile) =>
  api.post("/ai/start-interview", { profile });

export const nextQuestion = (sessionId) =>
  api.post("/ai/next-question", { sessionId });

export const evaluateAnswer = (payload) =>
  api.post("/ai/evaluate-answer", payload);

export const getSummary = (sessionId) =>
  api.post("/ai/interview-summary", { sessionId });