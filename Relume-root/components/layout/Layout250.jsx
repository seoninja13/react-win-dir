"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

/**
 * Layout250 Component
 * 
 * A features section with a heading and three feature cards in a grid layout.
 * Each card has an image, heading, description, and a "Learn More" link.
 * 
 * @component
 * @source Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/Layout250.jsx
 */
export function Layout250() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="max-w-lg">
            <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
              Transform Your Home with Energy-Efficient Replacement Windows
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Stylish and Durable Doors for Every Entryway
            </h3>
            <p>
              Our windows offer unparalleled energy efficiency, enhancing your
              home's comfort and value.
            </p>
            <div className="mt-6 flex gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Upgrade Your Home's Aesthetic with Our Premium Siding Options
            </h3>
            <p>
              Choose from a variety of styles and colors to match your vision.
            </p>
            <div className="mt-6 flex gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Experience Exceptional Craftsmanship with Our Installation
              Services
            </h3>
            <p>
              Our expert team ensures a seamless installation process for your
              peace of mind.
            </p>
            <div className="mt-6 flex gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
