import { supabase, handleDatabaseError } from './index';
import type { Database } from '../types/database.types';

/**
 * Testimonials API
 * 
 * This file contains functions for interacting with the testimonials table in Supabase.
 * It provides functions for retrieving, creating, updating, and deleting testimonials.
 */

type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];
type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update'];

/**
 * Get all approved testimonials
 * 
 * @returns An array of approved testimonials
 */
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getApprovedTestimonials');
  }
}

/**
 * Get all testimonials (including unapproved ones)
 * 
 * @returns An array of all testimonials
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getAllTestimonials');
  }
}

/**
 * Get testimonials by service
 * 
 * @param service - The service to filter by
 * @returns An array of testimonials for the specified service
 */
export async function getTestimonialsByService(service: string): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .contains('services', [service])
      .eq('approved', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getTestimonialsByService', { service });
  }
}

/**
 * Create a new testimonial
 * 
 * @param testimonial - The testimonial to create
 * @returns The created testimonial or null if creation failed
 */
export async function createTestimonial(testimonial: TestimonialInsert): Promise<Testimonial | null> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'createTestimonial', { testimonial });
  }
}

/**
 * Update a testimonial
 * 
 * @param id - The ID of the testimonial to update
 * @param updates - The updates to apply to the testimonial
 * @returns The updated testimonial or null if update failed
 */
export async function updateTestimonial(id: string, updates: TestimonialUpdate): Promise<Testimonial | null> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'updateTestimonial', { id, updates });
  }
}

/**
 * Delete a testimonial
 * 
 * @param id - The ID of the testimonial to delete
 * @returns Whether the deletion was successful
 */
export async function deleteTestimonial(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    return handleDatabaseError(error, 'deleteTestimonial', { id });
  }
}
