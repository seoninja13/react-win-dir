"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta3() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="relative z-10 container">
        <div className="w-full max-w-lg">
          <h2 className="mb-5 text-5xl font-bold text-text-alternative md:mb-6 md:text-7xl lg:text-8xl">
            Ready to Start?
          </h2>
          <p className="text-text-alternative md:text-md">
            Request your free estimate today and take the first step towards
            your new windows!
          </p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <Button title="Submit Request">Submit Request</Button>
            <Button title="Learn More" variant="secondary-alt">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="/images/windows/windows-cta-background.png"
          className="size-full object-cover"
          alt="Beautiful Sacramento home with new windows"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
