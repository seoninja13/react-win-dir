'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { UnsplashPhoto } from '@/utils/unsplash';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function VinylSidingPage() {
  const [heroImage, setHeroImage] = useState<UnsplashPhoto | null>(null);
  const [sidingImages, setSidingImages] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch hero image
        const heroResponse = await fetch('/api/unsplash?query=vinyl+siding+home+exterior&random=true&count=1');
        const heroData = await heroResponse.json();
        if (heroData.photos && heroData.photos.length > 0) {
          setHeroImage(heroData.photos[0]);
        }

        // Fetch siding images
        const sidingResponse = await fetch('/api/unsplash?query=house+siding+exterior&random=true&count=6');
        const sidingData = await sidingResponse.json();
        if (sidingData.photos && sidingData.photos.length > 0) {
          setSidingImages(sidingData.photos);
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
              alt="Vinyl siding"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Vinyl Siding</h1>
              <p className="mb-8 max-w-2xl text-lg">
                Transform your home's exterior with our durable, low-maintenance vinyl siding options.
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

      {/* Siding Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Siding Options</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Traditional Lap Siding',
                description: 'Classic horizontal siding that provides a timeless look for any home style.',
                link: '/vinyl-siding/traditional-lap',
              },
              {
                title: 'Dutch Lap Siding',
                description: 'Features a decorative groove that creates a distinctive shadow line and elegant appearance.',
                link: '/vinyl-siding/dutch-lap',
              },
              {
                title: 'Board & Batten Siding',
                description: 'Vertical siding with alternating wide boards and narrow battens for a rustic, farmhouse look.',
                link: '/vinyl-siding/board-batten',
              },
              {
                title: 'Shake & Shingle Siding',
                description: 'Mimics the look of cedar shakes without the maintenance, perfect for accent areas.',
                link: '/vinyl-siding/shake-shingle',
              },
              {
                title: 'Insulated Vinyl Siding',
                description: 'Provides additional energy efficiency with a layer of insulation bonded to the siding.',
                link: '/vinyl-siding/insulated',
              },
              {
                title: 'Vertical Siding',
                description: 'Creates a unique, modern look that can be used for the entire home or as an accent.',
                link: '/vinyl-siding/vertical',
              },
            ].map((sidingType, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                {sidingImages[index] ? (
                  <div className="relative h-64 w-full">
                    <Image
                      src={sidingImages[index].urls.regular}
                      alt={sidingType.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                      Photo by {sidingImages[index].user.name} on Unsplash
                    </div>
                  </div>
                ) : (
                  <div className="h-64 w-full animate-pulse bg-gray-200"></div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{sidingType.title}</h3>
                  <p className="mb-4 text-gray-600">{sidingType.description}</p>
                  <Link
                    href={sidingType.link}
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

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Benefits of Vinyl Siding</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Low Maintenance',
                description: 'Never needs painting, staining, or caulking. Simply rinse with a garden hose occasionally to keep it looking new.',
                icon: '🧹',
              },
              {
                title: 'Durability',
                description: 'Resistant to dents, scratches, and impacts. Won't rot, warp, or crack like wood siding.',
                icon: '💪',
              },
              {
                title: 'Energy Efficiency',
                description: 'Insulated vinyl siding can help reduce energy costs by improving your home's thermal envelope.',
                icon: '🌿',
              },
              {
                title: 'Color Retention',
                description: 'Our vinyl siding features ColorHold® technology that resists fading and keeps your home looking vibrant for years.',
                icon: '🎨',
              },
              {
                title: 'Weather Resistance',
                description: 'Designed to withstand extreme weather conditions, including high winds, heavy rain, and intense sun.',
                icon: '☀️',
              },
              {
                title: 'Cost-Effective',
                description: 'More affordable than many other siding options, with excellent long-term value due to minimal maintenance requirements.',
                icon: '💰',
              },
            ].map((benefit, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 text-4xl">{benefit.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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
