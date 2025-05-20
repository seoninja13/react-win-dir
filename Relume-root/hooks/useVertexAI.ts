'use client';

import { useState } from 'react';
import { 
  initializeVertexAIClient,
  generateContent,
  generateImage, 
  generateMultipleImages 
} from '@/Supabase/utils/vertex-ai-client';

interface ImageGenerationResponse {
  imageUrl: string;
  enhancedPrompt?: string;
}

interface UseVertexAIOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useVertexAI(options: UseVertexAIOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);
  
  const { onSuccess, onError } = options;
  
  // Generate text content
  const generateText = async (prompt: string, model = 'gemini-2.0-flash') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateContent(prompt, model);
      setData(response);
      onSuccess?.(response);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate a single image
  const generateSingleImage = async (prompt: string, model = 'gemini-2.0-flash-preview-image-generation') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateImage(prompt, model);
      setData(response);
      onSuccess?.(response);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate multiple images
  const generateImages = async (
    prompt: string, 
    options: {
      numberOfImages?: number;
      aspectRatio?: string;
      model?: string;
    } = {}
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateMultipleImages(prompt, options);
      setData(response);
      onSuccess?.(response);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    error,
    data,
    generateText,
    generateSingleImage,
    generateImages,
  };
}

// Hook for generating product images
export function useProductImageGeneration(options: UseVertexAIOptions = {}) {
  const vertexAI = useVertexAI(options);
  
  const generateProductImage = async (
    productName: string,
    productDescription: string,
    productCategory: string,
    options: {
      numberOfImages?: number;
      aspectRatio?: string;
    } = {}
  ) => {
    const prompt = `High-quality professional product image of ${productName}, a ${productCategory} product. ${productDescription}. The image should be well-lit, with a clean background, showing the product from a clear angle. Photorealistic, detailed, product photography style.`;
    
    if (options.numberOfImages && options.numberOfImages > 1) {
      return vertexAI.generateImages(prompt, {
        numberOfImages: options.numberOfImages,
        aspectRatio: options.aspectRatio || '1:1',
        model: 'imagen-3.0-generate-002',
      });
    } else {
      return vertexAI.generateSingleImage(prompt);
    }
  };
  
  return {
    ...vertexAI,
    generateProductImage,
  };
}
