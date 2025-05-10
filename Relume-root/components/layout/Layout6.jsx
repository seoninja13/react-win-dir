"use client";

import React from "react";

/**
 * Layout6 Component
 * 
 * A two-column layout with text content on the left and an image on the right.
 * The text content includes a heading, paragraph, and two feature sections.
 * 
 * @component
 * @source Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/Layout6.jsx
 */
export function Layout6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Transform Your Home with Quality Windows and Doors from Window
              World LA
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              At Window World LA, we pride ourselves on providing top-notch
              replacement windows and doors that enhance both beauty and energy
              efficiency. Our commitment to quality and customer satisfaction
              has made us a trusted name in Los Angeles.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Our Values
                </h6>
                <p>
                  We believe in integrity, quality craftsmanship, and
                  exceptional service for every customer.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Service Commitment
                </h6>
                <p>
                  Your satisfaction is our priority, ensuring a seamless
                  experience from start to finish.
                </p>
              </div>
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
