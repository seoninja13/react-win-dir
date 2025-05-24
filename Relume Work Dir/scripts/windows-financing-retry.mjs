/**
 * Windows Page - Retry Failed Financing Image
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

console.log('🔄 Retrying Failed Windows Financing Image');

// Configuration
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  endpoint: `https://us-west1-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/us-west1/publishers/google/models/imagen-3.0-fast-generate-001:predict`,
  outputDir: path.join(__dirname, '..', 'public', 'images', 'windows'),
  maxRetries: 3,
  retryDelay: 5000,
};

// Initialize Google Auth
async function initializeAuth() {
  try {
    const auth = new GoogleAuth({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    
    const accessToken = await auth.getAccessToken();
    console.log('✅ Google Cloud authentication successful');
    return accessToken;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    throw error;
  }
}

// Generate financing image
async function generateFinancingImage() {
  try {
    const accessToken = await initializeAuth();
    
    const imageConfig = {
      component: 'Layout101',
      filename: 'windows-financing-options.png',
      prompt: 'Professional photograph of a beautiful modern home interior with new energy-efficient windows, bright natural lighting, comfortable family living space, financing and home improvement concept, high quality interior photography',
      alt: 'Beautiful home interior with financing options for new windows'
    };

    for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
      try {
        console.log(`🎨 Generating: ${imageConfig.filename} (attempt ${attempt}/${CONFIG.maxRetries})`);
        
        const requestBody = {
          instances: [{
            prompt: imageConfig.prompt
          }],
          parameters: {
            sampleCount: 1,
            aspectRatio: "16:9",
            safetyFilterLevel: "block_some",
            personGeneration: "allow_adult"
          }
        };

        const response = await fetch(CONFIG.endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        if (!data.predictions || !data.predictions[0] || !data.predictions[0].bytesBase64Encoded) {
          throw new Error('Invalid response format from Imagen API');
        }

        // Save image
        const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
        const outputPath = path.join(CONFIG.outputDir, imageConfig.filename);
        fs.writeFileSync(outputPath, imageBuffer);
        
        const fileSizeKB = Math.round(imageBuffer.length / 1024);
        console.log(`✅ Success: ${imageConfig.filename} (${fileSizeKB} KB)`);
        
        return true;

      } catch (error) {
        console.log(`❌ Attempt ${attempt} failed: ${error.message}`);
        
        if (attempt < CONFIG.maxRetries) {
          console.log(`⏳ Retrying in ${CONFIG.retryDelay/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
        }
      }
    }
    
    console.log('❌ All retry attempts failed');
    return false;

  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    return false;
  }
}

// Run the retry
generateFinancingImage().then(success => {
  if (success) {
    console.log('🎉 Financing image generated successfully!');
  } else {
    console.log('⚠️ Financing image generation failed - will skip for now');
  }
});
