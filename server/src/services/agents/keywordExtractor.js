import { generateAIResponse } from "../ai/aiProvider.js";

const cleanJsonResponse = (raw) => {
  return raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
};

const buildPrompt = (text, label) => `
You are a keyword extraction engine. Extract EVERY professional keyword (skills, tools, technologies, frameworks, languages, certifications, methodologies, role titles) mentioned in the following ${label}.

Be exhaustive and literal:
- If a skills/technology list is present (e.g. "Frontend: React.js, HTML5, CSS3"), extract EVERY individual item from that list — do not skip any, and do not summarize a list into a single category word like "Frontend" instead of the actual technologies.
- Use the exact term as written (e.g. "HTML5" not "HTML", "Tailwind CSS" not "CSS framework").
- Do not omit an item just because a similar or related item is already included.

Respond with ONLY a valid JSON object in this exact format:
{"keywords": ["React", "Node.js", "MongoDB"]}

Do not add explanations or markdown. No duplicates. Limit to the 40 most relevant keywords.

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