/**
 * Imagen API Test with Quota Management
 * 
 * This script tests the connection to Vertex AI's Imagen API with proper
 * rate limiting based on the quota information for the project.
 */

const { VertexAI } = require('@google-cloud/vertexai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Environment variables
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'mold-removal-lead-gen';
const LOCATION = 'us-central1'; // Using the primary region for Vertex AI

// Quota limits for Imagen models (requests per minute)
const IMAGEN_QUOTA_LIMITS = {
  'imagen-3.0-capability': 10,
  'imagen-3.0-fast-generate': 20,
  'imagen-3.0-fast-generate-001': 20, // Assuming same as fast-generate
  'imagen-3.0-generate': 1,
  'imagen-3.0-generate-001': 1, // Assuming same as generate
  'imagen-exp': 1,
  'default': 1 // Default conservative limit
};

// Request tracking for rate limiting
const requestTracking = {
  lastRequestTime: {},
  requestsThisMinute: {},
  resetTimers: {}
};

/**
 * Sleep for a specified number of milliseconds
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check and enforce rate limits for a specific model
 */
async function enforceRateLimit(model) {
  // Get the quota limit for this model
  const quotaLimit = IMAGEN_QUOTA_LIMITS[model] || IMAGEN_QUOTA_LIMITS.default;
  
  // Initialize tracking for this model if it doesn't exist
  if (!requestTracking.requestsThisMinute[model]) {
    requestTracking.requestsThisMinute[model] = 0;
    requestTracking.lastRequestTime[model] = 0;
    
    // Set up a timer to reset the counter every minute
    requestTracking.resetTimers[model] = setInterval(() => {
      requestTracking.requestsThisMinute[model] = 0;
      console.log(`Rate limit counter reset for model: ${model}`);
    }, 60000); // Reset every minute
  }
  
  // Check if we've reached the quota limit
  if (requestTracking.requestsThisMinute[model] >= quotaLimit) {
    // Calculate time until next minute
    const now = Date.now();
    const timeElapsedSinceLastRequest = now - requestTracking.lastRequestTime[model];
    const timeUntilReset = Math.max(60000 - timeElapsedSinceLastRequest, 0);
    
    console.log(`Rate limit reached for model ${model}. Waiting ${timeUntilReset / 1000} seconds until reset...`);
    await sleep(timeUntilReset + 1000); // Add 1 second buffer
    
    // Reset counter after waiting
    requestTracking.requestsThisMinute[model] = 0;
  }
  
  // Update tracking
  requestTracking.requestsThisMinute[model]++;
  requestTracking.lastRequestTime[model] = Date.now();
  
  console.log(`Request ${requestTracking.requestsThisMinute[model]}/${quotaLimit} for model ${model} this minute`);
}

/**
 * Generate an image using Vertex AI Imagen API with rate limiting
 */
async function generateImage(prompt, model = 'imagen-3.0-fast-generate-001') {
  try {
    // Enforce rate limits before making the request
    await enforceRateLimit(model);
    
    console.log(`Generating image with prompt: "${prompt}"`);
    console.log(`Using model: ${model}`);
    console.log(`Project: ${PROJECT_ID}`);
    console.log(`Location: ${LOCATION}`);
    
    // Initialize Vertex AI
    const vertexAI = new VertexAI({
      project: PROJECT_ID,
      location: LOCATION,
    });
    
    // Get the generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model: model,
    });
    
    // Generate the image
    console.log('\nSending request to Vertex AI...');
    
    const response = await generativeModel.generateImages({
      prompt,
      sampleCount: 1,
    });
    
    // Process the response
    if (!response || !response.images || response.images.length === 0) {
      throw new Error('No images were generated');
    }
    
    console.log('\n✅ Image generation successful!');
    console.log(`Image format: ${response.images[0].mimeType}`);
    console.log(`Base64 data length: ${response.images[0].bytesBase64 ? response.images[0].bytesBase64.length : 0} characters`);
    
    return {
      imageUrl: `data:image/png;base64,${response.images[0].bytesBase64}`,
      enhancedPrompt: response.promptFeedback?.enhancedPrompt,
    };
    
  } catch (error) {
    console.error('\n❌ Image generation failed:');
    console.error(error.message);
    
    if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
      console.log('\nQuota limit reached. Recommendations:');
      console.log('1. Wait for quota to reset (typically within 24 hours)');
      console.log('2. Request a quota increase through Google Cloud Console');
      console.log('3. Optimize your API usage by batching requests');
    } else if (error.message.includes('404')) {
      console.log('\nModel not found. Recommendations:');
      console.log('1. Verify that the Vertex AI API is enabled: gcloud services enable aiplatform.googleapis.com');
      console.log('2. Check if the model is available in your region');
      console.log('3. Try a different region (us-central1 is recommended)');
    } else if (error.message.includes('403') || error.message.includes('PERMISSION_DENIED')) {
      console.log('\nPermission denied. Recommendations:');
      console.log('1. Ensure you have run: gcloud auth application-default login');
      console.log('2. Verify that your account has the necessary permissions');
    }
    
    throw error;
  }
}

/**
 * Test image generation with rate limiting
 */
async function testImageGeneration() {
  try {
    console.log('=== Testing Vertex AI Imagen API with Rate Limiting ===\n');
    
    // Test with a simple prompt
    const prompt = 'A beautiful landscape with mountains and a lake, digital art style';
    
    console.log(`Testing with prompt: "${prompt}"`);
    console.log('This will respect the quota limits and wait if necessary...\n');
    
    const result = await generateImage(prompt);
    
    console.log('\n=== Generated Image Info ===');
    console.log(`Image URL length: ${result.imageUrl.length} characters`);
    if (result.enhancedPrompt) {
      console.log(`Enhanced prompt: ${result.enhancedPrompt}`);
    }
    console.log('=========================\n');
    
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error(error.message);
  } finally {
    // Clean up interval timers
    Object.values(requestTracking.resetTimers).forEach(timer => clearInterval(timer));
  }
}

// Run the test
testImageGeneration();
