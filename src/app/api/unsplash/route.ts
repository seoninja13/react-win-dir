import { NextRequest, NextResponse } from 'next/server';
import { searchPhotos, getRandomPhotos } from '@/utils/unsplash';

/**
 * API route for searching Unsplash photos
 * @param request - The Next.js request object
 * @returns A JSON response with the search results
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
    const perPage = searchParams.get('perPage') ? parseInt(searchParams.get('perPage') as string, 10) : 10;
    const random = searchParams.get('random') === 'true';
    const count = searchParams.get('count') ? parseInt(searchParams.get('count') as string, 10) : 1;

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    if (random) {
      const photos = await getRandomPhotos(query, count);
      return NextResponse.json({ photos });
    } else {
      const response = await searchPhotos(query, page, perPage);
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error('Error fetching Unsplash photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos from Unsplash' },
      { status: 500 }
    );
  }
}
