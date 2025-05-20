# Supabase Integration

This directory contains all the files related to the Supabase integration for the Windows Doors CA website.

## Directory Structure

```markdown
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

    ```makefile
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
import { supabase } from '@/Supabase/client';

// Example: Fetch products
const { data, error } = await supabase.from('products').select('*');
```

### API

```typescript
import { getProducts } from '@/Supabase/api/products';

// Example: Fetch products
const products = await getProducts();
```

### Hooks

```typescript
import { useProducts } from '@/Supabase/hooks/useProducts';

// Example: Use products hook
const { products, loading, error } = useProducts();
```

### Image Generation

```typescript
import { generateImage } from '@/Supabase/utils/image-generation';

// Example: Generate an image
const result = await generateImage('A modern double-hung window with white frame', {
  aspectRatio: '1:1',
  personGeneration: 'dont_allow'
});

// Example: Use image generation hook
import { useSingleImageGeneration } from '@/Supabase/hooks/useImageGeneration';

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
supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > ./Relume-root/Supabase/types/database.types.ts
```

## Additional Documentation

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

## Running Tests and Scripts

Several utility scripts are provided in the `Relume-root/Supabase/utils` and `Relume-root/Supabase/scripts` (if it exists) directories. Ensure your `.env.local` file is correctly set up in the project root.

**1. Test Database Connection:**

To test the connection to your Supabase database:

```bash
npx tsx c:/Users/IvoD/repos/react-win-dir/Relume-root/Supabase/utils/test-db-connection.ts
```

This script will attempt to connect and query system schemas.

**2. Test Storage Read:**

To test reading from Supabase Storage (ensure a bucket and file exist, or modify the script):

```bash
npx tsx c:/Users/IvoD/repos/react-win-dir/Relume-root/Supabase/utils/test-read-storage.ts
```

**3. Test Vertex AI Client (if applicable):**

If you have a specific test script for Vertex AI, run it similarly, e.g.:

```bash
npx tsx c:/Users/IvoD/repos/react-win-dir/Relume-root/Supabase/utils/test-vertex-ai.ts
```

Ensure `dotenv/config` is imported if scripts rely on `.env.local` and `tsx` doesn't preload it.

### Vertex AI Integration (`Relume-root/Supabase/utils/vertex-ai-client.ts` etc.)

Make sure the service account key (e.g., `vertex-ai-imagen-service-account-key.json`) is correctly referenced if used, typically at the project root or a secure, non-committed location, and its path is correctly specified in `Relume-root/Supabase/utils/vertex-ai-client.ts` if hardcoded (not recommended for production) or loaded via environment variables.

Test scripts for Vertex AI might exist in the root `scripts` directory (e.g., `test-vertex-ai.ts` if it was moved there or similar scripts).

Example run command for a hypothetical test script (adjust path as necessary):

```bash
npx ts-node -r dotenv/config c:/Users/IvoD/repos/react-win-dir/scripts/test-vertex-ai.ts 
```

### Notes on ESM vs CommonJS

- Some utility scripts (e.g., in the root `scripts` directory) might be CommonJS (`.js` or `.cjs`) and use `require()`.
- Next.js components and modules within `Relume-root/src` are typically ES Modules and use `import`.
- Pay attention to `type: "module"` in `package.json` if present, as it affects how `.js` files are treated.
- TypeScript files (`.ts`) compiled by `tsc` or run by `tsx`/`ts-node` will handle imports according to your `tsconfig.json` module settings.

Ensure consistency or handle differences appropriately.

### Original README Content (Pre-Move)

{{ ... }}
