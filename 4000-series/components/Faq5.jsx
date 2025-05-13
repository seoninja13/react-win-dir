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
            Find answers to your questions about our premium 4000 Series siding.
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
                What makes the 4000 Series our premium vinyl siding option?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 4000 Series represents our luxury vinyl siding line, featuring exclusive 
                architectural profiles, designer colors, and premium finishes not available 
                in other series. It's manufactured with our highest-grade materials and 
                most advanced technology, providing superior thickness, enhanced insulation, 
                and exclusive texturing that replicates the look of custom milled wood with 
                remarkable accuracy. This premium line is designed for discerning homeowners 
                who want the ultimate in aesthetics, performance, and value.
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
                What exclusive features does the 4000 Series offer?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 4000 Series offers several exclusive features, including our proprietary 
                ColorLock™ technology that maintains vibrant color even after decades of 
                exposure, premium matte and low-gloss finishes, architectural profiles with 
                deeper shadow lines, and our most realistic wood grain textures. It also 
                features our thickest vinyl construction for superior impact resistance, 
                enhanced insulation for improved energy efficiency, and our most comprehensive 
                warranty coverage.
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
                What warranty comes with the 4000 Series?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 4000 Series comes with our Premium Lifetime Plus Warranty, our most 
                comprehensive coverage package. This includes a lifetime warranty on 
                manufacturing defects, a 30-year color fade warranty, a 30-year hail damage 
                warranty, and a 15-year transferable warranty that maintains full coverage 
                even if you sell your home. We also provide a 5-year labor warranty on all 
                4000 Series installations, giving you complete peace of mind with your 
                investment.
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
                How does the 4000 Series compare to real wood siding?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                The 4000 Series provides the authentic look of custom milled wood siding 
                without the maintenance concerns. Our advanced texturing technology replicates 
                the natural grain patterns and architectural profiles of premium wood siding 
                with remarkable accuracy. Unlike wood, however, the 4000 Series never needs 
                painting, staining, or sealing, is impervious to insects and rot, and won't 
                warp, crack, or split over time. It also offers superior energy efficiency 
                and comes with a comprehensive warranty that wood siding can't match.
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
                Can I see samples of the 4000 Series before deciding?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Absolutely! We offer several ways to experience the 4000 Series before making 
                your decision. Visit our Sacramento showroom to view full-size panels in all 
                available profiles and colors. We also offer a Premium Sample Kit that includes 
                large samples of our most popular colors and profiles that you can take home 
                to see how they look against your existing exterior. Additionally, our design 
                consultants can bring samples to your home during a complimentary consultation, 
                and our 3D Design Studio allows you to visualize the 4000 Series on your home 
                with photorealistic accuracy.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Ready to elevate your home's exterior?
          </h4>
          <p className="md:text-md">Our design consultants are ready to help you create your dream exterior.</p>
          <div className="mt-6 md:mt-8">
            <Button title="Schedule Design Consultation" variant="secondary">
              Schedule Design Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
