"use client";

import React from "react";
import { Button } from "@relume_io/relume-ui";

export default function Layout251() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-background-primary px-[5%] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 md:flex-row md:items-start">
        <div className="w-full md:w-1/2">
          <img
            src="https://www.windowworldla.com/wp-content/uploads/2020/01/installation-process-768x512.jpg"
            alt="Window Installation Process"
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-6 md:w-1/2">
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            Our Installation Process
          </h2>
          <p className="text-lg">
            At Window World of Los Angeles, we pride ourselves on our professional installation process that ensures your new windows, doors, siding, or roofing are installed correctly the first time.
          </p>
          <ol className="ml-5 list-decimal space-y-2">
            <li><strong>Initial Consultation</strong>: Our experts assess your needs and provide recommendations.</li>
            <li><strong>Precise Measurements</strong>: We take detailed measurements to ensure a perfect fit.</li>
            <li><strong>Custom Manufacturing</strong>: Your products are custom-made to your exact specifications.</li>
            <li><strong>Professional Installation</strong>: Our certified installers handle the entire installation process.</li>
            <li><strong>Final Inspection</strong>: We conduct a thorough inspection to ensure everything meets our high standards.</li>
            <li><strong>Clean-Up</strong>: We leave your home as clean as we found it, removing all debris and old materials.</li>
          </ol>
          <Button title="Learn More About Our Process" size="md">
            Learn More About Our Process
          </Button>
        </div>
      </div>
    </section>
  );
}
