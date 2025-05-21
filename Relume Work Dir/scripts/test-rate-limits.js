/**
 * Test script for Vertex AI rate limiting
 * 
 * This script tests the rate limiting functionality for Vertex AI Imagen models
 * based on the quota limits you have in your Google Cloud project.
 */

const {
  initializeVertexAIClient,
  generateImageWithRetry,
  generateMultipleImagesWithRetry,
  generateImageBatch
} = require('../Relume-root/Supabase/utils/vertex-ai-client-robust');
require('dotenv').config({ path: '.env.local' });

/**
 * Test rate limiting for a specific model
 * 
 * @param {string} model - The model to test
 * @param {number} numRequests - Number of requests to make
 */
async function testRateLimiting(model, numRequests) {
  console.log(`=== Testing Rate Limiting for ${model} ===`);
  console.log(`Making ${numRequests} requests...`);
  
  const results = [];
  const startTime = Date.now();
  
  for (let i = 0; i < numRequests; i++) {
    try {
      console.log(`\nRequest ${i + 1}/${numRequests}`);
      
      const prompt = `Test image ${i + 1}: A window with a beautiful view of mountains, professional product photography`;
      
      const result = await generateImageWithRetry(
        prompt,
        model,
        { aspectRatio: '1:1' }
      );
      
      results.push({
        success: true,
        time: Date.now() - startTime,
        error: null
      });
      
      console.log(`✅ Request ${i + 1} successful`);
      
    } catch (error) {
      console.error(`❌ Request ${i + 1} failed: ${error.message}`);
      
      results.push({
        success: false,
        time: Date.now() - startTime,
        error: error.message
      });
    }
  }
  
  // Calculate statistics
  const totalTime = Date.now() - startTime;
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.filter(r => !r.success).length;
  
  console.log('\n=== Rate Limiting Test Results ===');
  console.log(`Model: ${model}`);
  console.log(`Total requests: ${numRequests}`);
  console.log(`Successful requests: ${successCount}`);
  console.log(`Failed requests: ${failureCount}`);
  console.log(`Total time: ${totalTime / 1000} seconds`);
  console.log(`Average time per request: ${totalTime / numRequests / 1000} seconds`);
  
  // Analyze rate limiting
  const successTimes = results.filter(r => r.success).map(r => r.time);
  if (successTimes.length > 1) {
    const timeDiffs = [];
    for (let i = 1; i < successTimes.length; i++) {
      timeDiffs.push(successTimes[i] - successTimes[i - 1]);
    }
    
    const avgTimeBetweenRequests = timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length;
    console.log(`Average time between successful requests: ${avgTimeBetweenRequests / 1000} seconds`);
  }
  
  return results;
}

/**
 * Main function to run the tests
 */
async function main() {
  try {
    // Test rate limiting for imagen-3.0-fast-generate-001
    // This model has a quota of 20 requests per minute
    console.log('Testing rate limiting for imagen-3.0-fast-generate-001...');
    await testRateLimiting('imagen-3.0-fast-generate-001', 5);
    
    console.log('\nTests completed!');
  } catch (error) {
    console.error('Unhandled error:', error);
  }
}

// Run the main function
main();
