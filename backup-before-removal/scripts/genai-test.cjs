/**
 * Google Generative AI SDK Test Script (CommonJS version)
 * Based on the official example from:
 * https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_genai_sdk.ipynb
 */

// Import the GoogleGenerativeAI library using CommonJS syntax
const { GoogleGenerativeAI } = require('@google/genai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  process.exit(1);
}

// Initialize the API
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  console.log('=== Testing Google Generative AI SDK ===');
  console.log(`API Key: ${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}`);
  
  try {
    // For text-only input, use the gemini-pro model
    console.log('\nInitializing gemini-pro model...');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Write a short paragraph about energy-efficient windows.";
    console.log(`\nPrompt: "${prompt}"`);

    console.log('\nGenerating content...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n=== Generated Response ===');
    console.log(text);
    console.log('=========================');
    
    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error(error);
    
    if (error.message && error.message.includes('429')) {
      console.log('\nQuota limit reached. Please try again later.');
    }
  }
}

run();
