import { supabase, handleDatabaseError } from './index';
import type { Database } from '../types/database.types';

/**
 * Leads API
 * 
 * This file contains functions for interacting with the leads table in Supabase.
 * It provides functions for retrieving, creating, updating, and deleting leads.
 */

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadInsert = Database['public']['Tables']['leads']['Insert'];
type LeadUpdate = Database['public']['Tables']['leads']['Update'];

/**
 * Create a new lead
 * 
 * @param lead - The lead to create
 * @returns The created lead or null if creation failed
 */
export async function createLead(lead: LeadInsert): Promise<Lead | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'createLead', { lead });
  }
}

/**
 * Get all leads, optionally filtered by status
 * 
 * @param status - Optional status to filter by
 * @returns An array of leads
 */
export async function getLeads(status?: string): Promise<Lead[]> {
  try {
    let query = supabase.from('leads').select('*');
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getLeads', { status });
  }
}

/**
 * Get a lead by ID
 * 
 * @param id - The ID of the lead to retrieve
 * @returns The lead or null if not found
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
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
    return handleDatabaseError(error, 'getLeadById', { id });
  }
}

/**
 * Update a lead
 * 
 * @param id - The ID of the lead to update
 * @param updates - The updates to apply to the lead
 * @returns The updated lead or null if update failed
 */
export async function updateLead(id: string, updates: LeadUpdate): Promise<Lead | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'updateLead', { id, updates });
  }
}

/**
 * Delete a lead
 * 
 * @param id - The ID of the lead to delete
 * @returns Whether the deletion was successful
 */
export async function deleteLead(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    return handleDatabaseError(error, 'deleteLead', { id });
  }
}
