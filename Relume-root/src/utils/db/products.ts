import { supabase, handleDatabaseError } from './index';
import type { Database } from '../../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

/**
 * Get all products, optionally filtered by category
 */
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    let query = supabase.from('products').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, 'getProducts', { category });
  }
}

/**
 * Get a product by its slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No rows returned
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'getProductBySlug', { slug });
  }
}

/**
 * Create a new product
 */
export async function createProduct(product: ProductInsert): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'createProduct', { product });
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, updates: ProductUpdate): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    return handleDatabaseError(error, 'updateProduct', { id, updates });
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    return handleDatabaseError(error, 'deleteProduct', { id });
  }
}
