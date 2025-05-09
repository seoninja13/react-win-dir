"use client";

import React from "react";
import { Button } from "@relume_io/relume-ui";

export default function Layout250() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-gray-50 px-[5%] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 md:flex-row md:items-start">
        <div className="flex w-full flex-col items-start gap-6 md:w-1/2">
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            Why Go Energy-Efficient?
          </h2>
          <p className="text-lg">
            Energy-efficient windows and doors can significantly reduce your energy bills while improving your home's comfort and value.
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Lower energy bills year-round</li>
            <li>Increased home comfort with fewer drafts</li>
            <li>Reduced condensation and improved visibility</li>
            <li>Protection against UV damage to furniture and flooring</li>
            <li>Smaller carbon footprint and environmental impact</li>
          </ul>
          <Button title="Learn More" size="md">
            Learn More
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://www.windowworldla.com/wp-content/uploads/2020/01/energy-star-windows-768x512.jpg"
            alt="Energy Efficient Windows"
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
