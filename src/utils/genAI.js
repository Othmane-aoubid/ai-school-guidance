import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

// Define the model to be used
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Rate limit constants
const MAX_RPM = 15; // Requests per minute
const MAX_TPM = 1_000_000; // Tokens per minute

// Tracking variables
let requestCount = 0;
let tokenCount = 0;
let resetTime = Date.now() + 60 * 1000; // Reset time in one minute

/**
 * Rate limit enforcement function
 */
const enforceRateLimits = (tokens) => {
  const currentTime = Date.now();

  // Reset limits if the minute has passed
  if (currentTime > resetTime) {
    requestCount = 0;
    tokenCount = 0;
    resetTime = currentTime + 60 * 1000;
  }

  // Check against rate limits
  if (requestCount >= MAX_RPM) {
    throw new Error("Rate limit exceeded: Too many requests per minute.");
  }
  if (tokenCount + tokens > MAX_TPM) {
    throw new Error("Rate limit exceeded: Too many tokens per minute.");
  }

  // Update usage
  requestCount += 1;
  tokenCount += tokens;
};

/**
 * Sends a prompt to the Gemini model and returns the response.
 * @param {string} prompt - The user's message to the chatbot.
 * @returns {Promise<string>} - The AI's response as text.
 */
export const generateResponse = async (prompt) => {
  try {
    // Estimate tokens (simplified estimation: words * 1.5)
    const tokenEstimate = prompt.split(/\s+/).length * 1.5;

    // Enforce rate limits
    enforceRateLimits(tokenEstimate);

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Count response tokens (estimated)
    const responseTokens = responseText.split(/\s+/).length * 1.5;
    enforceRateLimits(responseTokens);

    return responseText;
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to fetch AI response.");
  }
};
