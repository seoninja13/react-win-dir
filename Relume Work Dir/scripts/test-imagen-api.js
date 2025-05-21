/**
 * Test script for Vertex AI Imagen API
 * 
 * This script tests the connection to the Vertex AI Imagen API for image generation
 * using the recommended authentication method and API endpoints.
 * 
 * References:
 * - https://cloud.google.com/vertex-ai/docs/reference/rest/?apix=true#rest-resource:-v1.media
 * - https://cloud.google.com/vertex-ai/docs/authentication
 */

// Import required packages
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config({ path: '.env.local' });

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = 'us-central1'; // Primary region for Vertex AI

/**
 * Test image generation using Vertex AI Imagen API
 */
async function testImagenAPI() {
  console.log('=== Testing Vertex AI Imagen API ===');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  
  try {
    // Initialize the Vertex AI client
    console.log('\nInitializing Vertex AI client...');
    const vertexAI = new VertexAI({
      project: PROJECT_ID,
      location: LOCATION,
    });
    
    // Get the Imagen model
    console.log('\nGetting Imagen model (imagen-3.0-fast-generate-001)...');
    const model = 'imagen-3.0-fast-generate-001';
    const generativeVisionModel = vertexAI.preview.getGenerativeModel({
      model: model,
      generation_config: {
        temperature: 0.4,
      },
    });
    
    // Generate an image
    console.log('\nGenerating image...');
    const prompt = 'A beautiful landscape with mountains and a lake, digital art style';
    console.log(`Prompt: "${prompt}"`);
    
    const req = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    };
    
    const imageResponse = await generativeVisionModel.generateContent(req);
    const response = await imageResponse.response;
    
    console.log('\nImage generation response:');
    console.log(JSON.stringify(response, null, 2));
    
    if (response.candidates && response.candidates.length > 0 && 
        response.candidates[0].content && 
        response.candidates[0].content.parts && 
        response.candidates[0].content.parts.length > 0) {
      
      const imagePart = response.candidates[0].content.parts.find(part => part.inlineData);
      
      if (imagePart && imagePart.inlineData) {
        console.log('\n✅ Successfully generated image!');
        console.log(`MIME type: ${imagePart.inlineData.mimeType}`);
        console.log(`Data size: ${imagePart.inlineData.data.length} characters`);
        return true;
      }
    }
    
    console.log('\n❌ No image data found in the response');
    return false;
    
  } catch (error) {
    console.error('\n❌ Error testing Imagen API:');
    console.error(error.message);
    
    if (error.details) {
      console.error('\nError details:');
      console.error(JSON.stringify(error.details, null, 2));
    }
    
    console.log('\nTroubleshooting tips:');
    console.log('1. Ensure you have run: gcloud auth application-default login');
    console.log('2. Verify that the Vertex AI API is enabled: gcloud services enable aiplatform.googleapis.com');
    console.log('3. Check if your project has access to the Imagen model');
    console.log('4. Try a different region (us-central1 is recommended)');
    console.log('5. Ensure your account has the necessary permissions');
    
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    await testImagenAPI();
  } catch (error) {
    console.error('Unhandled error:', error);
    process.exit(1);
  }
}

// Run the main function
main();
