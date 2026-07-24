import { callOllama } from "./ollamaProvider.js";
import { callGroq } from "./groqProvider.js";

const PROVIDER = process.env.AI_PROVIDER || "ollama";

export const generateAIResponse = async (prompt, options = {}) => {
  switch (PROVIDER) {
    case "ollama":
      return callOllama(prompt, options);

    case "groq":
      return callGroq(prompt, options);

    default:
      throw new Error(`Unknown AI provider: ${PROVIDER}`);
  }
};