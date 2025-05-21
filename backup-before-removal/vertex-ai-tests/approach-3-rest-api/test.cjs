/**
 * Vertex AI Text Generation Test - Approach 3
 * 
 * This script tests the connection to Google's Vertex AI using direct REST API calls
 * for text generation with the Gemini model.
 */

const { execSync } = require('child_process');
const https = require('https');

// Project and location
const PROJECT_ID = 'mold-removal-lead-gen';
const LOCATION = 'us-central1'; // Primary region for Vertex AI

/**
 * Get access token using gcloud CLI
 */
function getAccessToken() {
  try {
    console.log('Getting access token from gcloud CLI...');
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
    return token;
  } catch (error) {
    console.error('Error getting access token:', error.message);
    throw new Error('Failed to get access token. Make sure you are authenticated with gcloud CLI.');
  }
}

/**
 * Make a request to the Vertex AI REST API
 */
function makeRequest(url, method, headers, data) {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: headers,
    };

    const req = https.request(url, options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData);
          } catch (error) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Generate text using Vertex AI REST API
 */
async function generateText(prompt) {
  try {
    console.log(`Generating text with prompt: "${prompt}"`);
    
    // Get access token
    const accessToken = getAccessToken();
    
    // Prepare request
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/gemini-1.0-pro:predict`;
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    
    const data = {
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        temperature: 0.2,
        maxOutputTokens: 256,
        topK: 40,
        topP: 0.95
      }
    };
    
    console.log('\nSending request to Vertex AI...');
    
    // Make the API request
    const response = await makeRequest(url, 'POST', headers, data);
    
    return response;
  } catch (error) {
    console.error('Error generating text:', error.message);
    throw error;
  }
}

/**
 * Run the test
 */
async function run() {
  console.log('=== Testing Text Generation with Vertex AI REST API ===');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  
  try {
    // Try text generation
    console.log('\nTesting text generation...');
    const prompt = "Write a short paragraph about energy-efficient windows.";
    
    console.log(`\nPrompt: "${prompt}"`);
    
    const response = await generateText(prompt);
    
    console.log('\n=== Response Object ===');
    console.log(JSON.stringify(response, null, 2));
    
    // Extract the generated text
    if (response && response.predictions && response.predictions.length > 0) {
      const generatedText = response.predictions[0].content;
      
      console.log('\n=== Generated Text ===');
      console.log(generatedText);
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
