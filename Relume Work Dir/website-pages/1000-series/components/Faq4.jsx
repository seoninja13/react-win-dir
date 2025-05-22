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
            Find answers to your questions about the 1000 Series Vinyl Siding.
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
                Is it weather resistant?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes, the 1000 Series is designed to withstand harsh weather
                conditions. Its advanced locking system and rolled-top nailing
                hem provide exceptional durability. You can trust it to protect
                your home in Sacramento's varied climate.
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
                What about curb appeal?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1000 Series offers a classic look that enhances your home's
                exterior. With its wood-like beauty and rich textures, it adds
                significant curb appeal. Homeowners in Sacramento appreciate its
                stylish appearance.
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
                What is the warranty?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1000 Series comes with a Lifetime Transferable Warranty.
                This ensures long-term protection and peace of mind for
                homeowners. You can trust that your investment is safeguarded.
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
                How do I maintain it?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Maintaining the 1000 Series is simple and hassle-free. Regular
                cleaning with soap and water is usually sufficient. Its durable
                finish resists fading and requires minimal upkeep.
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
                Can I see samples?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes, we recommend visiting our Sacramento store to view color
                samples. This will help you choose the perfect shade for your
                home. Our team is ready to assist you with your selections.
              </AccordionContent>
            </AccordionItem>
          </div>
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
