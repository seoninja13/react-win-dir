"use client";

import React from 'react';
import { Button } from '@relume_io/relume-ui';

export default function RelumeTest() {
  // Example buttons from the documentation
  const buttons = [
    { title: "Primary Button", variant: "primary" },
    { title: "Secondary Button", variant: "secondary" },
  ];

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Relume UI Test
            </h2>
            <p className="md:text-md font-bold text-2xl">
              Testing Relume UI components to ensure they're working correctly
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button
                  key={`${button.title}-${index}`}
                  variant={button.variant}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              className="w-full object-cover"
              alt="Placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
