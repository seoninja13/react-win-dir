/**
 * Simple test for Google GenAI SDK based on official documentation
 * https://github.com/google/generative-ai-js
 */

import { GoogleGenerativeAI } from '@google/genai';

// Access your API key as an environment variable
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('Error: GOOGLE_API_KEY environment variable not set.');
  process.exit(1); // Exit if the key is not found
}
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    console.log('Starting simple test...');
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log('Model initialized');
    
    const prompt = "Write a short paragraph about energy-efficient windows.";
    console.log(`Prompt: "${prompt}"`);
    
    console.log('Generating content...');
    const result = await model.generateContent(prompt);
    console.log('Content generated');
    
    const response = await result.response;
    console.log('Response received');
    
    const text = response.text();
    console.log('\n=== Generated Text ===');
    console.log(text);
    console.log('======================');
    
  } catch (error) {
    console.error('Error during test:');
    console.error(error.message);
    console.error('Stack trace:');
    console.error(error.stack);
    
    if (error.response) {
      console.error('API Response:', error.response);
    }
  }
}

run();
