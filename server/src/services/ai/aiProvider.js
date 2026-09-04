import { callOllama } from "./ollamaProvider.js";
import { callGroq } from "./groqProvider.js";
import { callGemini } from "./geminiProvider.js";
import { callOpenRouter } from "./openRouterProvider.js";

const PROVIDER = process.env.AI_PROVIDER || "ollama";

export const generateAIResponse = async (prompt, options = {}) => {
  switch (PROVIDER) {
    case "ollama":
      return callOllama(prompt, options);

    case "groq":
      return callGroq(prompt, options);

    case "gemini":
      return callGemini(prompt, options);
    
    case "openrouter":
      return callOpenRouter(prompt, options);

    case "cohere":
      return callCohere(prompt, options);
    default:
      throw new Error(`Unknown AI provider: ${PROVIDER}`);
  }
};