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
            <p className="mb-3 font-semibold md:mb-4">Local</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Proudly Serving Sacramento and Nearby Areas
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Window World of Greater Sacramento is dedicated to providing
              top-notch window, door, and siding replacement services. We
              proudly serve Sacramento and its surrounding communities, ensuring
              quality and satisfaction.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Counties Served
                </h6>
                <p>
                  Covering multiple counties within a specific radius of
                  Sacramento.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Your Location
                </h6>
                <p>Check if your city is within our service area.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Learn More" variant="secondary">
                Learn More
              </Button>
              <Button
                title="Contact"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Contact
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
