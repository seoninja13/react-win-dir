'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useLogger } from '@/utils/logger';

interface ProductCategoryTemplateProps {
  category: string;
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  products: Array<{
    name: string;
    description: string;
    image: string;
    slug: string;
  }>;
}

/**
 * Product Category Template
 * 
 * This template can be used for product category pages like Windows, Doors, and Vinyl Siding.
 * It includes sections for hero, features, products, and call-to-action.
 * 
 * Usage:
 * 1. Copy this file to the appropriate directory in src/app
 * 2. Rename it to page.tsx
 * 3. Customize the content as needed
 */
export default function ProductCategoryTemplate({
  category,
  title,
  description,
  features,
  products,
}: ProductCategoryTemplateProps) {
  // Use the logger hook for better component context
  const logger = useLogger(`${category}CategoryPage`);
  
  useEffect(() => {
    // Log that the page has been rendered
    logger.info(`${category} category page rendered`, {
      timestamp: new Date().toISOString(),
    });
    
    // Log migration status
    logger.logPageMigration(`${category}CategoryPage`, 'completed', {
      timestamp: new Date().toISOString(),
      route: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });
  }, [category, logger]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <p className="text-lg text-gray-700 mb-6">{description}</p>
              <Link
                href="/contact"
                className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors inline-block"
              >
                Get a Free Estimate
              </Link>
            </div>
            <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Product Category Image</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                {feature.icon && (
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                )}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Our {category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="bg-gray-300 h-48 flex items-center justify-center">
                  <p className="text-gray-600">Product Image</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <Link
                    href={`/${category}/${product.slug}`}
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to upgrade your {category}?</h2>
            <p className="text-xl mb-6">Contact us today for a free estimate.</p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 py-3 px-6 rounded-md hover:bg-gray-100 transition-colors inline-block"
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* 
Example usage:

export default function WindowsPage() {
  return (
    <ProductCategoryTemplate
      category="windows"
      title="Windows in Sacramento, CA"
      description="Explore our selection of high-quality windows for your home."
      features={[
        {
          title: "Energy Efficient",
          description: "Our windows are designed to maximize energy efficiency and reduce utility bills.",
          icon: "🌿"
        },
        {
          title: "Durable Construction",
          description: "Built to last with premium materials and expert craftsmanship.",
          icon: "🔨"
        },
        {
          title: "Beautiful Design",
          description: "Enhance your home's appearance with stylish window options.",
          icon: "✨"
        }
      ]}
      products={[
        {
          name: "Double-Hung Windows",
          description: "Classic style with modern performance.",
          image: "/images/windows/double-hung.jpg",
          slug: "double-hung"
        },
        {
          name: "Casement Windows",
          description: "Maximum ventilation and unobstructed views.",
          image: "/images/windows/casement.jpg",
          slug: "casement"
        },
        {
          name: "Sliding Windows",
          description: "Space-saving design with easy operation.",
          image: "/images/windows/sliding.jpg",
          slug: "sliding"
        }
      ]}
    />
  );
}
*/
