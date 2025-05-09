"use client";

import React from "react";
import { Button } from "@relume_io/relume-ui";

export default function Layout4() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-background-primary px-[5%] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-center gap-12 md:flex-row md:items-start">
        <div className="w-full md:w-1/2">
          <img
            src="https://www.windowworldla.com/wp-content/uploads/2024/08/ww-long-beach-ww-long-beach-owner-photo-768x499-copy-1.jpg"
            alt="Window World Los Angeles Owner"
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-6 md:w-1/2">
          <h4 className="text-lg font-semibold text-blue-600">Serving Los Angeles, CA and Surrounding Areas</h4>
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            Los Angeles's Most Trusted Home Remodeler
          </h2>
          <p className="text-lg">
            We make enhancing your home's look and performance as stress-free as possible. See how Window World of Los Angeles can transform your home in three simple steps:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li><strong>Step 1</strong>: Contact us to schedule your free in-home estimate.</li>
            <li><strong>Step 2</strong>: We'll measure and custom order your replacement windows, doors, siding and/or roofing.</li>
            <li><strong>Step 3</strong>: Your replacement products are professionally installed for instant savings and curb appeal.</li>
          </ul>
          <Button title="Get Started Today" size="md">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
}
