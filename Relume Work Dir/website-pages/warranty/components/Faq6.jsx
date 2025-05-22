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

export function Faq6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Discover the details of our limited lifetime warranty and what it
            covers for your peace of mind.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
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
                What does the warranty cover?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Our warranty covers defects in materials and workmanship for the
                lifetime of the product. This includes issues like peeling,
                cracking, or warping. If you experience any of these problems,
                we will repair or replace your windows or doors at no cost.
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
                Is there a transfer policy?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes, our warranty is transferable to the next homeowner, which
                adds value to your property. This means that if you sell your
                home, the new owners will also benefit from the warranty. It's a
                great selling point!
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
                How long does it last?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The warranty lasts for the lifetime of the original homeowner.
                It covers the products as long as they remain installed in the
                original home. This ensures long-term protection and peace of
                mind.
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
                Are there any exclusions?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Certain conditions are not covered, such as damage caused by
                improper installation or natural disasters. Additionally, normal
                wear and tear is not included. Always refer to the warranty
                documentation for complete details.
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
                How to file a claim?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                To file a claim, simply contact our customer service team with
                your warranty information. We will guide you through the process
                and ensure your claim is handled promptly. Our goal is to make
                this as easy as possible for you.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
      </div>
    </section>
  );
}
