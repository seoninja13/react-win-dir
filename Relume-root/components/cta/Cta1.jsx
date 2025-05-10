"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

/**
 * Cta1 Component
 * 
 * A call-to-action section with a heading, description, buttons, and an image.
 * 
 * @component
 * @source Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/Cta1.jsx
 */
export function Cta1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Get Your Free Estimate Today
            </h2>
            <p className="md:text-md">
              Transform your home with our premium windows and doors. Request
              your estimate now!
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Estimate">Estimate</Button>
              <Button title="Learn More" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
