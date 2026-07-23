import { generateAIResponse } from "../ai/aiProvider.js";

const cleanJsonResponse = (raw) => {
    return raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();

}


const buildPrompt = ({ atsScore, matchedSkills, missingSkills, resumeText, jdText }) => `
You are a career coach AI. Based on the analysis below, generate a helpful report.

ATS Score: ${atsScore}/100
Matched skills: ${matchedSkills.join(", ") || "none"}
Missing skills (required by job but not found in resume): ${missingSkills.join(", ") || "none"}

Resume excerpt:
"""
${resumeText.slice(0, 1000)}
"""

Job description excerpt:
"""
${jdText.slice(0, 1000)}
"""

Respond with ONLY valid JSON in this exact structure, no markdown, no extra text:
{
  "summary": "2-3 sentence overview of the candidate's fit for this role",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "recommendations": ["specific actionable recommendation 1", "recommendation 2", "recommendation 3"]
}
`;

export const generateReport = async ({ atsScore, matchedSkills, missingSkills, resumeText, jdText }) => {
    const prompt = buildPrompt({ atsScore, matchedSkills, missingSkills, resumeText, jdText });
    const raw = await generateAIResponse(prompt, { json: true });

    try {
        const cleaned = cleanJsonResponse(raw);
        const parsed = JSON.parse(cleaned);

        return {
            summary: parsed.summary || "",
            strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
            weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
            recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
        };
    }catch (error) {
        throw new Error(`Failed to parse report generation response: ${error.message}`);
    }
}