"use client";

import React from "react";

export function Layout24() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                className="size-12"
                alt="Relume logo"
              />
            </div>
            <h3 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Experience Our Premium 3D Design Studio
            </h3>
            <p className="md:text-md">
              Visualize the 4000 Series Vinyl Siding on your home with our premium 
              3D Design Studio. This advanced visualization tool allows you to see 
              how our luxury siding options would transform your Sacramento residence 
              with photorealistic accuracy. Upload photos of your home or choose from 
              our architectural gallery to create a virtual showcase of your dream exterior.
            </p>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="3D Design Studio visualization"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
