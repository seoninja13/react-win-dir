"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout246() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
              Experience a Seamless Process from Estimate to Installation
            </h2>
          </div>
          <div>
            <p className="md:text-md">
              At Window World, we simplify your window replacement journey. Our
              straightforward process ensures you're informed and comfortable
              every step of the way. From your initial contact to the final
              installation, we prioritize your satisfaction.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="/images/windows/windows-process-step-1-icon.png"
                className="size-12"
                alt="Contact consultation process icon"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Four Simple Steps to Your New Windows
            </h3>
            <p>Follow our easy process to transform your home.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Learn More
              </Button>
            </div>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="/images/windows/windows-process-step-2-icon.png"
                className="size-12"
                alt="Measurement estimation process icon"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Step 1: Contact Us for Your Free Estimate
            </h3>
            <p>Reach out to our team to schedule your consultation.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Contact
              </Button>
            </div>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="/images/windows/windows-process-step-3-icon.png"
                className="size-12"
                alt="Installation completion process icon"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Step 2: Estimate and Measurement for Perfect Fit
            </h3>
            <p>
              Our experts will measure your windows to ensure an accurate fit.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
