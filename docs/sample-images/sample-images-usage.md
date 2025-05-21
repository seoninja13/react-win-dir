# Sample Images Usage Guide

This document explains how to use the sample images in your components and pages.

## Table of Contents

1. [Overview](#overview)
2. [Available Components](#available-components)
3. [Usage Examples](#usage-examples)
4. [Sample Page](#sample-page)
5. [Customization](#customization)

## Overview

The sample images system provides a way to display placeholder images in your components and pages until real images are available. The system simulates loading images from Supabase storage and provides several components to display these images in different contexts.

## Available Components

### 1. SampleImageGallery

Displays a grid of sample images for a specific category.

```tsx
import SampleImageGallery from '@/components/SampleImageGallery';

<SampleImageGallery 
  category="windows" 
  count={4} 
  className="my-8" 
/>
```

**Props:**
- `category`: The category of images to display ('windows', 'doors', 'siding', 'roofing')
- `count`: The number of images to display (default: 4)
- `className`: Additional CSS classes to apply to the gallery

### 2. SampleHeroImage

Displays a hero image with a title and optional subtitle.

```tsx
import SampleHeroImage from '@/components/SampleHeroImage';

<SampleHeroImage
  category="windows"
  title="Beautiful Windows"
  subtitle="Transform your home with our energy-efficient windows"
  height="h-[600px]"
/>
```

**Props:**
- `category`: The category of images to use ('windows', 'doors', 'siding', 'roofing')
- `title`: The title to display on the hero image
- `subtitle`: Optional subtitle to display on the hero image
- `className`: Additional CSS classes to apply to the hero image
- `height`: The height of the hero image (default: 'h-[500px]')

### 3. SampleProductCard

Displays a product card with an image, title, description, and link.

```tsx
import SampleProductCard from '@/components/SampleProductCard';

<SampleProductCard
  title="Double-Hung Windows"
  description="Our double-hung windows offer classic style with modern performance."
  category="windows"
  href="/windows/double-hung"
/>
```

**Props:**
- `title`: The title of the product
- `description`: The description of the product
- `category`: The category of images to use ('windows', 'doors', 'siding', 'roofing')
- `href`: The URL to link to when the "Learn More" button is clicked
- `className`: Additional CSS classes to apply to the product card

## Usage Examples

### Basic Gallery

```tsx
import SampleImageGallery from '@/components/SampleImageGallery';

export default function GalleryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Window Gallery</h1>
      <SampleImageGallery category="windows" count={8} />
    </div>
  );
}
```

### Product Page Hero

```tsx
import SampleHeroImage from '@/components/SampleHeroImage';

export default function WindowsPage() {
  return (
    <div>
      <SampleHeroImage
        category="windows"
        title="Replacement Windows"
        subtitle="Energy-efficient windows for your home"
      />
      {/* Rest of the page content */}
    </div>
  );
}
```

### Product Listing

```tsx
import SampleProductCard from '@/components/SampleProductCard';

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SampleProductCard
          title="Double-Hung Windows"
          description="Classic style with modern performance."
          category="windows"
          href="/windows/double-hung"
        />
        
        <SampleProductCard
          title="Casement Windows"
          description="Maximum ventilation and unobstructed views."
          category="windows"
          href="/windows/casement"
        />
        
        <SampleProductCard
          title="Sliding Windows"
          description="Smooth operation and contemporary style."
          category="windows"
          href="/windows/sliding"
        />
      </div>
    </div>
  );
}
```

## Sample Page

A complete sample page is available at `/sample-page` that demonstrates how to use all of these components together. You can use this as a reference for implementing your own pages.

## Customization

### Adding New Categories

To add a new category of sample images, update the `SAMPLE_IMAGES` object in `src/utils/use-sample-images.ts`:

```typescript
const SAMPLE_IMAGES: Record<ImageCategory, SampleImage[]> = {
  // Existing categories...
  
  // Add your new category
  newCategory: Array.from({ length: 5 }, (_, i) => ({
    id: `new-category-${i + 1}`,
    name: `new-category${i + 1}.jpg`,
    url: `https://placehold.co/800x600?text=New+Category+Image+${i + 1}`,
    category: 'newCategory',
    alt: `New category sample image ${i + 1}`
  })),
};
```

Also update the `ImageCategory` type to include your new category:

```typescript
export type ImageCategory = 'windows' | 'doors' | 'siding' | 'roofing' | 'newCategory';
```

### Using Real Images

When you're ready to replace the sample images with real images from Supabase storage, you'll need to:

1. Upload your images to Supabase storage
2. Update the `use-sample-images.ts` file to fetch images from Supabase instead of using the hardcoded sample images
3. Update the components to use the real image URLs

This will be implemented in a future update.
