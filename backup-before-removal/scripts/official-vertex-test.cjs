/**
 * Official Vertex AI Text Generation Test
 * 
 * This script follows the official Google Cloud documentation for text generation
 * with Vertex AI using the Gemini model.
 */

// Import the Vertex AI SDK
const { VertexAI } = require('@google-cloud/vertexai');

// Project and location
const PROJECT_ID = 'mold-removal-lead-gen';
const LOCATION = 'us-central1'; // Using Google's recommended region

async function run() {
  console.log('=== Testing Text Generation with Vertex AI (Official Method) ===');
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
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: 'gemini-1.0-pro',
    });
    
    // Simple text generation
    const prompt = "Write a short paragraph about energy-efficient windows.";
    console.log(`\nPrompt: "${prompt}"`);
    
    console.log('\nGenerating content...');
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };
    
    // Generate content using streaming
    console.log('\nStreaming response:');
    const streamingResponse = await generativeModel.generateContentStream(request);
    
    for await (const item of streamingResponse.stream) {
      process.stdout.write(item.candidates[0]?.content?.parts[0]?.text || '');
    }
    
    console.log('\n\n=== Text generation test completed successfully! ===');
    
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
