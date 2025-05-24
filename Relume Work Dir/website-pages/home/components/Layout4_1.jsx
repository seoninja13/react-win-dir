"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout4_1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Savings</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Affordable Financing Options for Your Home
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Transform your home without breaking the bank. Explore our
              flexible financing solutions designed to fit your budget.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Easy Payments
                </h6>
                <p>
                  Monthly plans that make home improvement accessible for
                  everyone.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Limited Time
                </h6>
                <p>Take advantage of our special promotions while they last!</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Learn More" variant="secondary">
                Learn More
              </Button>
              <Button
                title="Apply"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Apply
              </Button>
            </div>
          </div>
          <div>
            <img
              src="/images/home/home-layout4-1-feature.png"
              className="w-full rounded-image object-cover"
              alt="Completed home transformation project"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
