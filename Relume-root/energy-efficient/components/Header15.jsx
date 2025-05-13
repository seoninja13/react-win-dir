"use client";

import React from "react";

export function Header15() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
          <div>
            <h1 className="text-6xl font-bold md:text-9xl lg:text-10xl">
              Energy Efficient Windows in Sacramento, CA
            </h1>
          </div>
          <div>
            <p className="md:text-md">
              Investing in energy-efficient windows is essential for Sacramento
              homeowners. These windows help lower energy bills, enhance
              comfort, and reduce heat loss, making your home more enjoyable
              year-round.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <button className="inline-flex h-12 items-center justify-center rounded-lg bg-gray-800 px-6 text-center font-medium text-white transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Schedule
              </button>
              <button className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-800 bg-transparent px-6 text-center font-medium text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Estimate
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
            className="w-full rounded-lg object-cover"
            alt="Relume placeholder image"
          />
        </div>
      </div>
    </section>
  );
}
