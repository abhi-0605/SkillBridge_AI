import axios from "axios";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1";


export const callOllama = async (prompt, { json = false } = {}) => {
    try {
        const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
            model: OLLAMA_MODEL,
            prompt,
            stream: false,
            format: json ? "json" : undefined,
        });
        return response.data.response
    } catch (error) {
        throw new Error(`Ollama request failed: ${error.message}`);
    }
}