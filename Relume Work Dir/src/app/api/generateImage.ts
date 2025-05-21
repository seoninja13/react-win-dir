import { NextResponse } from 'next/server';
import { generateImage, generateMultipleImages } from '@/Supabase/utils/image-generation';

interface RequestBody {
  prompt: string;
  action: 'single' | 'multiple';
  // We can add options here later if needed, matching ImageGenerationOptions from image-generation.ts
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    const { prompt, action } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    if (!action || (action !== 'single' && action !== 'multiple')) {
      return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
    }

    if (action === 'single') {
      const result = await generateImage(prompt);
      return NextResponse.json(result);
    } else {
      const results = await generateMultipleImages(prompt);
      return NextResponse.json(results);
    }
  } catch (error: any) {
    console.error('API - Image generation failed:', error);
    // Check if the error object has a message property
    const errorMessage = error.message || 'Failed to generate image(s)';
    // It might be useful to also log the full error or its structure for more complex cases
    // console.error('Full error object:', JSON.stringify(error, null, 2));
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
