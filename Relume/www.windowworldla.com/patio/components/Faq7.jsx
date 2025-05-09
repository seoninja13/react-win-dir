"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq7() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container w-full max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Find answers to your common questions about our patio doors.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:gap-y-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Are patio doors secure?
            </h2>
            <p>
              Yes, our patio doors are designed with security in mind. They
              feature multi-point locking systems that provide enhanced
              protection against intruders. Additionally, the durable materials
              used in construction ensure longevity and resistance to forced
              entry.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Are they energy efficient?
            </h2>
            <p>
              Absolutely! Our patio doors are equipped with insulated glass and
              weatherstripping to minimize energy loss. This means you can enjoy
              a comfortable home while reducing your energy bills.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do they operate?
            </h2>
            <p>
              Our sliding patio doors glide smoothly along tracks for easy
              operation. Hinged patio doors swing open, providing a wider
              entryway. Both styles are designed for effortless use.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What maintenance is required?
            </h2>
            <p>
              Our patio doors require minimal maintenance. Regular cleaning of
              the glass and tracks will keep them functioning well. Periodic
              checks on the seals and locks will ensure long-lasting
              performance.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What styles are available?
            </h2>
            <p>
              We offer a variety of styles, including sliding and hinged patio
              doors. Each style can be customized with different colors and
              finishes to match your home. Explore our collection to find the
              perfect fit!
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">We're here to help you!</p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
