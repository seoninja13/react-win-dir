'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { UnsplashPhoto } from '@/utils/unsplash';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';
import Link from 'next/link';

export default function RoofingPage() {
  const [heroImage, setHeroImage] = useState<UnsplashPhoto | null>(null);
  const [roofingImages, setRoofingImages] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch hero image
        const heroResponse = await fetch('/api/unsplash?query=house+roof+modern&random=true&count=1');
        const heroData = await heroResponse.json();
        if (heroData.photos && heroData.photos.length > 0) {
          setHeroImage(heroData.photos[0]);
        }

        // Fetch roofing images
        const roofingResponse = await fetch('/api/unsplash?query=house+roof+shingles&random=true&count=6');
        const roofingData = await roofingResponse.json();
        if (roofingData.photos && roofingData.photos.length > 0) {
          setRoofingImages(roofingData.photos);
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
              alt="Roofing"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Roofing</h1>
              <p className="mb-8 max-w-2xl text-lg">
                Protect your home with our durable, high-quality roofing solutions.
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

      {/* Roofing Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Roofing Options</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Asphalt Shingles',
                description: 'Our most popular roofing option, offering durability, affordability, and a wide range of colors and styles.',
                link: '/roofing/asphalt-shingles',
              },
              {
                title: 'Metal Roofing',
                description: 'Long-lasting, energy-efficient roofing that can withstand extreme weather conditions.',
                link: '/roofing/metal',
              },
              {
                title: 'Tile Roofing',
                description: 'Beautiful, distinctive roofing that adds character and value to your home.',
                link: '/roofing/tile',
              },
              {
                title: 'Slate Roofing',
                description: 'Premium, natural stone roofing that offers unmatched beauty and longevity.',
                link: '/roofing/slate',
              },
              {
                title: 'Flat Roofing',
                description: 'Specialized solutions for flat or low-slope roofs, designed for maximum durability and water resistance.',
                link: '/roofing/flat',
              },
              {
                title: 'Solar Roofing',
                description: 'Innovative roofing solutions that generate clean energy while protecting your home.',
                link: '/roofing/solar',
              },
            ].map((roofingType, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                {roofingImages[index] ? (
                  <div className="relative h-64 w-full">
                    <Image
                      src={roofingImages[index].urls.regular}
                      alt={roofingType.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                      Photo by {roofingImages[index].user.name} on Unsplash
                    </div>
                  </div>
                ) : (
                  <div className="h-64 w-full animate-pulse bg-gray-200"></div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{roofingType.title}</h3>
                  <p className="mb-4 text-gray-600">{roofingType.description}</p>
                  <Link
                    href={roofingType.link}
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
          <h2 className="mb-12 text-center text-3xl font-bold">Benefits of Our Roofing</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Weather Protection',
                description: 'Our roofing systems are designed to withstand extreme weather conditions, including heavy rain, snow, and high winds.',
                icon: '☔',
              },
              {
                title: 'Energy Efficiency',
                description: 'Energy-efficient roofing can help reduce your heating and cooling costs by reflecting sunlight and providing better insulation.',
                icon: '🌿',
              },
              {
                title: 'Curb Appeal',
                description: 'A new roof can dramatically improve your home's appearance and increase its value.',
                icon: '🏠',
              },
              {
                title: 'Durability',
                description: 'Our roofing materials are built to last, with many options offering 30+ years of protection.',
                icon: '💪',
              },
              {
                title: 'Professional Installation',
                description: 'Our expert installers ensure your roof is properly installed for maximum performance and longevity.',
                icon: '🔧',
              },
              {
                title: 'Warranty Protection',
                description: 'Our roofing products come with comprehensive warranties for your peace of mind.',
                icon: '📝',
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {[
              {
                question: 'How do I know if I need a new roof?',
                answer: 'Signs that you may need a new roof include missing or damaged shingles, leaks in your attic after rain, granules in your gutters, and a roof that is 20+ years old. Our experts can provide a free inspection to assess your roof's condition.',
              },
              {
                question: 'How long does a roof replacement take?',
                answer: 'Most residential roof replacements can be completed in 1-3 days, depending on the size and complexity of your roof, as well as weather conditions.',
              },
              {
                question: 'What is the best roofing material for my home?',
                answer: 'The best roofing material depends on various factors, including your home's architecture, your budget, local climate, and personal preferences. Our roofing experts can help you choose the right option during your free consultation.',
              },
              {
                question: 'Do you offer financing for roof replacements?',
                answer: 'Yes, we offer flexible financing options to make your roof replacement more affordable. Contact us to learn about our current financing promotions.',
              },
              {
                question: 'Are your roofing products environmentally friendly?',
                answer: 'Many of our roofing products are designed with sustainability in mind, including recyclable materials and energy-efficient features that can help reduce your carbon footprint.',
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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
