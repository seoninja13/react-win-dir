/**
 * Check Vertex AI Authentication
 * 
 * This script checks if we're properly authenticated with Google Cloud
 * and then attempts to use Vertex AI.
 */

import { VertexAI } from '@google-cloud/vertexai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Constants
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS;

console.log('Checking Vertex AI Authentication...');
console.log(`Project ID: ${PROJECT_ID}`);
console.log(`Location: ${LOCATION}`);
console.log(`Credentials Path: ${CREDENTIALS_PATH || 'Not set (using Application Default Credentials)'}`);

// Check if we have the necessary environment variables
if (!PROJECT_ID) {
  console.error('Error: GOOGLE_CLOUD_PROJECT environment variable is not set');
  process.exit(1);
}

// Check if credentials file exists if specified
if (CREDENTIALS_PATH && !fs.existsSync(CREDENTIALS_PATH)) {
  console.error(`Error: Credentials file not found at ${CREDENTIALS_PATH}`);
  process.exit(1);
}

// Initialize Vertex AI client
try {
  console.log('Initializing Vertex AI client...');
  
  const vertexAI = new VertexAI({
    project: PROJECT_ID,
    location: LOCATION,
  });
  
  console.log('Vertex AI client initialized successfully');
  
  // List available models
  console.log('Attempting to list available models...');
  
  // Use a simple prediction to test authentication
  const testGenerativeModel = async () => {
    try {
      // Get generative model
      const generativeModel = vertexAI.getGenerativeModel({
        model: 'gemini-1.5-pro-001',
      });
      
      console.log('Successfully created generative model instance');
      
      // Generate content
      const result = await generativeModel.generateContent('Hello, world!');
      const response = await result.response;
      const text = response.text();
      
      console.log('Successfully generated content:');
      console.log(text);
      
      return true;
    } catch (error) {
      console.error('Error testing generative model:', error.message);
      if (error.details) {
        console.error('Error details:', error.details);
      }
      return false;
    }
  };
  
  testGenerativeModel()
    .then(success => {
      if (success) {
        console.log('Authentication test completed successfully!');
      } else {
        console.error('Authentication test failed.');
      }
    })
    .catch(error => {
      console.error('Unhandled error during authentication test:', error);
    });
  
} catch (error) {
  console.error('Error initializing Vertex AI client:', error.message);
  process.exit(1);
}
