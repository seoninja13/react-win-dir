'use client';

import { useState, useEffect } from 'react';
import { getAllContent, createContent, updateContent, deleteContent } from '@/Supabase/api/content';
import type { Database } from '@/Supabase/types/database.types';
import ContentForm from './ContentForm';

type Content = Database['public']['Tables']['content']['Row'];
type ContentInsert = Database['public']['Tables']['content']['Insert'];
type ContentUpdate = Database['public']['Tables']['content']['Update'];

export default function ContentCrud() {
  const [contentItems, setContentItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch content
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate loading content from Supabase
      console.log('Would load content from Supabase database');

      // Create sample content data
      setTimeout(() => {
        const sampleContent = [
          {
            id: '1',
            page_slug: 'home',
            title: 'Home Page',
            content: 'Welcome to Windows Doors CA',
            meta_description: 'Windows Doors CA - Your trusted source for windows and doors in California',
            meta_keywords: 'windows, doors, california',
            images: null,
            sections: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            page_slug: 'windows',
            title: 'Windows',
            content: 'Explore our window options',
            meta_description: 'High-quality windows for your home',
            meta_keywords: 'windows, energy efficient, vinyl windows',
            images: null,
            sections: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            page_slug: 'doors',
            title: 'Doors',
            content: 'Explore our door options',
            meta_description: 'Beautiful doors for your home',
            meta_keywords: 'doors, entry doors, patio doors',
            images: null,
            sections: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        setContentItems(sampleContent);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching content');
      setLoading(false);
    }
  };

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setIsEditModalOpen(true);
  };

  const handleDelete = (content: Content) => {
    setSelectedContent(content);
    setIsDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Header with Add Content button */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Content Management</h3>
        <button
          onClick={() => {
            setSelectedContent(null);
            setIsEditModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Content
        </button>
      </div>

      {/* Content Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page Slug
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contentItems.map((content) => (
              <tr key={content.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {content.page_slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(content.updated_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(content)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(content)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-5">
                {selectedContent ? 'Edit Content' : 'Add New Content'}
              </h3>
              <ContentForm
                content={selectedContent || undefined}
                onSubmit={async (data) => {
                  try {
                    // Simulate saving content to Supabase
                    console.log('Would save content to Supabase database:', data);

                    // Simulate a delay
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Show success message
                    alert('Content would be saved to Supabase database in a real implementation');

                    // Update the UI
                    if (selectedContent) {
                      // Update existing content
                      setContentItems(prevItems =>
                        prevItems.map(item =>
                          item.id === selectedContent.id
                            ? {
                                ...item,
                                page_slug: data.page_slug,
                                title: data.title,
                                content: data.content || null,
                                meta_description: data.meta_description || null,
                                images: data.images || null,
                                sections: data.sections || null,
                                updated_at: new Date().toISOString()
                              }
                            : item
                        )
                      );
                    } else {
                      // Add new content
                      const newContent: Content = {
                        id: Date.now().toString(),
                        page_slug: data.page_slug,
                        title: data.title,
                        content: data.content || null,
                        meta_description: data.meta_description || null,
                        images: data.images || null,
                        sections: data.sections || null,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                      };
                      setContentItems(prevItems => [...prevItems, newContent]);
                    }

                    setIsEditModalOpen(false);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to save content');
                  }
                }}
                onCancel={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete Content
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this content? This action cannot be undone.
                </p>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (selectedContent) {
                      try {
                        // Simulate deleting content from Supabase
                        console.log(`Would delete content with ID ${selectedContent.id} from Supabase database`);

                        // Simulate a delay
                        await new Promise(resolve => setTimeout(resolve, 500));

                        // Show success message
                        alert('Content would be deleted from Supabase database in a real implementation');

                        // Update the UI by removing the content from the list
                        setContentItems(prevItems => prevItems.filter(item => item.id !== selectedContent.id));
                        setIsDeleteModalOpen(false);
                      } catch (err) {
                        setError(err instanceof Error ? err.message : 'Failed to delete content');
                      }
                    }
                  }}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
