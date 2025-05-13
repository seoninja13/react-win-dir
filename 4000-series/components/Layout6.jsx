"use client";

import React from "react";

export function Layout6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Experience the Ultimate in Luxury Profiles and Designer Finishes
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              The 4000 Series represents our premium vinyl siding collection, featuring 
              exclusive architectural profiles and designer finishes. Crafted with superior 
              materials and innovative technology, this luxury line delivers unmatched 
              aesthetics and performance for discerning homeowners.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Architectural Profiles
                </h6>
                <p>
                  Exclusive profiles with deep shadow lines and authentic textures that 
                  replicate the look of custom milled wood siding with remarkable accuracy.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Designer Finishes
                </h6>
                <p>
                  Premium matte and low-gloss finishes with proprietary color technology 
                  that maintains vibrant appearance even after decades of exposure.
                </p>
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
