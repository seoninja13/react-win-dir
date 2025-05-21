/**
 * Test script for the robust Vertex AI client
 * 
 * This script tests the robust Vertex AI client with retry logic and rate limiting
 * to handle quota limits gracefully.
 */

const {
  initializeVertexAIClient,
  generateImageWithRetry,
  generateMultipleImagesWithRetry,
  generateImageBatch
} = require('../Relume-root/Supabase/utils/vertex-ai-client-robust');
require('dotenv').config({ path: '.env.local' });

/**
 * Test single image generation with retry logic
 */
async function testSingleImageGeneration() {
  console.log('=== Testing Single Image Generation with Retry Logic ===');
  
  try {
    const prompt = 'A beautiful landscape with mountains and a lake, digital art style';
    console.log(`Prompt: "${prompt}"`);
    
    // Configure retry options
    const retryConfig = {
      maxRetries: 3,
      initialDelayMs: 5000, // 5 seconds
      maxDelayMs: 30000, // 30 seconds
      backoffMultiplier: 2,
    };
    
    console.log('Generating image with retry logic...');
    console.log(`Max retries: ${retryConfig.maxRetries}`);
    console.log(`Initial delay: ${retryConfig.initialDelayMs / 1000} seconds`);
    
    const result = await generateImageWithRetry(
      prompt,
      'imagen-3.0-fast-generate-001',
      {},
      retryConfig
    );
    
    console.log('\n✅ Image generation successful!');
    console.log(`Image URL length: ${result.imageUrl.length} characters`);
    if (result.enhancedPrompt) {
      console.log(`Enhanced prompt: ${result.enhancedPrompt}`);
    }
    
    return true;
  } catch (error) {
    console.error('\n❌ Image generation failed after all retries:');
    console.error(error.message);
    
    if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
      console.log('\nQuota limit reached. Recommendations:');
      console.log('1. Wait for quota to reset (typically within 24 hours)');
      console.log('2. Request a quota increase through Google Cloud Console');
      console.log('3. Optimize your API usage by batching requests');
      console.log('4. Implement a queue system for image generation');
    }
    
    return false;
  }
}

/**
 * Test batch image generation with optimized quota usage
 */
async function testBatchImageGeneration() {
  console.log('\n=== Testing Batch Image Generation ===');
  
  try {
    // Create a batch of image generation requests
    const batch = [
      {
        prompt: 'A modern double-hung window with white frame, professional product photography',
        options: {
          aspectRatio: '1:1',
        }
      },
      {
        prompt: 'A sliding patio door with glass panels, modern design, professional product photography',
        options: {
          aspectRatio: '1:1',
        }
      },
      {
        prompt: 'A bay window with colonial grid pattern, professional product photography',
        options: {
          aspectRatio: '1:1',
        }
      }
    ];
    
    console.log(`Batch size: ${batch.length} images`);
    
    // Configure global options and retry config
    const globalOptions = {
      model: 'imagen-3.0-fast-generate-001',
    };
    
    const retryConfig = {
      maxRetries: 3,
      initialDelayMs: 5000, // 5 seconds
      maxDelayMs: 30000, // 30 seconds
      backoffMultiplier: 2,
    };
    
    console.log('Processing batch with optimized quota usage...');
    
    const results = await generateImageBatch(batch, globalOptions, retryConfig);
    
    console.log('\n✅ Batch processing complete!');
    console.log(`Successful generations: ${results.filter(r => r.result !== null).length}/${batch.length}`);
    
    // Log results summary
    results.forEach((item, index) => {
      console.log(`\nItem ${index + 1}:`);
      console.log(`Prompt: "${item.prompt.substring(0, 50)}..."`);
      if (item.result) {
        console.log('Status: Success');
        console.log(`Image URL length: ${item.result.imageUrl.length} characters`);
      } else {
        console.log('Status: Failed');
        console.log(`Error: ${item.error}`);
      }
    });
    
    return true;
  } catch (error) {
    console.error('\n❌ Batch processing failed:');
    console.error(error.message);
    return false;
  }
}

/**
 * Main function to run the tests
 */
async function main() {
  try {
    console.log('Testing robust Vertex AI client with quota handling...');
    
    // Test single image generation first
    const singleImageResult = await testSingleImageGeneration();
    
    // Only test batch generation if single image generation was successful
    if (singleImageResult) {
      await testBatchImageGeneration();
    }
    
    console.log('\nTests completed!');
  } catch (error) {
    console.error('Unhandled error:', error);
  }
}

// Run the main function
main();
