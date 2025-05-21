'use client';

import { useState, useEffect } from 'react';
import ProductsCrud from './components/ProductsCrud';
import ContentCrud from './components/ContentCrud';
import ImageManagement from './components/ImageManagement';
import ContentEngine from './components/ContentEngine';

// Admin operations interface
interface Operation {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  details?: any;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeDbSection, setActiveDbSection] = useState('products');
  const [operations, setOperations] = useState<Operation[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Run the copy-sample-images script when the admin page loads
  useEffect(() => {
    const copySampleImages = async () => {
      try {
        // Call the API route to run the copy-sample-images script
        const response = await fetch('/api/copy-sample-images');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to copy sample images');
        }

        console.log('Sample images copied successfully');
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error copying sample images:', error);
      }
    };

    if (!imagesLoaded) {
      copySampleImages();
    }
  }, [imagesLoaded]);

  // Tabs for different admin functionalities
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'database', label: 'Database Management' },
    { id: 'content', label: 'Content Management' },
    { id: 'users', label: 'User Management' },
    { id: 'content_engine', label: 'Content Engine / Generative Tools' },
    { id: 'settings', label: 'Settings' },
  ];

  // Database sections
  const dbSections = [
    { id: 'products', label: 'Products' },
    { id: 'content', label: 'Content' },
    { id: 'leads', label: 'Leads' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center px-4 py-2 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } text-sm font-medium`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-700">Products</h3>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-700">Content Pages</h3>
                <p className="text-3xl font-bold">24</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-purple-700">Leads</h3>
                <p className="text-3xl font-bold">48</p>
              </div>
            </div>

            {/* Sample Page Link */}
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-700 mb-2">Sample Page</h3>
              <p className="text-gray-700 mb-4">
                A sample page has been created to demonstrate how to use the sample images in your components.
                This page shows how to use the SampleHeroImage, SampleImageGallery, and SampleProductCard components.
              </p>
              <a
                href="/sample-page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                View Sample Page
              </a>
            </div>

            {/* Documentation Link */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-700 mb-2">Sample Images Documentation</h3>
              <p className="text-gray-700 mb-4">
                Documentation is available to help you understand how to use the sample images in your components.
                This includes examples and customization options.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Documentation path: <code>docs/sample-images/sample-images-usage.md</code>
              </p>
            </div>
          </div>
        )}

        {/* Operations Tab */}
        {activeTab === 'operations' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Operations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {operations.map((operation) => (
                    <tr key={operation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {operation.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            operation.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : operation.status === 'failed'
                              ? 'bg-red-100 text-red-800'
                              : operation.status === 'running'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {operation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(operation.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(operation.updatedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => {
                            // View operation details
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Database Management Tab */}
        {activeTab === 'database' && (
          <div className="bg-white shadow rounded-lg">
            {/* Database Section Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {dbSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveDbSection(section.id)}
                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                      activeDbSection === section.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Database Section Content */}
            <div className="p-6">
              {activeDbSection === 'products' && <ProductsCrud />}
              {activeDbSection === 'content' && <ContentCrud />}
              {activeDbSection === 'leads' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Leads Management</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Leads management interface coming soon...
                  </p>
                </div>
              )}
              {activeDbSection === 'testimonials' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Testimonials Management</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Testimonials management interface coming soon...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Image Management
            </h2>
            <ImageManagement />
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            {/* User management interface will go here */}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            {/* Settings interface will go here */}
          </div>
        )}

        {/* Content Engine / Generative Tools Tab */}
        {activeTab === 'content_engine' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Content Engine / Generative Tools
            </h2>
            <ContentEngine />
          </div>
        )}
      </main>
    </div>
  );
}
