import { generateAIResponse } from "../ai/aiProvider.js";

const cleanJsonResponse = (raw) => {
  return raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
};

const buildPrompt = (text, label) => `
You are a keyword extraction engine. Extract the most important professional keywords (skills, tools, technologies, certifications, role titles) from the following ${label}.

Respond with ONLY a valid JSON object in this exact format:
{"keywords": ["React", "Node.js", "MongoDB"]}

Do not add explanations or markdown. No duplicates. Limit to the 25 most relevant keywords.

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
      keywords = parsed;
    } else if (typeof parsed === "object" && parsed !== null) {
      const arrayValue = Object.values(parsed).find((v) => Array.isArray(v));
      if (arrayValue) {
        keywords = arrayValue;
      } else {
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