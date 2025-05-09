'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { UnsplashPhoto } from '@/utils/unsplash';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function WindowsPage() {
  const [heroImage, setHeroImage] = useState<UnsplashPhoto | null>(null);
  const [windowImages, setWindowImages] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch hero image
        const heroResponse = await fetch('/api/unsplash?query=modern+windows+home+exterior&random=true&count=1');
        const heroData = await heroResponse.json();
        if (heroData.photos && heroData.photos.length > 0) {
          setHeroImage(heroData.photos[0]);
        }

        // Fetch window images
        const windowsResponse = await fetch('/api/unsplash?query=modern+windows+home&random=true&count=6');
        const windowsData = await windowsResponse.json();
        if (windowsData.photos && windowsData.photos.length > 0) {
          setWindowImages(windowsData.photos);
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
              alt="Modern windows"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Windows</h1>
              <p className="mb-8 max-w-2xl text-lg">
                Discover our wide selection of energy-efficient windows designed to enhance your home's beauty and comfort.
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

      {/* Window Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Window Types</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Double Hung Windows',
                description: 'Our most popular window style, featuring two operable sashes that move up and down.',
                link: '/windows/double-hung',
              },
              {
                title: 'Casement Windows',
                description: 'Hinged on one side and open outward like a door, providing maximum ventilation.',
                link: '/windows/casement',
              },
              {
                title: 'Sliding Windows',
                description: 'Feature sashes that slide horizontally, perfect for spaces where outside clearance is limited.',
                link: '/windows/sliding',
              },
              {
                title: 'Bay & Bow Windows',
                description: 'Extend outward from your home, creating additional interior space and panoramic views.',
                link: '/windows/bay-bow',
              },
              {
                title: 'Picture Windows',
                description: 'Fixed windows that don't open, designed to provide unobstructed views and maximum light.',
                link: '/windows/picture-window',
              },
              {
                title: 'Awning Windows',
                description: 'Hinged at the top and open outward, allowing for ventilation even during light rain.',
                link: '/windows/awning',
              },
            ].map((windowType, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                {windowImages[index] ? (
                  <div className="relative h-64 w-full">
                    <Image
                      src={windowImages[index].urls.regular}
                      alt={windowType.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                      Photo by {windowImages[index].user.name} on Unsplash
                    </div>
                  </div>
                ) : (
                  <div className="h-64 w-full animate-pulse bg-gray-200"></div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{windowType.title}</h3>
                  <p className="mb-4 text-gray-600">{windowType.description}</p>
                  <Link
                    href={windowType.link}
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
          <h2 className="mb-12 text-center text-3xl font-bold">Window Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Energy Efficiency',
                description: 'Our windows are ENERGY STAR® certified, helping you save on heating and cooling costs.',
                icon: '🌿',
              },
              {
                title: 'Noise Reduction',
                description: 'Enjoy a quieter home with our windows that reduce outside noise by up to 40%.',
                icon: '🔇',
              },
              {
                title: 'UV Protection',
                description: 'Our windows block up to 95% of harmful UV rays, protecting your furniture from fading.',
                icon: '☀️',
              },
              {
                title: 'Easy Maintenance',
                description: 'Tilt-in sashes make cleaning a breeze, even for upper-story windows.',
                icon: '🧹',
              },
              {
                title: 'Security',
                description: 'Advanced locking systems provide enhanced security and peace of mind.',
                icon: '🔒',
              },
              {
                title: 'Customization',
                description: 'Choose from a variety of colors, finishes, and hardware options to match your home.',
                icon: '🎨',
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
