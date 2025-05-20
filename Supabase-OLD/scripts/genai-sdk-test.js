/**
 * Google Generative AI SDK Test
 * 
 * This script tests the connection to Vertex AI using the Google Generative AI SDK
 * following the official GitHub guide:
 * https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_genai_sdk.ipynb
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
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
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Main test function
 */
async function main() {
  console.log('Testing Google Generative AI SDK...');
  
  try {
    // Check if API key is available
    if (!API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    
    console.log('API key is available');
    
    // Initialize the client
    console.log('Initializing Google Generative AI client...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Create a test prompt
    const testPrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    
    // For image generation, we need to use the Imagen model
    console.log('Getting generative model...');
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 2048,
      },
    });
    
    // First test: Generate text content
    console.log('Testing text generation...');
    const prompt = 'Write a description of a beautiful window installation.';
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Generated text:');
    console.log(text);
    
    // Save the text
    fs.writeFileSync(path.resolve(OUTPUT_DIR, 'generated-text.txt'), text);
    
    console.log('Text generation test completed successfully!');
    
    // Now test image generation if available
    try {
      console.log('Testing image generation...');
      
      // Use the imagen model for image generation
      const imageModel = genAI.getGenerativeModel({ model: 'imagen-1.0-generation' });
      
      // Generate the image
      const imageResult = await imageModel.generateContent([testPrompt]);
      const imageResponse = await imageResult.response;
      
      // Process the response to extract the image
      const imageParts = imageResponse.candidates[0].content.parts;
      let imageData = null;
      
      for (const part of imageParts) {
        if (part.inlineData && part.inlineData.data) {
          imageData = part.inlineData.data;
          break;
        }
      }
      
      if (imageData) {
        // Save the image
        const outputPath = path.resolve(OUTPUT_DIR, 'genai-test.png');
        fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
        console.log(`Image saved to: ${outputPath}`);
        console.log('Image generation test completed successfully!');
      } else {
        console.log('No image data found in the response');
      }
    } catch (imageError) {
      console.log('Image generation test failed:', imageError.message);
      console.log('This might be expected if the model or your API key does not support image generation');
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
