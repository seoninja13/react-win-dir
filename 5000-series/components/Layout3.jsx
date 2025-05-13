"use client";

import React from "react";

export function Layout3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Complete Your Distinguished Exterior with Window World
            </h1>
            <p className="md:text-md">
              Complement your 5000 Series vinyl siding with our flagship exterior products. 
              From our architectural windows and custom entry doors to bespoke architectural 
              accents, we offer a complete suite of distinguished exterior solutions to 
              create a cohesive, sophisticated look for your Sacramento home. Our design 
              consultants will work with you to create a harmonious exterior that reflects 
              your home's architectural style and your personal aesthetic.
            </p>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Distinguished home exterior with complementary products"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
