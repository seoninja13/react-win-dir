/**
 * Test script for Google Generative AI API
 * 
 * This script tests the connection to Google's Generative AI API using the API key
 * instead of Vertex AI, which might have different quota limits and availability.
 */

// Import the Google Generative AI SDK
import { GoogleGenerativeAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  process.exit(1);
}

/**
 * Generate text using Google Generative AI
 * 
 * @param {string} prompt - The text prompt to generate a response for
 * @returns {Promise<string>} - The generated text
 */
async function generateText(prompt) {
  try {
    console.log(`Generating text with prompt: "${prompt}"`);
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Generate content
    console.log('\nSending request to Google Generative AI...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}

/**
 * Test text generation with a simple prompt
 */
async function testTextGeneration() {
  try {
    console.log('=== Testing Google Generative AI Text Generation ===\n');
    
    // Test with a simple question
    const prompt = 'Write a short paragraph about energy-efficient windows.';
    
    console.log(`Testing with prompt: "${prompt}"`);
    
    const response = await generateText(prompt);
    
    console.log('\n=== Generated Response ===');
    console.log(response);
    console.log('=========================\n');
    
    console.log('✅ Text generation test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Text generation test failed:');
    console.error(error.message);
    
    if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
      console.log('\nQuota limit reached. Recommendations:');
      console.log('1. Wait for quota to reset');
      console.log('2. Request a quota increase through Google Cloud Console');
    } else if (error.message.includes('403') || error.message.includes('PERMISSION_DENIED')) {
      console.log('\nPermission denied. Recommendations:');
      console.log('1. Check if your API key is valid');
      console.log('2. Verify that your API key has access to the Gemini API');
    }
  }
}

// Run the test
testTextGeneration().catch(console.error);
