/**
 * Google GenAI SDK Test
 * 
 * This script tests the connection to Vertex AI using the Google GenAI SDK
 * that's already installed in the project.
 */

import { GoogleGenAI } from '@google/genai';
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
const API_KEY = process.env.GEMINI_API_KEY;
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Main test function
 */
async function main() {
  console.log('Testing Google GenAI SDK...');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  
  try {
    // Check if API key is available
    if (!API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    
    console.log('API key is available');
    
    // Initialize the client
    console.log('Initializing Google GenAI client...');
    
    // Create the client with either API key or Vertex AI configuration, not both
    let genAI;
    
    if (PROJECT_ID && process.env.GOOGLE_GENAI_USE_VERTEXAI === 'true') {
      console.log('Using Vertex AI configuration');
      genAI = new GoogleGenAI({
        vertexai: true,
        project: PROJECT_ID,
        location: LOCATION
      });
    } else {
      console.log('Using API key authentication');
      genAI = new GoogleGenAI({
        apiKey: API_KEY
      });
    }
    
    console.log('Client initialized successfully');
    console.log('Using Vertex AI:', PROJECT_ID ? 'Yes' : 'No');
    
    // Create a test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    
    // First test: Generate text content
    console.log('Testing text generation...');
    const textModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const textResult = await textModel.generateContent('Write a description of a beautiful window installation.');
    const textResponse = await textResult.response;
    const text = textResponse.text();
    
    console.log('Generated text:');
    console.log(text);
    
    // Save the text
    fs.writeFileSync(path.resolve(OUTPUT_DIR, 'generated-text.txt'), text);
    
    console.log('Text generation test completed successfully!');
    
    // Now test image generation
    console.log('Testing image generation...');
    
    try {
      // Use the imagen model for image generation
      const imageModel = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-002' });
      
      // Generate the image
      const imageResult = await imageModel.generateImages({
        prompt: testPrompt,
        sampleCount: 1,
        aspectRatio: '4:3'
      });
      
      if (imageResult && imageResult.images && imageResult.images.length > 0) {
        const imageData = imageResult.images[0].base64;
        
        // Save the image
        const outputPath = path.resolve(OUTPUT_DIR, 'genai-test.png');
        fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
        console.log(`Image saved to: ${outputPath}`);
        
        // Save enhanced prompt if available
        if (imageResult.promptFeedback?.enhancedPrompt) {
          console.log(`Enhanced prompt: ${imageResult.promptFeedback.enhancedPrompt}`);
          fs.writeFileSync(
            path.resolve(OUTPUT_DIR, 'enhanced-prompt.txt'),
            imageResult.promptFeedback.enhancedPrompt
          );
        }
        
        console.log('Image generation test completed successfully!');
      } else {
        console.log('No image data found in the response');
      }
    } catch (imageError) {
      console.log('Image generation test failed:', imageError.message);
      console.log('Error details:', imageError);
    }
    
    return true;
  } catch (error) {
    console.error('Test failed:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    return false;
  }
}

// Run the test
main()
  .then(success => {
    if (success) {
      console.log('Script completed successfully!');
      process.exit(0);
    } else {
      console.error('Script failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
