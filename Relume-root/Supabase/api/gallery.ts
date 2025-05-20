import { supabase, handleDatabaseError } from './index';
import type { Database } from '../types/database.types';

/**
 * Gallery API
 * 
 * This file contains functions for interacting with the gallery table in Supabase.
 * It provides functions for retrieving, creating, updating, and deleting gallery items.
 */

type GalleryItem = Database['public']['Tables']['gallery']['Row'];
type GalleryItemInsert = Database['public']['Tables']['gallery']['Insert'];
type GalleryItemUpdate = Database['public']['Tables']['gallery']['Update'];

/**
 * Get all gallery items
 * 
 * @returns An array of all gallery items
 */
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getAllGalleryItems');
  }
}

/**
 * Get gallery items by project type
 * 
 * @param projectType - The project type to filter by
 * @returns An array of gallery items for the specified project type
 */
export async function getGalleryItemsByProjectType(projectType: string): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('project_type', projectType)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getGalleryItemsByProjectType', { projectType });
  }
}

/**
 * Get a gallery item by ID
 * 
 * @param id - The ID of the gallery item to retrieve
 * @returns The gallery item or null if not found
 */
export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No rows returned
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'getGalleryItemById', { id });
  }
}

/**
 * Create a new gallery item
 * 
 * @param galleryItem - The gallery item to create
 * @returns The created gallery item or null if creation failed
 */
export async function createGalleryItem(galleryItem: GalleryItemInsert): Promise<GalleryItem | null> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .insert([galleryItem])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'createGalleryItem', { galleryItem });
  }
}

/**
 * Update a gallery item
 * 
 * @param id - The ID of the gallery item to update
 * @param updates - The updates to apply to the gallery item
 * @returns The updated gallery item or null if update failed
 */
export async function updateGalleryItem(id: string, updates: GalleryItemUpdate): Promise<GalleryItem | null> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'updateGalleryItem', { id, updates });
  }
}

/**
 * Delete a gallery item
 * 
 * @param id - The ID of the gallery item to delete
 * @returns Whether the deletion was successful
 */
export async function deleteGalleryItem(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    return handleDatabaseError(error, 'deleteGalleryItem', { id });
  }
}
