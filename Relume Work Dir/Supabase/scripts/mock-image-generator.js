/**
 * Mock Image Generator
 * 
 * This file provides a mock implementation of image generation for testing purposes.
 * It generates placeholder images with different colors based on the image type.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Generate a mock image based on image type
 * 
 * @param {string} prompt - The text prompt (not used in mock implementation)
 * @param {string} imageType - The type of image to generate
 * @returns {Promise<{imageUrl: string}>} - The generated image data
 */
export async function generateMockImage(prompt, imageType) {
  console.log(`Generating mock image for type: ${imageType}`);
  
  // Generate a placeholder SVG with different colors based on image type
  const width = getImageWidth(imageType);
  const height = getImageHeight(imageType);
  const color = getColorForImageType(imageType);
  
  // Create an SVG with the image type text
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}" />
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${imageType.toUpperCase()}
      </text>
    </svg>
  `;
  
  // Convert SVG to base64
  const base64 = Buffer.from(svg).toString('base64');
  const imageUrl = `data:image/svg+xml;base64,${base64}`;
  
  return {
    imageUrl,
    enhancedPrompt: `Mock enhanced prompt for ${imageType}: ${prompt.substring(0, 50)}...`,
  };
}

/**
 * Get image width based on image type
 */
function getImageWidth(imageType) {
  switch (imageType) {
    case 'hero':
      return 1600;
    case 'product':
      return 800;
    case 'gallery':
      return 600;
    case 'background':
      return 1920;
    case 'icon':
      return 200;
    default:
      return 800;
  }
}

/**
 * Get image height based on image type
 */
function getImageHeight(imageType) {
  switch (imageType) {
    case 'hero':
      return 900;
    case 'product':
      return 600;
    case 'gallery':
      return 600;
    case 'background':
      return 1080;
    case 'icon':
      return 200;
    default:
      return 600;
  }
}

/**
 * Get color for image type
 */
function getColorForImageType(imageType) {
  switch (imageType) {
    case 'hero':
      return '#3498db'; // Blue
    case 'product':
      return '#2ecc71'; // Green
    case 'gallery':
      return '#9b59b6'; // Purple
    case 'background':
      return '#34495e'; // Dark Blue
    case 'icon':
      return '#e74c3c'; // Red
    default:
      return '#95a5a6'; // Gray
  }
}

/**
 * Save image to Supabase storage
 * 
 * @param {string} imageUrl - The image URL (data URL)
 * @param {string} imagePath - The path to save the image to
 * @returns {Promise<string>} - The public URL of the saved image
 */
export async function saveImageToSupabase(imageUrl, imagePath) {
  console.log(`Saving image to Supabase: ${imagePath}`);
  
  try {
    // Extract base64 data from data URL
    const base64Data = imageUrl.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid image data URL');
    }
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Ensure the path starts with a slash
    const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('images')
      .upload(normalizedPath, buffer, {
        contentType: imageUrl.includes('svg') ? 'image/svg+xml' : 'image/png',
        upsert: true,
      });
    
    if (error) {
      throw new Error(`Supabase storage error: ${error.message}`);
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(normalizedPath);
    
    return publicUrl;
  } catch (error) {
    console.error(`Error saving image: ${error.message}`);
    throw error;
  }
}
