/**
 * Supabase Storage Utilities
 *
 * This file contains utilities for interacting with Supabase Storage.
 * It provides functions for uploading, downloading, and managing files in Supabase Storage.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables if not already loaded
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create two clients: one with anon key for public operations, one with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Bucket name for generated images
export const GENERATED_IMAGES_BUCKET = 'generated-images';

/**
 * Upload an image to Supabase Storage
 *
 * @param imageData - The image data as a base64 string
 * @param filePath - The file path within the bucket
 * @param bucketName - The name of the bucket
 * @param metadata - Optional metadata to store with the file
 * @returns The URL of the uploaded image
 */
export async function uploadImage(
  imageData: string,
  filePath: string,
  bucketName: string = GENERATED_IMAGES_BUCKET,
  metadata: Record<string, string> = {}
): Promise<string> {
  try {
    // Ensure the bucket exists
    await createBucketIfNotExists(bucketName);

    // Convert base64 data URL to blob
    const base64Data = imageData.split(',')[1];
    const blob = Buffer.from(base64Data, 'base64');
    
    // Upload to Supabase using admin client for higher privileges
    const { data, error } = await supabaseAdmin.storage.from(bucketName).upload(filePath, blob, {
      contentType: 'image/png',
      upsert: true,
      ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
    });
    
    if (error) {
      throw error;
    }
    
    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(filePath);
    
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image to Supabase:', error);
    throw error;
  }
}

/**
 * Upload multiple images to Supabase Storage
 *
 * @param images - Array of image data and file paths
 * @param bucketName - The name of the bucket
 * @returns Array of public URLs for the uploaded images
 */
export async function uploadMultipleImages(
  images: Array<{ imageData: string; filePath: string; metadata?: Record<string, string> }>,
  bucketName: string = GENERATED_IMAGES_BUCKET
): Promise<string[]> {
  try {
    // Ensure the bucket exists
    await createBucketIfNotExists(bucketName);
    
    const uploadPromises = images.map(({ imageData, filePath, metadata = {} }) => 
      uploadImage(imageData, filePath, bucketName, metadata)
    );
    
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images to Supabase:', error);
    throw error;
  }
}

/**
 * Create a Supabase Storage bucket if it doesn't exist
 *
 * @param bucketName - The name of the bucket to create
 * @param isPublic - Whether the bucket should be public
 * @returns Success status
 */
export async function createBucketIfNotExists(
  bucketName: string = GENERATED_IMAGES_BUCKET,
  isPublic: boolean = true
): Promise<boolean> {
  try {
    console.log(`Checking if bucket '${bucketName}' exists...`);
    
    // Check if bucket exists using admin client
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      throw listError;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log(`Bucket '${bucketName}' does not exist. Creating...`);
      
      // Create bucket using admin client
      const { error } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: isPublic
      });
      
      if (error) {
        console.error('Error creating bucket:', error);
        throw error;
      }
      
      console.log(`Bucket '${bucketName}' created successfully.`);
    } else {
      console.log(`Bucket '${bucketName}' already exists.`);
    }
    
    return true;
  } catch (error) {
    console.error('Error creating Supabase Storage bucket:', error);
    throw error;
  }
}

/**
 * Get a list of files in a Supabase Storage bucket
 *
 * @param path - The path within the bucket
 * @param bucketName - The name of the bucket
 * @returns Array of file objects
 */
export async function listFiles(
  path: string = '',
  bucketName: string = GENERATED_IMAGES_BUCKET
) {
  try {
    // Get list of files using admin client
    const { data, error } = await supabaseAdmin.storage.from(bucketName).list(path);
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error listing files in Supabase Storage:', error);
    throw error;
  }
}
