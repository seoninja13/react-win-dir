'use client';

import React from 'react';
import Image from 'next/image';
import { homeExteriorImages, windowImages, doorImages, sidingImages, roofingImages } from '@/utils/imageUrls.js';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={homeExteriorImages.modern1}
            alt="Modern home exterior"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Los Angeles&apos; Leader in Windows, Doors, & Siding</h1>
          <p className="mb-8 text-xl md:text-2xl">Transform your home with quality products and expert installation</p>
          <button className="rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700">
            Request Free Estimate
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Products</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Windows */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={windowImages.window1}
                alt="Windows"
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="mb-2 text-2xl font-bold">Windows</h3>
                <p className="mb-4 text-sm">Energy-efficient windows that enhance your home&apos;s beauty and comfort.</p>
                <button className="rounded bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-gray-100">
                  Learn More
                </button>
              </div>
            </div>

            {/* Doors */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={doorImages.door1}
                alt="Doors"
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="mb-2 text-2xl font-bold">Doors</h3>
                <p className="mb-4 text-sm">Beautiful, secure doors that make a statement and protect your home.</p>
                <button className="rounded bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-gray-100">
                  Learn More
                </button>
              </div>
            </div>

            {/* Siding */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={sidingImages.siding1}
                alt="Siding"
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="mb-2 text-2xl font-bold">Siding</h3>
                <p className="mb-4 text-sm">Durable, low-maintenance siding that beautifies and protects your home.</p>
                <button className="rounded bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-gray-100">
                  Learn More
                </button>
              </div>
            </div>

            {/* Roofing */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={roofingImages.roof1}
                alt="Roofing"
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="mb-2 text-2xl font-bold">Roofing</h3>
                <p className="mb-4 text-sm">Quality roofing solutions that protect your home for years to come.</p>
                <button className="rounded bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-gray-100">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Transform Your Home?</h2>
          <p className="mb-8 text-xl">Contact us today for a free in-home estimate.</p>
          <button className="rounded-md bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
