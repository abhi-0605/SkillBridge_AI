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
      max_tokens: 2048,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const getRetryDelay = (error) => {
  const message = error.response?.data?.error?.message || "";
  const waitMatch = message.match(/try again in ([\d.]+)s/i);
  if (waitMatch) return (parseFloat(waitMatch[1]) + 0.5) * 1000;
  return 3000; // default 3s wait for non-rate-limit errors (e.g. empty/malformed generation)
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
    console.warn("GROQ FIRST ATTEMPT FAILED, retrying once:", JSON.stringify(error.response?.data, null, 2));

    const delay = getRetryDelay(error);
    await sleep(delay);

    try {
      const retryResponse = await makeRequest(prompt, response_format);
      return retryResponse.data.choices[0].message.content;
    } catch (retryError) {
      console.error("GROQ RETRY ALSO FAILED:", JSON.stringify(retryError.response?.data, null, 2));
      throw new Error(`Groq request failed after retry: ${retryError.response?.data?.error?.message || retryError.message}`);
    }
  }
};