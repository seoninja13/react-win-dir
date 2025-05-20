# Supabase Integration

This directory contains all the files related to the Supabase integration for the Windows Doors CA website.

## Directory Structure

```
Supabase/
├── client.ts                # Supabase client initialization
├── types/                   # TypeScript types for Supabase
│   └── database.types.ts    # Generated database types
├── api/                     # API utilities
│   ├── index.ts             # Base API utilities
│   ├── products.ts          # Products API
│   ├── content.ts           # Content API
│   ├── leads.ts             # Leads API
│   ├── testimonials.ts      # Testimonials API
│   ├── gallery.ts           # Gallery API
│   └── service-areas.ts     # Service Areas API
├── hooks/                   # React hooks for Supabase
│   ├── useProducts.ts       # Products hook
│   ├── useContent.ts        # Content hook
│   ├── useTestimonials.ts   # Testimonials hook
│   ├── useGallery.ts        # Gallery hook
│   └── useImageGeneration.ts # Image generation hooks
├── utils/                   # Utility functions
│   ├── logging.ts           # Logging utilities
│   ├── forms.ts             # Form validation utilities
│   └── image-generation.ts  # Image generation utilities
├── examples/                # Example components
│   └── ImageGenerationExample.tsx # Image generation example
└── schema.sql               # Database schema
```

## Setup

1. Create a `.env.local` file in the root directory with the following variables:

```
# Supabase Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://wzohdczffpgnpjehhfnb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>

# Google Cloud Environment Variables
GOOGLE_CLOUD_API_KEY=<google-cloud-api-key>
GOOGLE_CLOUD_PROJECT_ID=<google-cloud-project-id>
GOOGLE_CLOUD_LOCATION=us-central1
```

2. Run the SQL script in the Supabase SQL editor to create the database schema:

```sql
-- Copy the contents of schema.sql here
```

## Usage

### Client

```typescript
import { supabase } from 'Supabase/client';

// Example: Fetch products
const { data, error } = await supabase.from('products').select('*');
```

### API

```typescript
import { getProducts } from 'Supabase/api/products';

// Example: Fetch products
const products = await getProducts();
```

### Hooks

```typescript
import { useProducts } from 'Supabase/hooks/useProducts';

// Example: Use products hook
const { products, loading, error } = useProducts();
```

### Image Generation

```typescript
import { generateImage } from 'Supabase/utils/image-generation';

// Example: Generate an image
const result = await generateImage('A modern double-hung window with white frame', {
  aspectRatio: '1:1',
  personGeneration: 'dont_allow'
});

// Example: Use image generation hook
import { useSingleImageGeneration } from 'Supabase/hooks/useImageGeneration';

function MyComponent() {
  const { generateSingleImage, loading, imageData, error } = useSingleImageGeneration();

  const handleGenerateImage = async () => {
    await generateSingleImage('A modern entry door with glass panels');
  };

  return (
    <div>
      <button onClick={handleGenerateImage} disabled={loading}>
        Generate Image
      </button>
      {imageData && <img src={imageData.imageUrl} alt="Generated image" />}
    </div>
  );
}
```

## Database Schema

The database schema is defined in `schema.sql`. It includes the following tables:

- `products`: Stores information about all products (windows, doors, siding, roofing)
- `content`: Stores content for informational pages
- `leads`: Stores customer leads from the Request Free Estimate (RFE) forms
- `testimonials`: Stores customer testimonials
- `gallery`: Stores project images for the gallery page
- `service_areas`: Stores information about service areas
- `logs`: Stores application logs
- `recent_errors`: Stores recent errors for quick access

## Type Generation

To generate TypeScript types from the Supabase database schema:

```bash
supabase gen types typescript --linked > Supabase/types/database.types.ts
```

## Documentation

For more detailed documentation, see:

- [Supabase Integration Documentation](Docs/integrations/supabase.md)
- [Database Schema Documentation](Docs/architecture/database-schema.md)
- [Supabase Implementation Plan](Docs/planning/supabase-implementation-plan.md)

## Google Generative AI SDK

This integration uses Google Generative AI SDK for generating images. The `image-generation.ts` utility provides functions for generating images from text prompts using both Gemini and Imagen models, and the `useImageGeneration.ts` hooks provide React hooks for using these functions in components.

### Features

- Generate high-quality images from text prompts using Gemini or Imagen models
- Control image generation with parameters like aspect ratio, safety settings, and more
- Generate product images with optimized prompts
- Generate multiple variations of product images
- React hooks for easy integration with components

### Models

- **Gemini**: Use `generateImage` function with the Gemini model for general image generation
- **Imagen**: Use `generateMultipleImages` function with the Imagen model for high-quality image generation

### Requirements

- Google Cloud API key with access to Generative AI APIs
- Environment variables set up in `.env.local`

### Example Usage

```typescript
// Generate an image with Gemini
const result = await generateImage("A modern double-hung window with white frame");

// Generate multiple images with Imagen
const images = await generateMultipleImages("A modern entry door with glass panels", {
  numberOfImages: 4,
  aspectRatio: "1:1"
});

// Generate a product image
const productImage = await generateProductImage(
  "Double-Hung Window",
  "Energy-efficient vinyl window with tilt-in sashes for easy cleaning",
  "windows"
);
```

### Documentation

For more information about Google Generative AI SDK, see:
- [Google Generative AI SDK Overview](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview)
- [Imagen on Vertex AI overview](https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview)
- [Generate images using text prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images)
- [Imagen API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api)
- [Quickstart: Generate images using the console](https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console)
