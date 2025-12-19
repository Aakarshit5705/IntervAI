import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.middleware.js";
import { uploadResume } from "../controllers/resume.controller.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only PDF and DOCX files allowed"));
    }

    cb(null, true);
  },
});

router.post("/upload", protect, upload.single("resume"), uploadResume);

export default router;
