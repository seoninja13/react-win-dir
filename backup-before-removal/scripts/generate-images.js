// Image Generation Script using Google's Imagen 3.0
import { GoogleGenAI } from "@google/genai";
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { 
  ensureImagesDir, 
  saveImageMetadata, 
  DEFAULT_IMAGES_DIR 
} from './image-utils.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Configuration
const CONFIG = {
  apiKey: process.env.GEMINI_API_KEY, // Using GEMINI_API_KEY from .env.local
  model: 'imagen-3.0-generate-002',
  outputDir: DEFAULT_IMAGES_DIR,
  defaultPrompt: 'A futuristic cityscape at sunset with flying cars and neon lights',
  defaultOptions: {
    numberOfImages: 2,
    width: 1024,
    height: 1024,
    seed: null,
    safetyFilterLevel: 'block_few', // 'block_few' | 'block_some' | 'block_most' | 'block_none'
    personGeneration: 'dont_allow', // 'dont_allow' | 'allow_adult' | 'allow_all'
  },
  // Rate limiting configuration (50 requests per minute)
  rateLimit: {
    maxRequests: 45, // Stay comfortably below the 50/min limit
    timeWindow: 60 * 1000, // 1 minute in milliseconds
    queue: [],
    inProgress: 0
  }
};

/**
 * Rate limiting implementation
 */
async function rateLimit() {
  const now = Date.now();
  
  // Remove old requests from the queue
  CONFIG.rateLimit.queue = CONFIG.rateLimit.queue.filter(
    timestamp => now - timestamp < CONFIG.rateLimit.timeWindow
  );
  
  // If we've hit the rate limit, wait until we're under it
  if (CONFIG.rateLimit.queue.length >= CONFIG.rateLimit.maxRequests) {
    const oldestRequest = CONFIG.rateLimit.queue[0];
    const timeToWait = CONFIG.rateLimit.timeWindow - (now - oldestRequest);
    
    if (timeToWait > 0) {
      console.log(`⚠️  Rate limit approaching. Waiting ${Math.ceil(timeToWait / 1000)} seconds...`);
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
  }
  
  // Add this request to the queue
  CONFIG.rateLimit.queue.push(Date.now());
}

/**
 * Generate images using the Imagen 3.0 model
 * @param {string} prompt - The text prompt for image generation
 * @param {Object} options - Generation options
 * @returns {Promise<Array<{path: string, prompt: string, filename: string, options: Object}>>} - Array of generated image info
 */
async function generateImages(prompt, options = {}) {
  // Validate API key
  if (!CONFIG.apiKey) {
    throw new Error('GOOGLE_API_KEY environment variable is not set');
  }

  // Validate prompt
  if (typeof prompt !== 'string' || prompt.trim().length === 0) {
    throw new Error('Prompt must be a non-empty string');
  }

  // Merge default options with provided options
  const mergedOptions = { ...CONFIG.defaultOptions, ...options };
  
  // Validate options
  if (mergedOptions.numberOfImages < 1 || mergedOptions.numberOfImages > 4) {
    throw new Error('Number of images must be between 1 and 4');
  }

  try {
    console.log('\n🚀 Starting image generation...');
    console.log(`📝 Prompt: "${prompt}"`);
    console.log(`⚙️  Options: ${JSON.stringify(mergedOptions, null, 2)}`);

    // Ensure output directory exists
    await ensureImagesDir();
    
    // Apply rate limiting
    await rateLimit();

    // Initialize the Google Gen AI client
    const ai = new GoogleGenAI({ apiKey: CONFIG.apiKey });

    // Prepare the request
    const request = {
      model: CONFIG.model,
      prompt: prompt,
      config: {
        numberOfImages: mergedOptions.numberOfImages,
        width: mergedOptions.width,
        height: mergedOptions.height,
        ...(mergedOptions.seed && { seed: mergedOptions.seed }),
        safetyFilterLevel: mergedOptions.safetyFilterLevel,
        personGeneration: mergedOptions.personGeneration,
      },
    };

    console.log('\n🔄 Sending request to Imagen 3.0...');
    
    // Make the API call
    const response = await ai.models.generateImages(request);
    
    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error('No images were generated');
    }

    console.log(`\n✅ Successfully generated ${response.generatedImages.length} image(s)`);
    
    // Save the generated images
    const savedImages = [];
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    for (let i = 0; i < response.generatedImages.length; i++) {
      const generatedImage = response.generatedImages[i];
      const imageBytes = generatedImage.image.imageBytes;
      const buffer = Buffer.from(imageBytes, 'base64');
      
      // Create a filename with a timestamp and index
      const filename = `imagen-${timestamp}-${i + 1}.png`;
      const filePath = path.join(CONFIG.outputDir, filename);
      
      try {
        // Save the image
        await fs.writeFile(filePath, buffer);
        console.log(`💾 Saved image: ${filename}`);
        
        // Prepare metadata
        const metadata = {
          filename,
          prompt,
          options: mergedOptions,
          timestamp: new Date().toISOString(),
          fileSize: buffer.length,
          dimensions: {
            width: mergedOptions.width,
            height: mergedOptions.height
          }
        };
        
        // Save metadata
        await saveImageMetadata(metadata);
        
        savedImages.push({
          path: filePath,
          filename,
          prompt,
          options: mergedOptions,
          metadata
        });
        
      } catch (fileError) {
        console.error(`❌ Error saving image ${i + 1}:`, fileError.message);
        // Continue with other images even if one fails
      }
    }
    
    if (savedImages.length === 0) {
      throw new Error('Failed to save any images');
    }
    
    return savedImages;
    
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error('\n❌ Error generating images:');
    console.error(errorMessage);
    
    if (error.response?.status === 429) {
      console.error('\n⚠️  Rate limit exceeded. Please wait before making more requests.');
    }
    
    throw new Error(`Image generation failed: ${errorMessage}`);
  }
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    prompt: '',
    options: {}
  };
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    // Handle flags with values
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];
      
      if (nextArg && !nextArg.startsWith('--')) {
        // Handle numeric values
        if (['numberOfImages', 'width', 'height', 'seed'].includes(key)) {
          result.options[key] = parseInt(nextArg, 10);
        } 
        // Handle string values
        else if (['safetyFilterLevel', 'personGeneration'].includes(key)) {
          result.options[key] = nextArg;
        }
        i++; // Skip the next argument
      }
    } 
    // The first non-flag argument is the prompt
    else if (!result.prompt) {
      result.prompt = arg;
    }
  }
  
  // Use default prompt if none provided
  if (!result.prompt) {
    result.prompt = CONFIG.defaultPrompt;
    console.log(`ℹ️  No prompt provided. Using default: "${result.prompt}"`);
  }
  
  return result;
}

/**
 * Display help information
 */
function showHelp() {
  console.log(`
Image Generation Tool using Google's Imagen 3.0

Usage:
  node scripts/generate-images.js [prompt] [options]

Options:
  --numberOfImages <number>  Number of images to generate (1-4, default: 2)
  --width <number>          Image width in pixels (default: 1024)
  --height <number>         Image height in pixels (default: 1024)
  --seed <number>           Optional seed for reproducible results
  --safetyFilterLevel <level> Safety filter level: 'block_few' | 'block_some' | 'block_most' | 'block_none' (default: 'block_few')
  --personGeneration <mode>  Person generation mode: 'dont_allow' | 'allow_adult' | 'allow_all' (default: 'dont_allow')
  --help                    Show this help message

Examples:
  node scripts/generate-images.js "A beautiful sunset over mountains"
  node scripts/generate-images.js "A futuristic city" --numberOfImages 4 --width 768 --height 1024
`);
}

/**
 * Main function to run the script
 */
async function main() {
  try {
    // Check for help flag
    if (process.argv.includes('--help')) {
      showHelp();
      return;
    }
    
    // Parse command line arguments
    const { prompt, options } = parseArgs();
    
    console.log('='.repeat(60));
    console.log('🚀 Image Generation Tool - Google Imagen 3.0');
    console.log('='.repeat(60));
    
    // Generate images
    const results = await generateImages(prompt, options);
    
    console.log('\n✨ Image generation complete!');
    console.log('\nGenerated Images:');
    results.forEach((img, index) => {
      console.log(`  ${index + 1}. ${img.filename} (${(img.metadata.fileSize / 1024).toFixed(2)} KB)`);
    });
    console.log(`\nImages saved to: ${CONFIG.outputDir}`);
    
  } catch (error) {
    console.error('\n❌ Script failed:');
    console.error(error.message);
    
    if (!process.argv.includes('--help')) {
      console.log('\n💡 Use --help for usage information');
    }
    
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
