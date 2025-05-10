"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Ready to Transform Your Home?
            </h2>
            <p className="md:text-md">
              Schedule your free consultation today and discover how our premium 
              windows and doors can enhance your home's beauty, comfort, and 
              energy efficiency. Our expert team is ready to help you every 
              step of the way.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Schedule Free Consultation">Schedule Free Consultation</Button>
              <Button title="View Our Products" variant="secondary">
                View Our Products
              </Button>
            </div>
          </div>
          <div>
            <img
              src="/assets/images/cta/happy-homeowners.jpg"
              className="w-full rounded-image object-cover"
              alt="Happy homeowners with their new windows and doors"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
