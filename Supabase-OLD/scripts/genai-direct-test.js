/**
 * Google GenAI Direct Test
 * 
 * This script tests the Google GenAI SDK using the exact same pattern
 * as the existing implementation in vertex-ai-client.ts
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
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-west1';
const GOOGLE_GENAI_USE_VERTEXAI = process.env.GOOGLE_GENAI_USE_VERTEXAI === 'true';
const OUTPUT_DIR = path.resolve(__dirname, '../../Docs/Image generation/test-output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Initialize the Google Generative AI client
 * 
 * This function initializes the Google Generative AI client based on the environment variables.
 * If GOOGLE_GENAI_USE_VERTEXAI is true, it will use Vertex AI, otherwise it will use the Gemini API.
 * 
 * @returns The Google Generative AI client
 */
function initializeGenAIClient() {
  console.log('Initializing Google GenAI client...');
  
  // Force API key authentication only, regardless of environment variables
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  
  console.log('Using API key authentication');
  return new GoogleGenAI({
    apiKey: GEMINI_API_KEY
  });
}

/**
 * Generate content using the Google Generative AI SDK
 * 
 * @param prompt - The text prompt to generate content from
 * @param model - The model to use
 * @returns The generated content
 */
async function generateContent(prompt, model = 'gemini-1.5-pro') {
  console.log(`Generating content with model: ${model}`);
  console.log(`Prompt: "${prompt}"`);
  
  try {
    const ai = initializeGenAIClient();
    
    console.log('Sending request to generate content...');
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    console.log('Content generation successful!');
    return response.text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

/**
 * Generate an image using the Google Generative AI SDK
 * 
 * @param prompt - The text prompt to generate an image from
 * @param model - The model to use
 * @returns The generated image data
 */
async function generateImage(prompt, model = 'imagen-3.0-generate-002') {
  console.log(`Generating image with model: ${model}`);
  console.log(`Prompt: "${prompt}"`);
  
  try {
    const ai = initializeGenAIClient();
    
    console.log('Sending request to generate image...');
    
    // For image generation, we need to use the generateImages method
    // This is different from the text generation approach
    const response = await ai.models.generateImages({
      model,
      prompt,
      sampleCount: 1,
      aspectRatio: '4:3',
    });
    
    console.log('Image generation successful!');
    
    if (!response || !response.images || response.images.length === 0) {
      throw new Error('No images were generated');
    }
    
    // Get the first image
    const imageData = response.images[0];
    const imageUrl = `data:image/png;base64,${imageData.base64}`;
    const enhancedPrompt = response.promptFeedback?.enhancedPrompt;
    
    return {
      imageUrl,
      enhancedPrompt,
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * Main test function
 */
async function main() {
  console.log('Testing Google GenAI SDK direct implementation...');
  
  try {
    // Test text generation
    console.log('\n--- Testing Text Generation ---\n');
    const textPrompt = 'Write a short description of a beautiful window installation.';
    const text = await generateContent(textPrompt);
    
    console.log('Generated text:');
    console.log(text);
    
    // Save the text
    const textPath = path.resolve(OUTPUT_DIR, 'generated-text.txt');
    fs.writeFileSync(textPath, text);
    console.log(`Text saved to: ${textPath}`);
    
    // Test image generation
    console.log('\n--- Testing Image Generation ---\n');
    const imagePrompt = 'A beautiful double-hung window with white frame against a blue sky, photorealistic';
    
    try {
      const { imageUrl, enhancedPrompt } = await generateImage(imagePrompt);
      
      // Extract base64 data from data URL
      const base64Data = imageUrl.split(',')[1];
      
      // Save the image
      const imagePath = path.resolve(OUTPUT_DIR, 'direct-test.png');
      fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));
      console.log(`Image saved to: ${imagePath}`);
      
      // Save enhanced prompt if available
      if (enhancedPrompt) {
        console.log(`Enhanced prompt: ${enhancedPrompt}`);
        fs.writeFileSync(
          path.resolve(OUTPUT_DIR, 'enhanced-prompt.txt'),
          enhancedPrompt
        );
      }
    } catch (imageError) {
      console.error('Image generation failed:', imageError.message);
    }
    
    return true;
  } catch (error) {
    console.error('Test failed:', error);
    return false;
  }
}

// Run the test
main()
  .then(success => {
    if (success) {
      console.log('\nScript completed successfully!');
      process.exit(0);
    } else {
      console.error('\nScript failed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
