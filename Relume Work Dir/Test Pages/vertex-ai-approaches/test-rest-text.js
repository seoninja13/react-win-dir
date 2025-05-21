// Test 1: REST API Approach - Text Generation
// This test uses the direct REST API with an API key

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

// Configuration
const CONFIG = {
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-2.0-flash',
  prompt: 'Write a haiku about windows and doors'
};

async function testRestTextGeneration() {
  console.log('=== Testing REST API Text Generation ===');
  
  if (!CONFIG.apiKey) {
    console.error('❌ GOOGLE_API_KEY environment variable is not set');
    process.exit(1);
  }

  try {
    console.log('\n1. Initializing Google Generative AI...');
    const genAI = new GoogleGenerativeAI(CONFIG.apiKey);
    const model = genAI.getGenerativeModel({ model: CONFIG.model });
    
    console.log(`2. Generating text with prompt: "${CONFIG.prompt}"`);
    const result = await model.generateContent(CONFIG.prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n✅ Success! Generated text:');
    console.log(text);
    
    return { success: true, response: text };
  } catch (error) {
    console.error('\n❌ Error in REST API Text Generation:');
    console.error(error);
    return { success: false, error: error.message };
  }
}

// Run the test
testRestTextGeneration()
  .then(result => {
    console.log('\nTest completed with result:', result.success ? 'SUCCESS' : 'FAILED');
    if (!result.success) {
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
