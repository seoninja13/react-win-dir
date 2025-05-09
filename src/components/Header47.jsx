"use client";

import React from "react";
import { Button } from "@relume_io/relume-ui";

export default function Header47() {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-background-primary px-[5%] py-24">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-6">
          <h1 className="text-4xl font-bold leading-[1.2] md:text-5xl md:leading-[1.2] lg:text-6xl lg:leading-[1.2]">
            Los Angeles' Leader in Windows, Doors, & Siding
          </h1>
          <p className="text-lg md:text-xl">
            Window World of Los Angeles is the go-to choice for quality replacement windows, doors, siding and roofing.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button title="Request Free Estimate" size="lg">
              Request Free Estimate
            </Button>
            <Button title="Learn More" variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('https://www.windowworldla.com/wp-content/uploads/2021/09/ww-long-beach-ww-LB-exterior-hero-1024x427.jpg')" }}></div>
    </section>
  );
}
