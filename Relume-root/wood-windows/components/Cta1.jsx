"use client";

import { CustomButton } from "./CustomButton";
import React from "react";

export function Cta1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Request Your Free Estimate Today
            </h2>
            <p className="md:text-md">
              Discover how our wood windows can enhance your home’s beauty and
              energy efficiency.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <CustomButton>Submit</CustomButton>
              <CustomButton variant="secondary">
                Learn More
              </CustomButton>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
