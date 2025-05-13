"use client";

import { CustomButton } from "./CustomButton";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout10() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Flagship Collection</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              5000 Series Elite Color & Texture Collection
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Experience our curated collection of 30 elite designer colors in our most
              sophisticated finishes, developed exclusively for distinguished Sacramento homes.
              The 5000 Series features our proprietary UltraGrain™ technology with the most
              authentic wood grain patterns and our signature smooth finishes that define
              the pinnacle of vinyl siding craftsmanship.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo 1"
                  />
                </div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Elite Color Collection
                </h6>
                <p>
                  Explore our exclusive collection of 30 elite designer colors with our most
                  sophisticated finishes, developed by architectural color specialists.
                </p>
              </div>
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo 1"
                  />
                </div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  UltraGrain™ Technology
                </h6>
                <p>
                  Experience our proprietary UltraGrain™ technology with the most authentic
                  wood grain patterns and our signature smooth finishes.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <CustomButton variant="secondary">
                Request Elite Color Portfolio
              </CustomButton>
              <CustomButton
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Schedule Design Consultation
              </CustomButton>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
