/**
 * Windows Page Image Generation - Batch 1 (5 images)
 * Generate the first 5 images for the Windows page components
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

console.log('🎯 Windows Page - Batch 1 (5 Images)');

// Batch 1: First 5 Windows page images
const WINDOWS_BATCH_1 = [
  {
    component: 'Header36',
    filename: 'windows-hero-main.png',
    prompt: 'Professional photograph of a beautiful Sacramento home exterior showcasing energy-efficient replacement windows, modern residential architecture, bright natural lighting, high quality architectural photography, welcoming home entrance',
    alt: 'Sacramento home with energy-efficient replacement windows'
  },
  {
    component: 'Layout6',
    filename: 'windows-energy-efficient-feature.png',
    prompt: 'Professional close-up photograph of energy-efficient window installation, detailed view of modern window frame and Low-E glass, technical photography style, high quality, premium window craftsmanship',
    alt: 'Energy-efficient window installation detail'
  },
  {
    component: 'Layout254',
    filename: 'windows-styles-showcase.png',
    prompt: 'Professional photograph showcasing various window styles including double-hung, sliding, casement, and bay windows, architectural photography, high quality, diverse window options display',
    alt: 'Diverse window styles showcase'
  },
  {
    component: 'Layout10',
    filename: 'windows-efficiency-technology.png',
    prompt: 'Professional photograph of advanced window technology features, Low-E glass and argon gas insulation, technical photography style, high quality, energy-saving window technology',
    alt: 'Advanced window energy efficiency technology'
  },
  {
    component: 'Layout254_1',
    filename: 'windows-customization-options.png',
    prompt: 'Professional photograph of window customization options including grid patterns, glass types, and frame colors, product photography style, high quality, window design choices',
    alt: 'Window customization and design options'
  }
];

// Configuration (proven working setup)
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  endpoint: `https://us-west1-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/us-west1/publishers/google/models/imagen-3.0-fast-generate-001:predict`,
  outputDir: path.join(__dirname, '..', 'public', 'images', 'windows'),
  delayBetweenRequests: 2000,
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

// Ensure output directory exists
function ensureOutputDirectory() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`📁 Created output directory: ${CONFIG.outputDir}`);
  }
}

// Generate single image with retries
async function generateImageWithRetries(accessToken, imageConfig) {
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
      
      return {
        success: true,
        filename: imageConfig.filename,
        component: imageConfig.component,
        size: fileSizeKB,
        path: outputPath
      };

    } catch (error) {
      console.log(`❌ Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt < CONFIG.maxRetries) {
        console.log(`⏳ Retrying in ${CONFIG.retryDelay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
      } else {
        return {
          success: false,
          filename: imageConfig.filename,
          component: imageConfig.component,
          error: error.message
        };
      }
    }
  }
}

// Main generation function
async function generateWindowsBatch1() {
  try {
    console.log('🚀 Starting Windows Page - Batch 1 Generation');
    console.log(`📊 Generating ${WINDOWS_BATCH_1.length} images with ${CONFIG.maxRetries} max retries each`);
    console.log(`🔗 Endpoint: ${CONFIG.endpoint}`);
    console.log(`💰 Estimated cost: $${(WINDOWS_BATCH_1.length * 0.04).toFixed(2)}`);
    console.log(`⏱️ Estimated time: ~${Math.ceil(WINDOWS_BATCH_1.length * 2.5 / 60)} minute(s)\n`);

    const accessToken = await initializeAuth();
    ensureOutputDirectory();

    const results = [];

    for (let i = 0; i < WINDOWS_BATCH_1.length; i++) {
      const imageConfig = WINDOWS_BATCH_1[i];

      console.log(`\n📋 Processing ${i + 1}/${WINDOWS_BATCH_1.length}: ${imageConfig.filename}`);
      console.log(`🎯 Component: ${imageConfig.component}`);

      const result = await generateImageWithRetries(accessToken, imageConfig);
      results.push(result);

      // Add delay between requests (except for last one)
      if (i < WINDOWS_BATCH_1.length - 1) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenRequests/1000} seconds before next request...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
      }
    }

    // Summary
    console.log('\n📊 WINDOWS BATCH 1 GENERATION SUMMARY');
    console.log('=====================================');

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Successful: ${successful.length}/${WINDOWS_BATCH_1.length}`);
    console.log(`❌ Failed: ${failed.length}/${WINDOWS_BATCH_1.length}`);
    console.log(`💰 Actual cost: $${(successful.length * 0.04).toFixed(2)}`);

    if (successful.length > 0) {
      console.log('\n✅ SUCCESSFUL IMAGES:');
      successful.forEach(result => {
        console.log(`  📸 ${result.filename} (${result.component}) - ${result.size} KB`);
      });
    }

    if (failed.length > 0) {
      console.log('\n❌ FAILED IMAGES:');
      failed.forEach(result => {
        console.log(`  ⚠️ ${result.filename} (${result.component}) - ${result.error}`);
      });
    }

    // Recommendation
    console.log('\n🎯 NEXT STEPS:');
    const successRate = successful.length / WINDOWS_BATCH_1.length;

    if (successRate >= 0.8) {
      console.log('✅ PROCEED: Update Windows page components with generated images');
      console.log('📝 Ready for Batch 2: Generate remaining Windows page images');
    } else if (successRate >= 0.4) {
      console.log('⚠️  MIXED RESULTS: Update successful images, retry failed ones');
    } else {
      console.log('❌ INVESTIGATE: Low success rate, check configuration');
    }

    console.log('\n🎉 Windows Batch 1 generation complete!');

  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the generation
generateWindowsBatch1();
