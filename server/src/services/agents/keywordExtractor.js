import { generateAIResponse } from "../ai/aiProvider.js";

const cleanJsonResponse = (raw) => {
  return raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
};

const buildPrompt = (text, label) => `
You are a keyword extraction engine. Extract EVERY technical/professional skill keyword (programming languages, frameworks, libraries, tools, databases, cloud platforms, methodologies, certifications) mentioned in the following ${label}.

Be exhaustive and literal:
- If a skills/technology list is present (e.g. "Frontend: React.js, HTML5, CSS3"), extract EVERY individual item from that list — do not skip any, and do not summarize a list into a category word like "Frontend."
- Use the exact term as written (e.g. "HTML5" not "HTML", "Tailwind CSS" not "CSS framework").
- Extract only concrete, discrete skills/tools/technologies — a single word or short phrase each.
- Do NOT extract full sentences or broad process descriptions as one item. Skip vague umbrella phrases like "software development workflows" or "production practices" entirely — only extract a specific named skill (like "Testing" or "Git") if it's clearly listed as a standalone required skill, not buried inside a descriptive sentence.

Do NOT extract any of the following, even if present in the text:
- Job titles, company names, locations
- Employment type, duration, or experience level (e.g. "Internship", "Fresher", "0-1 year")
- Degree names or education requirements (e.g. "B.Tech", "Computer Science")
- Generic non-technical phrases (e.g. "team player", "good communication")

Limit to the 40 most relevant keywords. No duplicates.

${label}:
"""
${text}
"""
`;

const KEYWORD_SCHEMA = {
  name: "keyword_extraction",
  schema: {
    type: "object",
    properties: {
      keywords: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["keywords"],
    
  },
};

export const extractKeywords = async (text, label = "text") => {
  const prompt = buildPrompt(text, label);
  const raw = await generateAIResponse(prompt, { json: true, schema: KEYWORD_SCHEMA });

  console.log("RAW AI RESPONSE:", raw);

  try {
    const cleaned = cleanJsonResponse(raw);
    let parsed = JSON.parse(cleaned);

    let keywords;

    if (Array.isArray(parsed)) {
      keywords = parsed;
    } else if (typeof parsed === "object" && parsed !== null) {
      const arrayValue = Object.values(parsed).find((v) => Array.isArray(v));
      keywords = arrayValue || Object.keys(parsed);
    }

    if (!Array.isArray(keywords)) {
      throw new Error("AI response could not be normalized into an array");
    }

    return [...new Set(keywords.map((k) => String(k).trim()).filter(Boolean))];
  } catch (error) {
    throw new Error(`Failed to parse keyword extraction response: ${error.message}`);
  }
};