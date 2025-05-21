/**
 * Test Script for Vertex AI with Service Account Authentication
 * 
 * This script demonstrates how to authenticate with Vertex AI using a service account key file
 * and make a simple API call to test the connection.
 */

const fs = require('fs');
const { google } = require('google-auth-library');
const https = require('https');

// Configuration
const CONFIG = {
  // Path to your service account key file
  SERVICE_ACCOUNT_KEY_PATH: process.env.GOOGLE_APPLICATION_CREDENTIALS || './service-account-key.json',
  
  // Project configuration
  PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  LOCATION: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
  
  // Model to use
  MODEL_ID: 'gemini-2.0-flash',
  
  // Test prompt
  TEST_PROMPT: 'Generate a short description of energy-efficient windows.'
};

/**
 * Get an authentication token using a service account key file
 */
async function getAuthToken() {
  try {
    console.log('Authenticating with service account...');
    
    // Read the service account key file
    const keyFile = JSON.parse(fs.readFileSync(CONFIG.SERVICE_ACCOUNT_KEY_PATH, 'utf8'));
    
    // Create a JWT client
    const client = new google.auth.JWT(
      keyFile.client_email,
      null,
      keyFile.private_key,
      ['https://www.googleapis.com/auth/cloud-platform']
    );
    
    // Get the access token
    const tokens = await client.authorize();
    console.log('Successfully authenticated with service account');
    
    return tokens.access_token;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw error;
  }
}

/**
 * Make a request to the Vertex AI API
 */
async function makeRequest(url, method, headers = {}, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    console.log(`Sending ${method} request to: ${url}`);
    
    const req = https.request(url, options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = responseData ? JSON.parse(responseData) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsedData);
          } else {
            const error = new Error(`Request failed with status code ${res.statusCode}`);
            error.response = parsedData;
            reject(error);
          }
        } catch (error) {
          error.response = responseData;
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Test the Vertex AI connection by making a simple text generation request
 */
async function testVertexAIConnection() {
  try {
    console.log('=== Testing Vertex AI Connection ===');
    
    // Get authentication token
    const token = await getAuthToken();
    
    // Prepare the API endpoint
    const endpoint = `https://${CONFIG.LOCATION}-aiplatform.googleapis.com/v1/projects/${CONFIG.PROJECT_ID}/locations/${CONFIG.LOCATION}/publishers/google/models/${CONFIG.MODEL_ID}:generateContent`;
    
    // Prepare the request data
    const requestData = {
      contents: [{
        role: 'user',
        parts: [{ text: CONFIG.TEST_PROMPT }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.8,
        topK: 40
      }
    };
    
    console.log('\nSending request to Vertex AI...');
    console.log(`Model: ${CONFIG.MODEL_ID}`);
    console.log(`Prompt: "${CONFIG.TEST_PROMPT}"`);
    
    // Make the API request
    const response = await makeRequest(
      endpoint,
      'POST',
      { 'Authorization': `Bearer ${token}` },
      requestData
    );
    
    // Process the response
    console.log('\n=== Response ===');
    if (response.candidates && response.candidates.length > 0) {
      const content = response.candidates[0].content;
      if (content && content.parts && content.parts.length > 0) {
        console.log('Generated text:');
        console.log(content.parts[0].text);
      } else {
        console.log('No content parts found in response');
      }
    } else {
      console.log('No candidates found in response');
    }
    
    console.log('\n=== Raw Response ===');
    console.log(JSON.stringify(response, null, 2));
    
    console.log('\n✅ Vertex AI connection test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Vertex AI connection test failed:');
    console.error(error.message);
    
    if (error.response) {
      console.error('\nError details:');
      console.error(JSON.stringify(error.response, null, 2));
    }
    
    process.exit(1);
  }
}

// Run the test
testVertexAIConnection();
