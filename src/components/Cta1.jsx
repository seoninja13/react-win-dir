"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@relume_io/relume-ui";
import Image from "next/image";
import { UnsplashPhoto } from "@/utils/unsplash";

export default function Cta1() {
  const [backgroundImage, setBackgroundImage] = useState<UnsplashPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('/api/unsplash?query=modern+home+exterior&random=true&count=1');
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setBackgroundImage(data.photos[0]);
        }
      } catch (error) {
        console.error('Error fetching Unsplash image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-blue-600 px-[5%] py-16 text-white">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            Ready to Transform Your Home?
          </h2>
          <p className="text-lg">
            Contact Window World of Los Angeles today for a free in-home estimate on windows, doors, siding, or roofing.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button title="Request Free Estimate" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Request Free Estimate
          </Button>
          <Button title="Call (310) 919-2352" variant="secondary" size="lg" className="border-white text-white hover:bg-blue-700">
            Call (310) 919-2352
          </Button>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundImage ? (
          <>
            <Image
              src={backgroundImage.urls.regular}
              alt="Modern home exterior"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              className="opacity-10"
              priority
            />
            <div className="absolute bottom-2 right-2 z-10 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
              Photo by {backgroundImage.user.name} on Unsplash
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-blue-700 opacity-20"></div>
        )}
      </div>
    </section>
  );
}
