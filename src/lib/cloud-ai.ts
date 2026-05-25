import { analyzeMedicine } from "./openai";
import { analyzeGemini } from "./gemini";
import { analyzeDeepseek } from "./deepseek";

export async function cloudAI(input: string) {

  // 1️⃣ OpenAI
  try {
    console.log("Using OpenAI...");
    return await analyzeMedicine(input);
  } catch (error) {
    console.log("OpenAI failed");
  }

  // 2️⃣ Gemini
  try {
    console.log("Using Gemini...");
    return await analyzeGemini(input);
  } catch (error) {
    console.log("Gemini failed");
  }

  // 3️⃣ DeepSeek
  try {
    console.log("Using DeepSeek...");
    return await analyzeDeepseek(input);
  } catch (error) {
    console.log("DeepSeek failed");
  }

  // Final fallback
  return "All AI providers failed.";
}