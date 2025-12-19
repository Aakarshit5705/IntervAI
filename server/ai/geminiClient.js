import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const proModel = genAI.getGenerativeModel({
  model: "gemini-2.5-pro",
});

export const flashModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
