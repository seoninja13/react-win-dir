"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta13() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-8 rounded-lg bg-gray-100 p-8 md:grid-cols-[1fr_max-content] md:items-center md:gap-12 lg:p-12">
            <div className="max-w-lg">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to upgrade your windows?
              </h2>
              <p className="mb-0 text-gray-600">
                Contact us today for a free consultation and estimate. Our experts will help you choose the perfect windows for your home.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-4">
              <Button title="Get a Free Estimate">Get a Free Estimate</Button>
              <Button title="Contact Us" variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
