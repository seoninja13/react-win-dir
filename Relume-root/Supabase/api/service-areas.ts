import { supabase, handleDatabaseError } from './index';
import type { Database } from '../types/database.types';

/**
 * Service Areas API
 * 
 * This file contains functions for interacting with the service_areas table in Supabase.
 * It provides functions for retrieving, creating, updating, and deleting service areas.
 */

type ServiceArea = Database['public']['Tables']['service_areas']['Row'];
type ServiceAreaInsert = Database['public']['Tables']['service_areas']['Insert'];
type ServiceAreaUpdate = Database['public']['Tables']['service_areas']['Update'];

/**
 * Get all service areas
 * 
 * @returns An array of all service areas
 */
export async function getAllServiceAreas(): Promise<ServiceArea[]> {
  try {
    const { data, error } = await supabase
      .from('service_areas')
      .select('*')
      .order('city');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getAllServiceAreas');
  }
}

/**
 * Get service areas by state
 * 
 * @param state - The state to filter by
 * @returns An array of service areas in the specified state
 */
export async function getServiceAreasByState(state: string): Promise<ServiceArea[]> {
  try {
    const { data, error } = await supabase
      .from('service_areas')
      .select('*')
      .eq('state', state)
      .order('city');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getServiceAreasByState', { state });
  }
}

/**
 * Get service areas by ZIP code
 * 
 * @param zip - The ZIP code to filter by
 * @returns An array of service areas with the specified ZIP code
 */
export async function getServiceAreasByZip(zip: string): Promise<ServiceArea[]> {
  try {
    const { data, error } = await supabase
      .from('service_areas')
      .select('*')
      .eq('zip', zip);
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getServiceAreasByZip', { zip });
  }
}

/**
 * Check if a location is serviceable
 * 
 * @param city - The city to check
 * @param state - The state to check
 * @param zip - The ZIP code to check (optional)
 * @returns Whether the location is serviceable
 */
export async function isLocationServiceable(city: string, state: string, zip?: string): Promise<boolean> {
  try {
    let query = supabase
      .from('service_areas')
      .select('*')
      .eq('city', city)
      .eq('state', state)
      .eq('available', true);
    
    if (zip) {
      query = query.eq('zip', zip);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return (data || []).length > 0;
  } catch (error) {
    return handleDatabaseError(error, 'isLocationServiceable', { city, state, zip });
  }
}

/**
 * Create a new service area
 * 
 * @param serviceArea - The service area to create
 * @returns The created service area or null if creation failed
 */
export async function createServiceArea(serviceArea: ServiceAreaInsert): Promise<ServiceArea | null> {
  try {
    const { data, error } = await supabase
      .from('service_areas')
      .insert([serviceArea])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'createServiceArea', { serviceArea });
  }
}

/**
 * Update a service area
 * 
 * @param id - The ID of the service area to update
 * @param updates - The updates to apply to the service area
 * @returns The updated service area or null if update failed
 */
export async function updateServiceArea(id: string, updates: ServiceAreaUpdate): Promise<ServiceArea | null> {
  try {
    const { data, error } = await supabase
      .from('service_areas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'updateServiceArea', { id, updates });
  }
}

/**
 * Delete a service area
 * 
 * @param id - The ID of the service area to delete
 * @returns Whether the deletion was successful
 */
export async function deleteServiceArea(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('service_areas')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    return handleDatabaseError(error, 'deleteServiceArea', { id });
  }
}
