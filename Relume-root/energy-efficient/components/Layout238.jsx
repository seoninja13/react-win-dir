"use client";

import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout238() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg">
            <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
              Discover the Benefits of Energy-Efficient Windows for Sacramento
              Homes
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo"
                className="size-12"
              />
            </div>
            <h3 className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">
              Why Choose Energy-Efficient Windows for Your Sacramento Property?
            </h3>
            <p>
              Experience significant savings on energy bills while enhancing
              your home's comfort.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button className="inline-flex items-center justify-center gap-2 text-gray-800 hover:underline">
                Learn More
                <RxChevronRight />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo"
                className="size-12"
              />
            </div>
            <h3 className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">
              Enhanced Comfort and Energy Efficiency for Sacramento Homeowners
            </h3>
            <p>
              Keep your home comfortable year-round with our energy-efficient
              window solutions.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button className="inline-flex items-center justify-center gap-2 text-gray-800 hover:underline">
                Discover
                <RxChevronRight />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo"
                className="size-12"
              />
            </div>
            <h3 className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">
              Protect Your Home from UV Rays with Energy-Efficient Windows
            </h3>
            <p>
              Our windows provide UV protection, safeguarding your furnishings
              and flooring.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button className="inline-flex items-center justify-center gap-2 text-gray-800 hover:underline">
                Protect
                <RxChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
