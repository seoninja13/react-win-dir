"use client";

import { CustomButton } from "./CustomButton";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Efficiency</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Maximize Energy Savings with Wood Windows
            </h1>
            <p className="md:text-md">
              Our wood windows are designed to enhance energy efficiency while
              maintaining the classic beauty of your home. Features like Low-E
              glass and Argon gas insulation work together to reduce energy
              costs and keep your home comfortable year-round.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <CustomButton variant="secondary">
                Learn More
              </CustomButton>
              <CustomButton
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Get Estimate
              </CustomButton>
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
