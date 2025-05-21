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
            Find answers to your most common questions about sliding windows and
            their benefits.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              What are sliding windows?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Sliding windows are a type of window that opens horizontally. They
              consist of two or more sashes that slide past each other. This
              design maximizes your view and allows for easy ventilation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are sliding windows energy-efficient?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, sliding windows can be highly energy-efficient. They often
              feature insulated glass and weatherstripping to minimize air
              leaks. This helps maintain your home's temperature and can reduce
              energy bills.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do I clean them?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Cleaning sliding windows is simple. Use a soft cloth and a mild
              detergent to wipe down the glass and frames. Regular maintenance
              will keep them looking great and functioning well.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What colors are available?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We offer a variety of color options for sliding windows. You can
              choose from classic whites to modern grays and bold colors. Custom
              colors may also be available upon request.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              Do they come with warranties?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, our sliding windows come with a lifetime warranty. This
              warranty covers defects in materials and workmanship. We stand
              behind our products to ensure your satisfaction.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">
            Reach out to our team for more information.
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
