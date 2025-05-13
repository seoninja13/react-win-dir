"use client";

import { CustomButton } from "./CustomButton";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout201() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-3 font-semibold md:mb-4">Customize</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Personalize Your Wood Windows to Perfection
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              Our wood windows offer a variety of customization options to match
              your unique style. From finishes to hardware, create the perfect
              look for your home.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo"
                  />
                </div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Design Choices
                </h6>
                <p>
                  Select from various finishes, colors, and hardware for your
                  wood windows.
                </p>
              </div>
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo"
                  />
                </div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Glass Options
                </h6>
                <p>
                  Choose from clear, textured, or obscure glass to enhance your
                  windows.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <CustomButton variant="secondary">
                Learn More
              </CustomButton>
              <CustomButton
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Get Started
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
