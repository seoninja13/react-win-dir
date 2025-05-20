'use client';

import SampleHeroImage from '@/components/SampleHeroImage';
import SampleImageGallery from '@/components/SampleImageGallery';
import SampleProductCard from '@/components/SampleProductCard';

export default function SamplePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SampleHeroImage
        category="windows"
        title="Sample Page"
        subtitle="This page demonstrates how to use sample images in your components"
      />
      
      {/* Product Showcase */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SampleProductCard
            title="Double-Hung Windows"
            description="Our double-hung windows offer classic style with modern performance. These windows feature two operable sashes that move up and down, providing excellent ventilation options."
            category="windows"
            href="/windows/double-hung"
          />
          
          <SampleProductCard
            title="Entry Doors"
            description="Make a statement with our beautiful entry doors. Designed for security, energy efficiency, and curb appeal, our entry doors are available in a variety of styles and finishes."
            category="doors"
            href="/doors/entry-doors"
          />
          
          <SampleProductCard
            title="Vinyl Siding"
            description="Our vinyl siding offers durability, low maintenance, and energy efficiency. Available in a wide range of colors and styles to complement any home."
            category="siding"
            href="/vinyl-siding"
          />
        </div>
      </section>
      
      {/* Image Gallery */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Window Gallery</h2>
          <SampleImageGallery category="windows" count={8} />
          
          <h2 className="text-3xl font-bold mb-8 mt-16 text-center">Door Gallery</h2>
          <SampleImageGallery category="doors" count={8} />
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Home?</h2>
          <p className="text-xl mb-8">
            Contact us today for a free consultation and estimate.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            Get a Free Estimate
          </a>
        </div>
      </section>
    </div>
  );
}
