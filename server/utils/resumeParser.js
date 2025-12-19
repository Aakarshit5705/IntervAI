import fs from "fs";
import { createRequire } from "module";
import mammoth from "mammoth";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const parseResume = async (filePath, mimeType) => {
  try {
    console.log("Parsing resume...");
    console.log("File path:", filePath);
    console.log("MIME type:", mimeType);

    if (mimeType === "application/pdf") {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      return data.text;
    }

    if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    }

    throw new Error("Unsupported file type: " + mimeType);
  } catch (error) {
    console.error("Parser error:", error);
    throw error;
  }
};
