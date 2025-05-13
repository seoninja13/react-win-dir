"use client";

import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Innovative</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Explore Our Advanced Energy-Efficient Technologies
            </h1>
            <p className="md:text-md">
              Our energy-efficient windows utilize cutting-edge technologies to
              enhance comfort and reduce energy costs. Discover how each feature
              contributes to a more sustainable home in Sacramento.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-800 bg-transparent px-6 text-center font-medium text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Learn More
              </button>
              <button className="inline-flex items-center justify-center gap-2 text-gray-800 hover:underline">
                Discover
                <RxChevronRight />
              </button>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-lg object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
