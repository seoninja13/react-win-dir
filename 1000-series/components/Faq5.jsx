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
            Find answers to your questions about our 1000 Series siding.
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
                What is the 1000 Series siding?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1000 Series is our entry-level vinyl siding option, offering a 
                balance of affordability and quality. It features standard thickness, 
                basic insulation properties, and a selection of popular colors and 
                profiles. It's designed for homeowners looking for a cost-effective 
                way to improve their home's appearance and protection.
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
                How does it compare to other series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1000 Series offers standard insulation and durability at an 
                affordable price point. While it doesn't have the enhanced features 
                of our premium series, it still provides reliable protection and 
                improved appearance for your home. It's an excellent value option 
                for budget-conscious homeowners.
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
                What warranty comes with the 1000 Series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1000 Series comes with our Standard Limited Lifetime Warranty, 
                which covers manufacturing defects for as long as you own your home. 
                This warranty provides basic protection and peace of mind for your 
                investment in our entry-level siding option.
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
                Is it energy efficient?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 1000 Series provides basic insulation properties that can help 
                improve your home's energy efficiency compared to older siding or 
                no siding at all. While it doesn't offer the advanced insulation 
                of our premium series, many homeowners still notice a difference 
                in comfort and potentially some savings on energy bills.
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
                Can I see the colors and profiles in person?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes! We encourage you to visit our Sacramento showroom to view 
                samples of the 1000 Series siding. Our knowledgeable staff can 
                help you explore the available colors and profiles to find the 
                best option for your home and budget.
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
