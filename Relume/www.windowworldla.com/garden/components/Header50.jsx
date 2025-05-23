"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header50() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="relative z-10 container">
        <div className="w-full max-w-lg">
          <p className="mb-3 font-semibold text-text-alternative md:mb-4">
            Quality
          </p>
          <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
            Window Solutions Sacramento
          </h1>
          <p className="text-text-alternative md:text-md">
            Explore premium replacement windows and doors tailored for
            Sacramento's unique climate and aesthetic needs.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <Button title="Get Started">Get Started</Button>
            <Button title="Contact Us" variant="secondary-alt">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
