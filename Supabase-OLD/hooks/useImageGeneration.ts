import { useState } from "react";
import {
  generateImage,
  generateMultipleImages,
  generateProductImage as generateProductImageUtil,
  generateProductImageVariations as generateProductImageVariationsUtil,
} from "../utils/image-generation";

/**
 * Image Generation Hooks
 *
 * This file contains React hooks for generating images using Google Generative AI SDK.
 *
 * Documentation:
 * - Google Generative AI SDK: https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview
 * - Imagen API: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
 * - Quickstart: https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console
 */

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
 * Hook for generating a single image
 *
 * @returns An object with generateImage function, loading state, generated image URL, and error
 */
export function useSingleImageGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [imageData, setImageData] = useState<ImageGenerationResponse | null>(
    null
  );

  /**
   * Generate an image from a text prompt
   *
   * @param prompt - The text prompt to generate an image from
   * @param options - Additional options for image generation
   */
  const generateSingleImage = async (
    prompt: string,
    options: ImageGenerationOptions = {}
  ) => {
    try {
      setLoading(true);
      setError(null);

      const result = await generateImage(prompt, options);
      setImageData(result);

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { generateSingleImage, loading, imageData, error };
}

/**
 * Hook for generating multiple images
 *
 * @returns An object with generateImages function, loading state, generated image URLs, and error
 */
export function useMultipleImageGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [imagesData, setImagesData] = useState<ImageGenerationResponse[]>([]);

  /**
   * Generate multiple images from a text prompt
   *
   * @param prompt - The text prompt to generate images from
   * @param options - Additional options for image generation
   */
  const generateImages = async (
    prompt: string,
    options: ImageGenerationOptions = {}
  ) => {
    try {
      setLoading(true);
      setError(null);

      const results = await generateMultipleImages(prompt, options);
      setImagesData(results);

      return results;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { generateImages, loading, imagesData, error };
}

/**
 * Hook for generating product images
 *
 * @returns An object with generateProductImage function, loading state, generated image URL, and error
 */
export function useProductImageGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [imageData, setImageData] = useState<ImageGenerationResponse | null>(
    null
  );

  /**
   * Generate a product image from a product name and description
   *
   * @param productName - The name of the product
   * @param productDescription - The description of the product
   * @param productCategory - The category of the product (windows, doors, etc.)
   * @param options - Additional options for image generation
   */
  const generateProductImage = async (
    productName: string,
    productDescription: string,
    productCategory: string,
    options: ImageGenerationOptions = {}
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Set default options for product images
      const defaultOptions: ImageGenerationOptions = {
        aspectRatio: "1:1",
        personGeneration: "dont_allow",
        ...options,
      };

      const result = await generateProductImageUtil(
        productName,
        productDescription,
        productCategory,
        defaultOptions
      );

      setImageData(result);

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { generateProductImage, loading, imageData, error };
}

/**
 * Hook for generating multiple product image variations
 *
 * @returns An object with generateProductImageVariations function, loading state, generated image URLs, and error
 */
export function useProductImageVariations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [imagesData, setImagesData] = useState<ImageGenerationResponse[]>([]);

  /**
   * Generate multiple product image variations from a product name and description
   *
   * @param productName - The name of the product
   * @param productDescription - The description of the product
   * @param productCategory - The category of the product (windows, doors, etc.)
   * @param options - Additional options for image generation
   */
  const generateProductImageVariations = async (
    productName: string,
    productDescription: string,
    productCategory: string,
    options: ImageGenerationOptions = {}
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Set default options for product images
      const defaultOptions: ImageGenerationOptions = {
        aspectRatio: "1:1",
        numberOfImages: 4,
        personGeneration: "dont_allow",
        ...options,
      };

      const results = await generateProductImageVariationsUtil(
        productName,
        productDescription,
        productCategory,
        defaultOptions
      );

      setImagesData(results);

      return results;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { generateProductImageVariations, loading, imagesData, error };
}
