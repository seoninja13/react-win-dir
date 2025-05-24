"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header5() {
  return (
    <section id="relume" className="relative px-[5%]">
      <div className="relative z-10 container">
        <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
              About Windows and Doors California
            </h1>
            <p className="text-text-alternative md:text-md">
              At Windows and Doors California, we blend national expertise
              with local service. Our mission is to provide exceptional home
              improvement solutions tailored to the needs of our community.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Learn More">Learn More</Button>
              <Button title="Sign Up" variant="secondary-alt">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="/images/about/about-hero-background.png"
          className="size-full object-cover"
          alt="Windows and Doors California office building exterior"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
