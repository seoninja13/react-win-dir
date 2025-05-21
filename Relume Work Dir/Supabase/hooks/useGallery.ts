import { useState, useEffect } from 'react';
import { getAllGalleryItems, getGalleryItemsByProjectType, getGalleryItemById } from '../api/gallery';
import type { Database } from '../types/database.types';

/**
 * Gallery Hooks
 * 
 * This file contains React hooks for working with gallery items.
 * It provides hooks for retrieving all gallery items, gallery items by project type, and individual gallery items.
 */

type GalleryItem = Database['public']['Tables']['gallery']['Row'];

/**
 * Hook for retrieving all gallery items
 * 
 * @returns An object with galleryItems, loading, and error properties
 */
export function useGalleryItems() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        setLoading(true);
        const data = await getAllGalleryItems();
        setGalleryItems(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryItems();
  }, []);

  return { galleryItems, loading, error };
}

/**
 * Hook for retrieving gallery items by project type
 * 
 * @param projectType - The project type to filter by
 * @returns An object with galleryItems, loading, and error properties
 */
export function useGalleryItemsByProjectType(projectType: string) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        setLoading(true);
        const data = await getGalleryItemsByProjectType(projectType);
        setGalleryItems(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (projectType) {
      fetchGalleryItems();
    }
  }, [projectType]);

  return { galleryItems, loading, error };
}

/**
 * Hook for retrieving a gallery item by ID
 * 
 * @param id - The ID of the gallery item to retrieve
 * @returns An object with galleryItem, loading, and error properties
 */
export function useGalleryItem(id: string) {
  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchGalleryItem() {
      try {
        setLoading(true);
        const data = await getGalleryItemById(id);
        setGalleryItem(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchGalleryItem();
    }
  }, [id]);

  return { galleryItem, loading, error };
}
