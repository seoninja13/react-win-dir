"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta39() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2 border rounded-lg shadow-md">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Take the Next Step
              </h2>
              <p className="md:text-md">
                Discover the perfect window styles for your home today and
                enhance your living space.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Explore" variant="primary">
                Explore
              </Button>
              <Button title="Estimate" variant="secondary">
                Estimate
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape4x3.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
