// import { generateAIResponse } from "../ai/aiProvider.js";

// const cleanJsonResponse = (raw) => {
//     return raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
// };

// const buildPrompt = (text, label) => `
// You are a keyword extraction engine. Extract the most important professional keywords (skills, tools, technologies, certifications, role titles) from the following ${label}.

// Rules:
// - Return ONLY a valid JSON array of strings, nothing else.
// - No duplicates, no explanations, no markdown.
// - Normalize casing (e.g. "React.js" not "react js").
// - Limit to the 25 most relevant keywords.

// ${label}:
// """
// ${text}
// """
// `;


// export const extractKeywords = async (text, label = 'text') => {
//     const prompt = buildPrompt(text, label);
//     const raw = await generateAIResponse(prompt, { json: true });

//     try{
//         const cleaned= cleanJsonResponse(raw);
//         const keywords= JSON.parse(cleaned);

//         if(!Array.isArray(keywords)){
//             throw new Error('AI response was not an array');
//         }

//         return keywords.map((k) => String(k).trim()).filter(Boolean);
//     }catch(error){
//         throw new Error(`Failed to parse keyword extraction response: ${error.message}`);
//     }
// };

import { generateAIResponse } from "../ai/aiProvider.js";

const cleanJsonResponse = (raw) => {
  return raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
};

const buildPrompt = (text, label) => `
You are a keyword extraction engine. Extract the most important professional keywords (skills, tools, technologies, certifications, role titles) from the following ${label}.

Respond with ONLY a valid JSON array of strings, in this exact format:
["React", "Node.js", "MongoDB"]

Do not use an object. Do not add explanations or markdown. No duplicates. Limit to the 25 most relevant keywords.

${label}:
"""
${text}
"""
`;

export const extractKeywords = async (text, label = "text") => {
  const prompt = buildPrompt(text, label);
  const raw = await generateAIResponse(prompt, { json: true });

  console.log("RAW AI RESPONSE:", raw);

  try {
    const cleaned = cleanJsonResponse(raw);
    let parsed = JSON.parse(cleaned);

    let keywords;

    if (Array.isArray(parsed)) {

      // Case 1: already a proper array
      keywords = parsed;

    } else if (typeof parsed === "object" && parsed !== null) {

      // Case 2: object with an array value somewhere, e.g. { "keywords": [...] }


      const arrayValue = Object.values(parsed).find((v) => Array.isArray(v));
      if (arrayValue) {
        keywords = arrayValue;
      } else {

        
        // Case 3: object where KEYS are the keywords, e.g. { "React": "react", ... }
        keywords = Object.keys(parsed);
      }
    }

    if (!Array.isArray(keywords)) {
      throw new Error("AI response could not be normalized into an array");
    }

    return [...new Set(keywords.map((k) => String(k).trim()).filter(Boolean))];
  } catch (error) {
    throw new Error(`Failed to parse keyword extraction response: ${error.message}`);
  }
};