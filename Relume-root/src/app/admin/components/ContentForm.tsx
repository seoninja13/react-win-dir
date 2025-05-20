'use client';

import { useState } from 'react';
import type { Database } from '@/Supabase/types/database.types';

type Content = Database['public']['Tables']['content']['Row'];
type ContentInsert = Database['public']['Tables']['content']['Insert'];
type ContentUpdate = Database['public']['Tables']['content']['Update'];

interface ContentFormProps {
  content?: Content;
  onSubmit: (data: ContentInsert) => Promise<void>;
  onCancel: () => void;
}

export default function ContentForm({ content, onSubmit, onCancel }: ContentFormProps) {
  const [formData, setFormData] = useState<ContentInsert>({
    page_slug: content?.page_slug || '',
    title: content?.title || '',
    content: content?.content || null,
    meta_description: content?.meta_description || null,
    images: content?.images || null,
    sections: content?.sections || null,
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
      setError(err instanceof Error ? err.message : 'An error occurred while saving the content');
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

      {/* Page Slug */}
      <div>
        <label htmlFor="page_slug" className="block text-sm font-medium text-gray-700">
          Page Slug *
        </label>
        <input
          type="text"
          name="page_slug"
          id="page_slug"
          required
          value={formData.page_slug || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={formData.title || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          rows={6}
          value={typeof formData.content === 'string' ? formData.content : ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Meta Description */}
      <div>
        <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700">
          Meta Description
        </label>
        <textarea
          name="meta_description"
          id="meta_description"
          rows={2}
          value={typeof formData.meta_description === 'string' ? formData.meta_description : ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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

      {/* Sections (JSON) */}
      <div>
        <label htmlFor="sections" className="block text-sm font-medium text-gray-700">
          Sections (JSON)
        </label>
        <textarea
          name="sections"
          id="sections"
          rows={6}
          value={formData.sections ? JSON.stringify(formData.sections, null, 2) : ''}
          onChange={(e) => handleJsonChange('sections', e.target.value)}
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
          {loading ? 'Saving...' : content ? 'Update Content' : 'Create Content'}
        </button>
      </div>
    </form>
  );
}
