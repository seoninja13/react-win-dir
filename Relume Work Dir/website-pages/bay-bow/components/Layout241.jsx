"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout241() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Visualize</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Experience Your Bay & Bow Windows Today
              </h2>
              <p className="md:text-md">
                Explore our interactive 360° view of Bay and Bow windows. See
                how these stunning designs can enhance your Sacramento home.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Visualize Your New Windows in Real Time
              </h3>
              <p>Upload a photo of your home to see how our windows look.</p>
            </div>
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Easy Steps to Use the Visualizer
              </h3>
              <p>Simply upload your image or select a sample.</p>
            </div>
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Get Started with Our Visualization Tool
              </h3>
              <p>Click the button below to begin your experience.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button variant="secondary">Start</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link">
              Scan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
