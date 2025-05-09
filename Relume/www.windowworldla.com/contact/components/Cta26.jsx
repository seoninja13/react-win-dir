"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React from "react";

export function Cta26() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Get in Touch with Us
          </h2>
          <p className="md:text-md">
            We're here to assist you with your inquiries about our services in
            Sacramento and nearby areas.
          </p>
          <div className="mx-auto mt-6 w-full max-w-sm md:mt-8">
            <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
              <Input id="email" type="email" placeholder="Enter your email" />
              <Button
                title="Submit"
                variant="primary"
                size="sm"
                className="items-center justify-center px-6 py-3"
              >
                Submit
              </Button>
            </form>
            <p className="text-xs">
              By clicking Submit, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
