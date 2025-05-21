/**
 * Vertex AI API Test
 * 
 * This script tests connectivity to Vertex AI using the REST API directly
 * and the application default credentials from your environment.
 */

// Import required modules
const { execSync } = require('child_process');
const https = require('https');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';

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
 * List available models in Vertex AI
 */
async function listPublisherModels() {
  try {
    console.log(`Listing available publisher models in Vertex AI (${LOCATION})...`);
    
    const accessToken = getAccessToken();
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models`;
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    
    const response = await makeRequest(url, 'GET', headers);
    return response;
  } catch (error) {
    console.error('Error listing publisher models:', error.message);
    throw error;
  }
}

/**
 * List available locations for Vertex AI
 */
async function listLocations() {
  try {
    console.log('Listing available locations for Vertex AI...');
    
    const accessToken = getAccessToken();
    const url = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations`;
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    
    const response = await makeRequest(url, 'GET', headers);
    return response;
  } catch (error) {
    console.error('Error listing locations:', error.message);
    throw error;
  }
}

/**
 * Check Vertex AI API status
 */
async function checkApiStatus() {
  try {
    console.log(`Checking Vertex AI API status for project ${PROJECT_ID}...`);
    
    const accessToken = getAccessToken();
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}`;
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    
    const response = await makeRequest(url, 'GET', headers);
    return response;
  } catch (error) {
    console.error('Error checking API status:', error.message);
    throw error;
  }
}

/**
 * Run the test
 */
async function run() {
  console.log('=== Testing Vertex AI API Connectivity ===');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  
  try {
    // Check API status
    console.log('\n1. Checking API status...');
    const statusResponse = await checkApiStatus();
    console.log('API Status Response:');
    console.log(JSON.stringify(statusResponse, null, 2));
    
    // List available locations
    console.log('\n2. Listing available locations...');
    const locationsResponse = await listLocations();
    
    if (locationsResponse && locationsResponse.locations) {
      console.log(`Found ${locationsResponse.locations.length} available locations:`);
      locationsResponse.locations.forEach((location, index) => {
        console.log(`${index + 1}. ${location.locationId || location.name}`);
      });
    } else {
      console.log('No locations found or unexpected response format.');
      console.log(JSON.stringify(locationsResponse, null, 2));
    }
    
    // List available publisher models
    console.log(`\n3. Listing available publisher models in ${LOCATION}...`);
    const modelsResponse = await listPublisherModels();
    
    if (modelsResponse && modelsResponse.models) {
      console.log(`Found ${modelsResponse.models.length} available models:`);
      modelsResponse.models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.displayName || model.name}`);
      });
    } else {
      console.log('No models found or unexpected response format.');
      console.log(JSON.stringify(modelsResponse, null, 2));
    }
    
    console.log('\n✅ Vertex AI API connectivity test completed!');
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error(error.message);
    
    if (error.message.includes('403')) {
      console.log('\nPermission denied. Recommendations:');
      console.log('1. Ensure you have run: gcloud auth application-default login');
      console.log('2. Verify that your account has the necessary permissions');
      console.log('3. Check if the Vertex AI API is enabled: gcloud services enable aiplatform.googleapis.com');
    } else if (error.message.includes('404')) {
      console.log('\nResource not found. Recommendations:');
      console.log('1. Check if the Vertex AI API is enabled: gcloud services enable aiplatform.googleapis.com');
      console.log('2. Verify that the specified location is valid');
      console.log('3. Try a different location (us-central1 is recommended)');
    }
  }
}

// Run the test
run().catch(console.error);
