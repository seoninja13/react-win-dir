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
            Discover answers to your most pressing questions about the 1000
            Series vinyl siding.
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
          <div className="border rounded-md shadow-sm">
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
                Yes, the 1000 Series vinyl siding is designed to withstand harsh
                weather conditions. Its durable construction ensures it remains
                intact and visually appealing, regardless of the elements. You
                can trust it to protect your home for years to come.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="border rounded-md shadow-sm">
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
                significant curb appeal. Homeowners in Sacramento love how it
                transforms their properties.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="border rounded-md shadow-sm">
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
                The 1000 Series comes with a Lifetime Transferable Warranty,
                ensuring your investment is protected. This warranty covers
                defects in materials and workmanship, giving you peace of mind.
                It's a commitment to quality that we stand by.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="border rounded-md shadow-sm">
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
                Maintaining the 1000 Series is easy and requires minimal effort.
                Regular cleaning with soap and water is usually sufficient to
                keep it looking new. There’s no need for painting or staining,
                making it a practical choice for busy homeowners.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="border rounded-md shadow-sm">
            <AccordionItem value="item-4" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                Can I customize colors?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Absolutely! The 1000 Series offers a rich palette of 15 colors
                to choose from. You can easily find a shade that complements
                your home’s style and enhances its overall aesthetic.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
      </div>
    </section>
  );
}
