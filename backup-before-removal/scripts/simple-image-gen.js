// Simple Image Generation Script - Single Request
import { GoogleGenAI } from '@google/genai';
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
  location: 'us-central1', // Try a different region
  model: 'imagen-3.0-fast-generate-001',
  outputDir: path.join(__dirname, '..', 'generated-images')
};

async function generateSingleImage() {
  console.log('=== Simple Image Generation ===');
  console.log('Project:', CONFIG.project);
  console.log('Location:', CONFIG.location);
  console.log('Model:', CONFIG.model);
  
  try {
    // Ensure output directory exists
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    // Initialize client
    console.log('Initializing Vertex AI client...');
    const ai = new GoogleGenAI({
      vertexai: true,
      project: CONFIG.project,
      location: CONFIG.location,
    });
    
    // Generate image
    console.log('Sending request to generate image...');
    const prompt = 'A modern double-hung window with white vinyl frame, installed in a contemporary home';
    
    const response = await ai.models.generateContent({
      model: CONFIG.model,
      contents: prompt,
    });
    
    console.log('Response received!');
    
    // Save image
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `simple-image-${timestamp}.png`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    // Try to extract image data
    let imageData = null;
    
    if (response.response) {
      console.log('Found response.response property');
      const parts = response.response.candidates?.[0]?.content?.parts;
      if (parts && parts.length > 0) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            imageData = part.inlineData.data;
            break;
          }
        }
      }
    }
    
    if (imageData) {
      await fs.writeFile(filepath, imageData, 'base64');
      console.log(`Image saved to: ${filepath}`);
    } else {
      console.log('No image data found in response');
      console.log('Response structure:', JSON.stringify(response, null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.message.includes('RESOURCE_EXHAUSTED')) {
      console.error('Quota exceeded. Please try again later or request a quota increase.');
    }
  }
}

// Run the function
generateSingleImage();
