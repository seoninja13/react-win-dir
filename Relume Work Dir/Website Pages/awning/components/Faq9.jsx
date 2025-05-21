"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Find answers to your questions about Awning windows in Sacramento.
          </p>
        </div>
        <div>
          <div className="grid auto-cols-fr grid-cols-1 items-start gap-x-10 gap-y-4 border-t border-border-primary pt-5 pb-10 sm:grid-cols-[0.75fr_1fr] md:gap-x-12 md:gap-y-16 md:pt-6 md:pb-12 lg:gap-x-16 lg:gap-y-20">
            <h2 className="font-bold md:text-md">What are Awning windows?</h2>
            <p>
              Awning windows are hinged at the top and open outward. They
              provide excellent ventilation while keeping rain out. Ideal for
              Sacramento's climate, they enhance airflow without compromising on
              protection.
            </p>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 items-start gap-x-10 gap-y-4 border-t border-border-primary pt-5 pb-10 sm:grid-cols-[0.75fr_1fr] md:gap-x-12 md:gap-y-16 md:pt-6 md:pb-12 lg:gap-x-16 lg:gap-y-20">
            <h2 className="font-bold md:text-md">How do they operate?</h2>
            <p>
              Awning windows operate using a simple crank mechanism. This allows
              you to open them outward with ease. The top hinge design ensures
              they remain secure even in windy conditions.
            </p>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 items-start gap-x-10 gap-y-4 border-t border-border-primary pt-5 pb-10 sm:grid-cols-[0.75fr_1fr] md:gap-x-12 md:gap-y-16 md:pt-6 md:pb-12 lg:gap-x-16 lg:gap-y-20">
            <h2 className="font-bold md:text-md">Are they energy efficient?</h2>
            <p>
              Yes, Awning windows are designed for energy efficiency. They
              feature insulated glass and a tight seal to minimize air leaks.
              This can lead to lower energy bills for Sacramento homeowners.
            </p>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 items-start gap-x-10 gap-y-4 border-t border-border-primary pt-5 pb-10 sm:grid-cols-[0.75fr_1fr] md:gap-x-12 md:gap-y-16 md:pt-6 md:pb-12 lg:gap-x-16 lg:gap-y-20">
            <h2 className="font-bold md:text-md">What about durability?</h2>
            <p>
              Awning windows are built to last, using high-quality materials
              that resist wear and tear. They are designed to withstand
              Sacramento's weather conditions. Regular maintenance will ensure
              their longevity.
            </p>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 items-start gap-x-10 gap-y-4 border-t border-border-primary pt-5 pb-10 sm:grid-cols-[0.75fr_1fr] md:gap-x-12 md:gap-y-16 md:pt-6 md:pb-12 lg:gap-x-16 lg:gap-y-20">
            <h2 className="font-bold md:text-md">How do I clean them?</h2>
            <p>
              Cleaning Awning windows is straightforward. Simply use a soft
              cloth and a mild detergent to wipe down the glass and frames.
              Ensure the window is closed while cleaning to avoid accidents.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
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
