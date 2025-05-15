/**
 * Basic Imagen Test Script
 * 
 * This script tests the Google Vertex AI Imagen API with a single prompt
 * to verify that we can generate images before proceeding with the batch process.
 */

import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Initialize Vertex AI client
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});

// Test prompt
const TEST_PROMPT = "A photorealistic image of a modern two-story house with several large, white vinyl double-hung windows.";

/**
 * Generate an image using Vertex AI
 */
async function testImageGeneration() {
  console.log('Testing Vertex AI Imagen image generation...');
  console.log(`Using project: ${process.env.GOOGLE_CLOUD_PROJECT}`);
  console.log(`Using location: ${process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'}`);
  console.log(`Using prompt: "${TEST_PROMPT}"`);
  
  try {
    // Get the generative model
    const model = "imagen-3.0-fast-generate-001";
    console.log(`Using model: ${model}`);
    
    const generationModel = vertexAI.preview.getGenerativeModel({
      model,
    });
    
    // Generate content
    console.log('Sending request to Vertex AI...');
    
    const request = {
      contents: [
        {
          role: "user",
          parts: [{ text: TEST_PROMPT }]
        }
      ],
    };
    
    const response = await generationModel.generateContent(request);
    const fullResponse = await response.response;
    
    console.log('Response received from Vertex AI');
    console.log('Response structure:', JSON.stringify(fullResponse, null, 2));
    
    // Extract image data if available
    const parts = fullResponse.candidates[0].content.parts;
    let imageFound = false;
    
    for (const part of parts) {
      if (part.inlineData) {
        imageFound = true;
        console.log('Image data found in response');
        console.log('MIME type:', part.inlineData.mimeType);
        
        // Save the image to a file
        const imageData = part.inlineData.data;
        const outputPath = path.join(__dirname, '../test-data/test-image.png');
        
        fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
        console.log(`Image saved to: ${outputPath}`);
        break;
      }
    }
    
    if (!imageFound) {
      console.log('No image data found in the response');
    }
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error generating image:', error);
    if (error.details) {
      console.error('Error details:', error.details);
    }
  }
}

// Run the test
testImageGeneration();
