"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout4() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Mid-Range Excellence</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              1500 Series Features and Benefits
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              The 1500 Series offers Sacramento homeowners an excellent mid-range vinyl 
              siding option with enhanced features. This series provides improved insulation, 
              better durability, and a wider selection of colors and profiles compared to 
              entry-level options, delivering greater value and performance for your home.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Enhanced Insulation
                </h6>
                <p>
                  Improved thermal performance helps maintain comfortable indoor 
                  temperatures and may reduce energy costs.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Superior Durability
                </h6>
                <p>
                  Thicker vinyl construction provides better impact resistance and 
                  longer-lasting performance in Sacramento's climate.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Learn More" variant="secondary">
                Learn More
              </Button>
              <Button
                title="Get Started"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Get Started
              </Button>
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
