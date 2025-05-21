'use client';

import { getRandomSampleImage, ImageCategory } from '@/utils/use-sample-images';
import { useState, useEffect } from 'react';

interface SampleHeroImageProps {
  category: ImageCategory;
  title: string;
  subtitle?: string;
  className?: string;
  height?: string;
}

/**
 * Sample Hero Image Component
 * 
 * This component displays a hero image with a title and optional subtitle.
 * It uses a random sample image from the specified category.
 */
export default function SampleHeroImage({ 
  category, 
  title, 
  subtitle, 
  className = '',
  height = 'h-[500px]'
}: SampleHeroImageProps) {
  const [image, setImage] = useState(getRandomSampleImage(category));

  // Refresh image on mount
  useEffect(() => {
    setImage(getRandomSampleImage(category));
  }, [category]);

  return (
    <div className={`relative ${height} overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
