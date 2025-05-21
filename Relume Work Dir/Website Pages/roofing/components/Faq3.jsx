"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Your questions answered about Owens Corning roofing and our
            installation process.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              Why choose Owens Corning?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Owens Corning is renowned for its high-quality roofing products.
              Their innovative technology ensures durability and performance.
              Choosing Owens Corning means investing in long-lasting protection
              for your home.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              What is SureNail®?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              SureNail® technology provides exceptional grip and wind
              resistance. This innovative feature enhances the overall
              performance of your roofing system. It ensures that your roof can
              withstand the elements effectively.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              What is the lifespan?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              The lifespan of Owens Corning shingles typically ranges from 25 to
              50 years, depending on the product. Regular maintenance can help
              maximize their longevity. Investing in quality roofing means fewer
              worries for years to come.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              What warranties are available?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Owens Corning offers a variety of warranties, including limited
              lifetime options. These warranties cover both materials and
              workmanship, providing peace of mind. Always check the specific
              warranty details for your chosen product.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              How is installation done?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Our professional installers follow strict guidelines to ensure
              quality workmanship. They are trained in the latest techniques for
              optimal performance. You can trust that your roofing will be
              installed correctly and efficiently.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
