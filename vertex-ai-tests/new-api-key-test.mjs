/**
 * Test with new API key for Google GenAI
 */

import { GoogleGenerativeAI } from '@google/genai';

// Use the new API key
const API_KEY = 'AIzaSyA8B_V05yct_YIo01B7HETGXtLAJg3o2_U';

async function run() {
  try {
    console.log('Starting test with new API key...');
    
    // Initialize the API with the new key
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log('API initialized with new key');
    
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
    
    console.log('\n✅ Test completed successfully with new API key!');
    
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
