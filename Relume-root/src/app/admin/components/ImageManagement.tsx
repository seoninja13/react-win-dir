'use client';

import { useState, useEffect } from 'react';
import { getImages, uploadImage, deleteImage } from '@/Supabase/utils/storage';

interface Image {
  name: string;
  url: string;
  size: number;
  created_at: string;
  category?: string;
}

export default function ImageManagement() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Images' },
    { id: 'windows', name: 'Windows' },
    { id: 'doors', name: 'Doors' },
    { id: 'siding', name: 'Siding' },
    { id: 'roofing', name: 'Roofing' },
    { id: 'other', name: 'Other' },
  ];

  // Fetch images
  useEffect(() => {
    loadImages();
  }, [selectedCategory]);

  const loadImages = async () => {
    try {
      setLoading(true);
      setError(null);

      // For now, we'll just display a message that images would be loaded from Supabase
      // In a real implementation, this would call getImages() to fetch from Supabase
      console.log('Would load images from Supabase storage bucket: sample-images');

      // Simulate loading images from Supabase
      setTimeout(() => {
        // Create sample image data
        const sampleImages: Image[] = [];

        // Windows images
        if (selectedCategory === 'all' || selectedCategory === 'windows') {
          for (let i = 1; i <= 10; i++) {
            sampleImages.push({
              name: `windows${i}.jpg`,
              url: `https://placehold.co/600x400?text=Window+Image+${i}`,
              size: 1024 * 1024, // 1MB
              created_at: new Date().toISOString(),
              category: 'windows'
            });
          }
        }

        // Doors images
        if (selectedCategory === 'all' || selectedCategory === 'doors') {
          for (let i = 1; i <= 10; i++) {
            sampleImages.push({
              name: `luxury-house-doors(${i}).jpg`,
              url: `https://placehold.co/600x400?text=Door+Image+${i}`,
              size: 1024 * 1024, // 1MB
              created_at: new Date().toISOString(),
              category: 'doors'
            });
          }
        }

        setImages(sampleImages);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching images');
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadProgress(0);
      setError(null);

      // Simulate file upload
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`Would upload file ${file.name} to Supabase storage bucket: sample-images`);

        // Simulate progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        setUploadProgress((i + 1) / files.length * 100);
      }

      // Show success message
      setError(null);
      alert('Files would be uploaded to Supabase storage in a real implementation');

      // Reload images after upload
      await loadImages();
      setUploadProgress(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while uploading images');
      setUploadProgress(null);
    }
  };

  const handleDelete = (image: Image) => {
    setSelectedImage(image);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedImage) return;

    try {
      setError(null);

      // Simulate deleting image
      console.log(`Would delete image ${selectedImage.name} from Supabase storage bucket: sample-images`);

      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success message
      alert('Image would be deleted from Supabase storage in a real implementation');

      // Update the UI by removing the image from the list
      setImages(prevImages => prevImages.filter(img => img.name !== selectedImage.name));
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting the image');
    }
  };

  // Filter images by search query
  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !uploadProgress) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Header with Upload button */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Image Management</h3>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
            Upload Images
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-3 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search images by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Upload Progress */}
      {uploadProgress !== null && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Uploading
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {/* Image Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            {searchQuery ? 'No images match your search.' : 'No images found in this category.'}
          </div>
        ) : (
          filteredImages.map((image) => (
            <div key={image.name} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate" title={image.name}>
                  {image.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(image.size / 1024).toFixed(2)} KB • {new Date(image.created_at).toLocaleDateString()}
                </p>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() => navigator.clipboard.writeText(image.url)}
                    className="text-xs text-blue-600 hover:text-blue-900"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleDelete(image)}
                    className="text-xs text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete Image
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this image? This action cannot be undone.
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
                  onClick={confirmDelete}
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
