"use client";

import React from "react";

export function Layout90() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-8 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <h3 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
            Introducing the Window World Credit Card Program for Your Home
            Improvements
          </h3>
          <p className="md:text-md">
            Our Window World Credit Card Program, offered through trusted
            partners like Synchrony and Wells Fargo, provides a revolving line
            of credit tailored specifically for your window and door purchases.
            This financing option makes it easier for homeowners in Sacramento
            to invest in quality upgrades without the immediate financial
            burden. Enjoy the flexibility and convenience of managing your home
            improvement projects with a credit line designed just for you.
          </p>
        </div>
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
          className="w-full rounded-image object-cover"
          alt="Relume placeholder image"
        />
      </div>
    </section>
  );
}
