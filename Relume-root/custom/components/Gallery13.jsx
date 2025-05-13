"use client";

import React, { useState } from "react";

export function Gallery13() {
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

  return (
    <section id="relume">
      <div className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container text-center">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Window Gallery
          </h2>
          <p className="md:text-md">
            Explore our stunning custom window installations in Sacramento.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="relative h-screen w-full flex-shrink-0">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 1"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative h-screen w-full flex-shrink-0">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 2"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md lg:block"
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
          className="absolute right-8 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md lg:block"
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
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2">
          <button
            onClick={() => goToSlide(0)}
            className={`relative mx-[3px] inline-block h-2 w-2 rounded-full ${
              currentSlide === 0 ? "bg-white" : "bg-white/40"
            }`}
            aria-label="Go to slide 1"
          />
          <button
            onClick={() => goToSlide(1)}
            className={`relative mx-[3px] inline-block h-2 w-2 rounded-full ${
              currentSlide === 1 ? "bg-white" : "bg-white/40"
            }`}
            aria-label="Go to slide 2"
          />
        </div>
      </div>
    </section>
  );
}
