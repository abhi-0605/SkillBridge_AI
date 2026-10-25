import { callOllama } from "./ollamaProvider.js";
import { callGroq } from "./groqProvider.js";
import { callGemini } from "./geminiProvider.js";
import { callOpenRouter } from "./openRouterProvider.js";
import { callCohere } from "./cohereProvider.js";
import { callNaraRouter } from "./NaraRouterProvider.js";

const PROVIDER = process.env.AI_PROVIDER || "ollama";
const AI_FALLBACK_PROVIDER = process.env.AI_FALLBACK_PROVIDER;  

const provider={
  ollama: callOllama,
  groq: callGroq,
  gemini: callGemini,
  openrouter: callOpenRouter,
  cohere: callCohere,
  nararouter: callNaraRouter,
}

export const generateAIResponse = async (prompt, options = {}) => {
  const primary  = provider[PROVIDER];
  if(!primary){
    throw new Error(`Unknown AI provider: ${PROVIDER}`);
  }
  try{
    return await primary(prompt, options);
  }catch (error) {
    const fallback = provider[AI_FALLBACK_PROVIDER];
    if(fallback && AI_FALLBACK_PROVIDER !== PROVIDER){
      console.warn(`[AI] ${PROVIDER} failed: ${error.message}. Falling back to ${AI_FALLBACK_PROVIDER}.`);
      return await fallback(prompt, options);
    }
    throw error;
  }
};


// export const generateAIResponse = async (prompt, options = {}) => {
//   switch (PROVIDER) {
//     case "ollama":
//       return callOllama(prompt, options);

//     case "groq":
//       return callGroq(prompt, options);

//     case "gemini":
//       return callGemini(prompt, options);
    
//     case "openrouter":
//       return callOpenRouter(prompt, options);

//     case "cohere":
//       return callCohere(prompt, options);

//     case "nararouter":
//       return callNaraRouter(prompt, options);
//     default:
//       throw new Error(`Unknown AI provider: ${PROVIDER}`);
//   }
// };