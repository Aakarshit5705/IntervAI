import fs from "fs";
import { parseResume } from "../utils/resumeParser.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumeText = await parseResume(
      req.file.path,
      req.file.mimetype
    );

    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Resume text too short or unreadable",
      });
    }

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeText,
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume parsing failed",
    });
  }
};
