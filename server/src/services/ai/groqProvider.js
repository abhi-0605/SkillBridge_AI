import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export const callGroq = async (prompt, { json = false } = {}) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format: json ? { type: "json_object" } : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    const details = error.response?.data?.error?.message || error.message;
    throw new Error(`Groq request failed: ${details}`);
  }
};