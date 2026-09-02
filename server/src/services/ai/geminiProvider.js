import axios from "axios";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;


export const callGemini = async (prompt, { json = false, schema = null } = {}) => {
  try {
    const generationConfig ={}

    if(schema) {
      generationConfig.responseMimeType = "application/json";
      generationConfig.responseSchema = schema.schema;
    }else if(json) {
      generationConfig.responseMimeType = "application/json";
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.candidates[0].content.parts[0].text;
    }catch (error) {
        const details = error.response?.data?.error?.message || error.message;
        throw new Error(`Gemini request failed: ${details}`);
  }
}