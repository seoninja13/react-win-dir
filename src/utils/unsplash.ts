/**
 * Unsplash API utility functions
 * 
 * This file contains utility functions for interacting with the Unsplash API.
 * It provides functions for searching photos, getting random photos, and more.
 */

// Define types for Unsplash API responses
export interface UnsplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  downloads: number;
  likes: number;
  liked_by_user: boolean;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
  };
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

/**
 * Search for photos on Unsplash
 * @param query - The search query
 * @param page - The page number (default: 1)
 * @param perPage - The number of photos per page (default: 10)
 * @returns A promise that resolves to the search response
 */
export async function searchPhotos(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashSearchResponse> {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!accessKey) {
    throw new Error('Unsplash access key is not defined');
  }

  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.append('query', query);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', perPage.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get a random photo from Unsplash
 * @param query - The search query (optional)
 * @param count - The number of photos to return (default: 1)
 * @returns A promise that resolves to an array of random photos
 */
export async function getRandomPhotos(
  query?: string,
  count: number = 1
): Promise<UnsplashPhoto[]> {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!accessKey) {
    throw new Error('Unsplash access key is not defined');
  }

  const url = new URL('https://api.unsplash.com/photos/random');
  
  if (query) {
    url.searchParams.append('query', query);
  }
  
  url.searchParams.append('count', count.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get a photo by ID from Unsplash
 * @param id - The photo ID
 * @returns A promise that resolves to the photo
 */
export async function getPhoto(id: string): Promise<UnsplashPhoto> {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!accessKey) {
    throw new Error('Unsplash access key is not defined');
  }

  const url = `https://api.unsplash.com/photos/${id}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Format the Unsplash attribution for a photo
 * @param photo - The Unsplash photo
 * @returns The formatted attribution string
 */
export function formatAttribution(photo: UnsplashPhoto): string {
  return `Photo by ${photo.user.name} on Unsplash`;
}

/**
 * Get the Unsplash attribution link for a photo
 * @param photo - The Unsplash photo
 * @returns The attribution link
 */
export function getAttributionLink(photo: UnsplashPhoto): string {
  return `${photo.links.html}?utm_source=window_world_la&utm_medium=referral`;
}

/**
 * Get the Unsplash user profile link
 * @param photo - The Unsplash photo
 * @returns The user profile link
 */
export function getUserProfileLink(photo: UnsplashPhoto): string {
  return `https://unsplash.com/@${photo.user.username}?utm_source=window_world_la&utm_medium=referral`;
}
