'use client';

import { useState } from 'react';
import type { Database } from '@/Supabase/types/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductInsert) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductInsert>({
    name: product?.name || '',
    slug: product?.slug || '',
    category: product?.category || '',
    subcategory: product?.subcategory || null,
    description: product?.description || null,
    features: product?.features || null,
    specifications: product?.specifications || null,
    images: product?.images || null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJsonChange = (name: string, value: string) => {
    try {
      const jsonValue = value.trim() ? JSON.parse(value) : null;
      setFormData((prev) => ({ ...prev, [name]: jsonValue }));
      setError(null);
    } catch (err) {
      setError(`Invalid JSON in ${name}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={formData.name || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug *
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          required
          value={formData.slug || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          name="category"
          id="category"
          required
          value={formData.category || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="">Select a category</option>
          <option value="windows">Windows</option>
          <option value="doors">Doors</option>
          <option value="siding">Siding</option>
          <option value="roofing">Roofing</option>
        </select>
      </div>

      {/* Subcategory */}
      <div>
        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
          Subcategory
        </label>
        <input
          type="text"
          name="subcategory"
          id="subcategory"
          value={formData.subcategory || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Features (JSON) */}
      <div>
        <label htmlFor="features" className="block text-sm font-medium text-gray-700">
          Features (JSON)
        </label>
        <textarea
          name="features"
          id="features"
          rows={4}
          value={formData.features ? JSON.stringify(formData.features, null, 2) : ''}
          onChange={(e) => handleJsonChange('features', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
        />
      </div>

      {/* Specifications (JSON) */}
      <div>
        <label htmlFor="specifications" className="block text-sm font-medium text-gray-700">
          Specifications (JSON)
        </label>
        <textarea
          name="specifications"
          id="specifications"
          rows={4}
          value={formData.specifications ? JSON.stringify(formData.specifications, null, 2) : ''}
          onChange={(e) => handleJsonChange('specifications', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
        />
      </div>

      {/* Images (JSON) */}
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          Images (JSON)
        </label>
        <textarea
          name="images"
          id="images"
          rows={4}
          value={formData.images ? JSON.stringify(formData.images, null, 2) : ''}
          onChange={(e) => handleJsonChange('images', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
