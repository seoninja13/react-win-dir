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
            Find answers to your questions about custom windows and their
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
                What are custom shapes?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Custom shapes are uniquely designed window styles tailored to
                fit your home's architecture. They can enhance the aesthetic
                appeal and functionality of your space. Choose from various
                designs to match your vision.
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
                Are they energy efficient?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes, our custom windows are designed with energy efficiency in
                mind. They feature insulated panes and Low-E glass to minimize
                energy loss. This helps keep your home comfortable while
                reducing utility bills.
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
                How are they installed?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Installation is performed by our skilled professionals who
                ensure a precise fit. We follow best practices to maintain the
                integrity of your home. Our team will guide you through the
                entire process.
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
                What materials are used?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                We use high-quality materials to ensure durability and
                performance. Our frames are constructed to withstand the
                elements while providing excellent insulation. You can choose
                from a variety of finishes to match your style.
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
                Absolutely! We offer a visualizer tool that allows you to see
                how different styles will look on your home. You can upload a
                photo of your house or choose from our gallery. This helps you
                make an informed decision.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">Reach out to our team for assistance.</p>
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
