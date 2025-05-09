# Unsplash Integration

This document provides detailed information about the Unsplash API integration in the Window World LA website.

## Overview

The Window World LA website uses the Unsplash API to fetch high-quality images for various components. The integration includes a utility file for making API requests, a custom hook for fetching images, and components for displaying images with proper attribution.

## API Credentials

The Unsplash API credentials are stored in the `.env.local` file:

```
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-access-key
UNSPLASH_SECRET_KEY=your-secret-key
UNSPLASH_APPLICATION_ID=your-application-id
```

## Implementation Details

### Utility Functions

The `src/utils/unsplash.ts` file contains utility functions for interacting with the Unsplash API:

- `searchPhotos`: Search for photos on Unsplash
- `getRandomPhotos`: Get random photos from Unsplash
- `getPhoto`: Get a specific photo by ID
- `formatAttribution`: Format the attribution string for a photo
- `getAttributionLink`: Get the attribution link for a photo
- `getUserProfileLink`: Get the user profile link for a photo

### API Route

The `src/app/api/unsplash/route.ts` file contains an API route for fetching Unsplash images. This route handles the following parameters:

- `query`: The search query
- `page`: The page number (default: 1)
- `perPage`: The number of photos per page (default: 10)
- `random`: Whether to fetch random photos (default: false)
- `count`: The number of random photos to fetch (default: 1)

### Custom Hook

The `src/hooks/useUnsplashImages.ts` file contains a custom hook for fetching Unsplash images. This hook provides the following functionality:

- Fetch images based on a search query
- Fetch random images
- Pagination support
- Loading and error states

### Components

The `src/components/UnsplashImage.tsx` file contains components for displaying Unsplash images with proper attribution:

- `UnsplashImage`: A component for displaying an Unsplash image with attribution
- `UnsplashImagePlaceholder`: A placeholder component for when the Unsplash image is not available

The `src/components/UnsplashGallery.tsx` file contains a component for displaying a gallery of Unsplash images:

- `UnsplashGallery`: A component for displaying a gallery of Unsplash images with pagination support

## Usage Examples

### Fetching and Displaying a Single Image

```jsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UnsplashPhoto } from '@/utils/unsplash';

function MyComponent() {
  const [image, setImage] = useState<UnsplashPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('/api/unsplash?query=modern+home&random=true&count=1');
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setImage(data.photos[0]);
        }
      } catch (error) {
        console.error('Error fetching Unsplash image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
      ) : image ? (
        <div className="relative h-64 w-full overflow-hidden rounded-lg">
          <Image
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash image'}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
            Photo by {image.user.name} on Unsplash
          </div>
        </div>
      ) : (
        <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200">
          <p className="text-gray-500">Image not available</p>
        </div>
      )}
    </div>
  );
}
```

### Using the UnsplashGallery Component

```jsx
import UnsplashGallery from '@/components/UnsplashGallery';

function MyGalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Our Gallery</h1>
      <UnsplashGallery
        query="modern windows home"
        perPage={8}
        columns={4}
        gap={4}
        imageHeight={300}
        showAttribution={true}
      />
    </div>
  );
}
```

## Attribution Requirements

When using Unsplash images, it's important to follow their attribution requirements:

1. The photographer's name must be credited
2. The credit must link to their Unsplash profile
3. The credit must include "on Unsplash"

The `UnsplashImage` component handles this automatically by displaying the attribution in the bottom-right corner of the image.

## Related Documentation

- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Next.js Image Component Documentation](https://nextjs.org/docs/api-reference/next/image)
