'use client';

import { useSampleImages, ImageCategory } from '@/utils/use-sample-images';

interface SampleImageGalleryProps {
  category: ImageCategory;
  count?: number;
  className?: string;
}

/**
 * Sample Image Gallery Component
 * 
 * This component displays a gallery of sample images for a specific category.
 * It's intended to be used as a placeholder until real images are available.
 */
export default function SampleImageGallery({ category, count = 4, className = '' }: SampleImageGalleryProps) {
  const { images, loading, error } = useSampleImages(category, count);

  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index} 
            className="aspect-square bg-gray-200 animate-pulse rounded-md"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-50 text-red-700 rounded-md ${className}`}>
        Error loading images: {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className={`p-4 bg-gray-50 text-gray-700 rounded-md ${className}`}>
        No images available for {category} category.
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {images.map((image) => (
        <div key={image.id} className="aspect-square overflow-hidden rounded-md">
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
