/**
 * Test with new API key for Google GenAI
 */

import { GoogleGenerativeAI } from '@google/genai';

// Use the API key from environment variable
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('Error: GOOGLE_API_KEY environment variable not set.');
  process.exit(1); // Exit if the key is not found
}

async function run() {
  try {
    console.log('Starting test with API key from environment variable...');
    
    // Initialize the API with the key from environment variable
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('API initialized with key from environment variable');
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log('Model initialized: gemini-pro');
    
    const prompt = "Write a short paragraph about energy-efficient windows.";
    console.log(`\nPrompt: "${prompt}"`);
    
    console.log('\nGenerating content...');
    const result = await model.generateContent(prompt);
    console.log('Content generated successfully');
    
    const response = await result.response;
    console.log('Response received');
    
    const text = response.text();
    console.log('\n=== Generated Text ===');
    console.log(text);
    console.log('======================');
    
    console.log('\n✅ Test completed successfully with API key from environment variable!');
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error(error.message);
    console.error('Stack trace:');
    console.error(error.stack);
    
    if (error.response) {
      console.error('API Response:', error.response);
    }
  }
}

run();
