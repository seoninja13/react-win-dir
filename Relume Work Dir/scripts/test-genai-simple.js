/**
 * Simple test for Google Generative AI client
 * Following the official documentation
 */

// Import the required modules
const { GoogleGenerativeAI } = require('@google/genai');
require('dotenv').config({ path: '.env.local' });

// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  process.exit(1);
}

// Create a new instance of the GoogleGenerativeAI class
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a short poem about coding.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run().catch(err => {
  console.error('Error:', err);
});
