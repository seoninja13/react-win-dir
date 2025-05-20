'use client';

import { useState } from 'react';
import ProductsCrud from './components/ProductsCrud';

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
  const [activeTab, setActiveTab] = useState('database');
  const [activeDbSection, setActiveDbSection] = useState('products');
  const [operations, setOperations] = useState<Operation[]>([]);

  // Tabs for different admin functionalities
  const tabs = [
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
              {activeDbSection === 'content' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Content Management</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Content management interface coming soon...
                  </p>
                </div>
              )}
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
              Content Management (Per Page/Product)
            </h2>
            <p className="text-gray-500">
              Interface to select a page (e.g., awning, bay-bow, custom) and
              edit its textual content will go here.
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">
                Image Management (Per Page/Product)
              </h3>
              <p className="text-gray-500 mt-1">
                Interface to manage images for the selected page/product,
                including triggering new image generation (via Content Engine /
                Vertex AI), will go here.
              </p>
              {/* Placeholder for image management UI elements */}
            </div>
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
            <p className="text-gray-500">
              Interface for managing and interacting with the Content Engine.
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Text Generation</h3>
              {/* Placeholder for text generation testing/controls */}
              <p className="text-gray-500 mt-1">
                Controls for testing text generation prompts, managing templates,
                etc.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Image Generation</h3>
              {/* Placeholder for image generation testing/controls */}
              <p className="text-gray-500 mt-1">
                Controls for testing image generation prompts, viewing generated
                image history, etc.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Configuration</h3>
              {/* Placeholder for Content Engine API keys or settings */}
              <p className="text-gray-500 mt-1">
                Settings for API keys, model selection, global parameters, etc.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
