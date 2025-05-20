/**
 * Sample Images Hook
 * 
 * This hook provides access to sample images for use in components.
 * It simulates loading images from Supabase storage.
 */

import { useState, useEffect } from 'react';

// Define image categories
export type ImageCategory = 'windows' | 'doors' | 'siding' | 'roofing';

// Define image object
export interface SampleImage {
  id: string;
  name: string;
  url: string;
  category: ImageCategory;
  alt: string;
}

// Sample image data
const SAMPLE_IMAGES: Record<ImageCategory, SampleImage[]> = {
  windows: Array.from({ length: 10 }, (_, i) => ({
    id: `window-${i + 1}`,
    name: `windows${i + 1}.jpg`,
    url: `https://placehold.co/800x600?text=Window+Image+${i + 1}`,
    category: 'windows',
    alt: `Window sample image ${i + 1}`
  })),
  doors: Array.from({ length: 10 }, (_, i) => ({
    id: `door-${i + 1}`,
    name: `luxury-house-doors(${i + 1}).jpg`,
    url: `https://placehold.co/800x600?text=Door+Image+${i + 1}`,
    category: 'doors',
    alt: `Door sample image ${i + 1}`
  })),
  siding: Array.from({ length: 5 }, (_, i) => ({
    id: `siding-${i + 1}`,
    name: `siding${i + 1}.jpg`,
    url: `https://placehold.co/800x600?text=Siding+Image+${i + 1}`,
    category: 'siding',
    alt: `Siding sample image ${i + 1}`
  })),
  roofing: Array.from({ length: 5 }, (_, i) => ({
    id: `roofing-${i + 1}`,
    name: `roofing${i + 1}.jpg`,
    url: `https://placehold.co/800x600?text=Roofing+Image+${i + 1}`,
    category: 'roofing',
    alt: `Roofing sample image ${i + 1}`
  }))
};

/**
 * Hook to get sample images for a specific category
 * 
 * @param category - The category to get images for
 * @param count - The number of images to get (default: all)
 * @returns An array of sample images and loading state
 */
export function useSampleImages(category: ImageCategory, count?: number) {
  const [images, setImages] = useState<SampleImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get images for the specified category
        const categoryImages = SAMPLE_IMAGES[category] || [];
        
        // Limit to count if specified
        const limitedImages = count ? categoryImages.slice(0, count) : categoryImages;
        
        setImages(limitedImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while loading images');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [category, count]);

  return { images, loading, error };
}

/**
 * Get a random sample image for a specific category
 * 
 * @param category - The category to get an image for
 * @returns A random sample image
 */
export function getRandomSampleImage(category: ImageCategory): SampleImage {
  const categoryImages = SAMPLE_IMAGES[category] || [];
  const randomIndex = Math.floor(Math.random() * categoryImages.length);
  return categoryImages[randomIndex];
}

/**
 * Get a specific number of sample images for a category
 * 
 * @param category - The category to get images for
 * @param count - The number of images to get
 * @returns An array of sample images
 */
export function getSampleImages(category: ImageCategory, count: number): SampleImage[] {
  const categoryImages = SAMPLE_IMAGES[category] || [];
  
  if (categoryImages.length <= count) {
    return categoryImages;
  }
  
  // Shuffle array and take first 'count' elements
  return [...categoryImages]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}
