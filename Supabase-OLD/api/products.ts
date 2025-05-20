import { supabase, handleDatabaseError } from './index';
import type { Database } from '../types/database.types';

/**
 * Products API
 * 
 * This file contains functions for interacting with the products table in Supabase.
 * It provides functions for retrieving, creating, updating, and deleting products.
 */

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

/**
 * Get all products, optionally filtered by category
 * 
 * @param category - Optional category to filter by
 * @returns An array of products
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
 * 
 * @param slug - The slug of the product to retrieve
 * @returns The product or null if not found
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
 * 
 * @param product - The product to create
 * @returns The created product or null if creation failed
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
 * 
 * @param id - The ID of the product to update
 * @param updates - The updates to apply to the product
 * @returns The updated product or null if update failed
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
 * 
 * @param id - The ID of the product to delete
 * @returns Whether the deletion was successful
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
