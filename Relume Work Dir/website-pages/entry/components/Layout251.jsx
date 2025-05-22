"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout251() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Customize</p>
            <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
              Explore Your Entry Door Customization Options
            </h2>
          </div>
          <div>
            <p className="md:text-md">
              Transform your entryway with our customizable doors. Choose from a
              variety of colors and finishes to match your home's aesthetic. Our
              expert team in Sacramento is here to help you find the perfect
              fit.
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
              Colors and Finishes for Your Door
            </h3>
            <p>Select from a wide range of paint and stain options.</p>
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
              Glass Options for Enhanced Style
            </h3>
            <p>Choose from various glass types and shapes.</p>
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
              Hardware Selections to Suit Your Needs
            </h3>
            <p>Customize your door with stylish handle sets and locks.</p>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20">
          <Button variant="secondary">Samples</Button>
          <Button iconRight={<RxChevronRight />} variant="link" size="link">
            Visit
          </Button>
        </div>
      </div>
    </section>
  );
}
