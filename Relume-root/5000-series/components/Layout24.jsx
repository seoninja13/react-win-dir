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
              Experience Our Exclusive Architectural Visualization Studio
            </h3>
            <p className="md:text-md">
              Visualize the 5000 Series Vinyl Siding on your home with our exclusive 
              Architectural Visualization Studio. This state-of-the-art visualization 
              platform allows you to see how our flagship siding options would transform 
              your Sacramento residence with photorealistic accuracy and architectural 
              detail. Work with our design consultants to create a virtual showcase of 
              your home's exterior transformation using our most sophisticated visualization 
              technology.
            </p>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Architectural Visualization Studio"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
