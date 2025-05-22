"use client";

import React from "react";

export function Layout209() {
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
            <h3 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Explore Our Top Picks for Complementary Window and Door Styles
            </h3>
            <p className="mb-5 md:mb-6 md:text-md">
              Enhance your home’s beauty and functionality with our carefully
              selected related products. Discover operable window styles and
              patio doors that perfectly pair with Picture windows.
            </p>
            <div className="grid grid-cols-1 gap-4 py-2">
              <div className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo"
                    className="size-6"
                  />
                </div>
                <p>Double-Hung Windows: Versatile and easy to operate.</p>
              </div>
              <div className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo"
                    className="size-6"
                  />
                </div>
                <p>
                  Casement Windows: Ideal for maximum ventilation and views.
                </p>
              </div>
              <div className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo"
                    className="size-6"
                  />
                </div>
                <p>Patio Doors: Seamless access to your outdoor space.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
