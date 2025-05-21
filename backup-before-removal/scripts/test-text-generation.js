/**
 * Test script for Vertex AI text generation
 * 
 * This script tests the connection to Vertex AI using text generation
 * with the Gemini model, which has different quota limits than Imagen.
 */

// Import required packages
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config({ path: '.env.local' });

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

/**
 * Generate text using Vertex AI Gemini model
 * 
 * @param {string} prompt - The text prompt to generate a response for
 * @param {string} model - The model to use (default: gemini-pro)
 * @returns {Promise<string>} - The generated text
 */
async function generateText(prompt, model = 'gemini-pro') {
  try {
    console.log(`Generating text with prompt: "${prompt}"`);
    console.log(`Using model: ${model}`);
    console.log(`Project: ${PROJECT_ID}`);
    console.log(`Location: ${LOCATION}`);
    
    // Initialize Vertex AI
    const vertexAI = new VertexAI({
      project: PROJECT_ID,
      location: LOCATION,
    });
    
    // Get the generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model: model,
    });
    
    // Generate content
    console.log('\nSending request to Vertex AI...');
    
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };
    
    const response = await generativeModel.generateContent(request);
    const text = response.response.candidates[0].content.parts[0].text;
    
    return text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}

/**
 * Test text generation with different prompts
 */
async function testTextGeneration() {
  try {
    console.log('=== Testing Vertex AI Text Generation ===\n');
    
    // Test with a simple question
    const prompt1 = 'What are the benefits of energy-efficient windows?';
    console.log(`Testing with prompt: "${prompt1}"`);
    
    const response1 = await generateText(prompt1);
    
    console.log('\n=== Generated Response ===');
    console.log(response1);
    console.log('=========================\n');
    
    // Test with a more complex prompt
    const prompt2 = 'Write a short description for a double-hung window product page. Include key features and benefits.';
    console.log(`Testing with prompt: "${prompt2}"`);
    
    const response2 = await generateText(prompt2);
    
    console.log('\n=== Generated Response ===');
    console.log(response2);
    console.log('=========================\n');
    
    console.log('✅ Text generation tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Text generation test failed:');
    console.error(error.message);
    
    if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
      console.log('\nQuota limit reached. Recommendations:');
      console.log('1. Wait for quota to reset');
      console.log('2. Request a quota increase through Google Cloud Console');
    }
  }
}

// Run the test
testTextGeneration().catch(console.error);
