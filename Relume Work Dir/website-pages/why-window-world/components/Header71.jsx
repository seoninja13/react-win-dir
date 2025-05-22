"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header71() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
                Sacramento's Choice for Home Improvement
              </h1>
              <p className="md:text-md">
                Sacramento homeowners choose Window World for our unmatched
                quality, value, and exceptional service.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                <Button title="Learn More">Learn More</Button>
                <Button title="Learn More" variant="secondary">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              className="size-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
