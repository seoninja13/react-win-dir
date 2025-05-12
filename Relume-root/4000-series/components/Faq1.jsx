"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Find answers to your questions about the 4000 Series Vinyl Siding.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              What is durability?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              The 4000 Series Vinyl Siding is designed for exceptional
              durability. It withstands harsh weather conditions, ensuring your
              home remains protected. With heavy-duty materials, it offers
              long-lasting performance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Energy efficiency benefits?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our 4000 Series offers advanced energy efficiency options.
              Insulated panels help reduce heating and cooling costs, making
              your home more comfortable. This means lower energy bills and a
              smaller carbon footprint.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              How to maintain?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Maintaining your 4000 Series siding is easy. Regular cleaning with
              soap and water is all that's needed. Avoid harsh chemicals to
              preserve its finish and color.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What is the warranty?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              The 4000 Series comes with a Lifetime Transferable Warranty. This
              warranty covers defects in materials and workmanship. You can have
              peace of mind knowing your investment is protected.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              Installation process details?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our professional installation ensures a perfect fit for your 4000
              Series siding. We follow best practices to guarantee durability
              and performance. Expect minimal disruption during the installation
              process.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">
            Reach out for more information about our products.
          </p>
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
