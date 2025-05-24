"use client";

import React from "react";

export function Gallery4() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Project Showcase
          </h2>
          <p className="md:text-md">
            Transforming homes with our premium window and door solutions.
          </p>
        </div>
        <div className="grid grid-cols-2 items-start justify-center gap-6 md:gap-8 lg:grid-cols-4">
          <a href="#">
            <img
              src="/images/home/home-gallery-1.png"
              alt="Modern home with new replacement windows"
              className="size-full rounded-image object-cover"
            />
          </a>
          <a href="#">
            <img
              src="/images/home/home-gallery-2.png"
              alt="Elegant front door installation"
              className="size-full rounded-image object-cover"
            />
          </a>
          <a href="#">
            <img
              src="/images/home/home-gallery-3.png"
              alt="Home with premium vinyl siding"
              className="size-full rounded-image object-cover"
            />
          </a>
          <a href="#">
            <img
              src="/images/home/home-gallery-4.png"
              alt="Complete home transformation"
              className="size-full rounded-image object-cover"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
