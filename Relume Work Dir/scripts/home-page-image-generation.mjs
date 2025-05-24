/**
 * Home Page Image Generation Script
 * Generates professional images for the Home page components using Vertex AI
 * Based on proven direct HTTP methodology with 100% success rate
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

console.log('🏠 Starting Home Page Image Generation...');

// COMPLETE Home page image requirements - ALL COMPONENTS
const HOME_PAGE_IMAGES = [
  // ✅ Gallery4 component - 4 showcase images (COMPLETED)
  {
    component: 'Gallery4',
    filename: 'home-gallery-1.png',
    prompt: 'Professional photograph of a beautiful modern home exterior with new replacement windows, bright natural lighting, architectural photography style, high quality, clean composition',
    alt: 'Modern home with new replacement windows'
  },
  {
    component: 'Gallery4',
    filename: 'home-gallery-2.png',
    prompt: 'Professional photograph of elegant front door installation on upscale home, welcoming entrance, architectural photography, premium quality, detailed craftsmanship visible',
    alt: 'Elegant front door installation'
  },
  {
    component: 'Gallery4',
    filename: 'home-gallery-3.png',
    prompt: 'Professional photograph of home with beautiful vinyl siding and coordinated windows, curb appeal, architectural photography style, high quality residential exterior',
    alt: 'Home with premium vinyl siding'
  },
  {
    component: 'Gallery4',
    filename: 'home-gallery-4.png',
    prompt: 'Professional photograph of completed home renovation showing windows, doors, and siding transformation, before and after style, architectural photography, premium quality',
    alt: 'Complete home transformation'
  },

  // ✅ Layout250 component - 3 feature images (COMPLETED)
  {
    component: 'Layout250',
    filename: 'home-feature-windows.png',
    prompt: 'Professional close-up photograph of energy-efficient replacement window installation, detailed view of window frame and glass, high quality, technical photography style',
    alt: 'Energy-efficient replacement windows'
  },
  {
    component: 'Layout250',
    filename: 'home-feature-doors.png',
    prompt: 'Professional photograph of stylish and durable entry door, detailed craftsmanship, premium materials visible, architectural photography, high quality residential entrance',
    alt: 'Stylish and durable entry doors'
  },
  {
    component: 'Layout250',
    filename: 'home-feature-siding.png',
    prompt: 'Professional photograph of premium vinyl siding installation, detailed texture and color, architectural photography style, high quality exterior home improvement',
    alt: 'Premium vinyl siding options'
  },

  // 🔴 Header15 component - 1 hero image (NEW)
  {
    component: 'Header15',
    filename: 'home-header-hero.png',
    prompt: 'Professional photograph of beautiful home exterior showcasing premium replacement windows and front door, welcoming residential entrance, architectural photography style, high quality, bright natural lighting',
    alt: 'Beautiful home with premium windows and doors'
  },

  // 🔴 Layout6 component - 1 company image (NEW)
  {
    component: 'Layout6',
    filename: 'home-company-about.png',
    prompt: 'Professional photograph of Window World LA company building or team at work, professional installation crew working on home improvement project, high quality, business photography style',
    alt: 'Window World LA professional team'
  },

  // 🔴 Layout4 component - 1 feature image (NEW)
  {
    component: 'Layout4',
    filename: 'home-layout4-feature.png',
    prompt: 'Professional photograph of home improvement project in progress, window installation or door replacement, detailed craftsmanship, architectural photography, high quality residential work',
    alt: 'Professional home improvement installation'
  },

  // 🔴 Layout251 component - 3 process images (NEW)
  {
    component: 'Layout251',
    filename: 'home-process-consultation.png',
    prompt: 'Professional photograph of home consultation meeting, sales representative meeting with homeowner, discussing window and door options, business photography style, high quality',
    alt: 'Free consultation meeting'
  },
  {
    component: 'Layout251',
    filename: 'home-process-measurement.png',
    prompt: 'Professional photograph of technician measuring windows for replacement, precise measurement tools, professional installation process, technical photography style, high quality',
    alt: 'Professional measurement process'
  },
  {
    component: 'Layout251',
    filename: 'home-process-installation.png',
    prompt: 'Professional photograph of window installation in progress, skilled technicians installing replacement windows, professional craftsmanship, high quality work photography',
    alt: 'Expert installation service'
  },

  // 🔴 Layout4_1 component - 1 feature image (NEW)
  {
    component: 'Layout4_1',
    filename: 'home-layout4-1-feature.png',
    prompt: 'Professional photograph of completed home renovation project, beautiful home exterior with new windows and doors, satisfied customer result, architectural photography, high quality',
    alt: 'Completed home transformation project'
  },

  // 🔴 Navbar10 component - 2 navigation images (NEW)
  {
    component: 'Navbar10',
    filename: 'home-nav-showcase-1.png',
    prompt: 'Professional photograph of customer testimonial scene, happy homeowner in front of their renovated home with new windows, customer satisfaction, portrait photography style',
    alt: 'Happy customer testimonial'
  },
  {
    component: 'Navbar10',
    filename: 'home-nav-showcase-2.png',
    prompt: 'Professional photograph of premium window and door showroom display, various window styles and door options, showroom photography, high quality product display',
    alt: 'Premium product showroom'
  }
];

// Configuration based on proven working direct HTTP approach
const CONFIG = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-west1',
  model: 'imagen-3.0-fast-generate-001',
  endpoint: `https://us-west1-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/us-west1/publishers/google/models/imagen-3.0-fast-generate-001:predict`,
  outputDir: path.join(__dirname, '..', 'generated-images', 'home-page'),

  // Rate limiting (conservative approach)
  delayBetweenRequests: 2000, // 2 seconds between requests (faster than test script)
  maxRetries: 3,
  retryDelay: 5000, // 5 seconds between retries
};

/**
 * Initialize Google Auth client (proven working approach)
 */
async function initializeAuth() {
  console.log('🔧 Initializing Google Auth...');
  console.log(`📍 Project: ${CONFIG.project}`);
  console.log(`📍 Location: ${CONFIG.location}`);
  console.log(`📍 Credentials: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

  if (!CONFIG.project) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required');
  }

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
 * Ensure output directory exists
 */
function ensureOutputDirectory() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`📁 Created output directory: ${CONFIG.outputDir}`);
  }
}

/**
 * Generate a single image using direct HTTP request (proven working approach)
 */
async function generateImageWithRetries(accessToken, imageConfig, attempt = 1) {
  const { filename, prompt, component, alt } = imageConfig;

  try {
    console.log(`🎨 Generating image ${attempt}/${CONFIG.maxRetries}: ${filename}`);
    console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);

    // Prepare request body (same format as successful test)
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

    // Parse response (same format as successful test)
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
      alt,
      attempt
    };

  } catch (error) {
    console.log(`❌ Attempt ${attempt} failed for ${filename}: ${error.message}`);

    if (attempt < CONFIG.maxRetries) {
      console.log(`⏳ Retrying in ${CONFIG.retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
      return generateImageWithRetries(accessToken, imageConfig, attempt + 1);
    } else {
      console.log(`💥 All attempts failed for ${filename}`);
      return {
        success: false,
        filename,
        component,
        error: error.message,
        attempts: attempt
      };
    }
  }
}

async function generateHomePageImages() {
  try {
    console.log('🚀 Starting COMPLETE Home Page Image Generation');
    console.log(`📊 Generating ${HOME_PAGE_IMAGES.length} images for ALL components with ${CONFIG.maxRetries} max retries each`);
    console.log(`✅ Previously completed: 7 images (Gallery4 + Layout250)`);
    console.log(`🔴 New images needed: ${HOME_PAGE_IMAGES.length - 7} images`);
    console.log(`🔗 Endpoint: ${CONFIG.endpoint}`);
    console.log(`💰 Estimated cost: $${(HOME_PAGE_IMAGES.length * 0.04).toFixed(2)}`);
    console.log(`⏱️ Estimated time: ~${Math.ceil(HOME_PAGE_IMAGES.length * 2.5 / 60)} minute(s)\n`);

    const accessToken = await initializeAuth();
    ensureOutputDirectory();

    const results = [];

    for (let i = 0; i < HOME_PAGE_IMAGES.length; i++) {
      const imageConfig = HOME_PAGE_IMAGES[i];

      console.log(`\n📋 Processing ${i + 1}/${HOME_PAGE_IMAGES.length}: ${imageConfig.filename}`);
      console.log(`🎯 Component: ${imageConfig.component}`);

      const result = await generateImageWithRetries(accessToken, imageConfig);
      results.push(result);

      // Add delay between requests (except for last one)
      if (i < HOME_PAGE_IMAGES.length - 1) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenRequests/1000} seconds before next request...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
      }
    }

    // Summary report
    console.log('\n📊 HOME PAGE IMAGE GENERATION SUMMARY');
    console.log('=====================================');

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Successful: ${successful.length}/${HOME_PAGE_IMAGES.length}`);
    console.log(`❌ Failed: ${failed.length}/${HOME_PAGE_IMAGES.length}`);
    console.log(`💰 Actual cost: $${(successful.length * 0.04).toFixed(2)}`);
    console.log(`📁 Output Directory: ${CONFIG.outputDir}`);

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

    // Recommendation based on results
    console.log('\n🎯 RECOMMENDATION:');
    const successRate = successful.length / HOME_PAGE_IMAGES.length;

    if (successRate >= 0.8) {
      console.log('✅ PROCEED WITH HOME PAGE: High success rate, ready for component integration');
    } else if (successRate >= 0.4) {
      console.log('⚠️  MIXED RESULTS: Use successful images, retry failed ones');
    } else {
      console.log('❌ INVESTIGATE ISSUES: Low success rate, check configuration');
    }

    // Save results to JSON for documentation
    const resultsPath = path.join(CONFIG.outputDir, 'home-page-generation-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      total: HOME_PAGE_IMAGES.length,
      successful: successful.length,
      failed: failed.length,
      cost: successful.length * 0.04,
      results: results
    }, null, 2));

    console.log(`\n📋 Results saved to: ${resultsPath}`);
    console.log('\n🎉 Home page image generation complete!');

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    if (error.stack) {
      console.error('🔍 Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Run the function
generateHomePageImages();
