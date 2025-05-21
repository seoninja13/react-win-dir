"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq2() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Find answers to your questions about our shutters and their
            features.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are they weather resistant?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, our shutters are designed to withstand various weather
              conditions. They are made from durable materials that resist
              fading, warping, and cracking, ensuring long-lasting performance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Can I customize them?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Absolutely! We offer a variety of colors and styles to match your
              home's aesthetic. Custom sizing options are also available to
              ensure a perfect fit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              How to paint vinyl?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Painting vinyl shutters is possible, but we recommend using
              high-quality paint specifically designed for vinyl. This helps
              maintain the integrity and durability of the material.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What are the benefits?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our shutters enhance curb appeal, provide excellent insulation,
              and require minimal maintenance. They are also available in
              various styles to complement any architectural design.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              How long do they last?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              With proper care, our shutters can last for many years. They are
              backed by a lifetime warranty, ensuring your investment is
              protected.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">We're here to help!</p>
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
