// Test script for Vertex AI Image Generation
import { VertexAI } from '@google-cloud/vertexai';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Configuration
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  outputDir: path.join(__dirname, '..', 'generated-images'),
};

// Test prompt
const TEST_PROMPT = 'A modern double-hung window with white vinyl frame, installed in a contemporary home';

/**
 * Initialize Vertex AI client
 */
function initializeClient() {
  if (!CONFIG.project) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not set');
  }

  console.log('Initializing Vertex AI client...');
  console.log(`Project: ${CONFIG.project}`);
  console.log(`Location: ${CONFIG.location}`);
  console.log(`Model: ${CONFIG.model}`);

  return new VertexAI({
    project: CONFIG.project,
    location: CONFIG.location,
  });
}

/**
 * Generate an image using Vertex AI
 */
async function generateImage() {
  console.log('\n=== Starting Image Generation Test ===');
  console.log(`Prompt: "${TEST_PROMPT}"`);
  
  try {
    const vertexAI = initializeClient();
    
    // Get the generative model
    const model = vertexAI.preview.getGenerativeModel({
      model: CONFIG.model,
      generationConfig: {
        sampleCount: 1,
      },
    });

    console.log('Sending request to Vertex AI...');
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: TEST_PROMPT
        }]
      }]
    });

    const response = await result.response;
    const imageData = response.candidates[0].content.parts[0];
    
    // Save the image
    await saveImage(imageData);
    
    console.log('Image generated successfully!');
    return true;
    
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * Save the generated image
 */
async function saveImage(imageData) {
  try {
    // Ensure output directory exists
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `generated-image-${timestamp}.png`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    // Handle different response formats
    if (imageData.inlineData) {
      await fs.writeFile(filepath, imageData.inlineData.data, 'base64');
    } else if (imageData.fileData) {
      // If the response contains a file URI
      const response = await fetch(imageData.fileData.fileUri);
      const buffer = await response.arrayBuffer();
      await fs.writeFile(filepath, Buffer.from(buffer));
    } else {
      throw new Error('Unsupported image data format');
    }
    
    console.log(`Image saved to: ${filepath}`);
    return filepath;
    
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}

// Run the test
console.log('=== Vertex AI Image Generation Test ===');
generateImage()
  .then(() => console.log('Test completed successfully'))
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
