"use client";


import React from "react";

export function Header44() {
  return (
    <section id="relume" className="relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50" />
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          alt="Distinguished home with 5000 Series vinyl siding"
          className="size-full object-cover"
        />
      </div>
      <div className="relative z-10 px-[5%] py-20 md:py-32 lg:py-40">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold text-white md:mb-6 md:text-7xl lg:text-8xl">
              5000 Series Flagship Vinyl Siding
            </h1>
            <p className="mb-8 text-xl text-white md:mb-10 md:text-2xl">
              Experience the pinnacle of architectural vinyl siding with our exclusive
              5000 Series collection, featuring custom profiles and elite finishes for
              Sacramento's most distinguished homes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Schedule Design Consultation
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-blue-600 bg-white px-6 py-3 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                View Elite Color Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
