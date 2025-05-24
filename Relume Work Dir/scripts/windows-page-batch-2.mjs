/**
 * Windows Page Image Generation - Batch 2 (10 images)
 * Generate the remaining 10 images for the Windows page components
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

console.log('🎯 Windows Page - Batch 2 (10 Images)');

// Batch 2: Remaining 10 Windows page images
const WINDOWS_BATCH_2 = [
  {
    component: 'Layout90',
    filename: 'windows-local-advantages.png',
    prompt: 'Professional photograph of Window World Sacramento storefront and team, local business exterior with professional staff, welcoming commercial photography, high quality, community-focused business',
    alt: 'Window World Sacramento local team and storefront'
  },
  {
    component: 'Layout101',
    filename: 'windows-financing-options.png',
    prompt: 'Professional photograph of happy family in their newly renovated home with beautiful windows, financing and affordability concept, bright interior photography, high quality, satisfied homeowners',
    alt: 'Family enjoying their new windows with financing options'
  },
  {
    component: 'Testimonial32-1',
    filename: 'windows-testimonial-avatar-1.png',
    prompt: 'Professional headshot of satisfied middle-aged male homeowner, friendly smile, business casual attire, portrait photography style, high quality, trustworthy appearance',
    alt: 'Satisfied homeowner testimonial'
  },
  {
    component: 'Testimonial32-2',
    filename: 'windows-testimonial-avatar-2.png',
    prompt: 'Professional headshot of satisfied middle-aged female homeowner, warm smile, business casual attire, portrait photography style, high quality, approachable appearance',
    alt: 'Happy customer testimonial'
  },
  {
    component: 'Testimonial32-3',
    filename: 'windows-testimonial-avatar-3.png',
    prompt: 'Professional headshot of satisfied young male homeowner, confident smile, casual professional attire, portrait photography style, high quality, modern appearance',
    alt: 'Satisfied customer testimonial'
  },
  {
    component: 'Testimonial32-4',
    filename: 'windows-testimonial-avatar-4.png',
    prompt: 'Professional headshot of satisfied young female homeowner, bright smile, professional attire, portrait photography style, high quality, friendly appearance',
    alt: 'Happy homeowner testimonial'
  },
  {
    component: 'Cta3',
    filename: 'windows-cta-background.png',
    prompt: 'Professional photograph of beautiful Sacramento home exterior with stunning replacement windows, golden hour lighting, architectural photography, high quality, inspiring home transformation',
    alt: 'Beautiful Sacramento home with new windows'
  },
  {
    component: 'Layout246-icon-1',
    filename: 'windows-process-step-1-icon.png',
    prompt: 'Professional icon design for contact and consultation step, phone and calendar symbols, clean modern design, high quality vector-style icon, business process visualization',
    alt: 'Contact consultation process icon'
  },
  {
    component: 'Layout246-icon-2',
    filename: 'windows-process-step-2-icon.png',
    prompt: 'Professional icon design for measurement and estimation step, ruler and calculator symbols, clean modern design, high quality vector-style icon, precision measurement visualization',
    alt: 'Measurement estimation process icon'
  },
  {
    component: 'Layout246-icon-3',
    filename: 'windows-process-step-3-icon.png',
    prompt: 'Professional icon design for installation completion step, tools and checkmark symbols, clean modern design, high quality vector-style icon, successful completion visualization',
    alt: 'Installation completion process icon'
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
          aspectRatio: imageConfig.component.includes('avatar') ? "1:1" : "16:9",
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
async function generateWindowsBatch2() {
  try {
    console.log('🚀 Starting Windows Page - Batch 2 Generation');
    console.log(`📊 Generating ${WINDOWS_BATCH_2.length} images with ${CONFIG.maxRetries} max retries each`);
    console.log(`🔗 Endpoint: ${CONFIG.endpoint}`);
    console.log(`💰 Estimated cost: $${(WINDOWS_BATCH_2.length * 0.04).toFixed(2)}`);
    console.log(`⏱️ Estimated time: ~${Math.ceil(WINDOWS_BATCH_2.length * 2.5 / 60)} minute(s)\n`);

    const accessToken = await initializeAuth();
    ensureOutputDirectory();

    const results = [];

    for (let i = 0; i < WINDOWS_BATCH_2.length; i++) {
      const imageConfig = WINDOWS_BATCH_2[i];

      console.log(`\n📋 Processing ${i + 1}/${WINDOWS_BATCH_2.length}: ${imageConfig.filename}`);
      console.log(`🎯 Component: ${imageConfig.component}`);

      const result = await generateImageWithRetries(accessToken, imageConfig);
      results.push(result);

      // Add delay between requests (except for last one)
      if (i < WINDOWS_BATCH_2.length - 1) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenRequests/1000} seconds before next request...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
      }
    }

    // Summary
    console.log('\n📊 WINDOWS BATCH 2 GENERATION SUMMARY');
    console.log('=====================================');

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Successful: ${successful.length}/${WINDOWS_BATCH_2.length}`);
    console.log(`❌ Failed: ${failed.length}/${WINDOWS_BATCH_2.length}`);
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
    const successRate = successful.length / WINDOWS_BATCH_2.length;

    if (successRate >= 0.8) {
      console.log('✅ PROCEED: Update Windows page components with generated images');
      console.log('🎉 WINDOWS PAGE COMPLETE: All images generated successfully');
      console.log('📝 Ready for Next Page: Move to Doors or other priority pages');
    } else if (successRate >= 0.4) {
      console.log('⚠️  MIXED RESULTS: Update successful images, retry failed ones');
    } else {
      console.log('❌ INVESTIGATE: Low success rate, check configuration');
    }

    console.log('\n🎉 Windows Batch 2 generation complete!');

  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the generation
generateWindowsBatch2();
