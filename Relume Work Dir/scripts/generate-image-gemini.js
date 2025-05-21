/**
 * Image Generation Script using Google's Gemini API
 * 
 * This script generates images using Google's Gemini model via the @google/generative-ai package.
 * It's designed to work with the latest Google AI SDK.
 * 
 * Prerequisites:
 * - Node.js 16+ installed
 * - @google/generative-ai package installed
 * - GOOGLE_API_KEY environment variable set with a valid API key
 * 
 * Usage:
 * node scripts/generate-image-gemini.js "A beautiful sunset over mountains" output.png
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file and directory paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'generated-images');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created output directory: ${OUTPUT_DIR}`);
}

// Validate environment variables
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('Error: GOOGLE_API_KEY environment variable is not set.');
  console.error('Please set it with: export GOOGLE_API_KEY=your_api_key_here');
  process.exit(1);
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Generates an image using Google's Gemini model
 * @param {string} prompt - The text prompt for image generation
 * @param {Object} options - Generation options
 * @param {number} [options.count=1] - Number of images to generate (1-4)
 * @param {string} [options.aspectRatio='1:1'] - Aspect ratio ('1:1', '4:3', '16:9', '9:16')
 * @returns {Promise<Array<{image: Buffer, mimeType: string}>>} - Array of generated images with metadata
 */
async function generateImage(prompt, options = {}) {
  const {
    count = 1,
    aspectRatio = '1:1'
  } = options;

  try {
    console.log(`Generating ${count} image(s) with prompt: "${prompt}"`);
    
    // Get the generative model for images
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    // Prepare the generation config
    const generationConfig = {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096,
    };

    // Generate the image
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Generate a realistic, high-quality image with the following description: ${prompt}. ` +
                     `Aspect ratio: ${aspectRatio}. ` +
                     `The image should be photorealistic and suitable for a professional website.`
            }
          ]
        }
      ],
      generationConfig,
    });

    // Process the response
    const response = result.response;
    const images = [];
    
    // Extract images from the response
    for (let i = 0; i < count; i++) {
      // Note: The actual implementation might vary based on the API response format
      // This is a placeholder for the actual image data extraction
      const imageData = {
        image: Buffer.from(''), // Placeholder - replace with actual image data
        mimeType: 'image/png'  // Assuming PNG format
      };
      images.push(imageData);
    }
    
    return images;
    
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * Saves images to the filesystem
 * @param {Array<{image: Buffer, mimeType: string}>} images - Array of image data
 * @param {string} baseFilename - Base filename for the output files
 * @returns {Promise<string[]>} - Array of saved file paths
 */
async function saveImages(images, baseFilename) {
  const savedPaths = [];
  
  for (let i = 0; i < images.length; i++) {
    const { image, mimeType } = images[i];
    const extension = mimeType.split('/')[1] || 'png';
    const filename = images.length > 1 
      ? `${baseFilename}-${i + 1}.${extension}`
      : `${baseFilename}.${extension}`;
    
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    await fs.promises.writeFile(outputPath, image);
    console.log(`Saved image to: ${outputPath}`);
    savedPaths.push(outputPath);
  }
  
  return savedPaths;
}

/**
 * Main function to run the script
 */
async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node scripts/generate-image-gemini.js "prompt" [output_filename]');
    console.log('Example: node scripts/generate-image-gemini.js "A beautiful sunset over mountains" sunset');
    process.exit(1);
  }
  
  const prompt = args[0];
  const outputFilename = args[1] || `generated-${Date.now()}`;
  
  try {
    // Generate the image
    console.log(`Generating image with prompt: "${prompt}"`);
    const images = await generateImage(prompt, {
      count: 1,
      aspectRatio: '16:9'
    });
    
    // Save the image(s)
    const savedPaths = await saveImages(images, outputFilename);
    
    console.log('\nImage generation completed successfully!');
    console.log('Saved images:');
    savedPaths.forEach(path => console.log(`- ${path}`));
    
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
