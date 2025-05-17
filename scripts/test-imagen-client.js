/**
 * Test script for the rate-limited Imagen client
 */

import {
  generateImage,
  generateMultipleImages,
  generateProductImage
} from '../Supabase/utils/imagen-client.js';

async function testImageGeneration() {
  try {
    console.log('=== Testing Rate-Limited Imagen Client ===');
    
    // Test single image generation
    console.log('\nTesting single image generation...');
    const prompt = 'A beautiful landscape with mountains and a lake, digital art style';
    
    console.log(`Prompt: "${prompt}"`);
    console.log('This will respect the quota limits and wait if necessary...');
    
    const result = await generateImage(prompt);
    
    console.log('\n✅ Image generation successful!');
    console.log(`Image URL length: ${result.imageUrl.length} characters`);
    if (result.enhancedPrompt) {
      console.log(`Enhanced prompt: ${result.enhancedPrompt}`);
    }
    
    return true;
  } catch (error) {
    console.error('\n❌ Image generation failed:');
    console.error(error.message);
    return false;
  }
}

// Run the test
testImageGeneration().catch(console.error);
