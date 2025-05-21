// Test 3: Service Account Approach - Text Generation
// This test uses the Vertex AI SDK with a service account

import dotenv from 'dotenv';
import { VertexAI } from '@google-cloud/vertexai';

// Load environment variables
dotenv.config();

// Configuration
const CONFIG = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
  model: 'gemini-2.0-flash',
  prompt: 'Write a short poem about energy-efficient windows',
  // Service account credentials are loaded from GOOGLE_APPLICATION_CREDENTIALS
};

async function testServiceAccountTextGeneration() {
  console.log('=== Testing Service Account Text Generation ===');
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('❌ GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
    console.log('Please set it to the path of your service account key file');
    process.exit(1);
  }

  try {
    console.log('\n1. Initializing Vertex AI...');
    const vertexAI = new VertexAI({
      project: CONFIG.projectId,
      location: CONFIG.location,
    });
    
    console.log('2. Loading model...');
    const generativeModel = vertexAI.getGenerativeModel({
      model: CONFIG.model,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
      },
    });
    
    console.log(`3. Generating text with prompt: "${CONFIG.prompt}"`);
    const result = await generativeModel.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: CONFIG.prompt }]
      }]
    });
    
    console.log('\n✅ Success! Generated text:');
    const response = result.response;
    console.log(JSON.stringify(response, null, 2));
    
    return { success: true, response };
  } catch (error) {
    console.error('\n❌ Error in Service Account Text Generation:');
    console.error(error);
    return { success: false, error: error.message };
  }
}

// Run the test
testServiceAccountTextGeneration()
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
