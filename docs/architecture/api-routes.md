# API Routes

This document provides detailed documentation for the API routes in the Window World LA website.

## Overview

The Window World LA website uses Next.js API routes to handle server-side functionality. These API routes are located in the `src/app/api` directory and follow the Next.js App Router convention.

## API Routes Structure

```
src/app/api/
└── unsplash/
    └── route.ts
```

## Unsplash API Route

The Unsplash API route (`src/app/api/unsplash/route.ts`) provides a server-side interface for fetching images from the Unsplash API. This route handles the following functionality:

1. **Search Photos**: Search for photos on Unsplash based on a query
2. **Random Photos**: Get random photos from Unsplash based on a query

### Route Handler

```typescript
// src/app/api/unsplash/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { searchUnsplashPhotos, getRandomUnsplashPhotos } from '@/utils/unsplash';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') || 'windows';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '10', 10);
  const orderBy = (searchParams.get('orderBy') as 'latest' | 'relevant') || 'relevant';
  const random = searchParams.get('random') === 'true';
  const count = parseInt(searchParams.get('count') || '1', 10);

  try {
    if (random) {
      const photos = await getRandomUnsplashPhotos(query, count);
      return NextResponse.json({ photos });
    } else {
      const result = await searchUnsplashPhotos(query, page, perPage, orderBy);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('Error fetching Unsplash photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}
```

### Parameters

The Unsplash API route accepts the following parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | 'windows' | The search query for photos |
| `page` | number | 1 | The page number for paginated results |
| `perPage` | number | 10 | The number of photos per page |
| `orderBy` | string | 'relevant' | The order of results ('latest' or 'relevant') |
| `random` | boolean | false | Whether to fetch random photos |
| `count` | number | 1 | The number of random photos to fetch |

### Response

The Unsplash API route returns a JSON response with the following structure:

#### Search Photos Response

```json
{
  "photos": [
    {
      "id": "string",
      "created_at": "string",
      "updated_at": "string",
      "width": "number",
      "height": "number",
      "color": "string",
      "blur_hash": "string",
      "description": "string",
      "alt_description": "string",
      "urls": {
        "raw": "string",
        "full": "string",
        "regular": "string",
        "small": "string",
        "thumb": "string"
      },
      "links": {
        "self": "string",
        "html": "string",
        "download": "string",
        "download_location": "string"
      },
      "user": {
        "id": "string",
        "username": "string",
        "name": "string",
        "portfolio_url": "string",
        "bio": "string",
        "location": "string",
        "links": {
          "self": "string",
          "html": "string",
          "photos": "string",
          "likes": "string",
          "portfolio": "string",
          "following": "string",
          "followers": "string"
        }
      }
    }
  ],
  "total": "number",
  "total_pages": "number"
}
```

#### Random Photos Response

```json
{
  "photos": [
    {
      "id": "string",
      "created_at": "string",
      "updated_at": "string",
      "width": "number",
      "height": "number",
      "color": "string",
      "blur_hash": "string",
      "description": "string",
      "alt_description": "string",
      "urls": {
        "raw": "string",
        "full": "string",
        "regular": "string",
        "small": "string",
        "thumb": "string"
      },
      "links": {
        "self": "string",
        "html": "string",
        "download": "string",
        "download_location": "string"
      },
      "user": {
        "id": "string",
        "username": "string",
        "name": "string",
        "portfolio_url": "string",
        "bio": "string",
        "location": "string",
        "links": {
          "self": "string",
          "html": "string",
          "photos": "string",
          "likes": "string",
          "portfolio": "string",
          "following": "string",
          "followers": "string"
        }
      }
    }
  ]
}
```

### Error Response

If an error occurs, the API route returns a JSON response with the following structure:

```json
{
  "error": "Failed to fetch photos"
}
```

## Usage

### Fetching Search Photos

```typescript
const response = await fetch('/api/unsplash?query=windows&page=1&perPage=10&orderBy=relevant');
const data = await response.json();
const photos = data.photos;
```

### Fetching Random Photos

```typescript
const response = await fetch('/api/unsplash?query=windows&random=true&count=3');
const data = await response.json();
const photos = data.photos;
```

## Future API Routes

The following API routes are planned for future development:

1. **Contact Form API**: For handling contact form submissions
2. **Newsletter Subscription API**: For handling newsletter subscriptions
3. **Quote Request API**: For handling quote requests

## Related Documentation

- [Unsplash Integration](../integrations/unsplash.md)
- [Page Structure](./page-structure.md)
- [Component Structure](./component-structure.md)
