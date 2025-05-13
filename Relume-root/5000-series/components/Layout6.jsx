"use client";

import React from "react";

export function Layout6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Discover Our Flagship Architectural Profiles and Elite Finishes
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              The 5000 Series represents our flagship vinyl siding collection, featuring 
              custom architectural profiles and elite finishes. Handcrafted with our most 
              advanced materials and proprietary technology, this flagship line delivers 
              uncompromising aesthetics and performance for Sacramento's most distinguished homes.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Custom Architectural Profiles
                </h6>
                <p>
                  Exclusive custom profiles with our deepest shadow lines and most authentic 
                  textures that perfectly replicate the look of handcrafted wood siding.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Elite Finishes
                </h6>
                <p>
                  Our most sophisticated matte and low-gloss finishes with proprietary 
                  ColorLock Ultra™ technology for unmatched color retention and depth.
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
