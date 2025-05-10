"use client";

import React from "react";

export function Gallery4() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Our Latest Projects
          </h2>
          <p className="md:text-md">
            See how we've transformed homes across Los Angeles with our premium windows and doors.
          </p>
        </div>
        <div className="grid grid-cols-2 items-start justify-center gap-6 md:gap-8 lg:grid-cols-4">
          <a href="/gallery/modern-home-renovation">
            <img
              src="/assets/images/gallery/modern-home-windows.jpg"
              alt="Modern home renovation with energy-efficient windows"
              className="size-full rounded-image object-cover"
            />
          </a>
          <a href="/gallery/traditional-home-makeover">
            <img
              src="/assets/images/gallery/traditional-home-doors.jpg"
              alt="Traditional home with elegant entry doors"
              className="size-full rounded-image object-cover"
            />
          </a>
          <a href="/gallery/contemporary-windows">
            <img
              src="/assets/images/gallery/contemporary-windows.jpg"
              alt="Contemporary home with floor-to-ceiling windows"
              className="size-full rounded-image object-cover"
            />
          </a>
          <a href="/gallery/custom-door-installation">
            <img
              src="/assets/images/gallery/custom-doors.jpg"
              alt="Custom door installation project"
              className="size-full rounded-image object-cover"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
