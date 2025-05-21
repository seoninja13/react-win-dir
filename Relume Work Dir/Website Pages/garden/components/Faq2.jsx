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
            Find answers to your most common questions about garden windows.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              What are garden windows?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Garden windows are a type of window that extends outward from the
              home, creating a small shelf or ledge. They are designed to
              maximize natural light and provide a unique display area for
              plants and decor. Ideal for kitchens, they enhance both aesthetics
              and functionality.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do they operate?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Garden windows typically feature operable side vents that allow
              for ventilation. The main window is fixed, providing stability and
              insulation. This design ensures that you can enjoy fresh air while
              showcasing your plants.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              What are the benefits?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Garden windows add space and dimension to your home, allowing for
              more natural light. They create a beautiful display area for
              plants and decorative items while enhancing the overall aesthetics
              of your kitchen. Additionally, they improve energy efficiency,
              making them a smart choice for homeowners.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are they energy efficient?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, garden windows are designed with energy efficiency in mind.
              They often feature insulated glass and durable frames that help
              maintain indoor temperatures. This means lower energy bills and a
              more comfortable home environment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do I maintain them?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Maintaining garden windows is relatively easy. Regular cleaning
              with a mild detergent and water will keep them looking great.
              Additionally, check the seals and hardware periodically to ensure
              everything is functioning properly.
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
