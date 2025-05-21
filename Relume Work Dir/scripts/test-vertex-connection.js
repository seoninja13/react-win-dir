/**
 * Test Script for Vertex AI Connection
 * 
 * This script tests the connection to Vertex AI using the provided service account.
 * It will:
 * 1. Load the service account credentials
 * 2. Authenticate with Google Cloud
 * 3. Make a test API call to Vertex AI
 */

import { GoogleAuth } from 'google-auth-library';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../.env.local') });

// Configuration
const CONFIG = {
  // Project and model configuration
  PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  LOCATION: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
  MODEL_ID: 'gemini-2.0-flash',
  
  // Test prompt
  TEST_PROMPT: 'Generate a short description of energy-efficient windows.'
};

/**
 * Main function to test Vertex AI connection
 */
async function testVertexAIConnection() {
  try {
    console.log('=== Testing Vertex AI Connection ===');
    
    // 1. Initialize auth client with default credentials
    console.log('\n1. Initializing Google Auth client...');
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    
    // 2. Get authentication client
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    console.log(`✅ Authenticated with project: ${projectId}`);
    
    // 3. Get access token
    console.log('\n2. Getting access token...');
    const token = await client.getAccessToken();
    console.log('✅ Successfully obtained access token');
    
    // 4. Test Vertex AI endpoint
    console.log('\n3. Testing Vertex AI API...');
    const endpoint = `https://${CONFIG.LOCATION}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${CONFIG.LOCATION}/publishers/google/models/${CONFIG.MODEL_ID}:streamGenerateContent`;
    
    console.log(`   Endpoint: ${endpoint}`);
    console.log(`   Model: ${CONFIG.MODEL_ID}`);
    console.log(`   Prompt: "${CONFIG.TEST_PROMPT}\n`);
    
    // 5. Prepare the request data according to the Gemini API spec
    const requestData = {
      contents: [{
        role: 'user',
        parts: [{
          text: CONFIG.TEST_PROMPT
        }]
      }],
      generation_config: {
        temperature: 0.4,
        top_p: 0.95,
        top_k: 40,
        max_output_tokens: 2048,
      },
    };
    
    // 6. Make the API request
    console.log('Sending request to Vertex AI...\n');
    const response = await client.request({
      url: endpoint,
      method: 'POST',
      data: requestData,
      responseType: 'stream',
    });
    
    // 7. Process the streaming response
    console.log('=== Vertex AI Response ===\n');
    
    // Handle the streaming response
    let fullResponse = '';
    for await (const chunk of response.data) {
      const chunkStr = Buffer.from(chunk).toString('utf8');
      const lines = chunkStr.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.substring(6)); // Remove 'data: ' prefix
            if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
              const text = data.candidates[0].content.parts[0].text || '';
              process.stdout.write(text);
              fullResponse += text;
            }
          } catch (e) {
            // Ignore JSON parsing errors for non-data lines
            if (!line.includes('PING') && !line.includes('ping')) {
              console.error('Error parsing chunk:', e.message);
            }
          }
        }
      }
    }
    
    if (fullResponse.trim()) {
      console.log('\n\n✅ Vertex AI connection test completed successfully!');
    } else {
      console.log('\n❌ No valid response received from Vertex AI');
    }
    
  } catch (error) {
    console.error('\n❌ Error testing Vertex AI connection:');
    console.error(error.message);
    
    if (error.response) {
      console.error('\nError details:');
      try {
        const errorData = await error.response.data;
        console.error(JSON.stringify({
          status: error.response.status,
          statusText: error.response.statusText,
          data: errorData
        }, null, 2));
      } catch (e) {
        console.error('Could not parse error response:', e.message);
      }
    } else if (error.request) {
      console.error('No response received from server');
    }
    
    process.exit(1);
  }
}

// Run the test
testVertexAIConnection();
