/**
 * Vertex AI Fast Image Generation Test
 * 
 * This script tests the imagen-3.0-fast-generate model specifically
 * for quick image generation testing.
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for fast model
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001', // Using fast model
  outputDir: path.join(__dirname, '..', 'generated-images', 'fast-test'),
};

console.log('🚀 Testing Vertex AI with imagen-3.0-fast-generate model');
console.log(`📍 Project: ${CONFIG.project}`);
console.log(`📍 Location: ${CONFIG.location}`);
console.log(`📍 Model: ${CONFIG.model}`);

async function testFastImageGeneration() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${CONFIG.outputDir}`);
    }

    // Initialize client with service account
    console.log('🔧 Initializing Vertex AI client...');
    
    const client = new GoogleGenAI({
      vertexai: true,
      project: CONFIG.project,
      location: CONFIG.location,
    });

    console.log('✅ Client initialized successfully');

    // Test prompt
    const prompt = "Modern white double-hung windows on a contemporary home exterior, professional architectural photography";
    
    console.log(`🎨 Generating image with prompt: "${prompt}"`);
    console.log(`⏱️  Using fast model: ${CONFIG.model}`);

    // Generate image
    const model = client.getGenerativeModel({
      model: CONFIG.model,
    });

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt
        }]
      }]
    });

    const response = await result.response;
    console.log('📦 Received response from Vertex AI');

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('No image candidates returned');
    }

    const imageData = response.candidates[0].content.parts[0];
    
    if (!imageData || !imageData.inlineData) {
      throw new Error('No image data in response');
    }

    // Save the image
    const filename = `fast-test-${Date.now()}.png`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    const imageBuffer = Buffer.from(imageData.inlineData.data, 'base64');
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log(`✅ SUCCESS: Image saved to ${filename}`);
    console.log(`📁 Full path: ${filepath}`);
    console.log(`📊 Image size: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
    
    return {
      success: true,
      filename,
      filepath,
      size: imageBuffer.length
    };
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('📋 Stack trace:', error.stack);
    
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the test
testFastImageGeneration()
  .then(result => {
    if (result.success) {
      console.log('\n🎯 FAST MODEL TEST: SUCCESS');
      console.log('✅ imagen-3.0-fast-generate is working properly');
    } else {
      console.log('\n💥 FAST MODEL TEST: FAILED');
      console.log('❌ Need to investigate further');
    }
  })
  .catch(error => {
    console.error('\n💥 FATAL ERROR:', error.message);
    process.exit(1);
  });
