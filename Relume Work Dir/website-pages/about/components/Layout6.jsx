"use client";

import React from "react";

export function Layout6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Explore Our Local Showroom for Your Home Improvement Needs
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Visit our showroom in Sacramento to see our wide range of windows
              and doors. Our knowledgeable staff is ready to assist you in
              finding the perfect solutions for your home.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Location Details
                </h6>
                <p>
                  Conveniently located at 123 Main St, Sacramento, CA 95814.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Hours of Operation
                </h6>
                <p>
                  Open Monday to Friday, 9 AM to 5 PM, and Saturday by
                  appointment.
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/images/about/about-showroom-interior.png"
              className="w-full rounded-image object-cover"
              alt="Window World showroom interior in Sacramento with window and door displays"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
