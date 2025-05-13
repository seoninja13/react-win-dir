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
            Find answers to your questions about our flagship 5000 Series siding.
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
                What distinguishes the 5000 Series as your flagship vinyl siding?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 5000 Series represents the pinnacle of our vinyl siding collection, 
                featuring custom architectural profiles, elite designer colors, and our most 
                sophisticated finishes not available in any other series. It's handcrafted 
                with our highest-grade materials and most advanced proprietary technology, 
                providing superior thickness, enhanced insulation, and our exclusive UltraGrain™ 
                texturing that perfectly replicates the look of handcrafted wood. This flagship 
                line is designed for Sacramento's most distinguished homes and discerning 
                homeowners who demand uncompromising aesthetics, performance, and value.
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
                What exclusive features does the 5000 Series offer?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 5000 Series offers several exclusive features, including our proprietary 
                ColorLock Ultra™ technology that maintains vibrant color with unmatched depth 
                and richness, our most sophisticated matte and low-gloss finishes, custom 
                architectural profiles with our deepest shadow lines, and our exclusive 
                UltraGrain™ textures. It also features our thickest vinyl construction with 
                reinforced backing for superior impact resistance, our most advanced insulation 
                technology for optimal energy efficiency, and our Lifetime Plus Elite warranty 
                coverage with transferable protection.
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
                What warranty comes with the 5000 Series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 5000 Series comes with our Lifetime Plus Elite Warranty, our most 
                comprehensive coverage package. This includes a lifetime warranty on 
                manufacturing defects, a lifetime color fade warranty, a lifetime hail damage 
                warranty, and a 30-year fully transferable warranty that maintains complete 
                coverage even if you sell your home. We also provide a 10-year labor warranty 
                on all 5000 Series installations and a 5-year annual maintenance program that 
                includes professional inspections and cleaning to ensure your siding maintains 
                its pristine appearance and optimal performance.
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
                How does the design consultation process work for the 5000 Series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Our 5000 Series design consultation process is a comprehensive, personalized 
                experience. It begins with an in-home consultation with one of our architectural 
                design specialists who will assess your home's architectural style and discuss 
                your aesthetic preferences. We then create custom digital renderings using our 
                Architectural Visualization Studio to show you exactly how different profiles, 
                colors, and complementary products will look on your home. You'll receive 
                large-format samples of your selected options to view in different lighting 
                conditions. Throughout the process, our design specialist will provide expert 
                guidance to help you create a cohesive, sophisticated exterior that enhances 
                your home's architectural character.
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
                What is the installation process for the 5000 Series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 5000 Series installation process is executed by our Elite Installation Team, 
                comprised of our most experienced craftsmen who specialize in architectural 
                siding installation. The process begins with a comprehensive pre-installation 
                consultation to review the project details and timeline. Our team then performs 
                a meticulous preparation of your home's exterior, including removal of existing 
                siding, inspection and repair of the underlying structure, and installation of 
                our premium moisture barrier system. The siding installation follows our 
                proprietary architectural installation protocol, with careful attention to 
                every detail, including custom cutting and fitting around architectural 
                features. Throughout the process, our project manager provides daily updates 
                and conducts quality inspections. Upon completion, we perform a final 
                walkthrough with you to ensure your complete satisfaction.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Ready to transform your home's exterior?
          </h4>
          <p className="md:text-md">Our architectural design specialists are ready to help you create your distinguished exterior.</p>
          <div className="mt-6 md:mt-8">
            <Button title="Schedule Architectural Design Consultation" variant="secondary">
              Schedule Architectural Design Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
