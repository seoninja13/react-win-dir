"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout250() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="max-w-lg">
            <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
              Transform Your Home with Energy-Efficient Replacement Windows
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <img
                src="/assets/images/services/windows-installation.jpg"
                alt="Professional window installation"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Professional Window Installation
            </h3>
            <p>
              Our expert team ensures precise installation for optimal performance and energy efficiency.
            </p>
            <div className="mt-6 flex gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <img
                src="/assets/images/services/door-installation.jpg"
                alt="Professional door installation"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Expert Door Installation
            </h3>
            <p>
              Transform your entryways with our premium door installation services.
            </p>
            <div className="mt-6 flex gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <img
                src="/assets/images/services/energy-efficiency.jpg"
                alt="Energy efficient windows and doors"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Energy-Efficient Solutions
            </h3>
            <p>
              Save on energy costs with our high-performance windows and doors.
            </p>
            <div className="mt-6 flex gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
