"use client";

import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout16() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Architectural Excellence</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Elevate Your Home with 5000 Series Siding
            </h1>
            <p className="mb-5 text-base md:mb-6 md:text-md">
              Our 5000 Series vinyl siding combines premium materials with architectural
              design to create a stunning exterior that stands the test of time. Each panel
              is crafted with precision to deliver unmatched durability, weather resistance,
              and aesthetic appeal.
            </p>
            <ul className="grid grid-cols-1 gap-4 py-2">
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Premium quality icon"
                    className="size-6"
                  />
                </div>
                <span>Superior insulation for enhanced energy efficiency</span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Durability icon"
                    className="size-6"
                  />
                </div>
                <span>Exclusive designer finishes for distinguished homes</span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Weather resistance icon"
                    className="size-6"
                  />
                </div>
                <span>
                  Advanced weather resistance for Sacramento's climate
                </span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-blue-600 bg-white px-6 py-3 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Learn More
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Explore
                <RxChevronRight className="ml-1" />
              </button>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="5000 Series vinyl siding installation"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
