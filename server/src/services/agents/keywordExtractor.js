import { generateAIResponse } from "../ai/aiProvider.js";

const cleanJsonResponse = (raw) => {
  return raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
};

const buildPrompt = (text, label) => `
You are a keyword extraction engine. Extract EVERY technical/professional skill keyword (programming languages, frameworks, libraries, tools, databases, cloud platforms, methodologies, certifications) mentioned in the following ${label}.

Be exhaustive and literal:
- If a skills/technology list is present (e.g. "Frontend: React.js, HTML5, CSS3"), extract EVERY individual item from that list — do not skip any, and do not summarize a list into a category word like "Frontend."
- Use the exact term as written (e.g. "HTML5" not "HTML", "Tailwind CSS" not "CSS framework").

Do NOT extract any of the following, even if present in the text:
- Job titles (e.g. "Full Stack Developer", "Intern")
- Company names
- Locations (city, country, "Remote", "Hybrid")
- Employment type or duration (e.g. "Internship", "3-6 months", "Full-time")
- Experience level phrases (e.g. "Fresher", "0-1 year", "Entry level")
- Degree names or education requirements (e.g. "B.Tech", "B.E.", "Computer Science", "IT related field")
- Generic non-technical phrases (e.g. "hackathon projects", "team player", "good communication")

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