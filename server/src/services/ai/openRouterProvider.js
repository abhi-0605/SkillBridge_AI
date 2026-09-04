import axios from "axios";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";

export const callOpenRouter = async (prompt, { json = false } = {}) => {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: OPENROUTER_MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format: json ? { type: "json_object" } : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OPENROUTER FULL ERROR:", JSON.stringify(error.response?.data, null, 2));
    const details = error.response?.data?.error?.message || error.message;
    throw new Error(`OpenRouter request failed: ${details}`);
  }
};