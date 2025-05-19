import { NextResponse } from 'next/server';
import { getDefaultImageService } from '@/lib/vertex-ai/image-service';
import { ImageGenerationOptions } from '@/types/vertex-ai';

/**
 * POST /admin/api/vertex-ai/image/generate
 * 
 * Generates an image using Vertex AI's image generation model
 * 
 * Request body:
 * {
 *   prompt: string;           // Required. The text prompt to generate an image from
 *   model?: string;           // Optional. Model to use (default: 'imagegeneration@002')
 *   width?: number;          // Optional. Image width (default: 1024)
 *   height?: number;         // Optional. Image height (default: 1024)
 *   samples?: number;        // Optional. Number of images to generate (default: 1)
 *   safetySettings?: Array<{  // Optional. Safety settings
 *     blocked: boolean;
 *     category: string;      // e.g., 'HARM_CATEGORY_HATE_SPEECH'
 *   }>;
 * }
 * 
 * Response:
 * {
 *   success: boolean;
 *   data?: {
 *     id: string;            // Generated image ID
 *     uri: string;           // Data URL of the generated image
 *     prompt: string;        // The prompt used
 *     model: string;         // Model used for generation
 *     timestamp: string;     // ISO timestamp of generation
 *     size: { width: number, height: number }; // Image dimensions
 *   };
 *   error?: string;          // Error message if success is false
 * }
 */
export async function POST(request: Request) {
  // Check for API key or authentication
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Parse request body
    const body = await request.json() as Partial<ImageGenerationOptions>;
    
    // Validate required fields
    if (!body.prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Initialize the image service
    const imageService = getDefaultImageService();
    
    // Generate the image
    const image = await imageService.generateImage({
      prompt: body.prompt,
      model: body.model,
      width: body.width,
      height: body.height,
      samples: body.samples,
      safetySettings: body.safetySettings,
    });

    // Return the generated image
    return NextResponse.json({
      success: true,
      data: image,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    
    // Handle specific error cases
    if (error.message.includes('GOOGLE_APPLICATION_CREDENTIALS')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Service account credentials not configured. Please set GOOGLE_APPLICATION_CREDENTIALS environment variable.',
          code: 'MISSING_CREDENTIALS'
        },
        { status: 500 }
      );
    }

    // Default error response
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate image',
        code: error.code,
        details: process.env.NODE_ENV === 'development' ? error.details : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
