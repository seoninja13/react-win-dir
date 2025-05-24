"use client";

import React from "react";

export function Layout6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Discover Energy-Efficient Replacement Windows for Your Sacramento
              Home Today!
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              At Window World Sacramento, we prioritize quality and value in
              every installation. Our energy-efficient windows not only enhance
              your home's aesthetic but also help you save on energy bills.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Quality Assurance
                </h6>
                <p>
                  Enjoy peace of mind with our lifetime warranty on all window
                  installations.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Energy Efficiency
                </h6>
                <p>
                  Our windows are designed to maximize energy savings and reduce
                  your carbon footprint.
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/images/windows/windows-energy-efficient-feature.png"
              className="w-full rounded-image object-cover"
              alt="Energy-efficient window installation detail"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
