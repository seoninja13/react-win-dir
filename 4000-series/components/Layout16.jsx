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
              alt="Premium 4000 Series vinyl siding"
            />
          </div>
          <div>
            <h2 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Superior Performance and Unmatched Aesthetics
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              The 4000 Series is engineered to provide exceptional performance while 
              delivering the sophisticated aesthetics discerning homeowners demand. 
              With our thickest vinyl construction, advanced insulation technology, 
              and premium finishes, this luxury line offers:
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Superior Durability
                </h6>
                <p>
                  Our thickest vinyl construction with advanced impact modifiers provides 
                  exceptional resistance to impacts, hail, and extreme weather conditions.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Enhanced Energy Efficiency
                </h6>
                <p>
                  Premium insulation technology creates a more effective thermal barrier, 
                  reducing energy costs and improving indoor comfort year-round.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  ColorLock™ Technology
                </h6>
                <p>
                  Our proprietary color protection system maintains vibrant appearance 
                  even after decades of exposure to Sacramento's intense sun.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Premium Warranty
                </h6>
                <p>
                  Backed by our most comprehensive warranty package, including lifetime 
                  coverage and a 30-year color fade warranty for complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
