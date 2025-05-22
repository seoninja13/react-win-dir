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
            Find answers to your questions about our financing options and how
            they can benefit you.
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
                What is financing?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Financing allows you to spread the cost of your home improvement
                project over time. This makes it easier to manage your budget
                while still getting the upgrades you need. At Window World of
                Greater Sacramento, we offer flexible financing options tailored
                to your needs.
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
                How do I apply?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                You can apply for financing online through our secure portal or
                during your free in-home estimate. Our design consultants are
                available to assist you with the application process. Choose the
                method that works best for you!
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
                What are the terms?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Our financing terms vary based on credit approval but often
                include promotional offers like 0% interest for a limited time.
                We strive to provide flexible payment options that fit your
                budget. Always check the specifics during your application.
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
                Is there an annual fee?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Typically, there are no annual fees associated with our
                financing options. However, it's important to review the terms
                provided during your application. We aim to keep our financing
                straightforward and affordable.
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
                Can I use financing?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes, you can use our financing for windows, doors, and siding
                projects. This flexibility allows you to complete your home
                improvement projects without delay. Contact us for more details
                on eligible products.
              </AccordionContent>
            </AccordionItem>
          </div>
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
