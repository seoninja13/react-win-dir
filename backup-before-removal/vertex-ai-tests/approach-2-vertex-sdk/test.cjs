/**
 * Vertex AI Text Generation Test - Approach 2
 * 
 * This script tests the connection to Google's Vertex AI using the official SDK
 * for text generation with the Gemini model.
 */

// Import the Vertex AI SDK
const { VertexAI } = require('@google-cloud/vertexai');

// Project and location
const PROJECT_ID = 'mold-removal-lead-gen';
const LOCATION = 'us-central1'; // Primary region for Vertex AI

async function run() {
  console.log('=== Testing Text Generation with Vertex AI SDK ===');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  
  try {
    // Initialize Vertex AI
    console.log('\nInitializing Vertex AI client...');
    const vertexAI = new VertexAI({
      project: PROJECT_ID,
      location: LOCATION,
    });
    
    // Get the generative model
    console.log('\nGetting generative model (gemini-1.0-pro)...');
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.0-pro',
    });
    
    // Simple text generation
    const prompt = "Write a short paragraph about energy-efficient windows.";
    console.log(`\nPrompt: "${prompt}"`);
    
    console.log('\nGenerating content...');
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };
    
    const result = await generativeModel.generateContent(request);
    const response = result.response;
    
    console.log('\n=== Response Object ===');
    console.log(JSON.stringify(response, null, 2));
    
    if (response.candidates && 
        response.candidates.length > 0 && 
        response.candidates[0].content && 
        response.candidates[0].content.parts && 
        response.candidates[0].content.parts.length > 0) {
      
      const text = response.candidates[0].content.parts[0].text;
      
      console.log('\n=== Generated Text ===');
      console.log(text);
      console.log('======================');
      
      console.log('\n✅ Text generation test completed successfully!');
    } else {
      console.log('\n❌ No text was generated in the response.');
    }
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error(error.message);
    
    if (error.message.includes('404')) {
      console.log('\nModel not found. Recommendations:');
      console.log('1. Verify that the Vertex AI API is enabled: gcloud services enable aiplatform.googleapis.com');
      console.log('2. Check if the model is available in your region');
      console.log('3. Try a different region (us-central1 is recommended)');
    } else if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
      console.log('\nQuota limit reached. Recommendations:');
      console.log('1. Wait for quota to reset');
      console.log('2. Request a quota increase through Google Cloud Console');
    } else if (error.message.includes('403') || error.message.includes('PERMISSION_DENIED')) {
      console.log('\nPermission denied. Recommendations:');
      console.log('1. Ensure you have run: gcloud auth application-default login');
      console.log('2. Verify that your account has the necessary permissions');
    }
  }
}

// Run the test
run().catch(console.error);
