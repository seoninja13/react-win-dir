"use client";

import React from "react";

export function Layout16() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Flagship 5000 Series vinyl siding"
            />
          </div>
          <div>
            <h2 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Uncompromising Performance and Architectural Aesthetics
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              The 5000 Series is meticulously engineered to provide uncompromising 
              performance while delivering the architectural aesthetics that distinguished 
              homes demand. With our most advanced construction, proprietary insulation 
              technology, and elite finishes, this flagship line offers:
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Architectural Performance
                </h6>
                <p>
                  Our most advanced vinyl construction with reinforced backing provides 
                  exceptional structural integrity, impact resistance, and weather protection.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Superior Energy Efficiency
                </h6>
                <p>
                  Proprietary insulation technology creates our most effective thermal 
                  barrier, significantly reducing energy costs and enhancing indoor comfort.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  ColorLock Ultra™ Technology
                </h6>
                <p>
                  Our most advanced color protection system maintains vibrant appearance 
                  with unmatched depth and richness even after decades of exposure.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Lifetime Plus Elite Warranty
                </h6>
                <p>
                  Our most comprehensive warranty package, including lifetime coverage, 
                  transferable protection, and a 5-year annual maintenance program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
