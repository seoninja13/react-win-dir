/**
 * Generate Missing CTA Image for Home Page
 * Quick script to generate the missing Cta1 component image
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎯 Generating Missing CTA Image...');

// Missing image configuration
const CTA_IMAGE = {
  component: 'Cta1',
  filename: 'home-cta-estimate.png',
  prompt: 'Professional photograph of beautiful home exterior with new windows and doors, call-to-action style, welcoming entrance, architectural photography, high quality, bright natural lighting, premium home improvement',
  alt: 'Get your free estimate today - beautiful home transformation'
};

// Configuration (proven working setup)
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  endpoint: `https://us-west1-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/us-west1/publishers/google/models/imagen-3.0-fast-generate-001:predict`,
  outputDir: path.join(__dirname, '..', 'generated-images', 'home-page'),
  maxRetries: 3,
  retryDelay: 5000,
};

/**
 * Initialize Google Auth client
 */
async function initializeAuth() {
  console.log('🔧 Initializing Google Auth...');
  console.log(`📍 Project: ${CONFIG.project}`);
  console.log(`📍 Location: ${CONFIG.location}`);
  
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
  
  const authClient = await auth.getClient();
  const accessToken = await authClient.getAccessToken();
  
  console.log('✅ Authentication successful');
  return accessToken.token;
}

/**
 * Generate the missing CTA image
 */
async function generateCTAImage(accessToken) {
  const { filename, prompt, component, alt } = CTA_IMAGE;
  
  try {
    console.log(`🎨 Generating: ${filename}`);
    console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);
    
    // Prepare request body
    const requestBody = {
      instances: [{ prompt }],
      parameters: { sampleCount: 1 }
    };
    
    console.log('📡 Making HTTP request to Vertex AI...');
    
    const response = await fetch(CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const responseData = await response.json();
    console.log('✅ Response received');
    
    // Parse response
    if (!responseData.predictions || responseData.predictions.length === 0) {
      throw new Error('No predictions in response');
    }
    
    const prediction = responseData.predictions[0];
    if (!prediction.bytesBase64Encoded) {
      throw new Error('No bytesBase64Encoded in prediction');
    }
    
    // Save the image
    const filepath = path.join(CONFIG.outputDir, filename);
    const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log(`✅ Success: ${filename} saved (${(imageBuffer.length/1024).toFixed(1)}KB)`);
    
    return {
      success: true,
      filename,
      component,
      size: Math.round(imageBuffer.length / 1024),
      alt
    };
    
  } catch (error) {
    console.log(`❌ Failed to generate ${filename}: ${error.message}`);
    return {
      success: false,
      filename,
      component,
      error: error.message
    };
  }
}

async function main() {
  try {
    console.log('🚀 Starting Missing CTA Image Generation');
    console.log(`💰 Cost: $0.04`);
    console.log(`⏱️ Estimated time: ~3 seconds\n`);
    
    const accessToken = await initializeAuth();
    const result = await generateCTAImage(accessToken);
    
    console.log('\n📊 MISSING CTA IMAGE GENERATION SUMMARY');
    console.log('======================================');
    
    if (result.success) {
      console.log(`✅ Success: ${result.filename} (${result.component}) - ${result.size} KB`);
      console.log('🎯 READY TO UPDATE: Update Cta1 component with new image');
    } else {
      console.log(`❌ Failed: ${result.filename} (${result.component}) - ${result.error}`);
    }
    
    console.log('\n🎉 Missing CTA image generation complete!');
    
  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

// Run the function
main();
