// Utility functions for managing generated images
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default paths
const DEFAULT_IMAGES_DIR = path.join(__dirname, '..', 'generated-images');
const DEFAULT_METADATA_FILE = path.join(DEFAULT_IMAGES_DIR, 'metadata.json');

/**
 * Ensures the images directory exists
 */
async function ensureImagesDir() {
  try {
    await fs.mkdir(DEFAULT_IMAGES_DIR, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Loads the image metadata file
 */
async function loadMetadata() {
  try {
    await ensureImagesDir();
    const data = await fs.readFile(DEFAULT_METADATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Saves metadata for a generated image
 * @param {Object} imageData - Image metadata to save
 * @param {string} imageData.filename - Name of the image file
 * @param {string} imageData.prompt - The prompt used to generate the image
 * @param {Object} imageData.options - Options used for generation
 * @param {string} imageData.timestamp - When the image was generated
 */
async function saveImageMetadata(imageData) {
  try {
    const metadata = await loadMetadata();
    metadata.push({
      ...imageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    });
    
    await fs.writeFile(
      DEFAULT_METADATA_FILE,
      JSON.stringify(metadata, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Error saving image metadata:', error);
    throw error;
  }
}

/**
 * Gets all generated images with their metadata
 * @returns {Promise<Array>} Array of image metadata objects
 */
async function getAllImages() {
  try {
    return await loadMetadata();
  } catch (error) {
    console.error('Error loading images:', error);
    throw error;
  }
}

/**
 * Gets a specific image by ID
 * @param {string} id - The ID of the image to retrieve
 * @returns {Promise<Object|null>} The image metadata or null if not found
 */
async function getImageById(id) {
  try {
    const images = await loadMetadata();
    return images.find(img => img.id === id) || null;
  } catch (error) {
    console.error(`Error getting image ${id}:`, error);
    throw error;
  }
}

/**
 * Deletes an image and its metadata
 * @param {string} id - The ID of the image to delete
 */
async function deleteImage(id) {
  try {
    const images = await loadMetadata();
    const imageIndex = images.findIndex(img => img.id === id);
    
    if (imageIndex === -1) {
      throw new Error(`Image with ID ${id} not found`);
    }
    
    const [deletedImage] = images.splice(imageIndex, 1);
    
    // Delete the image file
    try {
      await fs.unlink(path.join(DEFAULT_IMAGES_DIR, deletedImage.filename));
    } catch (err) {
      console.warn(`Could not delete image file: ${err.message}`);
    }
    
    // Update metadata file
    await fs.writeFile(
      DEFAULT_METADATA_FILE,
      JSON.stringify(images, null, 2),
      'utf-8'
    );
    
    return deletedImage;
  } catch (error) {
    console.error(`Error deleting image ${id}:`, error);
    throw error;
  }
}

export {
  ensureImagesDir,
  loadMetadata,
  saveImageMetadata,
  getAllImages,
  getImageById,
  deleteImage,
  DEFAULT_IMAGES_DIR
};
