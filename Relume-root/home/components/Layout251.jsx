"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout251() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Our Process</p>
            <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
              Three Simple Steps to Transform Your Home
            </h2>
          </div>
          <div>
            <p className="md:text-md">
              We've made upgrading your windows and doors as simple as possible. 
              Our expert team will guide you through each step, from initial consultation 
              to final installation, ensuring a seamless and stress-free experience.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="/assets/images/process/consultation.jpg"
                alt="Free in-home consultation"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              1. Free Consultation
            </h3>
            <p>Schedule a convenient time for our expert to visit your home and discuss your needs.</p>
          </div>
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="/assets/images/process/product-selection.jpg"
                alt="Product selection process"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              2. Choose Products
            </h3>
            <p>Select from our wide range of energy-efficient windows and stylish doors.</p>
          </div>
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="/assets/images/process/professional-installation.jpg"
                alt="Professional installation"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              3. Expert Installation
            </h3>
            <p>Our certified professionals ensure precise installation and a perfect finish.</p>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20">
          <Button variant="secondary">Schedule Free Consultation</Button>
          <Button iconRight={<RxChevronRight />} variant="link" size="link">
            View Installation Process
          </Button>
        </div>
      </div>
    </section>
  );
}
