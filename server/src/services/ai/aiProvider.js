import { callOllama } from "./ollamaProvider.js";

// Placeholder imports for future providers — implemented later when needed
// import { callOpenAI } from "./openaiProvider.js";
// import { callClaude } from "./claudeProvider.js";
// import { callGemini } from "./geminiProvider.js";

const PROVIDER = process.env.AI_PROVIDER || "ollama";

// Single entry point for all AI calls across the app.
// Every agent calls generateAIResponse() — never a specific provider directly.
export const generateAIResponse = async (prompt, options = {}) => {
  switch (PROVIDER) {
    case "ollama":
      return callOllama(prompt, options);

    // case "openai":
    //   return callOpenAI(prompt, options);
    // case "claude":
    //   return callClaude(prompt, options);
    // case "gemini":
    //   return callGemini(prompt, options);

    default:
      throw new Error(`Unknown AI provider: ${PROVIDER}`);
  }
};