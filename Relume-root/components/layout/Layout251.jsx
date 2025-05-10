"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

/**
 * Layout251 Component
 * 
 * A process section with a heading, description, and three steps in a grid layout.
 * Each step has an image, heading, and description.
 * 
 * @component
 * @source Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/Layout251.jsx
 */
export function Layout251() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Process</p>
            <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
              Our Simple Steps to Your New Windows
            </h2>
          </div>
          <div>
            <p className="md:text-md">
              Transforming your home begins with a consultation. Our experts
              will assess your needs and guide you through our wide selection of
              energy-efficient windows and doors. We ensure a seamless
              experience from start to finish.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Step 1: Schedule Your Free Consultation
            </h3>
            <p>Contact us to set up a convenient time.</p>
          </div>
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Step 2: Choose Your Perfect Products
            </h3>
            <p>Explore our extensive range of styles and options.</p>
          </div>
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Step 3: Professional Installation by Experts
            </h3>
            <p>Our skilled team ensures a flawless installation.</p>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20">
          <Button variant="secondary">Get Started</Button>
          <Button iconRight={<RxChevronRight />} variant="link" size="link">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
