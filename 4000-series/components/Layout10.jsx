"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout10() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Luxury Collection</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              4000 Series Exclusive Color & Texture Portfolio
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Discover our curated collection of 24 exclusive designer colors in premium 
              finishes that elevate any architectural style. The 4000 Series features our 
              most advanced texturing technology with ultra-realistic wood grain patterns 
              and sophisticated smooth finishes that set the standard for luxury vinyl siding.
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
                  Exclusive Color Portfolio
                </h6>
                <p>
                  Browse our exclusive collection of 24 designer colors with premium 
                  finishes developed by architectural color specialists.
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
                  Luxury Textures
                </h6>
                <p>
                  Experience our most advanced texturing technology with ultra-realistic 
                  wood grain patterns and sophisticated smooth finishes.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Request Color Portfolio" variant="secondary">
                Request Color Portfolio
              </Button>
              <Button
                title="Schedule Consultation"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Schedule Consultation
              </Button>
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
