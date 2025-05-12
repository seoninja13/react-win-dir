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
            Find answers to your most common garage door questions below.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              What materials are used?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our garage doors are primarily made from durable steel and wood.
              Steel offers strength and security, while wood provides a classic
              aesthetic. Both materials are designed to withstand the elements.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              How is insulation rated?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Insulation is rated by its R-value, which measures thermal
              resistance. Higher R-values indicate better insulation, helping to
              keep your garage comfortable year-round. Our insulated doors are
              ideal for Sacramento's climate.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are they secure?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, our garage doors are designed with security in mind. They
              feature robust locking mechanisms and durable materials to deter
              intruders. You can rest easy knowing your home is protected.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What maintenance is needed?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Routine maintenance includes checking the door's balance,
              lubricating moving parts, and inspecting seals. Cleaning the
              surface regularly helps maintain its appearance. Following these
              steps ensures longevity and performance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do they operate?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our garage doors operate smoothly with either manual or automatic
              openers. The automatic systems include safety features to prevent
              accidents. You can choose the option that best suits your
              lifestyle.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
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
