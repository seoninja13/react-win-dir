"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Discover everything you need to know about Picture windows and their
            benefits.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              What are Picture windows?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Picture windows are large, fixed windows designed to provide
              unobstructed views of the outdoors. They maximize natural light
              and enhance the aesthetic appeal of your home. Unlike operable
              windows, they do not open, making them energy-efficient.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are they energy-efficient?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, Picture windows are highly energy-efficient due to their
              fixed design, which eliminates air leaks. They can be equipped
              with energy-efficient glass options like Low-E to further enhance
              insulation. This helps reduce heating and cooling costs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do they compare?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Compared to operable windows, Picture windows offer better views
              and increased energy efficiency. However, they do not provide
              ventilation since they cannot be opened. This makes them ideal for
              areas where fresh air is not a priority.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What are the benefits?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              The primary benefits of Picture windows include enhanced natural
              light, stunning outdoor views, and improved curb appeal. They also
              contribute to energy savings and require less maintenance than
              operable windows. Their sleek design can elevate the overall look
              of your home.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              What materials are used?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Picture windows are typically constructed from high-quality vinyl,
              which is durable and resistant to warping. They often feature
              insulated glass packages to enhance energy efficiency. This
              combination ensures longevity and performance in various weather
              conditions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
