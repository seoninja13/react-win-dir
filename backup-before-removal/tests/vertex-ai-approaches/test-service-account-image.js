// Test 4: Service Account Approach - Image Generation
// This test uses the Vertex AI SDK with a service account for image generation

import dotenv from 'dotenv';
import { VertexAI } from '@google-cloud/vertexai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Configuration
const CONFIG = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  location: 'us-west1',
  model: 'imagen-3.0-capability',
  prompt: 'A modern, energy-efficient window with wooden frame',
  outputDir: path.join(__dirname, 'output'),
  outputFile: 'generated-image.png',
  // Service account credentials are loaded from GOOGLE_APPLICATION_CREDENTIALS
};

async function testServiceAccountImageGeneration() {
  console.log('=== Testing Service Account Image Generation ===');
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('❌ GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
    console.log('Please set it to the path of your service account key file');
    process.exit(1);
  }

  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    console.log('\n1. Initializing Vertex AI...');
    
    // Initialize the Vertex AI client with the correct endpoint
    const vertexAI = new VertexAI({
      project: CONFIG.projectId,
      location: CONFIG.location,
      apiEndpoint: `${CONFIG.location}-aiplatform.googleapis.com`
    });
    
    console.log('2. Initializing image generation model...');
    
    console.log(`3. Generating image with prompt: "${CONFIG.prompt}"`);
    
    // Initialize the model
    const generativeVisionModel = vertexAI.preview.getGenerativeModel({
      model: CONFIG.model,
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });
    
    try {
      // Generate the image
      const result = await generativeVisionModel.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: CONFIG.prompt,
          }],
        }],
      });
      
      // Process the response
      if (result.response && result.response.candidates && result.response.candidates[0].content.parts[0].text) {
        const imageData = result.response.candidates[0].content.parts[0].text;
        const imageBuffer = Buffer.from(imageData, 'base64');
        
        // Save the image
        await fs.writeFile(path.join(CONFIG.outputDir, CONFIG.outputFile), imageBuffer);
        console.log(`✅ Image generated and saved to: ${path.join(CONFIG.outputDir, CONFIG.outputFile)}`);
      } else {
        console.error('❌ No image data received in the response');
        console.error('Response:', JSON.stringify(result, null, 2));
      }
    } catch (error) {
      console.error('\n❌ Error in Service Account Image Generation:');
      console.error(error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error('\n❌ Error in Service Account Image Generation:');
    console.error(error);
    return { success: false, error: error.message };
  }
}

// Run the test
testServiceAccountImageGeneration()
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
