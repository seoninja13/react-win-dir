/**
 * Batch Image Generation Utility
 *
 * This file contains utilities for batch processing of image generation from CSV data.
 * It reads a CSV file, generates images using Vertex AI, and saves them to Supabase Storage.
 *
 * Documentation:
 * - CSV Processing Plan: ../../docs/Image generation/csv-processing-plan.md
 * - Image Generation Process: ../../docs/Image generation/image-generation-process.md
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { parse } from "csv-parse/sync";
import { generateImage, generateMultipleImages } from "./image-generation.js";
import {
  uploadImage,
  createBucketIfNotExists,
  GENERATED_IMAGES_BUCKET,
} from "./storage.js";

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Types
interface ImageEntry {
  original_url: string;
  target_url: string;
  image_type: string;
  prompt: string;
}

interface GenerationResult {
  entry: ImageEntry;
  imageUrl: string;
  supabaseUrl?: string;
  success: boolean;
  error?: any;
  timestamp: string;
  processingTimeMs?: number;
}

/**
 * Process a CSV file and generate images
 *
 * @param csvFilePath - Path to the CSV file
 * @returns Array of generation results
 */
export async function processCsvFile(
  csvFilePath: string
): Promise<GenerationResult[]> {
  try {
    // Ensure the Supabase bucket exists
    await createBucketIfNotExists(GENERATED_IMAGES_BUCKET, { public: true });

    // Read and parse CSV file
    const fileContent = fs.readFileSync(csvFilePath, "utf8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }) as ImageEntry[];

    console.log(`Processing ${records.length} entries from CSV file...`);

    // Process each entry
    const results: GenerationResult[] = [];

    for (const entry of records) {
      const startTime = Date.now();
      try {
        console.log(`Generating image for: ${entry.target_url}`);
        console.log(`Prompt: ${entry.prompt}`);

        // Generate image
        const imageResponse = await generateImage(entry.prompt);

        // Create file path for Supabase
        const fileName =
          entry.target_url.replace(/^\//, "").replace(/\//g, "-") + ".png";
        const filePath = `${entry.image_type}/${fileName}`;

        // Save metadata
        const metadata = {
          original_url: entry.original_url,
          target_url: entry.target_url,
          image_type: entry.image_type,
          prompt: entry.prompt,
          generation_date: new Date().toISOString(),
        };

        // Upload to Supabase
        const supabaseUrl = await uploadImage(
          imageResponse.imageUrl,
          filePath,
          GENERATED_IMAGES_BUCKET,
          metadata
        );
        const endTime = Date.now();

        results.push({
          entry,
          imageUrl: imageResponse.imageUrl,
          supabaseUrl,
          success: true,
          timestamp: new Date().toISOString(),
          processingTimeMs: endTime - startTime,
        });

        console.log(
          `Successfully generated and uploaded image: ${supabaseUrl}`
        );
        console.log(`Processing time: ${(endTime - startTime) / 1000} seconds`);
      } catch (error) {
        const endTime = Date.now();
        console.error(`Error processing entry ${entry.target_url}:`, error);

        results.push({
          entry,
          imageUrl: "",
          success: false,
          error,
          timestamp: new Date().toISOString(),
          processingTimeMs: endTime - startTime,
        });
      }

      // Add a small delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Log summary
    const successCount = results.filter((r) => r.success).length;
    console.log(
      `Batch processing complete. ${successCount}/${results.length} images generated successfully.`
    );

    return results;
  } catch (error) {
    console.error("Error processing CSV file:", error);
    throw error;
  }
}

/**
 * Process a test batch of images
 *
 * @param csvFilePath - Path to the CSV file (default: test-images.csv)
 * @returns Array of generation results
 */
export async function processTestBatch(
  csvFilePath: string = path.join(
    process.cwd(),
    "Supabase",
    "test-data",
    "test-images.csv"
  )
): Promise<GenerationResult[]> {
  console.log("Starting test batch processing...");
  console.log(`Using CSV file: ${csvFilePath}`);

  return processCsvFile(csvFilePath);
}

/**
 * Save generation results to a JSON file
 *
 * @param results - Array of generation results
 * @param outputPath - Path to save the JSON file
 */
export function saveResultsToJson(
  results: GenerationResult[],
  outputPath: string = path.join(
    process.cwd(),
    "Supabase",
    "test-data",
    "generation-results.json"
  )
): void {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Results saved to: ${outputPath}`);
  } catch (error) {
    console.error("Error saving results to JSON:", error);
    throw error;
  }
}

// Main execution block to run the test batch and save results
(async () => {
  try {
    console.log("Starting batch image generation script...");
    const results = await processTestBatch(); // Uses default test-images.csv
    saveResultsToJson(results); // Saves to default generation-results.json
    console.log("Batch image generation script finished successfully.");
  } catch (error) {
    console.error(
      "Error during batch image generation script execution:",
      error
    );
    process.exit(1); // Exit with error code
  }
})();
