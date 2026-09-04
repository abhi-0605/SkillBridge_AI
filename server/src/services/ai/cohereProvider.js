import axios from "axios";

const COHERE_API_URL = "https://api.cohere.com/v2/chat";
const COHERE_MODEL = process.env.COHERE_MODEL || "command-r-08-2024";

export const callCohere = async (prompt, { json = false } = {}) => {
  try {
    const body = {
      model: COHERE_MODEL,
      messages: [{ role: "user", content: prompt }],
    };

    if (json) {
      body.response_format = { type: "json_object" };
    }

    const response = await axios.post(COHERE_API_URL, body, {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.message.content[0].text;
  } catch (error) {
    console.error("COHERE FULL ERROR:", JSON.stringify(error.response?.data, null, 2));
    const details = error.response?.data?.message || error.message;
    throw new Error(`Cohere request failed: ${details}`);
  }
};