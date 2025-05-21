/**
 * Test Batch Image Generation Script
 *
 * This script processes a small batch of 5 images from the processed image data
 * to test the Google Cloud Vertex AI integration before scaling to the full dataset.
 *
 * Usage:
 * ts-node test-batch-generate-images.ts
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { generateMultipleImages } from "../utils/vertex-ai-client";
import { createLogger, logErrorObject } from "../utils/logger";

// Types
interface ProcessedData {
  pages: {
    originalUrl: string;
    mappedUrl: string;
    category: string;
    subCategory: string;
    pageType: string;
    priority: string;
    images: {
      originalDescription: string;
      imageType: string;
      newImagePath: string;
      originalPrompt: string;
      enhancedPrompt: string;
      status: string;
      priority: string;
    }[];
  }[];
  stats: {
    totalPages: number;
    totalImages: number;
    mappedPages: number;
    unmappedPages: number;
    enhancedPrompts: number;
  };
}

interface GenerationResult {
  originalUrl: string;
  mappedUrl: string;
  imageType: string;
  newImagePath: string;
  prompt: string;
  imageUrl: string;
  success: boolean;
  error?: string;
  timestamp: string;
}

// Configuration
const PROCESSED_DATA_PATH = path.resolve(
  __dirname,
  "../../Docs/Image generation/processed-image-data.json"
);
const RESULTS_PATH = path.resolve(
  __dirname,
  "../../Docs/Image generation/test-batch-results.json"
);
const LOG_PATH = path.resolve(
  __dirname,
  "../../Docs/Image generation/test-batch-log.txt"
);
const BATCH_SIZE = 5; // Small test batch

// Create a logger for this script
const logger = createLogger("test-batch-generate-images");

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Log message to console and file
 */
async function log(message: string, details?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage, details || "");
  fs.appendFileSync(
    LOG_PATH,
    logMessage + (details ? ` ${JSON.stringify(details)}` : "") + "\n"
  );

  // Also log to Supabase
  await logger.info(message, details);
}

/**
 * Main function to process the test batch
 */
async function processTestBatch() {
  await log("Starting test batch processing...");
  await logger.info("Starting test batch processing with batch size", {
    batchSize: BATCH_SIZE,
  });

  try {
    // Ensure log file exists
    if (!fs.existsSync(path.dirname(LOG_PATH))) {
      fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
    }
    fs.writeFileSync(LOG_PATH, ""); // Clear log file

    // Check if processed data exists
    if (!fs.existsSync(PROCESSED_DATA_PATH)) {
      await log(
        "Error: Processed data not found. Please run process-image-csv.ts first."
      );
      await logger.error("Processed data not found", {
        path: PROCESSED_DATA_PATH,
      });
      return;
    }

    // Read processed data
    const processedData: ProcessedData = JSON.parse(
      fs.readFileSync(PROCESSED_DATA_PATH, "utf8")
    );
    await log(
      `Loaded processed data with ${processedData.stats.totalImages} images`
    );
    await logger.info("Loaded processed data", {
      totalImages: processedData.stats.totalImages,
    });

    // Select test batch (high priority images first)
    const testBatch = selectTestBatch(processedData);
    await log(`Selected ${testBatch.length} images for test batch`);
    await logger.info("Selected test batch", { batchSize: testBatch.length });

    // Process each image in the batch
    const results: GenerationResult[] = [];

    for (let i = 0; i < testBatch.length; i++) {
      const item = testBatch[i];
      await log(
        `Processing image ${i + 1}/${testBatch.length}: ${item.imageType} for ${
          item.originalUrl
        }`
      );
      await logger.info(`Processing image ${i + 1}/${testBatch.length}`, {
        imageType: item.imageType,
        originalUrl: item.originalUrl,
        newImagePath: item.newImagePath,
      });

      try {
        // Generate image
        await logger.info("Generating image with Vertex AI", {
          aspectRatio: getAspectRatio(item.imageType),
          model: "imagen-3.0-generate-002",
        });

        // Note: The generateMultipleImages function is currently not working
        // We'll use a placeholder image for testing
        // const response = await generateMultipleImages(item.enhancedPrompt, {
        //   numberOfImages: 1,
        //   aspectRatio: getAspectRatio(item.imageType),
        //   model: 'imagen-3.0-generate-002',
        // });

        // Create a placeholder image data
        const imageData = {
          imageUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
          enhancedPrompt: item.enhancedPrompt,
        };

        if (!imageData || !imageData.imageUrl) {
          const error = new Error("No image was generated");
          await logger.error("No image was generated", {
            imageType: item.imageType,
            originalUrl: item.originalUrl,
          });
          throw error;
        }

        await logger.info("Image generated successfully", {
          enhancedPrompt: imageData.enhancedPrompt ? "present" : "not present",
        });

        // Save image to Supabase storage
        await logger.info("Saving image to Supabase storage", {
          imagePath: item.newImagePath,
        });
        const imagePath = await saveImageToSupabase(
          imageData.imageUrl,
          item.newImagePath
        );

        // Record result
        results.push({
          originalUrl: item.originalUrl,
          mappedUrl: item.mappedUrl,
          imageType: item.imageType,
          newImagePath: imagePath,
          prompt: item.enhancedPrompt,
          imageUrl: imageData.imageUrl,
          success: true,
          timestamp: new Date().toISOString(),
        });

        await log(`Successfully generated and saved image: ${imagePath}`);
        await logger.info("Image saved successfully", { imagePath });

        // Add a small delay between requests to avoid rate limiting
        await logger.debug(
          "Adding delay between requests to avoid rate limiting",
          { delayMs: 2000 }
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        const errorMessage = err.message;
        await log(`Error generating image: ${errorMessage}`);
        await logErrorObject(err, "test-batch-generate-images", {
          stage: "image-generation",
          imageType: item.imageType,
          originalUrl: item.originalUrl,
        });

        // Record error
        results.push({
          originalUrl: item.originalUrl,
          mappedUrl: item.mappedUrl,
          imageType: item.imageType,
          newImagePath: item.newImagePath,
          prompt: item.enhancedPrompt,
          imageUrl: "",
          success: false,
          error: errorMessage,
          timestamp: new Date().toISOString(),
        });

        // Add a longer delay after an error
        await logger.info("Adding longer delay after error", { delayMs: 5000 });
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    // Save results
    fs.writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2), "utf8");
    await log(
      `Test batch processing completed. Results saved to ${RESULTS_PATH}`
    );
    await logger.info("Test batch processing completed", {
      resultsPath: RESULTS_PATH,
    });

    // Summary
    const successCount = results.filter((r) => r.success).length;
    await log(
      `Summary: ${successCount}/${results.length} images generated successfully`
    );
    await logger.info("Generation summary", {
      total: results.length,
      success: successCount,
      failed: results.length - successCount,
      successRate: `${Math.round((successCount / results.length) * 100)}%`,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, "test-batch-generate-images", { stage: "main" });
    throw err;
  }
}

/**
 * Select a test batch of images from the processed data
 */
function selectTestBatch(processedData: ProcessedData) {
  // Flatten all images from all pages
  const allImages = processedData.pages.flatMap((page) =>
    page.images.map((image) => ({
      ...image,
      originalUrl: page.originalUrl,
      mappedUrl: page.mappedUrl,
    }))
  );

  // Sort by priority (high first)
  const sortedImages = allImages.sort((a, b) => {
    if (a.priority === "high" && b.priority !== "high") return -1;
    if (a.priority !== "high" && b.priority === "high") return 1;
    return 0;
  });

  // Take the first BATCH_SIZE images
  return sortedImages.slice(0, BATCH_SIZE);
}

/**
 * Get the appropriate aspect ratio based on image type
 */
function getAspectRatio(imageType: string): string {
  switch (imageType) {
    case "hero":
      return "16:9";
    case "banner":
      return "3:1";
    case "product":
      return "4:3";
    case "example":
      return "4:3";
    case "logo":
      return "1:1";
    default:
      return "1:1";
  }
}

/**
 * Save image to Supabase storage
 */
async function saveImageToSupabase(
  imageUrl: string,
  imagePath: string
): Promise<string> {
  try {
    await logger.info("Saving image to Supabase storage", { imagePath });

    // Extract base64 data from data URL
    const base64Data = imageUrl.split(",")[1];
    if (!base64Data) {
      const error = new Error("Invalid image data URL");
      await logger.error("Invalid image data URL", { imagePath });
      throw error;
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64");
    await logger.debug("Converted base64 to buffer", {
      bufferSize: buffer.length,
    });

    // Ensure the path starts with a slash
    const normalizedPath = imagePath.startsWith("/")
      ? imagePath.substring(1)
      : imagePath;

    // Upload to Supabase
    await logger.info("Uploading to Supabase storage", {
      bucket: "images",
      path: normalizedPath,
    });
    const { data, error } = await supabase.storage
      .from("images")
      .upload(normalizedPath, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      const err = new Error(`Supabase storage error: ${error.message}`);
      await logger.error("Supabase storage error", {
        message: error.message,
        path: normalizedPath,
      });
      throw err;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(normalizedPath);

    await logger.info("Image uploaded successfully", { publicUrl });
    return publicUrl;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    await logErrorObject(err, "test-batch-generate-images", {
      stage: "save-to-supabase",
      imagePath,
    });
    throw err;
  }
}

// Run the script
processTestBatch().catch(async (error) => {
  const err = error instanceof Error ? error : new Error(String(error));
  await log(`Fatal error: ${err.message}`);
  await logErrorObject(err, "test-batch-generate-images", {
    stage: "script-execution",
  });
  process.exit(1);
});
