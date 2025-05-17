/**
 * Test script to verify connection with Google Generative AI using Vertex AI
 * 
 * This script tests the connection to Google's Vertex AI service using the
 * @google-cloud/vertexai and @google/genai packages.
 * 
 * Documentation:
 * - Google Generative AI: https://cloud.google.com/vertex-ai/generative-ai/docs
 * - Authentication: https://cloud.google.com/vertex-ai/docs/authentication
 */

// Import required packages
const { VertexAI } = require('@google-cloud/vertexai');
const { GoogleGenerativeAI } = require('@google/genai');
require('dotenv').config({ path: '.env.local' });

// Environment variables
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
// Override location to use us-central1 which is the primary region for Vertex AI
const GOOGLE_CLOUD_LOCATION = 'us-central1';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Test connection using @google-cloud/vertexai for image generation
async function testVertexAIConnection() {
  console.log('\n=== Testing connection with @google-cloud/vertexai (Image Generation) ===');
  
  try {
    console.log('Initializing Vertex AI client...');
    console.log(`Project: ${GOOGLE_CLOUD_PROJECT}`);
    console.log(`Location: ${GOOGLE_CLOUD_LOCATION}`);
    
    // Initialize the Vertex AI client
    const vertexAI = new VertexAI({
      project: GOOGLE_CLOUD_PROJECT,
      location: GOOGLE_CLOUD_LOCATION,
    });
    
    // Get the image generation model
    console.log('Getting image generation model (imagen-3.0-fast-generate-001)...');
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'imagen-3.0-fast-generate-001',
    });
    
    // Generate an image to test the connection
    console.log('Testing connection with a simple image generation request...');
    const prompt = 'A beautiful landscape with mountains and a lake, digital art style';
    
    console.log(`Generating image with prompt: "${prompt}"`);
    const response = await generativeModel.generateImages({
      prompt,
      sampleCount: 1,
    });
    
    // Check if we got a valid response
    if (response && response.images && response.images.length > 0) {
      console.log('\nImage generation successful!');
      console.log(`Image format: ${response.images[0].mimeType}`);
      console.log(`Base64 data length: ${response.images[0].bytesBase64 ? response.images[0].bytesBase64.length : 0} characters`);
      
      // Don't print the entire base64 string as it would be too long
      if (response.images[0].bytesBase64) {
        console.log(`Base64 data preview: ${response.images[0].bytesBase64.substring(0, 50)}...`);
      }
      
      console.log('\n✅ Connection test successful with @google-cloud/vertexai!');
      return true;
    } else {
      throw new Error('No images were returned in the response');
    }
    
    return true;
  } catch (error) {
    console.error('\n❌ Connection test failed with @google-cloud/vertexai:');
    console.error(error.message);
    console.error('\nError details:');
    if (error.details) {
      console.error(JSON.stringify(error.details, null, 2));
    }
    console.error('\nStack trace:');
    console.error(error.stack);
    
    console.log('\nTroubleshooting tips:');
    console.log('1. Verify that the Vertex AI API is enabled in your project');
    console.log('2. Check if the model is available in your region');
    console.log('3. Ensure proper authentication is set up');
    console.log('4. Try a different region (us-central1 is recommended)');
    
    return false;
  }
}

// Test connection using @google/genai
async function testGenAIConnection() {
  console.log('\n=== Testing connection with @google/genai ===');
  
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    
    console.log('Initializing Google Generative AI client with API key...');
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Get a generative model
    console.log('Getting generative model (gemini-pro)...');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Generate content to test the connection
    console.log('Testing connection with a simple text generation request...');
    const result = await model.generateContent('Hello, can you verify this connection is working?');
    const text = result.response.text();
    
    console.log('\nResponse from Google Generative AI:');
    console.log('----------------------------------');
    console.log(text);
    console.log('----------------------------------');
    console.log('\n✅ Connection test successful with @google/genai!');
    
    return true;
  } catch (error) {
    console.error('\n❌ Connection test failed with @google/genai:');
    console.error(error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    
    return false;
  }
}

// Main function to run all tests
async function runTests() {
  console.log('=== Google Generative AI Connection Test ===');
  console.log('Testing connection to Google Generative AI services...');
  
  // Print environment variables (without sensitive values)
  console.log('\nEnvironment variables:');
  console.log(`- GOOGLE_CLOUD_PROJECT: ${GOOGLE_CLOUD_PROJECT || 'Not set'}`);
  console.log(`- GOOGLE_CLOUD_LOCATION: ${GOOGLE_CLOUD_LOCATION || 'Not set'}`);
  console.log(`- GEMINI_API_KEY: ${GEMINI_API_KEY ? '✓ Set' : '✗ Not set'}`);
  console.log(`- GOOGLE_GENAI_USE_VERTEXAI: ${process.env.GOOGLE_GENAI_USE_VERTEXAI || 'Not set'}`);
  
  // Run tests
  const vertexAISuccess = await testVertexAIConnection();
  const genAISuccess = await testGenAIConnection();
  
  // Summary
  console.log('\n=== Test Summary ===');
  console.log(`@google-cloud/vertexai: ${vertexAISuccess ? '✅ Success' : '❌ Failed'}`);
  console.log(`@google/genai: ${genAISuccess ? '✅ Success' : '❌ Failed'}`);
  
  if (vertexAISuccess && genAISuccess) {
    console.log('\n🎉 All connection tests passed! Your Google Generative AI setup is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the error messages above and verify your configuration.');
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Unhandled error in test script:', error);
  process.exit(1);
});
