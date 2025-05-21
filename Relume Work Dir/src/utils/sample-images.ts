/**
 * Sample Images Utility
 * 
 * This file contains utilities for copying sample images to the public directory
 * and generating image URLs for use in components.
 */

import fs from 'fs';
import path from 'path';

// Define source and destination paths
const SAMPLE_IMAGES_DIR = path.join(process.cwd(), '..', 'Sample-images');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Define image categories
const IMAGE_CATEGORIES = ['Windows', 'Doors'];

/**
 * Copy sample images to the public directory
 * 
 * @returns An object with arrays of image paths for each category
 */
export async function copySampleImages(): Promise<Record<string, string[]>> {
  const result: Record<string, string[]> = {};

  try {
    // Create public/images directory if it doesn't exist
    if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
      fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
    }

    // Process each category
    for (const category of IMAGE_CATEGORIES) {
      const sourceCategoryDir = path.join(SAMPLE_IMAGES_DIR, category);
      const destCategoryDir = path.join(PUBLIC_IMAGES_DIR, category.toLowerCase());

      // Skip if source directory doesn't exist
      if (!fs.existsSync(sourceCategoryDir)) {
        console.warn(`Source directory not found: ${sourceCategoryDir}`);
        continue;
      }

      // Create destination category directory if it doesn't exist
      if (!fs.existsSync(destCategoryDir)) {
        fs.mkdirSync(destCategoryDir, { recursive: true });
      }

      // Get list of image files
      const files = fs.readdirSync(sourceCategoryDir);
      const imagePaths: string[] = [];

      // Copy each file
      for (const file of files) {
        const sourceFilePath = path.join(sourceCategoryDir, file);
        const destFilePath = path.join(destCategoryDir, file);

        // Skip if not a file
        if (!fs.statSync(sourceFilePath).isFile()) {
          continue;
        }

        // Copy file if it doesn't exist or is newer
        if (
          !fs.existsSync(destFilePath) ||
          fs.statSync(sourceFilePath).mtime > fs.statSync(destFilePath).mtime
        ) {
          fs.copyFileSync(sourceFilePath, destFilePath);
          console.log(`Copied ${sourceFilePath} to ${destFilePath}`);
        }

        // Add to result
        imagePaths.push(`/images/${category.toLowerCase()}/${file}`);
      }

      result[category.toLowerCase()] = imagePaths;
    }

    return result;
  } catch (error) {
    console.error('Error copying sample images:', error);
    throw error;
  }
}

/**
 * Get sample image URLs for a specific category
 * 
 * @param category - The category to get images for (e.g., 'windows', 'doors')
 * @returns An array of image URLs
 */
export function getSampleImageUrls(category: string): string[] {
  try {
    const categoryDir = path.join(PUBLIC_IMAGES_DIR, category.toLowerCase());

    // Return empty array if directory doesn't exist
    if (!fs.existsSync(categoryDir)) {
      return [];
    }

    // Get list of image files
    const files = fs.readdirSync(categoryDir);

    // Filter for image files and create URLs
    return files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/images/${category.toLowerCase()}/${file}`);
  } catch (error) {
    console.error(`Error getting sample image URLs for ${category}:`, error);
    return [];
  }
}

/**
 * Get a random sample image URL for a specific category
 * 
 * @param category - The category to get an image for (e.g., 'windows', 'doors')
 * @returns A random image URL or null if no images are available
 */
export function getRandomSampleImageUrl(category: string): string | null {
  const imageUrls = getSampleImageUrls(category);

  if (imageUrls.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}

/**
 * Get a specific number of sample image URLs for a category
 * 
 * @param category - The category to get images for (e.g., 'windows', 'doors')
 * @param count - The number of images to get
 * @returns An array of image URLs
 */
export function getSampleImageUrlsCount(category: string, count: number): string[] {
  const imageUrls = getSampleImageUrls(category);

  if (imageUrls.length <= count) {
    return imageUrls;
  }

  // Shuffle array and take first 'count' elements
  return [...imageUrls]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}
