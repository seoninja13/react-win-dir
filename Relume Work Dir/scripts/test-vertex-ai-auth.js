/**
 * Test script to verify authentication with Google Cloud Vertex AI
 * 
 * This script tests the authentication with Vertex AI using Application Default Credentials (ADC)
 * as recommended in the documentation: https://cloud.google.com/vertex-ai/docs/authentication
 */

// Import required packages
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config({ path: '.env.local' });

// Environment variables
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = 'us-central1'; // Using the primary region for Vertex AI

/**
 * Test authentication with Vertex AI using Application Default Credentials
 */
async function testVertexAIAuthentication() {
  console.log('=== Testing Vertex AI Authentication ===');
  console.log(`Project: ${GOOGLE_CLOUD_PROJECT}`);
  console.log(`Location: ${GOOGLE_CLOUD_LOCATION}`);
  
  try {
    // Check if the GOOGLE_APPLICATION_CREDENTIALS environment variable is set
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    console.log(`GOOGLE_APPLICATION_CREDENTIALS: ${credentialsPath || 'Not set'}`);
    
    if (!credentialsPath) {
      console.log('\nNote: GOOGLE_APPLICATION_CREDENTIALS is not set.');
      console.log('Using Application Default Credentials (ADC) from gcloud CLI.');
      console.log('If this fails, you may need to run: gcloud auth application-default login');
    }
    
    // Initialize the Vertex AI client
    console.log('\nInitializing Vertex AI client...');
    const vertexAI = new VertexAI({
      project: GOOGLE_CLOUD_PROJECT,
      location: GOOGLE_CLOUD_LOCATION,
    });
    
    // List available models to test authentication
    console.log('\nListing available models to test authentication...');
    
    // We'll use a simple model check to verify authentication
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: 'gemini-pro',
    });
    
    // Make a simple request to test authentication
    const result = await generativeModel.countTokens({
      contents: [{ role: 'user', parts: [{ text: 'Hello, world!' }] }],
    });
    
    console.log('\nAuthentication successful!');
    console.log(`Token count: ${result.totalTokens}`);
    console.log('\n✅ Vertex AI authentication is working correctly.');
    
    return true;
  } catch (error) {
    console.error('\n❌ Authentication test failed:');
    console.error(error.message);
    
    if (error.message.includes('permission') || error.message.includes('credentials')) {
      console.log('\nThis appears to be an authentication issue. Try the following:');
      console.log('1. Run: gcloud auth application-default login');
      console.log('2. Set up a service account with the necessary permissions');
      console.log('3. Check if your project has the Vertex AI API enabled');
    }
    
    return false;
  }
}

/**
 * Main function to run the authentication test
 */
async function main() {
  try {
    await testVertexAIAuthentication();
  } catch (error) {
    console.error('Unhandled error:', error);
    process.exit(1);
  }
}

// Run the main function
main();
