"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";
import { RxPlus } from "react-icons/rx";

export function Faq4() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Discover answers to your questions about Bay & Bow windows and their
            benefits.
          </p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          <div className="border rounded-lg shadow-sm">
            <AccordionItem value="item-0" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                What are Bay windows?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Bay windows are a combination of three or more windows that
                project outward from your home. They create a beautiful nook and
                enhance the curb appeal. This design allows for more natural
                light and a wider view of your surroundings.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="border rounded-lg shadow-sm">
            <AccordionItem value="item-1" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                What are Bow windows?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Bow windows consist of four or more windows that form a gentle
                curve. They provide a more rounded appearance and can create a
                spacious feel inside your home. Like Bay windows, they also
                increase natural light and enhance aesthetics.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="border rounded-lg shadow-sm">
            <AccordionItem value="item-2" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                Are they energy efficient?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes, Bay and Bow windows are designed with energy efficiency in
                mind. They feature insulated glass and durable frames that help
                maintain your home's temperature. This can lead to lower energy
                bills and a more comfortable living space.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="border rounded-lg shadow-sm">
            <AccordionItem value="item-3" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                How do I clean them?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Cleaning Bay and Bow windows is straightforward. Simply use a
                soft cloth and a mild cleaning solution to wipe down the glass
                and frames. Ensure you follow the manufacturer's guidelines for
                any specific care instructions.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="border rounded-lg shadow-sm">
            <AccordionItem value="item-4" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                Can I customize them?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Absolutely! Our Bay and Bow windows come in various styles,
                colors, and configurations. You can choose the perfect
                combination to match your home's aesthetic and personal
                preferences.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">Our team is here to help you!</p>
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
