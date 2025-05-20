/**
 * Supabase Storage Utilities
 *
 * This file contains utilities for interacting with Supabase Storage.
 * It provides functions for uploading, downloading, and managing files in Supabase Storage.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// --- Supabase Client Initialization ---
let supabaseAdmin: SupabaseClient | null = null;

// This is the ONLY function that should call createClient for supabaseAdmin
function initializeSupabaseAdminInternal() {
  if (supabaseAdmin) return; // Already initialized

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    const errorMessage =
      "CRITICAL: Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY) are missing. Ensure .env.local exists in the project root and is correctly formatted when running scripts reliant on this module.";
    console.error(errorMessage, {
      NEXT_PUBLIC_SUPABASE_URL_loaded: !!supabaseUrl,
      SUPABASE_SERVICE_ROLE_KEY_loaded: !!supabaseServiceKey,
    });
    throw new Error(
      "Supabase configuration is missing, halting script before client initialization."
    );
  }

  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  console.log("Supabase admin client initialized successfully.");
}

// Exported function for external modules to call if they want to ensure early initialization.
export function initializeSupabaseAdmin() {
  if (!supabaseAdmin) {
    initializeSupabaseAdminInternal();
  }
}

// Internal helper to ensure client is ready before use in exported utility functions
// This will call the internal initializer if the client hasn't been set up yet.
function ensureAdminClientInitialized() {
  if (!supabaseAdmin) {
    initializeSupabaseAdminInternal();
    // If initializeSupabaseAdminInternal failed (e.g. due to missing env vars), it would have thrown an error,
    // so supabaseAdmin should be non-null here if execution continues.
    if (!supabaseAdmin) {
      // This check is a safeguard, should ideally not be reached if init logic is sound.
      throw new Error(
        "Supabase admin client is null even after initialization attempt. This indicates a critical issue in the initialization logic or environment variable handling."
      );
    }
  }
}

// --- Bucket Definitions ---
export const GENERATED_IMAGES_BUCKET = "generated-images";
export const SAMPLE_WINDOWS_IMAGES_BUCKET = "sample-images";
export const SAMPLE_DOORS_IMAGES_BUCKET = "sample-images";

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
  ensureAdminClientInitialized();
  if (!supabaseAdmin)
    throw new Error("Supabase admin client is not available in uploadImage.");

  try {
    // Ensure the bucket exists
    await createBucketIfNotExists(bucketName);

    // Convert base64 data URL to blob
    const base64Data = imageData.split(",")[1];
    const blob = Buffer.from(base64Data, "base64");

    // Upload to Supabase using admin client for higher privileges
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(filePath, blob, {
        contentType: "image/png",
        upsert: true,
        ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image to Supabase:", error);
    throw error;
  }
}

/**
 * Upload a file from a local path to Supabase Storage
 *
 * @param localFilePath - The absolute path to the local file
 * @param bucketName - The name of the bucket
 * @param storagePath - The destination file path within the bucket (e.g., 'windows/image1.jpg')
 * @param contentType - The MIME type of the file (e.g., 'image/jpeg', 'image/png')
 * @param metadata - Optional metadata to store with the file
 * @returns The public URL of the uploaded image
 */
export async function uploadFileFromPath(
  localFilePath: string,
  bucketName: string,
  storagePath: string,
  contentType: string,
  metadata: Record<string, string> = {}
): Promise<string> {
  ensureAdminClientInitialized();
  // supabaseAdmin is asserted non-null

  try {
    await createBucketIfNotExists(bucketName);
    const fileBuffer = fs.readFileSync(localFilePath);

    const { data, error } = await supabaseAdmin!.storage
      .from(bucketName)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
        cacheControl: "3600", // Default cache control
        ...(Object.keys(metadata).length > 0 && { metadata }),
      });

    if (error) {
      console.error(
        `Error uploading file ${localFilePath} to ${bucketName}/${storagePath}:`,
        error
      );
      throw error;
    }

    const { data: publicUrlData } = supabaseAdmin!.storage
      .from(bucketName)
      .getPublicUrl(storagePath);
    console.log(
      `Successfully uploaded ${localFilePath} to ${publicUrlData.publicUrl}`
    );
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error(`Failed to upload file from path ${localFilePath}:`, error);
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
  images: Array<{
    imageData: string;
    filePath: string;
    metadata?: Record<string, string>;
  }>,
  bucketName: string = GENERATED_IMAGES_BUCKET
): Promise<string[]> {
  ensureAdminClientInitialized();
  if (!supabaseAdmin)
    throw new Error(
      "Supabase admin client is not available in uploadMultipleImages."
    );

  try {
    // Ensure the bucket exists
    await createBucketIfNotExists(bucketName);

    const uploadPromises = images.map(
      ({ imageData, filePath, metadata = {} }) =>
        uploadImage(imageData, filePath, bucketName, metadata)
    );

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple images to Supabase:", error);
    throw error;
  }
}

/**
 * Options for creating a bucket. Based on Supabase's StorageBucketApi types.
 */
interface BucketCreationOptions {
  public: boolean; // 'public' is not optional in Supabase's actual createBucket options object
  fileSizeLimit?: string | number | null;
  allowedMimeTypes?: string[] | null;
}

/**
 * Creates a Supabase Storage bucket if it doesn't already exist.
 * @param bucketName The name of the bucket to create.
 * @param options Bucket creation options.
 */
export async function createBucketIfNotExists(
  bucketName: string,
  options: BucketCreationOptions = {
    public: true, // Default to public for website assets
    fileSizeLimit: "10mb",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  }
) {
  ensureAdminClientInitialized();
  // supabaseAdmin is asserted non-null by ensureAdminClientInitialized or it would have thrown

  try {
    const { data: existingBuckets, error: listError } =
      await supabaseAdmin!.storage.listBuckets();
    if (listError) {
      console.error(
        `Error listing buckets to check for ${bucketName}:`,
        listError.message
      );
      throw listError;
    }

    const bucketExists =
      existingBuckets && existingBuckets.some((b) => b.name === bucketName);

    if (bucketExists) {
      console.log(`Bucket '${bucketName}' already exists.`);
      return {
        data: { message: `Bucket '${bucketName}' already exists.` },
        error: null,
      };
    } else {
      console.log(
        `Bucket '${bucketName}' does not exist. Attempting to create...`
      );
      const { data, error } = await supabaseAdmin!.storage.createBucket(
        bucketName,
        options
      );
      if (error) {
        console.error(`Error creating bucket ${bucketName}:`, error.message);
        throw error;
      }
      console.log(`Bucket '${bucketName}' created successfully.`);
      return { data, error };
    }
  } catch (error) {
    const err = error as Error;
    console.error(
      `Operation failed for bucket ${bucketName} in createBucketIfNotExists:`,
      err.message
    );
    return {
      data: null,
      error: { name: err.name, message: err.message, stack: err.stack },
    };
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
  path: string = "",
  bucketName: string = GENERATED_IMAGES_BUCKET
) {
  ensureAdminClientInitialized();
  if (!supabaseAdmin)
    throw new Error("Supabase admin client is not available in listFiles.");

  try {
    // Get list of files using admin client
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .list(path);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error listing files in Supabase Storage:", error);
    throw error;
  }
}

/**
 * Options for listing objects in a bucket.
 */
interface BucketListOptions {
  limit?: number;
  offset?: number;
  sortBy?: {
    column: string;
    order: string;
  };
  search?: string;
}

/**
 * Lists all storage buckets.
 * Ensures Supabase admin client is initialized.
 */
export async function getStorageBuckets() {
  ensureAdminClientInitialized();
  if (!supabaseAdmin)
    throw new Error("Supabase admin client not initialized post-check.");
  return supabaseAdmin.storage.listBuckets();
}

/**
 * Lists objects within a specific bucket and path.
 * Ensures Supabase admin client is initialized.
 * @param bucketName The name of the bucket.
 * @param path The path within the bucket (e.g., '', 'folder/subfolder').
 * @param options Options for listing, e.g., limit, offset, sortBy.
 */
export async function getBucketObjects(
  bucketName: string,
  path: string = "",
  options?: BucketListOptions
) {
  ensureAdminClientInitialized();
  if (!supabaseAdmin)
    throw new Error("Supabase admin client not initialized post-check.");
  return supabaseAdmin.storage.from(bucketName).list(path, options);
}

/**
 * Get a list of images with their public URLs
 *
 * @param category - Optional category to filter by (e.g., 'windows', 'doors')
 * @returns Array of image objects with name, url, size, and created_at
 */
export async function getImages(category?: string): Promise<
  Array<{
    name: string;
    url: string;
    size: number;
    created_at: string;
    category?: string;
  }>
> {
  ensureAdminClientInitialized();
  if (!supabaseAdmin)
    throw new Error("Supabase admin client is not available in getImages.");

  try {
    // Determine which bucket to use based on category
    let bucketName = GENERATED_IMAGES_BUCKET;
    let path = "";

    if (category) {
      // If category is specified, use it as the path
      path = category;
    }

    // Get list of files
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .list(path);

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    // Filter out folders
    const files = data.filter((item) => !item.metadata?.isDir);

    // Get public URL for each file
    return files.map((file) => {
      const filePath = path ? `${path}/${file.name}` : file.name;
      const { data: publicUrlData } = supabaseAdmin!.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return {
        name: file.name,
        url: publicUrlData.publicUrl,
        size: file.metadata?.size || 0,
        created_at: file.created_at || new Date().toISOString(),
        category: category,
      };
    });
  } catch (error) {
    console.error("Error getting images from Supabase Storage:", error);
    throw error;
  }
}

/**
 * Upload a file to Supabase Storage
 *
 * @param file - The file to upload
 * @param category - The category to store the file in (e.g., 'windows', 'doors')
 * @param onProgress - Optional callback for upload progress
 * @returns The public URL of the uploaded file
 */
export async function uploadFileObject(
  file: File,
  category: string = "other",
  onProgress?: (progress: number) => void
): Promise<string> {
  ensureAdminClientInitialized();
  if (!supabaseAdmin)
    throw new Error("Supabase admin client is not available in uploadImage.");

  try {
    // Ensure the bucket exists
    await createBucketIfNotExists(GENERATED_IMAGES_BUCKET);

    // Create file path
    const filePath = category ? `${category}/${file.name}` : file.name;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase
    const { data, error } = await supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    // Simulate progress for the callback
    if (onProgress) {
      onProgress(100);
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image to Supabase:", error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage
 *
 * @param fileName - The name of the file to delete
 * @param category - The category the file is stored in (e.g., 'windows', 'doors')
 * @returns Whether the deletion was successful
 */
export async function deleteImage(
  fileName: string,
  category: string = "other"
): Promise<boolean> {
  ensureAdminClientInitialized();
  if (!supabaseAdmin)
    throw new Error("Supabase admin client is not available in deleteImage.");

  try {
    // Create file path
    const filePath = category ? `${category}/${fileName}` : fileName;

    // Delete from Supabase
    const { error } = await supabaseAdmin.storage
      .from(GENERATED_IMAGES_BUCKET)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deleting image from Supabase Storage:", error);
    throw error;
  }
}
