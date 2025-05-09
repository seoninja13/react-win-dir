'use client';

import React from 'react';
import Image from 'next/image';
import { UnsplashPhoto, formatAttribution, getAttributionLink, getUserProfileLink } from '@/utils/unsplash';

interface UnsplashImageProps {
  photo: UnsplashPhoto;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  showAttribution?: boolean;
  attributionPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  priority?: boolean;
}

/**
 * A component for displaying Unsplash images with proper attribution
 */
export default function UnsplashImage({
  photo,
  alt,
  width,
  height,
  fill = false,
  className = '',
  showAttribution = true,
  attributionPosition = 'bottom-right',
  priority = false,
}: UnsplashImageProps) {
  // Position classes for attribution
  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };

  return (
    <div className={`relative ${className}`}>
      {fill ? (
        <Image
          src={photo.urls.regular}
          alt={alt || photo.alt_description || 'Unsplash image'}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
      ) : (
        <Image
          src={photo.urls.regular}
          alt={alt || photo.alt_description || 'Unsplash image'}
          width={width || photo.width}
          height={height || photo.height}
          priority={priority}
        />
      )}
      
      {showAttribution && (
        <a
          href={getAttributionLink(photo)}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute ${positionClasses[attributionPosition]} bg-black bg-opacity-50 px-2 py-1 text-xs text-white transition-opacity hover:bg-opacity-75`}
        >
          {formatAttribution(photo)}
        </a>
      )}
    </div>
  );
}

/**
 * A placeholder component for when the Unsplash photo is not available
 */
export function UnsplashImagePlaceholder({
  alt,
  width,
  height,
  fill = false,
  className = '',
}: {
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className} bg-gray-200`}>
      {fill ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400">{alt}</span>
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ width: width || '100%', height: height || '300px' }}
        >
          <span className="text-gray-400">{alt}</span>
        </div>
      )}
    </div>
  );
}
