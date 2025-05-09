'use client';

import React from 'react';
import { useUnsplashImages } from '@/hooks/useUnsplashImages';
import UnsplashImage, { UnsplashImagePlaceholder } from '@/components/UnsplashImage';

interface UnsplashGalleryProps {
  query: string;
  perPage?: number;
  random?: boolean;
  count?: number;
  columns?: number;
  gap?: number;
  className?: string;
  imageHeight?: number;
  showAttribution?: boolean;
}

/**
 * A component for displaying a gallery of Unsplash images
 */
export default function UnsplashGallery({
  query,
  perPage = 10,
  random = false,
  count = 10,
  columns = 3,
  gap = 4,
  className = '',
  imageHeight = 300,
  showAttribution = true,
}: UnsplashGalleryProps) {
  const { photos, loading, error, totalResults, fetchNextPage, fetchPreviousPage } = useUnsplashImages({
    query,
    perPage,
    random,
    count: random ? count : undefined,
  });

  // Calculate grid columns based on the columns prop
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';

  // Calculate grid gap based on the gap prop
  const gridGap = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }[gap] || 'gap-4';

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">
        <p>Error loading images: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={`grid ${gridCols} ${gridGap}`}>
        {loading
          ? Array.from({ length: random ? count : perPage }).map((_, index) => (
              <UnsplashImagePlaceholder
                key={`placeholder-${index}`}
                alt="Loading..."
                height={imageHeight}
                className="rounded-lg"
              />
            ))
          : photos.map((photo) => (
              <UnsplashImage
                key={photo.id}
                photo={photo}
                alt={photo.alt_description || 'Unsplash image'}
                height={imageHeight}
                className="rounded-lg"
                showAttribution={showAttribution}
              />
            ))}
      </div>

      {!random && totalResults > perPage && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={fetchPreviousPage}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
            disabled={loading}
          >
            Previous
          </button>
          <button
            onClick={fetchNextPage}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            disabled={loading}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
