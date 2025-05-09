"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@relume_io/relume-ui";
import Image from "next/image";
import { UnsplashPhoto } from "@/utils/unsplash";

export default function Layout4_1() {
  const [financingImage, setFinancingImage] = useState<UnsplashPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('/api/unsplash?query=home+improvement+financing&random=true&count=1');
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setFinancingImage(data.photos[0]);
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
    <section className="flex w-full flex-col items-center justify-center bg-gray-50 px-[5%] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 md:flex-row md:items-start">
        <div className="flex w-full flex-col items-start gap-6 md:w-1/2">
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            Financing Options
          </h2>
          <p className="text-lg">
            Window World of Los Angeles offers flexible financing options to help make your home improvement project affordable and accessible.
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li><strong>Low Monthly Payments</strong>: Spread the cost of your project over time.</li>
            <li><strong>Competitive Interest Rates</strong>: We work with trusted financial partners to offer great rates.</li>
            <li><strong>Quick Approval Process</strong>: Get approved quickly and start your project sooner.</li>
            <li><strong>No Prepayment Penalties</strong>: Pay off your loan early without additional fees.</li>
            <li><strong>Special Promotions</strong>: Take advantage of limited-time financing offers.</li>
          </ul>
          <Button title="View Financing Options" size="md">
            View Financing Options
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          {loading ? (
            <div className="h-64 animate-pulse rounded-lg bg-gray-200 md:h-96"></div>
          ) : financingImage ? (
            <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-96">
              <Image
                src={financingImage.urls.regular}
                alt="Financing Options"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                Photo by {financingImage.user.name} on Unsplash
              </div>
            </div>
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 md:h-96">
              <p className="text-gray-500">Image not available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
