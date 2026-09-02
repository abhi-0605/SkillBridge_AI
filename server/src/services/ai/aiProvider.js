import { callOllama } from "./ollamaProvider.js";
import { callGroq } from "./groqProvider.js";
import { callGemini } from "./geminiProvider.js";

const PROVIDER = process.env.AI_PROVIDER || "ollama";

export const generateAIResponse = async (prompt, options = {}) => {
  switch (PROVIDER) {
    case "ollama":
      return callOllama(prompt, options);

    case "groq":
      return callGroq(prompt, options);

    case "gemini":
      return callGemini(prompt, options);
    default:
      throw new Error(`Unknown AI provider: ${PROVIDER}`);
  }
};