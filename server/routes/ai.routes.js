import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { analyzeResume } from "../controllers/ai.controller.js";
import { getNextQuestion,startInterview } from "../controllers/interview.controller.js";
import { evaluateAnswer } from "../controllers/evaluation.controller.js";
import { generateInterviewSummary } from "../controllers/summary.controller.js";

const router = express.Router();

router.post("/analyze-resume", protect, analyzeResume);
router.post("/next-question", protect, getNextQuestion);
router.post("/start-interview", protect, startInterview);
router.post("/evaluate-answer", protect, evaluateAnswer);
router.post("/interview-summary", protect, generateInterviewSummary);

export default router;
