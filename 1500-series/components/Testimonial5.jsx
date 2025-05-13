"use client";

import React from "react";
import { BiSolidStar } from "react-icons/bi";

export function Testimonial5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Customer Experiences
          </h1>
          <p className="md:text-md">
            Hear what our satisfied customers say about their 1500 Series vinyl siding.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
          <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
            <div className="mb-6 flex md:mb-8">
              <BiSolidStar className="size-6" />
              <BiSolidStar className="size-6" />
              <BiSolidStar className="size-6" />
              <BiSolidStar className="size-6" />
              <BiSolidStar className="size-6" />
            </div>
            <blockquote className="text-md leading-[1.4] font-bold md:text-xl">
              "The 1500 Series siding was the perfect middle-ground for our home renovation. 
              The color selection was impressive, and the enhanced wood grain texture looks 
              remarkably realistic. We've noticed a significant improvement in our home's 
              insulation, and the exterior looks much more upscale than before."
            </blockquote>
            <div className="mt-6 flex w-full flex-col gap-3 md:mt-8 md:w-auto md:flex-row md:items-center md:gap-5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Testimonial avatar 1"
                  className="size-14 min-h-14 min-w-14 rounded-full object-cover"
                />
              </div>
              <div className="mb-4 md:mb-0">
                <p className="font-semibold">Sarah Thompson</p>
                <p>Homeowner, Sacramento</p>
              </div>
              <div className="hidden w-px self-stretch bg-black md:block" />
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                  alt="Webflow logo 1"
                  className="max-h-12"
                />
              </div>
            </div>
          </div>
          <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
            <div className="mb-6 flex md:mb-8">
              <BiSolidStar className="size-6" />
              <BiSolidStar className="size-6" />
              <BiSolidStar className="size-6" />
              <BiSolidStar className="size-6" />
              <BiSolidStar className="size-6" />
            </div>
            <blockquote className="text-md leading-[1.4] font-bold md:text-xl">
              "As a contractor specializing in mid-range renovations, I frequently recommend 
              the 1500 Series to my clients. It offers excellent value with its enhanced 
              durability and wider selection of designer colors. The installation is 
              straightforward, and the thicker vinyl construction provides better impact 
              resistance, which is important in our area."
            </blockquote>
            <div className="mt-6 flex w-full flex-col gap-3 md:mt-8 md:w-auto md:flex-row md:items-center md:gap-5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Testimonial avatar 1"
                  className="size-14 min-h-14 min-w-14 rounded-full object-cover"
                />
              </div>
              <div className="mb-4 md:mb-0">
                <p className="font-semibold">Robert Wilson</p>
                <p>Residential Contractor, Sacramento</p>
              </div>
              <div className="hidden w-px self-stretch bg-black md:block" />
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                  alt="Webflow logo 1"
                  className="max-h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
