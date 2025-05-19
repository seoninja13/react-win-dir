import { NextResponse } from 'next/server';
import { getDefaultImageService } from '@/lib/vertex-ai/image-service'; // Corrected import path
import { ImageGenerationOptions } from '@/types/vertex-ai'; // Corrected import path

/**
 * POST /admin/api/vertex-ai/image/generate
 * (Accessed via /admin/api/vertex-ai/image/generate if base path is /admin for this route group)
 * or directly /api/vertex-ai/image/generate if not in a specific admin route group in 'app'
 * 
 * Generates an image using Vertex AI's image generation model
 */
export async function POST(request: Request) {
  // Check for API key or authentication (adjust as needed for your app's security)
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'your-secure-api-key'; // Example API Key

  if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
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

    // Initialize the image service (uses environment variables for GOOGLE_CLOUD_PROJECT etc.)
    const imageService = getDefaultImageService();
    
    // Generate the image
    const image = await imageService.generateImage({
      prompt: body.prompt,
      model: body.model, // Will use default from image-service if not provided
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

  } catch (error: any) {
    console.error('❌ Error in API route /admin/api/vertex-ai/image/generate:', error);
    
    // Handle specific error cases
    if (error.message.includes('GOOGLE_APPLICATION_CREDENTIALS') || error.message.includes('GOOGLE_CLOUD_PROJECT')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Google Cloud authentication or project configuration error. Check server logs and environment variables (GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION).',
          code: 'MISSING_OR_INVALID_CONFIG'
        },
        { status: 500 }
      );
    }
    if (error.name === 'VertexAIImageServiceError' || error.name === 'VertexAIError') {
        return NextResponse.json(
            { success: false, error: error.message, code: error.code, details: error.details },
            { status: 500 } 
        );
    }

    // Default error response
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate image due to an internal server error.',
        code: error.code || 'INTERNAL_SERVER_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests if needed, 
 * though typically not required for same-origin API routes in Next.js App Router.
 * If your frontend and backend are on different origins, configure CORS headers properly.
 */
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: {
    'Access-Control-Allow-Origin': '*', // Adjust for your specific needs
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }});
}
