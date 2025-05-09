"use client";

import React from "react";

export function Gallery7() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Siding Gallery
          </h2>
          <p className="md:text-md">
            Explore our stunning vinyl siding installations in Sacramento.
          </p>
        </div>
        <div className="grid auto-cols-fr justify-center gap-6 md:grid-cols-2 md:gap-8">
          <a
            href="#"
            className="inline-block w-full col-start-1 col-end-2 row-start-1 row-end-3"
          >
            <div className="relative size-full pt-[100%]">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="absolute inset-0 size-full rounded-image object-cover"
              />
            </div>
          </a>
          <a href="#" className="inline-block w-full">
            <div className="relative size-full pt-[56.25%]">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 2"
                className="absolute inset-0 size-full rounded-image object-cover"
              />
            </div>
          </a>
          <a href="#" className="inline-block w-full">
            <div className="relative size-full pt-[56.25%]">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 3"
                className="absolute inset-0 size-full rounded-image object-cover"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
