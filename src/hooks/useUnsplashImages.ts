'use client';

import { useState, useEffect } from 'react';
import { UnsplashPhoto, UnsplashSearchResponse } from '@/utils/unsplash';

interface UseUnsplashImagesProps {
  query: string;
  page?: number;
  perPage?: number;
  random?: boolean;
  count?: number;
  enabled?: boolean;
}

interface UseUnsplashImagesResult {
  photos: UnsplashPhoto[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
  totalResults: number;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching Unsplash images
 * @param props - The hook props
 * @returns The hook result
 */
export function useUnsplashImages({
  query,
  page = 1,
  perPage = 10,
  random = false,
  count = 1,
  enabled = true,
}: UseUnsplashImagesProps): UseUnsplashImagesResult {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);

  const fetchImages = async (pageToFetch: number = currentPage) => {
    if (!query || !enabled) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('query', query);
      
      if (random) {
        params.append('random', 'true');
        params.append('count', count.toString());
      } else {
        params.append('page', pageToFetch.toString());
        params.append('perPage', perPage.toString());
      }

      const response = await fetch(`/api/unsplash?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (random) {
        setPhotos(data.photos);
        setTotalPages(1);
        setTotalResults(data.photos.length);
      } else {
        const searchResponse = data as UnsplashSearchResponse;
        setPhotos(searchResponse.results);
        setTotalPages(searchResponse.total_pages);
        setTotalResults(searchResponse.total);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchImages(page);
    }
  }, [query, page, perPage, random, count, enabled]);

  const fetchNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchImages(nextPage);
    }
  };

  const fetchPreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchImages(prevPage);
    }
  };

  const refetch = async () => {
    await fetchImages(currentPage);
  };

  return {
    photos,
    loading,
    error,
    totalPages,
    totalResults,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
  };
}
