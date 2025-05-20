import { useState, useEffect } from 'react';
import { getContentBySlug, getAllContent } from '../api/content';
import type { Database } from '../types/database.types';

/**
 * Content Hooks
 * 
 * This file contains React hooks for working with content.
 * It provides hooks for retrieving content by slug and all content.
 */

type Content = Database['public']['Tables']['content']['Row'];

/**
 * Hook for retrieving content by page slug
 * 
 * @param pageSlug - The slug of the page to retrieve content for
 * @returns An object with content, loading, and error properties
 */
export function useContent(pageSlug: string) {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const data = await getContentBySlug(pageSlug);
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (pageSlug) {
      fetchContent();
    }
  }, [pageSlug]);

  return { content, loading, error };
}

/**
 * Hook for retrieving all content
 * 
 * @returns An object with contents, loading, and error properties
 */
export function useAllContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAllContent() {
      try {
        setLoading(true);
        const data = await getAllContent();
        setContents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchAllContent();
  }, []);

  return { contents, loading, error };
}
