// import axios from 'axios';

// const NARAROUTER_API_URL =process.env.NARAROUTER_API_URL || "https://router.bynara.id/v1/chat/completions";
// const NARAROUTER_MODEL = process.env.NARAROUTER_MODEL;


// export const callNaraRouter = async (prompt, { json = false } = {}) => {
//     if(!process.env.NARAROUTER_API_KEY) {
//         throw new Error("NARAROUTER_API_KEY is not set in environment variables.");
//     }

//     if(!NARAROUTER_MODEL) {
//         throw new Error("NARAROUTER_MODEL is not set in environment variables.");
//     }
//     try{
//         const response = await axios.post(
//             NARAROUTER_API_URL,
//             {
//                 model: NARAROUTER_MODEL,
//                 messages: [{ role: "user", content: prompt }],
//                 response_format: json ? { type: "json_object" } : undefined,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.NARAROUTER_API_KEY}`,
//                     "Content-Type": "application/json",
//                 },
//                 timeout: 60000, // Set timeout to 60 seconds
//             }
//         );
//         return response.data.choices[0].message.content;   
//     }catch (error) {
//         console.error("NARAROUTER FULL ERROR:", JSON.stringify(error.response?.data, null, 2));
//         const details = error.response?.data?.error?.message ||error.response?.data?.message || error.message;
//         throw new Error(`NaraRouter request failed: ${details}`);
//     }

// };

import axios from "axios";

const NARAROUTER_API_URL =
  process.env.NARAROUTER_API_URL ||
  "https://router.bynara.id/v1/chat/completions";
const NARAROUTER_MODEL = process.env.NARAROUTER_MODEL;

export const callNaraRouter = async (prompt, { json = false } = {}) => {
  if (!process.env.NARAROUTER_API_KEY) {
    throw new Error("NARAROUTER_API_KEY is not set in environment variables.");
  }

  if (!NARAROUTER_MODEL) {
    throw new Error("NARAROUTER_MODEL is not set in environment variables.");
  }

  let response;
  try {
    response = await axios.post(
      NARAROUTER_API_URL,
      {
        model: NARAROUTER_MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format: json ? { type: "json_object" } : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NARAROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000, // 60 seconds
      }
    );
  } catch (error) {
    console.error(
      "NARAROUTER HTTP ERROR:",
      JSON.stringify(error.response?.data, null, 2) || error.message
    );
    const details =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message;
    throw new Error(`NaraRouter request failed: ${details}`);
  }

  const data = response.data;

  // Handle OpenAI-style and a few other common response shapes
  const content =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    data?.content?.[0]?.text ??
    data?.output_text ??
    data?.message?.content;

  if (typeof content === "string" && content.length > 0) {
    return content;
  }

  console.error(
    "NARAROUTER UNEXPECTED RESPONSE:",
    JSON.stringify(data, null, 2)
  );
  const apiError = data?.error?.message || data?.message;
  throw new Error(
    `NaraRouter returned an unexpected response${apiError ? `: ${apiError}` : ""}`
  );
};