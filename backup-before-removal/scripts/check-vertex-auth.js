/**
 * Simple script to check Vertex AI authentication
 */

const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config({ path: '.env.local' });

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = 'us-central1'; // Primary region for Vertex AI

async function checkAuth() {
  console.log('Checking Vertex AI authentication...');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  
  try {
    // Initialize the Vertex AI client
    console.log('\nInitializing Vertex AI client...');
    const vertexAI = new VertexAI({
      project: PROJECT_ID,
      location: LOCATION,
    });
    
    // List models to check authentication
    console.log('\nListing available models...');
    
    // We'll use a simple model check
    const modelName = 'gemini-pro';
    console.log(`Checking model: ${modelName}`);
    
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: modelName,
    });
    
    // Make a simple request
    const result = await generativeModel.countTokens({
      contents: [{ role: 'user', parts: [{ text: 'Hello, world!' }] }],
    });
    
    console.log('\n✅ Authentication successful!');
    console.log(`Token count: ${result.totalTokens}`);
    
  } catch (error) {
    console.error('\n❌ Authentication failed:');
    console.error(error.message);
    
    if (error.details) {
      console.error('\nError details:');
      console.error(JSON.stringify(error.details, null, 2));
    }
  }
}

checkAuth().catch(console.error);
