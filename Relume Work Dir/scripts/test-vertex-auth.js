/**
 * Simple Vertex AI Authentication Test
 * Uses the provided service account email to test Vertex AI access
 */

const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  serviceAccountEmail: '994200435445-compute@developer.gserviceaccount.com',
  projectId: 'mold-removal-lead-gen',
  location: 'us-central1',
  modelId: 'gemini-1.0-pro',
  keyFile: path.join(__dirname, 'service-account-key.json')
};

async function testAuth() {
  try {
    console.log('=== Testing Vertex AI Authentication ===');
    console.log(`Service Account: ${CONFIG.serviceAccountEmail}`);
    console.log(`Project: ${CONFIG.projectId}`);
    
    // Initialize auth client
    const auth = new GoogleAuth({
      keyFile: CONFIG.keyFile,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });

    // Get authentication client
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    
    console.log('✅ Successfully authenticated with service account');
    console.log('Access token obtained successfully');
    
    // Test Vertex AI endpoint
    const endpoint = `https://${CONFIG.location}-aiplatform.googleapis.com/v1/projects/${CONFIG.projectId}/locations/${CONFIG.location}/publishers/google/models/${CONFIG.modelId}:predict`;
    
    console.log('\nTesting Vertex AI endpoint...');
    console.log(`Endpoint: ${endpoint}`);
    
    const response = await client.request({
      url: endpoint,
      method: 'POST',
      data: {
        instances: [
          { 
            prompt: 'Generate a short description of energy-efficient windows.'
          }
        ],
        parameters: {
          temperature: 0.7,
          maxOutputTokens: 100
        }
      }
    });
    
    console.log('\n✅ Vertex AI API Response:');
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('\n❌ Authentication or API call failed:');
    console.error(error.message);
    
    if (error.response) {
      console.error('\nError details:');
      console.error(JSON.stringify({
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      }, null, 2));
    }
    
    process.exit(1);
  }
}

// Run the test
testAuth();
