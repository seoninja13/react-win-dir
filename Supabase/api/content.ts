import { supabase, handleDatabaseError } from './index';
import type { Database } from '../types/database.types';

/**
 * Content API
 * 
 * This file contains functions for interacting with the content table in Supabase.
 * It provides functions for retrieving, creating, updating, and deleting content.
 */

type Content = Database['public']['Tables']['content']['Row'];
type ContentInsert = Database['public']['Tables']['content']['Insert'];
type ContentUpdate = Database['public']['Tables']['content']['Update'];

/**
 * Get content by page slug
 * 
 * @param pageSlug - The slug of the page to retrieve content for
 * @returns The content or null if not found
 */
export async function getContentBySlug(pageSlug: string): Promise<Content | null> {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('page_slug', pageSlug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No rows returned
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'getContentBySlug', { pageSlug });
  }
}

/**
 * Get all content
 * 
 * @returns An array of all content
 */
export async function getAllContent(): Promise<Content[]> {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('page_slug');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getAllContent');
  }
}

/**
 * Create new content
 * 
 * @param content - The content to create
 * @returns The created content or null if creation failed
 */
export async function createContent(content: ContentInsert): Promise<Content | null> {
  try {
    const { data, error } = await supabase
      .from('content')
      .insert([content])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'createContent', { content });
  }
}

/**
 * Update existing content
 * 
 * @param id - The ID of the content to update
 * @param updates - The updates to apply to the content
 * @returns The updated content or null if update failed
 */
export async function updateContent(id: string, updates: ContentUpdate): Promise<Content | null> {
  try {
    const { data, error } = await supabase
      .from('content')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'updateContent', { id, updates });
  }
}

/**
 * Delete content
 * 
 * @param id - The ID of the content to delete
 * @returns Whether the deletion was successful
 */
export async function deleteContent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    return handleDatabaseError(error, 'deleteContent', { id });
  }
}
