'use client';

import { getRandomSampleImage, ImageCategory } from '@/utils/use-sample-images';
import Link from 'next/link';

interface SampleProductCardProps {
  title: string;
  description: string;
  category: ImageCategory;
  href: string;
  className?: string;
}

/**
 * Sample Product Card Component
 * 
 * This component displays a product card with an image, title, and description.
 * It uses a random sample image from the specified category.
 */
export default function SampleProductCard({ 
  title, 
  description, 
  category, 
  href,
  className = '' 
}: SampleProductCardProps) {
  const image = getRandomSampleImage(category);

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${className}`}>
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={image.url}
          alt={`${title} - ${image.alt}`}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <Link 
          href={href}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
