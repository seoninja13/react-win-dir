"use client";

import React from "react";

export function Header15() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
          <div>
            <h1 className="text-6xl font-bold md:text-9xl lg:text-10xl">
              Premium Vinyl Siding for Distinguished Homes
            </h1>
          </div>
          <div>
            <p className="md:text-md">
              Our 5000 Series vinyl siding represents the pinnacle of exterior design,
              offering unmatched durability, superior insulation, and exclusive designer
              finishes. Elevate your Sacramento home with our flagship collection that
              combines architectural elegance with exceptional performance.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Request Consultation
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-blue-600 bg-white px-6 py-3 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
            className="w-full rounded-image object-cover"
            alt="5000 Series vinyl siding on a luxury home"
          />
        </div>
      </div>
    </section>
  );
}
