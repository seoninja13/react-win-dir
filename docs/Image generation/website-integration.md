# Website Integration

This document outlines how to integrate the generated images from the Google Generative AI process into the Windows Doors CA website.

## Overview

After generating images using Vertex AI and storing them in Supabase Storage, we need to integrate these images into the website. This involves updating the website's codebase to reference the generated images and display them in the appropriate locations.

## Image Storage Structure

The generated images are stored in Supabase Storage with the following structure:

```bash
generated-images/
├── homepage--.png
├── product_category--windows.png
├── product_detail--windows-double-hung-windows.png
├── informational--about-us.png
└── gallery--gallery.png
```

Each image filename follows the pattern: `{image_type}--{normalized_target_url}.png`

## Integration Approach

### 1. Create Image Mapping

First, we need to create a mapping between the website URLs and the corresponding image URLs in Supabase:

```typescript
// src/utils/image-mapping.ts

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Bucket name for generated images
const GENERATED_IMAGES_BUCKET = 'generated-images';

// Interface for image mapping
interface ImageMapping {
  [key: string]: string;
}

/**
 * Get the image URL for a specific page
 * 
 * @param targetUrl - The target URL of the page
 * @param imageType - The type of image (homepage, product_category, etc.)
 * @returns The URL of the image
 */
export async function getImageUrl(targetUrl: string, imageType: string): Promise<string> {
  // Normalize the target URL
  const normalizedUrl = targetUrl.replace(/\//g, '-').replace(/^-/, '');
  
  // Create the file path
  const filePath = `${imageType}--${normalizedUrl}.png`;
  
  // Get the public URL
  const { data } = supabase.storage.from(GENERATED_IMAGES_BUCKET).getPublicUrl(filePath);
  
  return data.publicUrl;
}

/**
 * Get all image mappings
 * 
 * @returns A mapping of target URLs to image URLs
 */
export async function getAllImageMappings(): Promise<ImageMapping> {
  // List all files in the bucket
  const { data: files, error } = await supabase.storage.from(GENERATED_IMAGES_BUCKET).list();
  
  if (error) {
    console.error('Error listing files:', error);
    return {};
  }
  
  // Create the mapping
  const mapping: ImageMapping = {};
  
  for (const file of files) {
    // Parse the filename to get the image type and target URL
    const [imageType, normalizedUrl] = file.name.replace('.png', '').split('--');
    
    // Convert the normalized URL back to the target URL
    const targetUrl = '/' + normalizedUrl.replace(/-/g, '/');
    
    // Get the public URL
    const { data } = supabase.storage.from(GENERATED_IMAGES_BUCKET).getPublicUrl(file.name);
    
    // Add to the mapping
    mapping[targetUrl] = data.publicUrl;
  }
  
  return mapping;
}
```

### 2. Create an Image Component

Next, we need to create a component that uses this mapping to display the appropriate image:

```typescript
// src/components/GeneratedImage.tsx

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image-mapping';

interface GeneratedImageProps {
  targetUrl: string;
  imageType: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
}

export default function GeneratedImage({
  targetUrl,
  imageType,
  alt,
  width,
  height,
  className = '',
  fallbackSrc = '/images/placeholder.png',
}: GeneratedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  
  useEffect(() => {
    async function loadImage() {
      try {
        setIsLoading(true);
        const url = await getImageUrl(targetUrl, imageType);
        setImageSrc(url);
        setError(false);
      } catch (err) {
        console.error('Error loading image:', err);
        setImageSrc(fallbackSrc);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadImage();
  }, [targetUrl, imageType, fallbackSrc]);
  
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="animate-pulse">Loading...</span>
        </div>
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={() => {
          setImageSrc(fallbackSrc);
          setError(true);
        }}
      />
      
      {error && process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1">
          Error loading image
        </div>
      )}
    </div>
  );
}
```

### 3. Use the Component in Pages

Now we can use this component in our pages:

```tsx
// src/app/page.tsx

import GeneratedImage from '@/components/GeneratedImage';

export default function HomePage() {
  return (
    <div className="hero-section">
      <GeneratedImage
        targetUrl="/"
        imageType="homepage"
        alt="Windows Doors CA - Home"
        width={1200}
        height={600}
        className="w-full h-auto"
      />
      
      {/* Rest of the homepage content */}
    </div>
  );
}
```

```tsx
// src/app/windows/page.tsx

import GeneratedImage from '@/components/GeneratedImage';

export default function WindowsPage() {
  return (
    <div className="category-page">
      <GeneratedImage
        targetUrl="/windows"
        imageType="product_category"
        alt="Windows Category"
        width={1200}
        height={600}
        className="w-full h-auto"
      />
      
      {/* Rest of the windows page content */}
    </div>
  );
}
```

### 4. Preload Image Mappings

For better performance, we can preload the image mappings during build time:

```typescript
// src/utils/image-preloader.ts

import fs from 'fs';
import path from 'path';
import { getAllImageMappings } from './image-mapping';

/**
 * Preload all image mappings and save them to a JSON file
 */
export async function preloadImageMappings() {
  try {
    const mappings = await getAllImageMappings();
    
    // Save to a JSON file
    const filePath = path.join(process.cwd(), 'public', 'image-mappings.json');
    fs.writeFileSync(filePath, JSON.stringify(mappings, null, 2));
    
    console.log('Image mappings preloaded successfully');
  } catch (error) {
    console.error('Error preloading image mappings:', error);
  }
}
```

Then, in our build script:

```json
// package.json

{
  "scripts": {
    "prebuild": "node -r ts-node/register scripts/preload-images.ts",
    "build": "next build",
    "start": "next start"
  }
}
```

```typescript
// scripts/preload-images.ts

import { preloadImageMappings } from '../src/utils/image-preloader';

async function main() {
  await preloadImageMappings();
}

main().catch(console.error);
```

### 5. Use Preloaded Mappings

Update the `getImageUrl` function to use the preloaded mappings when available:

```typescript
/**
 * Get the image URL for a specific page
 * 
 * @param targetUrl - The target URL of the page
 * @param imageType - The type of image (homepage, product_category, etc.)
 * @returns The URL of the image
 */
export async function getImageUrl(targetUrl: string, imageType: string): Promise<string> {
  // Try to load from preloaded mappings first
  try {
    const mappings = require('../../public/image-mappings.json');
    if (mappings[targetUrl]) {
      return mappings[targetUrl];
    }
  } catch (error) {
    // Preloaded mappings not available, continue with dynamic loading
  }
  
  // Normalize the target URL
  const normalizedUrl = targetUrl.replace(/\//g, '-').replace(/^-/, '');
  
  // Create the file path
  const filePath = `${imageType}--${normalizedUrl}.png`;
  
  // Get the public URL
  const { data } = supabase.storage.from(GENERATED_IMAGES_BUCKET).getPublicUrl(filePath);
  
  return data.publicUrl;
}
```

## Integration with Relume Components

Since our website uses Relume components, we need to integrate our generated images with these components. Here's how to do it:

### 1. Create a Relume-Compatible Image Component

```tsx
// src/components/RelumeGeneratedImage.tsx

import { useState, useEffect } from 'react';
import { getImageUrl } from '@/utils/image-mapping';

interface RelumeGeneratedImageProps {
  targetUrl: string;
  imageType: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  style?: React.CSSProperties;
}

export default function RelumeGeneratedImage({
  targetUrl,
  imageType,
  alt,
  className = '',
  fallbackSrc = '/images/placeholder.png',
  style = {},
}: RelumeGeneratedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  
  useEffect(() => {
    async function loadImage() {
      try {
        const url = await getImageUrl(targetUrl, imageType);
        setImageSrc(url);
      } catch (err) {
        console.error('Error loading image:', err);
        setImageSrc(fallbackSrc);
      }
    }
    
    loadImage();
  }, [targetUrl, imageType, fallbackSrc]);
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      onError={() => setImageSrc(fallbackSrc)}
    />
  );
}
```

### 2. Replace Images in Relume Components

When copying Relume components to use in our pages, replace the image elements with our `RelumeGeneratedImage` component:

```tsx
// Before
<img
  src="https://assets.website-files.com/example.jpg"
  alt="Window Example"
  className="w-full h-auto object-cover"
/>

// After
<RelumeGeneratedImage
  targetUrl="/windows/double-hung-windows"
  imageType="product_detail"
  alt="Double-Hung Windows"
  className="w-full h-auto object-cover"
/>
```

## Testing the Integration

To test the integration:

1. Generate a few test images using the Vertex AI integration
2. Upload them to Supabase Storage with the correct naming convention
3. Implement the image mapping and components
4. Test the website to ensure the images are displayed correctly

## Fallback Strategy

In case an image is not available in Supabase Storage, we should have a fallback strategy:

1. Use placeholder images for each image type
2. Log missing images for later generation
3. Implement a background process to generate missing images

## Conclusion

By following this integration approach, we can seamlessly incorporate the generated images into the Windows Doors CA website. This ensures that the website has high-quality, consistent imagery that matches the style and branding of the original Window World LA website.
