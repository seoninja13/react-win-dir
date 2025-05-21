/**
 * Test script for Vertex AI using direct REST API calls
 * 
 * This script tests the connection to Vertex AI using direct REST API calls
 * instead of the SDK, which might help bypass any module-related issues.
 */

import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const API_ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}`;

/**
 * Get access token using gcloud CLI
 * 
 * @returns {Promise<string>} - The access token
 */
async function getAccessToken() {
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
 * Generate text using Vertex AI REST API
 * 
 * @param {string} prompt - The text prompt to generate a response for
 * @returns {Promise<string>} - The generated text
 */
async function generateText(prompt) {
  try {
    console.log(`Generating text with prompt: "${prompt}"`);
    console.log(`Project: ${PROJECT_ID}`);
    console.log(`Location: ${LOCATION}`);
    
    // Get access token
    const accessToken = await getAccessToken();
    
    // Prepare request
    const url = `${API_ENDPOINT}/publishers/google/models/gemini-pro:predict`;
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
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
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    
    // Extract the generated text from the response
    if (result && result.predictions && result.predictions.length > 0) {
      return result.predictions[0].content;
    } else {
      throw new Error('No predictions found in the response');
    }
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}

/**
 * Test text generation with a simple prompt
 */
async function testTextGeneration() {
  try {
    console.log('=== Testing Vertex AI Text Generation via REST API ===\n');
    
    // Test with a simple question
    const prompt = 'Write a short paragraph about energy-efficient windows.';
    
    console.log(`Testing with prompt: "${prompt}"`);
    
    const response = await generateText(prompt);
    
    console.log('\n=== Generated Response ===');
    console.log(response);
    console.log('=========================\n');
    
    console.log('✅ Text generation test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Text generation test failed:');
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
testTextGeneration().catch(console.error);
