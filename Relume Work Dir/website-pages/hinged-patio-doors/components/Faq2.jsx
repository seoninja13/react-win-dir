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
            Find answers to common questions about Hinged Patio Doors below.
          </p>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are they secure?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Yes, our Hinged Patio Doors feature multi-point locking systems
              that enhance security. They are designed to withstand forced
              entry, providing peace of mind for homeowners. You can trust that
              your home is safe with our durable door options.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Are they energy efficient?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Absolutely! Our Hinged Patio Doors are equipped with insulated
              glass and weatherstripping to minimize energy loss. This helps
              maintain a comfortable indoor climate while reducing your energy
              bills. Enjoy both style and efficiency with our doors.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              How do they operate?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Hinged Patio Doors swing open either inwards or outwards,
              depending on your preference. This design allows for a wide
              opening, creating a seamless transition between indoor and outdoor
              spaces. They are easy to operate, making them perfect for everyday
              use.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What maintenance is required?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our Hinged Patio Doors require minimal maintenance. Regular
              cleaning of the glass and frames will keep them looking new.
              Additionally, checking the weatherstripping and hardware
              periodically ensures optimal performance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              What styles are available?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              We offer a variety of styles, including classic French doors and
              contemporary designs. Each style can be customized with different
              finishes and configurations to match your home’s aesthetic.
              Explore our collection to find the perfect fit.
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
