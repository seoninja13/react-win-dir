# Image Generation Utilities

This document provides detailed information about the image generation utilities implemented for the Windows Doors CA website project.

## Overview

The image generation utilities provide a set of functions for generating images using Google's Vertex AI Imagen service. These utilities are designed to be used in conjunction with the batch processing and storage utilities to create a complete image generation pipeline.

## File Structure

The image generation utilities are located in the following files:

- `Supabase/utils/image-generation.ts`: High-level image generation functions
- `Supabase/utils/vertex-ai-client.ts`: Low-level Vertex AI client functions

## Key Functions

### image-generation.ts

#### `generateImage`

Generates a single image using the Vertex AI Imagen service.

```typescript
export async function generateImage(
  prompt: string,
  options: ImageGenerationOptions = {}
): Promise<ImageGenerationResponse>
```

**Parameters:**
- `prompt`: The text prompt to generate an image from
- `options`: Additional options for image generation (optional)

**Returns:**
- `ImageGenerationResponse`: The URL of the generated image and enhanced prompt if available

#### `generateMultipleImages`

Generates multiple images using the Vertex AI Imagen service.

```typescript
export async function generateMultipleImages(
  prompt: string,
  options: ImageGenerationOptions = {}
): Promise<ImageGenerationResponse[]>
```

**Parameters:**
- `prompt`: The text prompt to generate images from
- `options`: Additional options for image generation (optional)

**Returns:**
- `ImageGenerationResponse[]`: An array of URLs of the generated images

#### `generateProductImage`

Generates a product image using the Vertex AI Imagen service.

```typescript
export async function generateProductImage(
  productName: string,
  productDescription: string,
  productCategory: string,
  options: ImageGenerationOptions = {}
): Promise<ImageGenerationResponse>
```

**Parameters:**
- `productName`: The name of the product
- `productDescription`: The description of the product
- `productCategory`: The category of the product (windows, doors, etc.)
- `options`: Additional options for image generation (optional)

**Returns:**
- `ImageGenerationResponse`: The URL of the generated image

### vertex-ai-client.ts

#### `initializeGenAIClient`

Initializes the Google Generative AI client.

```typescript
export function initializeGenAIClient()
```

**Returns:**
- The Google Generative AI client

#### `initializeVertexAIClient`

Initializes the Vertex AI client.

```typescript
export function initializeVertexAIClient()
```

**Returns:**
- The Vertex AI client

#### `generateImage`

Generates an image using the Google Generative AI SDK.

```typescript
export async function generateImage(prompt: string, model = 'imagen-3.0-fast-generate-001')
```

**Parameters:**
- `prompt`: The text prompt to generate an image from
- `model`: The model to use (default: 'imagen-3.0-fast-generate-001')

**Returns:**
- The generated image data

#### `generateMultipleImages`

Generates multiple images using Vertex AI.

```typescript
export async function generateMultipleImages(
  prompt: string,
  options: {
    numberOfImages?: number;
    aspectRatio?: string;
    model?: string;
  } = {}
)
```

**Parameters:**
- `prompt`: The text prompt to generate images from
- `options`: Additional options for image generation

**Returns:**
- An array of generated image data

## Configuration

### Environment Variables

The following environment variables are required for the image generation utilities:

```
GOOGLE_CLOUD_PROJECT=your-google-cloud-project
GOOGLE_CLOUD_LOCATION=your-google-cloud-location
GOOGLE_GENAI_USE_VERTEXAI=true
```

### Models

The image generation utilities are configured to use the following models:

- `imagen-3.0-fast-generate-001`: A fast version of the Imagen model that provides good quality images with quicker generation times

## Usage Examples

### Generating a Single Image

```typescript
import { generateImage } from '../utils/image-generation';

async function example() {
  const prompt = 'A modern double-hung window with white vinyl frame';
  
  try {
    const result = await generateImage(prompt);
    console.log('Generated image URL:', result.imageUrl);
  } catch (error) {
    console.error('Error generating image:', error);
  }
}
```

### Generating Multiple Images

```typescript
import { generateMultipleImages } from '../utils/image-generation';

async function example() {
  const prompt = 'A modern double-hung window with white vinyl frame';
  
  try {
    const results = await generateMultipleImages(prompt, {
      numberOfImages: 3,
      aspectRatio: '16:9',
    });
    
    results.forEach((result, index) => {
      console.log(`Image ${index + 1} URL:`, result.imageUrl);
    });
  } catch (error) {
    console.error('Error generating images:', error);
  }
}
```

### Generating a Product Image

```typescript
import { generateProductImage } from '../utils/image-generation';

async function example() {
  const productName = 'Double-Hung Window';
  const productDescription = 'A modern window with two sashes that move up and down';
  const productCategory = 'windows';
  
  try {
    const result = await generateProductImage(
      productName,
      productDescription,
      productCategory
    );
    
    console.log('Generated product image URL:', result.imageUrl);
  } catch (error) {
    console.error('Error generating product image:', error);
  }
}
```

## Error Handling

The image generation utilities include comprehensive error handling to ensure that any issues with the Vertex AI service are properly caught and reported. Each function catches errors and logs them to the console, then rethrows the error to allow the calling code to handle it appropriately.

## Limitations

- The Vertex AI Imagen service has quota limits that may restrict the number of images that can be generated in a given time period
- Image generation can be slow, especially for complex prompts
- The quality of generated images depends on the quality of the prompts provided

## Future Improvements

- Add support for more advanced image generation options
- Implement caching to avoid regenerating the same images
- Add support for image editing and variations
