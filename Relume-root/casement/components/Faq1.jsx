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
            Find answers to common questions about our casement windows and
            their benefits.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              What are casement windows?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Casement windows are hinged at the side and open outward. They
              provide excellent ventilation and unobstructed views. Ideal for
              Sacramento's climate, they enhance energy efficiency.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are they energy efficient?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, casement windows are designed to be energy efficient. They
              feature advanced insulation and sealing technology that minimizes
              air leaks. This helps maintain comfortable indoor temperatures
              year-round.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do I clean them?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Cleaning casement windows is straightforward. Simply open the
              window fully to access both sides of the glass. Use a mild
              detergent and a soft cloth for best results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What colors are available?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We offer a wide range of colors for casement windows. You can
              choose from classic whites to modern shades that complement your
              home's exterior. Custom colors are also available upon request.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              Do they come with warranties?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, our casement windows come with a lifetime warranty. This
              ensures your investment is protected against defects and issues.
              Enjoy peace of mind with our quality assurance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">Reach out to our team for assistance.</p>
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
