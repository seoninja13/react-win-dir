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

export function Faq5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Premium FAQs
          </h2>
          <p className="md:text-md">
            Find answers to your questions about our premium 3000 Series siding.
          </p>
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
                What makes the 3000 Series premium?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 3000 Series represents our premium vinyl siding option, featuring
                enhanced thickness, superior insulation properties, exclusive designer
                colors, and premium textures not available in other series. It's engineered
                for luxury homes and discerning homeowners who want the absolute best in
                appearance, durability, and energy efficiency.
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
                How does the insulation compare to other series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 3000 Series features our most advanced insulation technology,
                with up to 20% better thermal performance than our standard series.
                This premium insulation not only improves energy efficiency but also
                provides superior sound dampening properties and enhanced structural
                integrity.
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
                What warranty comes with the 3000 Series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 3000 Series comes with our Premium Lifetime Plus Warranty,
                which includes lifetime coverage for materials and workmanship,
                plus an additional 15-year color fade protection and 10-year
                transferability to a second homeowner. This comprehensive warranty
                reflects our confidence in the superior quality of our premium siding.
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
                How does the 3000 Series enhance home value?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 3000 Series premium siding has been shown to increase home values
                by up to 15% compared to standard siding options. Its distinctive
                appearance, superior durability, and enhanced energy efficiency make
                it a valuable investment that pays dividends in both curb appeal and
                resale value.
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
                Can I see the premium colors and textures in person?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Absolutely! We invite you to visit our exclusive Premium Design Studio
                at our Sacramento showroom, where you can experience our full collection
                of designer colors and premium textures in person. Our design consultants
                can help you select the perfect combination for your luxury home and even
                create digital renderings to visualize the final result.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Ready for premium quality?
          </h4>
          <p className="md:text-md">Our premium design consultants are ready to assist you!</p>
          <div className="mt-6 md:mt-8">
            <Button title="Schedule Consultation" variant="secondary">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
