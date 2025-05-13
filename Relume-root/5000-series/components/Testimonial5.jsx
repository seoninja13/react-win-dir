"use client";

import React from "react";
import { BiSolidStar } from "react-icons/bi";

export function Testimonial5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Distinguished Client Experiences
          </h1>
          <p className="md:text-md">
            Hear what our distinguished clients say about their 5000 Series vinyl siding.
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
              "As the owner of a historic Craftsman in Sacramento's Fab 40s neighborhood, 
              I was extremely particular about maintaining the architectural integrity of 
              our home while upgrading its performance. The 5000 Series exceeded all 
              expectations. The custom profiles and authentic wood grain texture are 
              indistinguishable from the original cedar siding, while providing modern 
              energy efficiency and durability. The design consultation process was 
              exceptional, and the installation was executed with meticulous attention to detail."
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
                <p className="font-semibold">Dr. Elizabeth Blackwell</p>
                <p>Homeowner, Sacramento Fab 40s</p>
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
              "As a luxury home builder in Sacramento, I've worked with many exterior 
              products, but the 5000 Series stands in a class of its own. The architectural 
              profiles and elite finishes provide the sophisticated aesthetic my clients 
              demand, while the superior construction ensures lasting performance. The 
              design flexibility allows us to create truly custom exteriors, and the 
              comprehensive warranty provides my clients with complete confidence in 
              their investment. It's become our standard recommendation for our most 
              discerning clients."
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
                <p className="font-semibold">Jonathan Harrington</p>
                <p>President, Harrington Luxury Homes</p>
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
