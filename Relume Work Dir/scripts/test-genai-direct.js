/**
 * Test script for Google Generative AI client
 * 
 * This script tests the connection to Google's Generative AI services
 * using the @google/genai package directly with an API key.
 */

// Import the Google Generative AI client
const genai = require('@google/genai');
const { GoogleGenerativeAI } = genai;
require('dotenv').config({ path: '.env.local' });

// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  console.error('Please set this variable in your .env.local file.');
  process.exit(1);
}

async function testGenerativeAI() {
  console.log('=== Testing Google Generative AI ===');
  
  try {
    // Initialize the Google Generative AI client
    console.log('Initializing Google Generative AI client...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Test text generation with gemini-pro
    console.log('\n--- Testing Text Generation with gemini-pro ---');
    const textModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    console.log('Generating text...');
    const textResult = await textModel.generateContent('Write a short poem about coding.');
    const textResponse = await textResult.response;
    const text = textResponse.text();
    
    console.log('\nGenerated Text:');
    console.log('---------------');
    console.log(text);
    console.log('---------------');
    
    // Test image generation with Imagen
    console.log('\n--- Testing Image Generation with Imagen ---');
    console.log('Note: This may fail if your API key does not have access to Imagen models.');
    
    try {
      // Try to use the imagen model
      const imagenModel = genAI.getGenerativeModel({ model: 'imagen-3.0-fast-generate-001' });
      
      console.log('Generating image...');
      const imagePrompt = 'A beautiful landscape with mountains and a lake, digital art style';
      const imageResult = await imagenModel.generateContent(imagePrompt);
      
      console.log('\nImage generation successful!');
      console.log('Check the response for image data.');
      
    } catch (imageError) {
      console.error('\nImage generation failed:');
      console.error(imageError.message);
      console.log('\nThis is expected if your API key does not have access to Imagen models.');
      console.log('You may need to request access to Imagen models or use a different approach.');
    }
    
    console.log('\n✅ Text generation test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error(error.message);
    
    if (error.details) {
      console.error('\nError details:');
      console.error(JSON.stringify(error.details, null, 2));
    }
  }
}

// Run the test
testGenerativeAI().catch(console.error);
