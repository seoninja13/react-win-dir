"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header15() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
          <div>
            <h1 className="text-6xl font-bold md:text-9xl lg:text-10xl">
              Premium Replacement Windows & Doors for Your Home
            </h1>
          </div>
          <div>
            <p className="md:text-md">
              Transform your living space with our energy-efficient windows and
              doors. Experience quality craftsmanship and exceptional service
              that you can trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Get a Free Estimate">Get a Free Estimate</Button>
              <Button title="Explore" variant="secondary">
                Explore
              </Button>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/images/home/home-header-hero.png"
            className="w-full rounded-image object-cover"
            alt="Beautiful home with premium windows and doors"
          />
        </div>
      </div>
    </section>
  );
}
