import { useState, useEffect } from 'react';
import { getProducts, getProductBySlug } from '../api/products';
import type { Database } from '../types/database.types';

/**
 * Products Hooks
 * 
 * This file contains React hooks for working with products.
 * It provides hooks for retrieving products and individual products by slug.
 */

type Product = Database['public']['Tables']['products']['Row'];

/**
 * Hook for retrieving products, optionally filtered by category
 * 
 * @param category - Optional category to filter by
 * @returns An object with products, loading, and error properties
 */
export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts(category);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return { products, loading, error };
}

/**
 * Hook for retrieving a product by slug
 * 
 * @param slug - The slug of the product to retrieve
 * @returns An object with product, loading, and error properties
 */
export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading, error };
}
