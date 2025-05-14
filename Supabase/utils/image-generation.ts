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
      "gemini-2.0-flash-preview-image-generation"
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

    // Generate images using Vertex AI
    return await generateMultipleImagesWithVertexAI(prompt, {
      numberOfImages,
      aspectRatio,
      model: "imagen-3.0-generate-002",
    });
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
    // Create a detailed prompt for the product
    const prompt = `High-quality professional product image of ${productName}, a ${productCategory} product. ${productDescription}. The image should be well-lit, with a clean background, showing the product from a clear angle. Photorealistic, detailed, product photography style.`;

    // Set default options for product images
    const defaultOptions: ImageGenerationOptions = {
      aspectRatio: "1:1",
      numberOfImages: 1,
      personGeneration: "dont_allow",
      ...options,
    };

    // Generate image using Vertex AI
    const images = await generateMultipleImages(prompt, defaultOptions);

    return images[0];
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

    // Generate images using Vertex AI
    return await generateMultipleImages(prompt, defaultOptions);
  } catch (error) {
    console.error("Product image variations generation failed:", error);
    throw error;
  }
}
