/**
 * Generate Image using Vertex AI Imagen
 * 
 * This script makes an actual API call to Vertex AI's Imagen model
 * to generate an image from a text prompt.
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { VertexAI } from '@google-cloud/vertexai';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config({ path: new URL('../.env.local', import.meta.url) });

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  location: 'us-central1',
  model: 'imagegeneration@002',  // Imagen model
  outputDir: path.join(__dirname, '..', 'generated-images'),
  prompt: 'A modern, energy-efficient window in a beautiful home setting, natural lighting, high quality, photorealistic',
};

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

/**
 * Generate image using Vertex AI Imagen
 */
async function generateImage() {
  console.log('Initializing Vertex AI...');
  
  try {
    // Initialize Vertex AI
    const vertex = new VertexAI({
      project: CONFIG.projectId,
      location: CONFIG.location,
    });

    console.log('Generating image with prompt:', CONFIG.prompt);
    
    // Generate image
    const result = await vertex.preview.getGenerativeModel({
      model: CONFIG.model,
    }).generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: CONFIG.prompt
        }]
      }]
    });

    // Get the image data
    const response = await result.response;
    const imageData = response.candidates[0].content.parts[0].inlineData.data;
    
    // Save the image
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const outputPath = path.join(CONFIG.outputDir, `generated-image-${timestamp}.png`);
    
    // Convert base64 to buffer and save
    const imageBuffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(outputPath, imageBuffer);
    
    console.log(`✅ Image generated successfully: ${outputPath}`);
    console.log(`Prompt: "${CONFIG.prompt}"`);
    
  } catch (error) {
    console.error('❌ Error generating image:');
    console.error(error);
    
    // More detailed error handling
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error details:', error.message);
    }
    
    process.exit(1);
  }
}

// Run the image generation
generateImage().catch(console.error);

export {}; // This file is a module
