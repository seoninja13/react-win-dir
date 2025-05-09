"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@relume_io/relume-ui";
import Image from "next/image";
import { UnsplashPhoto } from "@/utils/unsplash";

export default function Gallery4() {
  const [windowImages, setWindowImages] = useState<UnsplashPhoto[]>([]);
  const [doorImages, setDoorImages] = useState<UnsplashPhoto[]>([]);
  const [sidingImages, setSidingImages] = useState<UnsplashPhoto[]>([]);
  const [roofingImages, setRoofingImages] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch window images
        const windowResponse = await fetch('/api/unsplash?query=modern+windows+home&random=true&count=2');
        const windowData = await windowResponse.json();
        setWindowImages(windowData.photos);

        // Fetch door images
        const doorResponse = await fetch('/api/unsplash?query=modern+entry+door&random=true&count=2');
        const doorData = await doorResponse.json();
        setDoorImages(doorData.photos);

        // Fetch siding images
        const sidingResponse = await fetch('/api/unsplash?query=house+siding+exterior&random=true&count=2');
        const sidingData = await sidingResponse.json();
        setSidingImages(sidingData.photos);

        // Fetch roofing images
        const roofingResponse = await fetch('/api/unsplash?query=house+roof+modern&random=true&count=2');
        const roofingData = await roofingResponse.json();
        setRoofingImages(roofingData.photos);
      } catch (error) {
        console.error('Error fetching Unsplash images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Combine all images and their captions
  const galleryItems = [
    ...(windowImages.map((photo, index) => ({
      photo,
      alt: photo.alt_description || "Window Installation",
      caption: index % 2 === 0 ? "Before: Outdated Windows" : "After: Energy-Efficient Windows",
    }))),
    ...(doorImages.map((photo, index) => ({
      photo,
      alt: photo.alt_description || "Door Installation",
      caption: index % 2 === 0 ? "Before: Worn Entry Door" : "After: Elegant Entry Door",
    }))),
    ...(sidingImages.map((photo, index) => ({
      photo,
      alt: photo.alt_description || "Siding Installation",
      caption: index % 2 === 0 ? "Before: Damaged Siding" : "After: Beautiful Vinyl Siding",
    }))),
    ...(roofingImages.map((photo, index) => ({
      photo,
      alt: photo.alt_description || "Roofing Installation",
      caption: index % 2 === 0 ? "Before: Aging Roof" : "After: Durable New Roof",
    }))),
  ];

  return (
    <section className="flex w-full flex-col items-center justify-center bg-background-primary px-[5%] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12">
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            Our Recent Projects
          </h2>
          <p className="text-lg">
            Take a look at some of our recent window, door, siding, and roofing installations in the Los Angeles area.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            // Loading placeholders
            Array.from({ length: 8 }).map((_, index) => (
              <div key={`placeholder-${index}`} className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
            ))
          ) : (
            // Actual gallery items
            galleryItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <div className="relative h-64 w-full">
                  <Image
                    src={item.photo.urls.regular}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-center text-white">{item.caption}</p>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                  Photo by {item.photo.user.name} on Unsplash
                </div>
              </div>
            ))
          )}
        </div>
        <Button title="View More Projects" size="lg">
          View More Projects
        </Button>
      </div>
    </section>
  );
}
