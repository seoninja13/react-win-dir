"use client";

import React from "react";

export function Layout27() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Explore Our Range of Products and Get Your Free Estimate Today!
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              At Window World of Sacramento, we offer a variety of premium
              windows and doors. Discover how our products can enhance your
              home’s energy efficiency and aesthetic appeal.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                  Windows
                </h3>
                <p>Quality Windows for Every Style and Budget</p>
              </div>
              <div>
                <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                  Doors
                </h3>
                <p>Stylish Doors to Elevate Your Home’s Entrance</p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
