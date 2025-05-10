"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout4_1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Financing</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Affordable Home Improvement Solutions
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Don't let budget constraints delay your home improvement plans. 
              We offer flexible financing options with competitive rates and 
              convenient monthly payments to help you get the windows and doors 
              you need today.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  0% APR Financing
                </h6>
                <p>
                  Qualified buyers can enjoy interest-free financing for up to 12 months.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Special Offers
                </h6>
                <p>Save up to 20% on select windows and doors for a limited time!</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="View Financing Options" variant="secondary">
                View Financing Options
              </Button>
              <Button
                title="Apply Now"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Apply Now
              </Button>
            </div>
          </div>
          <div>
            <img
              src="/assets/images/financing/financing-options.jpg"
              className="w-full rounded-image object-cover"
              alt="Family enjoying their new energy-efficient windows"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
