/**
 * Generate Image using @google/genai with Vertex AI Imagen
 * 
 * This script uses the @google/genai package to generate an image
 * using Vertex AI's Imagen model.
 */

import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configure dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Configuration
const CONFIG = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen',
  location: 'us-central1',
  model: 'imagen-3.0-generate-002',
  outputDir: path.join(__dirname, '..', 'generated-images'),
  prompt: 'A modern, energy-efficient window in a beautiful home setting, natural lighting, high quality, photorealistic',
};

// Ensure output directory exists
async function ensureOutputDir() {
  try {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Generate image using Vertex AI Imagen via @google/genai
 */
async function generateImage() {
  console.log('Initializing Google Generative AI client...');
  
  try {
    // Initialize the client
    const genAI = new GoogleGenAI({
      // The Gemini API doesn't require an API key when using Vertex AI
      // The client will automatically use Application Default Credentials
    });

    // Initialize the model with Vertex AI configuration
    const model = genAI.getGenerativeModel({
      model: CONFIG.model,
      // Vertex AI configuration
      project: CONFIG.projectId,
      location: CONFIG.location,
    });

    console.log(`Generating image with prompt: "${CONFIG.prompt}"`);
    
    // Generate the image
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: CONFIG.prompt
        }]
      }]
    });

    // Get the response
    const response = result.response;
    
    if (!response.candidates || !response.candidates[0]?.content?.parts?.[0]?.inlineData?.data) {
      console.error('Unexpected response format:', JSON.stringify(response, null, 2));
      throw new Error('Unexpected response format from the API');
    }

    // Get the image data
    const imageData = response.candidates[0].content.parts[0].inlineData.data;
    
    // Ensure output directory exists
    await ensureOutputDir();
    
    // Save the image
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const outputPath = path.join(CONFIG.outputDir, `generated-image-${timestamp}.png`);
    
    // Convert base64 to buffer and save
    const imageBuffer = Buffer.from(imageData, 'base64');
    await fs.writeFile(outputPath, imageBuffer);
    
    console.log(`✅ Image generated successfully: ${outputPath}`);
    console.log(`Prompt: "${CONFIG.prompt}"`);
    
  } catch (error) {
    console.error('❌ Error generating image:');
    console.error(error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    process.exit(1);
  }
}

// Run the image generation
generateImage().catch(console.error);
