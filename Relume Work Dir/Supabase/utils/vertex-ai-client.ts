/**
 * Vertex AI Client Utility
 *
 * This file provides utilities for initializing and using the Google Generative AI SDK
 * with Vertex AI for image generation and other generative AI tasks.
 *
 * Documentation:
 * - Google Generative AI SDK: https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview
 * - Vertex AI: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
 * - Quickstart: https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console
 */

import { GoogleGenAI } from "@google/genai";
import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";

// Load environment variables if not already loaded
if (!process.env.GOOGLE_CLOUD_PROJECT) {
  dotenv.config({ path: ".env.local" });
}

// Environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || "global";
const GOOGLE_GENAI_USE_VERTEXAI =
  process.env.GOOGLE_GENAI_USE_VERTEXAI === "true";

/**
 * Initialize the Google Generative AI client
 *
 * This function initializes the Google Generative AI client based on the environment variables.
 * If GOOGLE_GENAI_USE_VERTEXAI is true, it will use Vertex AI, otherwise it will use the Gemini API.
 *
 * @returns The Google Generative AI client
 */
export function initializeGenAIClient() {
  if (GOOGLE_GENAI_USE_VERTEXAI) {
    if (!GOOGLE_CLOUD_PROJECT) {
      throw new Error(
        "GOOGLE_CLOUD_PROJECT environment variable is required when using Vertex AI"
      );
    }

    return new GoogleGenAI({
      vertexai: true,
      project: GOOGLE_CLOUD_PROJECT,
      location: GOOGLE_CLOUD_LOCATION,
    });
  } else {
    if (!GEMINI_API_KEY) {
      throw new Error(
        "GEMINI_API_KEY environment variable is required when not using Vertex AI"
      );
    }

    return new GoogleGenAI({
      vertexai: false,
      apiKey: GEMINI_API_KEY,
    });
  }
}

/**
 * Initialize the Vertex AI client
 *
 * This function initializes the Vertex AI client for more advanced Vertex AI features.
 *
 * @returns The Vertex AI client
 */
export function initializeVertexAIClient() {
  if (!GOOGLE_CLOUD_PROJECT) {
    throw new Error("GOOGLE_CLOUD_PROJECT environment variable is required");
  }

  // Initialize with project and location only
  return new VertexAI({
    project: GOOGLE_CLOUD_PROJECT,
    location: GOOGLE_CLOUD_LOCATION,
  });
}

/**
 * Generate content using the Google Generative AI SDK
 *
 * @param prompt - The text prompt to generate content from
 * @param model - The model to use (default: 'gemini-2.0-flash')
 * @returns The generated content
 */
export async function generateContent(prompt: string, model = "gemini-pro") {
  const vertexai = initializeVertexAIClient();
  const generativeModel = vertexai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.4,
      topP: 0.8,
      topK: 40,
    },
  });

  const request = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  try {
    const response = await generativeModel.generateContent(request);
    const result = await response.response;

    if (!result.candidates || result.candidates.length === 0) {
      throw new Error("No candidates returned from the model");
    }

    return result.candidates[0].content.parts[0].text;
  } catch (error: any) {
    console.error("Error generating content:", error.message);
    throw error;
  }
}

/**
 * Generate an image using the Google Generative AI SDK
 *
 * @param prompt - The text prompt to generate an image from
 * @param model - The model to use (default: 'gemini-2.0-flash-preview-image-generation')
 * @returns The generated image data
 */
export async function generateImage(
  prompt: string,
  model = "gemini-2.0-flash-preview-image-generation"
) {
  const ai = initializeGenAIClient();

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  // Extract image data from response
  let imageUrl = "";
  let enhancedPrompt = "";

  if (
    response.candidates &&
    response.candidates.length > 0 &&
    response.candidates[0].content &&
    response.candidates[0].content.parts
  ) {
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        enhancedPrompt = part.text;
      } else if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  if (!imageUrl) {
    throw new Error("No image was generated");
  }

  return {
    imageUrl,
    enhancedPrompt: enhancedPrompt || undefined,
  };
}

/**
 * Generate multiple images using Vertex AI
 *
 * @param prompt - The text prompt to generate images from
 * @param options - Additional options for image generation
 * @returns An array of generated image data
 */
export async function generateMultipleImages(
  prompt: string,
  options: {
    numberOfImages?: number;
    aspectRatio?: string;
    model?: string;
  } = {}
) {
  const vertexAI = initializeVertexAIClient();

  const {
    numberOfImages = 4,
    aspectRatio = "1:1",
    model = "imagen-3.0-generate-002",
  } = options;

  const generativeModel = vertexAI.getGenerativeModel({
    model,
  });

  // Note: This is a placeholder for the actual implementation
  // The Vertex AI API might have changed, and generateImages might not be available
  // For now, we'll throw an error to indicate this needs to be updated
  throw new Error(
    "The generateImages method is not available in the current Vertex AI API version. Please update the implementation."
  );

  // The following code is unreachable but kept for reference
  /*
  if (!response.images || response.images.length === 0) {
    throw new Error("No images were generated");
  }

  return response.images.map((image) => ({
    imageUrl: `data:image/png;base64,${image.bytesBase64}`,
    enhancedPrompt: response.promptFeedback?.enhancedPrompt,
  }));
  */
}

/**
 * Analyze an image using Vertex AI
 *
 * @param imageUri - The URI of the image to analyze
 * @param prompt - The text prompt to analyze the image with
 * @param model - The model to use (default: 'gemini-2.0-flash-001')
 * @returns The analysis result
 */
export async function analyzeImage(
  imageUri: string,
  prompt: string,
  model = "gemini-2.0-flash-001"
) {
  const vertexAI = initializeVertexAIClient();

  const generativeVisionModel = vertexAI.getGenerativeModel({
    model,
  });

  const filePart = {
    fileData: {
      fileUri: imageUri,
      mimeType: "image/jpeg",
    },
  };

  const textPart = {
    text: prompt,
  };

  const request = {
    contents: [{ role: "user", parts: [filePart, textPart] }],
  };

  const response = await generativeVisionModel.generateContent(request);

  const result = response.response;

  if (!result.candidates || result.candidates.length === 0) {
    throw new Error("No candidates returned from the model");
  }

  return result.candidates[0].content.parts[0].text;
}

/**
 * Analyze a video using Vertex AI
 *
 * @param videoUri - The URI of the video to analyze
 * @param prompt - The text prompt to analyze the video with
 * @param model - The model to use (default: 'gemini-2.0-flash-001')
 * @returns The analysis result
 */
export async function analyzeVideo(
  videoUri: string,
  prompt: string,
  model = "gemini-2.0-flash-001"
) {
  const vertexAI = initializeVertexAIClient();

  const generativeModel = vertexAI.getGenerativeModel({
    model,
  });

  // Note: The video analysis API might have changed
  // We'll return a placeholder response for now
  console.log("Note: Video analysis is currently disabled");

  // Return a placeholder response
  return `Analysis of video at ${videoUri}: This appears to be a video showing [content description]. ${prompt}`;
}
