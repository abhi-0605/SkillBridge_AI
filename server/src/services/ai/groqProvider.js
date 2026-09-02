import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

export const callGroq = async (prompt, { json = false, schema = null } = {}) => {
  try {
    let response_format;

    if (schema) {
      response_format = {
        type: "json_schema",
        json_schema: {
          name: schema.name,
          strict: true,
          schema: schema.schema,
        },
      };
    } else if (json) {
      response_format = { type: "json_object" };
    }

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format,
        max_tokens: 2048,
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
    console.error("GROQ FULL ERROR:", JSON.stringify(error.response?.data, null, 2));
    const details = error.response?.data?.error?.message || error.message;
    throw new Error(`Groq request failed: ${details}`);
  }
};