"use client";

import React from "react";
import { Button } from "@relume_io/relume-ui";

export default function Layout6() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-background-primary px-[5%] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12">
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            Our Products
          </h2>
          <p className="text-lg">
            Explore our range of high-quality windows, doors, siding, and roofing products
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative flex h-80 flex-col overflow-hidden rounded-lg">
            <img
              src="https://www.windowworldla.com/wp-content/uploads/2020/01/SHOT11_2018_TCS_BDR_MI_DH_V2-768x512.jpg"
              alt="Windows"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
            <div className="relative z-10 mt-auto p-6 text-white">
              <h3 className="mb-2 text-2xl font-bold">Windows</h3>
              <p className="mb-4 text-sm">
                Window World of Los Angeles replacement windows exceed industry standards. We offer a variety of window options that provide exterior solutions, increasing your energy efficiency and complementing your home's look.
              </p>
              <Button title="Learn More" variant="secondary" size="sm">
                Learn More
              </Button>
            </div>
          </div>
          <div className="group relative flex h-80 flex-col overflow-hidden rounded-lg">
            <img
              src="https://www.windowworldla.com/wp-content/uploads/2021/04/entry-door-img-1-768x768.jpg"
              alt="Doors"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
            <div className="relative z-10 mt-auto p-6 text-white">
              <h3 className="mb-2 text-2xl font-bold">Doors</h3>
              <p className="mb-4 text-sm">
                Window World of Los Angeles replacement doors are engineered for excellence. They increase your home's curb appeal and performance while still providing the quality and protection you deserve.
              </p>
              <Button title="Learn More" variant="secondary" size="sm">
                Learn More
              </Button>
            </div>
          </div>
          <div className="group relative flex h-80 flex-col overflow-hidden rounded-lg">
            <img
              src="https://www.windowworldla.com/wp-content/uploads/2020/02/product-vinyl-siding-general-2-768x432.jpg"
              alt="Siding"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
            <div className="relative z-10 mt-auto p-6 text-white">
              <h3 className="mb-2 text-2xl font-bold">Siding</h3>
              <p className="mb-4 text-sm">
                Wrap your home in Window World of Los Angeles's premium replacement vinyl siding. Both affordable and durable, our siding is designed to cut your home energy costs and provide protection from outdoor elements.
              </p>
              <Button title="Learn More" variant="secondary" size="sm">
                Learn More
              </Button>
            </div>
          </div>
          <div className="group relative flex h-80 flex-col overflow-hidden rounded-lg">
            <img
              src="https://www.windowworldla.com/wp-content/uploads/2024/08/ww-long-beach-Product-Roofing-TruDefinition-Duration-1-768x481-1.jpg"
              alt="Roofing"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
            <div className="relative z-10 mt-auto p-6 text-white">
              <h3 className="mb-2 text-2xl font-bold">Roofing</h3>
              <p className="mb-4 text-sm">
                Protect your home and increase its curb appeal with North America's leading brand of high-quality replacement roofing and expert installation.
              </p>
              <Button title="Learn More" variant="secondary" size="sm">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
