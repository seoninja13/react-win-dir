"use client";

import React, { useState } from "react";
import { BiSolidStar } from "react-icons/bi";

export function Testimonial15() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const dotClassName = (index) => {
    return `mx-[3px] inline-block size-2 rounded-full ${
      currentSlide === index ? "bg-black" : "bg-neutral-300"
    }`;
  };

  return (
    <section
      id="relume"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="relative overflow-hidden">
          <div className="relative pt-20 md:pt-0 md:pb-20">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="w-full flex-shrink-0">
                <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
                  <div className="order-last md:order-first">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Testimonial image 1"
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="mb-6 flex md:mb-8">
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                    </div>
                    <blockquote className="text-xl font-bold md:text-2xl">
                      "The energy-efficient windows from Window World have
                      transformed our home. Our energy bills have dropped
                      significantly!"
                    </blockquote>
                    <div className="mt-6 flex flex-nowrap items-center gap-5 md:mt-8">
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p>Homeowner, Sacramento</p>
                      </div>
                      <div className="mx-4 w-px self-stretch bg-gray-200 sm:mx-0" />
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
              <div className="w-full flex-shrink-0">
                <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
                  <div className="order-last md:order-first">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Testimonial image 2"
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="mb-6 flex md:mb-8">
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                    </div>
                    <blockquote className="text-xl font-bold md:text-2xl">
                      "We've noticed a significant reduction in outside noise since
                      installing these windows. The insulation is incredible!"
                    </blockquote>
                    <div className="mt-6 flex flex-nowrap items-center gap-5 md:mt-8">
                      <div>
                        <p className="font-semibold">Jane Smith</p>
                        <p>Homeowner, Sacramento</p>
                      </div>
                      <div className="mx-4 w-px self-stretch bg-gray-200 sm:mx-0" />
                      <div>
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                          alt="Webflow logo 2"
                          className="max-h-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 flex w-full items-start justify-between md:top-auto md:bottom-0 md:items-end">
              <div className="mt-2.5 flex w-full items-start justify-start md:mt-0 md:mb-2.5">
                <button
                  onClick={() => goToSlide(0)}
                  className={dotClassName(0)}
                  aria-label="Go to slide 1"
                />
                <button
                  onClick={() => goToSlide(1)}
                  className={dotClassName(1)}
                  aria-label="Go to slide 2"
                />
              </div>
              <div className="flex items-end justify-end gap-2 md:gap-4">
                <button
                  onClick={prevSlide}
                  className="flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white"
                  aria-label="Previous slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white"
                  aria-label="Next slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
