import { supabase, handleDatabaseError } from './index';
import type { Database } from '../../types/supabase';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadInsert = Database['public']['Tables']['leads']['Insert'];
type LeadUpdate = Database['public']['Tables']['leads']['Update'];

/**
 * Create a new lead
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
 * Get all leads
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
