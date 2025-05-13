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
            FAQs
          </h2>
          <p className="md:text-md">
            Find answers to your questions about our 1500 Series siding.
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
                What makes the 1500 Series different from entry-level options?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1500 Series offers enhanced features compared to entry-level options, 
                including thicker vinyl construction for improved durability, better 
                insulation properties for increased energy efficiency, and a wider 
                selection of designer colors and premium profiles. These upgrades 
                provide better performance and more aesthetic options at a competitive 
                mid-range price point.
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
                How does the 1500 Series improve energy efficiency?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1500 Series features enhanced insulation properties with a thicker 
                vinyl construction and improved design that creates a more effective 
                thermal barrier. This helps maintain more consistent indoor temperatures 
                throughout the year, potentially reducing heating and cooling costs. 
                Many homeowners notice a significant improvement in comfort and energy 
                performance after installation.
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
                What warranty comes with the 1500 Series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1500 Series comes with our Enhanced Limited Lifetime Warranty, 
                which covers manufacturing defects for as long as you own your home, 
                plus additional coverage for color fade and hail damage. This comprehensive 
                warranty provides excellent protection and peace of mind for your 
                investment in our mid-range siding option.
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
                How does the 1500 Series perform in Sacramento's climate?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1500 Series is specifically designed to withstand Sacramento's 
                varied climate conditions. Its enhanced durability provides excellent 
                resistance to the hot summer sun, preventing warping and fading. 
                The improved insulation properties also help maintain comfortable 
                indoor temperatures during both hot summers and cooler winters, 
                making it an ideal choice for local homeowners.
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
                Can I see samples of the 1500 Series colors and profiles?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes! We encourage you to visit our Sacramento showroom to view 
                samples of the 1500 Series siding. Our knowledgeable staff can 
                help you explore the expanded selection of designer colors and 
                premium profiles to find the perfect combination for your home. 
                We also offer sample kits that you can take home to see how the 
                colors look against your existing exterior.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Ready to get started?
          </h4>
          <p className="md:text-md">Our consultants are ready to help you!</p>
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
