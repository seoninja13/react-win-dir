"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq10() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Explore our frequently asked questions about windows, doors, and
            installation in Sacramento.
          </p>
        </div>
        <div className="grid w-full auto-rows-min grid-cols-1 items-start gap-x-12 md:grid-cols-2 lg:gap-x-16">
          <Accordion type="multiple" className="w-full">
            <AccordionItem
              value="item-faq10_accordion"
              className="overflow-hidden"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                What are replacement windows?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Replacement windows are new windows installed in place of old or
                damaged ones. They enhance energy efficiency and improve the
                aesthetics of your home. Our windows come with a lifetime
                warranty for peace of mind.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-faq10_accordion-2"
              className="overflow-hidden"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                How long does installation take?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Installation typically takes one to two days, depending on the
                number of windows being replaced. Our professional team ensures
                minimal disruption to your daily routine. We strive for a quick
                and efficient process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-faq10_accordion-3"
              className="overflow-hidden"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                What is energy efficiency?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Energy efficiency refers to using less energy to provide the
                same service. Our windows are designed to minimize heat loss,
                helping you save on energy bills. This is especially important
                in Sacramento's climate.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-faq10_accordion-4"
              className="overflow-hidden"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                Do you offer financing?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes, we provide flexible financing options to help you manage
                your budget. Our team can guide you through the available plans.
                Contact us to learn more about financing your new windows or
                doors.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-faq10_accordion-5"
              className="overflow-hidden"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                What warranties do you offer?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                We offer a lifetime warranty on our replacement windows and
                doors. This warranty covers defects in materials and
                workmanship. Your investment is protected for years to come.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="multiple" className="w-full">
            <AccordionItem
              value="item-faq10_accordion-6"
              className="overflow-hidden first:border-t-0 md:first:border-t"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                How do I maintain them?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Maintaining your windows is simple; regular cleaning and
                inspection are key. Use mild soap and water for cleaning. Check
                for any signs of wear and contact us for repairs if needed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-faq10_accordion-7"
              className="overflow-hidden first:border-t-0 md:first:border-t"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                Can I see samples?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Absolutely! We invite you to visit our Sacramento showroom to
                see window and door samples. Our team will assist you in
                choosing the right options for your home. Schedule a visit
                today!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-faq10_accordion-8"
              className="overflow-hidden first:border-t-0 md:first:border-t"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                What is your service area?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                We proudly serve Sacramento and the surrounding areas. Our team
                is ready to assist homeowners throughout the region. Contact us
                to find out if we cover your specific location.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-faq10_accordion-9"
              className="overflow-hidden first:border-t-0 md:first:border-t"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                How do I get a quote?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Getting a quote is easy! Simply schedule a free estimate through
                our website or call us directly. Our team will assess your needs
                and provide you with a detailed estimate.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-faq10_accordion-10"
              className="overflow-hidden first:border-t-0 md:first:border-t"
            >
              <AccordionTrigger className="md:py-5 md:text-md">
                Are your products energy-efficient?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Yes, all our products are designed with energy efficiency in
                mind. They meet or exceed industry standards for insulation and
                performance. This means lower energy bills and a more
                comfortable home.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">
            Contact our Sacramento office for more information.
          </p>
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
