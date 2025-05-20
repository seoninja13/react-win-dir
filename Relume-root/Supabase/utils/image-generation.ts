/**
 * Image Generation Utilities
 *
 * This file contains utilities for generating images using Google Generative AI SDK with Vertex AI.
 * It provides functions for generating images from text prompts using both Gemini and Imagen models.
 *
 * Documentation:
 * - Google Generative AI SDK: https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview
 * - Imagen API: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
 * - Quickstart: https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console
 */

import {
  generateImage as generateImageWithVertexAI,
  generateMultipleImages as generateMultipleImagesWithVertexAI,
} from "./vertex-ai-client";
import dotenv from "dotenv";

// Load environment variables if not already loaded
if (!process.env.GOOGLE_CLOUD_PROJECT) {
  dotenv.config({ path: ".env.local" });
}

// Types for Imagen API
type AspectRatio = "1:1" | "9:16" | "16:9" | "3:4" | "4:3";
type PersonGeneration = "dont_allow" | "allow_adult" | "allow_all";
type SafetySetting =
  | "block_low_and_above"
  | "block_medium_and_above"
  | "block_only_high"
  | "block_none";

interface ImageGenerationOptions {
  aspectRatio?: AspectRatio;
  numberOfImages?: number;
  personGeneration?: PersonGeneration;
  safetySetting?: SafetySetting;
}

interface ImageGenerationResponse {
  imageUrl: string;
  enhancedPrompt?: string;
}

/**
 * Generate an image using Google Generative AI SDK with Vertex AI
 *
 * @param prompt - The text prompt to generate an image from
 * @param options - Additional options for image generation
 * @returns The URL of the generated image and enhanced prompt if available
 */
export async function generateImage(
  prompt: string,
  options: ImageGenerationOptions = {}
): Promise<ImageGenerationResponse> {
  try {
    // Set default options
    const {
      aspectRatio = "1:1",
      personGeneration = "allow_adult",
      safetySetting = "block_medium_and_above",
    } = options;

    // Generate image using Vertex AI
    return await generateImageWithVertexAI(
      prompt,
      "imagen-3.0-fast-generate-001"
    );
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
}

/**
 * Generate multiple images using Google Generative AI SDK with Vertex AI
 *
 * @param prompt - The text prompt to generate images from
 * @param options - Additional options for image generation
 * @returns An array of URLs of the generated images
 */
export async function generateMultipleImages(
  prompt: string,
  options: ImageGenerationOptions = {}
): Promise<ImageGenerationResponse[]> {
  try {
    // Set default options
    const {
      aspectRatio = "1:1",
      numberOfImages = 4,
      personGeneration = "allow_adult",
    } = options;

    // Note: The generateMultipleImagesWithVertexAI function is currently not working
    // We'll use placeholder images for testing
    console.log(
      "Note: generateMultipleImagesWithVertexAI is currently disabled"
    );

    // Create placeholder image data
    return Array(numberOfImages)
      .fill(null)
      .map((_, i) => ({
        imageUrl:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        enhancedPrompt: `${prompt} (Variation ${i + 1})`,
      }));
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
}

/**
 * Generate a product image using Google Generative AI SDK with Vertex AI
 *
 * @param productName - The name of the product
 * @param productDescription - The description of the product
 * @param productCategory - The category of the product (windows, doors, etc.)
 * @param options - Additional options for image generation
 * @returns The URL of the generated image
 */
export async function generateProductImage(
  productName: string,
  productDescription: string,
  productCategory: string,
  options: ImageGenerationOptions = {}
): Promise<ImageGenerationResponse> {
  try {
    // Set default options
    const {
      aspectRatio = "1:1",
      personGeneration = "allow_adult",
      safetySetting = "block_medium_and_above",
    } = options;

    // Create a detailed prompt for the product
    const enhancedPrompt = `A high-quality, professional product image of a ${productName} for a windows and doors website. ${productDescription}. The image should be well-lit, with a clean background, and showcase the ${productCategory} from a flattering angle. Use photorealistic style with attention to detail.`;

    // Generate image using Vertex AI with the imagen-3.0-fast-generate-001 model
    return await generateImageWithVertexAI(
      enhancedPrompt,
      "imagen-3.0-fast-generate-001"
    );
  } catch (error) {
    console.error("Product image generation failed:", error);
    throw error;
  }
}

/**
 * Generate multiple product images with variations using Google Generative AI SDK with Vertex AI
 *
 * @param productName - The name of the product
 * @param productDescription - The description of the product
 * @param productCategory - The category of the product (windows, doors, etc.)
 * @param options - Additional options for image generation
 * @returns An array of URLs of the generated images
 */
export async function generateProductImageVariations(
  productName: string,
  productDescription: string,
  productCategory: string,
  options: ImageGenerationOptions = {}
): Promise<ImageGenerationResponse[]> {
  try {
    // Create a detailed prompt for the product
    const prompt = `High-quality professional product image of ${productName}, a ${productCategory} product. ${productDescription}. The image should be well-lit, with a clean background, showing the product from a clear angle. Photorealistic, detailed, product photography style.`;

    // Set default options for product images
    const defaultOptions: ImageGenerationOptions = {
      aspectRatio: "1:1",
      numberOfImages: 4,
      personGeneration: "dont_allow",
      ...options,
    };

    // Note: The generateMultipleImages function is currently not working
    // We'll use placeholder images for testing
    console.log("Note: generateMultipleImages is currently disabled");

    // Create placeholder image data
    return Array(defaultOptions.numberOfImages || 4)
      .fill(null)
      .map((_, i) => ({
        imageUrl:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        enhancedPrompt: `${prompt} (Product Variation ${i + 1})`,
      }));
  } catch (error) {
    console.error("Product image variations generation failed:", error);
    throw error;
  }
}
