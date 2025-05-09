'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { UnsplashPhoto } from '@/utils/unsplash';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function DoorsPage() {
  const [heroImage, setHeroImage] = useState<UnsplashPhoto | null>(null);
  const [doorImages, setDoorImages] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch hero image
        const heroResponse = await fetch('/api/unsplash?query=modern+entry+door+home&random=true&count=1');
        const heroData = await heroResponse.json();
        if (heroData.photos && heroData.photos.length > 0) {
          setHeroImage(heroData.photos[0]);
        }

        // Fetch door images
        const doorsResponse = await fetch('/api/unsplash?query=modern+doors+home&random=true&count=6');
        const doorsData = await doorsResponse.json();
        if (doorsData.photos && doorsData.photos.length > 0) {
          setDoorImages(doorsData.photos);
        }
      } catch (error) {
        console.error('Error fetching Unsplash images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-gray-200"></div>
        ) : heroImage ? (
          <div className="relative h-full w-full">
            <Image
              src={heroImage.urls.regular}
              alt="Modern doors"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Doors</h1>
              <p className="mb-8 max-w-2xl text-lg">
                Enhance your home's curb appeal and security with our beautiful, durable doors.
              </p>
              <Button title="Request Free Estimate" size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                Request Free Estimate
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
              Photo by {heroImage.user.name} on Unsplash
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <p className="text-gray-500">Image not available</p>
          </div>
        )}
      </section>

      {/* Door Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Door Types</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Entry Doors',
                description: 'Make a statement with our beautiful, secure entry doors that enhance your home's curb appeal.',
                link: '/doors/entry',
              },
              {
                title: 'Patio Doors',
                description: 'Connect your indoor and outdoor living spaces with our stylish, energy-efficient patio doors.',
                link: '/doors/patio',
              },
              {
                title: 'Sliding Doors',
                description: 'Space-saving doors that glide smoothly on tracks, perfect for areas with limited clearance.',
                link: '/doors/sliding',
              },
              {
                title: 'French Doors',
                description: 'Elegant double doors that swing open from the center, adding a touch of sophistication to any home.',
                link: '/doors/hinged-patio-doors',
              },
              {
                title: 'Storm Doors',
                description: 'Add an extra layer of protection against the elements while allowing for ventilation.',
                link: '/doors/storm-doors',
              },
              {
                title: 'Garage Doors',
                description: 'Durable, attractive garage doors that enhance your home's appearance and security.',
                link: '/doors/garage',
              },
            ].map((doorType, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                {doorImages[index] ? (
                  <div className="relative h-64 w-full">
                    <Image
                      src={doorImages[index].urls.regular}
                      alt={doorType.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                      Photo by {doorImages[index].user.name} on Unsplash
                    </div>
                  </div>
                ) : (
                  <div className="h-64 w-full animate-pulse bg-gray-200"></div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{doorType.title}</h3>
                  <p className="mb-4 text-gray-600">{doorType.description}</p>
                  <Link
                    href={doorType.link}
                    className="inline-block rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Door Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Energy Efficiency',
                description: 'Our doors are designed with energy efficiency in mind, helping you save on heating and cooling costs.',
                icon: '🌿',
              },
              {
                title: 'Security',
                description: 'Advanced locking systems and durable materials provide enhanced security for your home.',
                icon: '🔒',
              },
              {
                title: 'Durability',
                description: 'Built to withstand the elements and daily use, our doors are designed to last for years to come.',
                icon: '💪',
              },
              {
                title: 'Low Maintenance',
                description: 'Our doors require minimal maintenance, saving you time and money on upkeep.',
                icon: '🧹',
              },
              {
                title: 'Customization',
                description: 'Choose from a variety of styles, colors, and hardware options to match your home's aesthetic.',
                icon: '🎨',
              },
              {
                title: 'Professional Installation',
                description: 'Our expert installers ensure your door is properly installed for optimal performance.',
                icon: '🔧',
              },
            ].map((feature, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Transform Your Home?</h2>
          <p className="mb-8 text-xl">
            Contact Window World of Los Angeles today for a free in-home estimate on windows, doors, siding, or roofing.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button title="Request Free Estimate" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Request Free Estimate
            </Button>
            <Button title="Call (310) 919-2352" variant="secondary" size="lg" className="border-white text-white hover:bg-blue-700">
              Call (310) 919-2352
            </Button>
          </div>
        </div>
      </section>

      <Footer4 />
    </div>
  );
}
