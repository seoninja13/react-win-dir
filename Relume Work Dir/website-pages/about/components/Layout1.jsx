"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Quality</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Why Choose Window World of Greater Sacramento
            </h1>
            <p className="md:text-md">
              At Window World of Greater Sacramento, we pride ourselves on
              offering top-notch products and services tailored to your home
              improvement needs. Our commitment to quality ensures you receive
              professional installations, competitive pricing, and a hassle-free
              experience from start to finish.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Learn More" variant="secondary">
                Learn More
              </Button>
              <Button
                title="Sign Up"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Sign Up
              </Button>
            </div>
          </div>
          <div>
            <img
              src="/images/about/about-why-choose-us.png"
              className="w-full rounded-image object-cover"
              alt="Quality window installation work showcasing professional craftsmanship"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
