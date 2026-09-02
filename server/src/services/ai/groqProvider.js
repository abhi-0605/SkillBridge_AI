import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const makeRequest = async (prompt, response_format) => {
  return axios.post(
    GROQ_API_URL,
    {
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      response_format,
      max_tokens: 1024,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const callGroq = async (prompt, { json = false, schema = null } = {}) => {
  let response_format;

  if (schema) {
    response_format = {
      type: "json_schema",
      json_schema: { name: schema.name, strict: true, schema: schema.schema },
    };
  } else if (json) {
    response_format = { type: "json_object" };
  }

  try {
    const response = await makeRequest(prompt, response_format);
    return response.data.choices[0].message.content;
  } catch (error) {
    const errData = error.response?.data?.error;

    // If rate-limited, parse Groq's suggested wait time and retry once
    if (error.response?.status === 429 && errData?.message) {
      const waitMatch = errData.message.match(/try again in ([\d.]+)s/i);
      const waitSeconds = waitMatch ? parseFloat(waitMatch[1]) : 5;

      console.warn(`Groq rate limited — retrying in ${waitSeconds}s`);
      await sleep((waitSeconds + 0.5) * 1000);

      try {
        const retryResponse = await makeRequest(prompt, response_format);
        return retryResponse.data.choices[0].message.content;
      } catch (retryError) {
        console.error("GROQ RETRY FAILED:", JSON.stringify(retryError.response?.data, null, 2));
        throw new Error(`Groq request failed after retry: ${retryError.response?.data?.error?.message || retryError.message}`);
      }
    }

    console.error("GROQ FULL ERROR:", JSON.stringify(error.response?.data, null, 2));
    throw new Error(`Groq request failed: ${errData?.message || error.message}`);
  }
};