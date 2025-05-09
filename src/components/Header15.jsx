"use client";

import React from "react";
import { Button } from "@relume_io/relume-ui";

export default function Header15() {
  return (
    <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-background-primary px-[5%] py-16">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            Window, Door & Siding Replacement in Los Angeles, CA
          </h2>
          <p className="text-lg">
            Take Your Home To New Heights With Window World of Los Angeles
          </p>
        </div>
        <form className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-xl font-bold">Request Your Free Estimate</h3>
            <p className="text-sm text-gray-600">Fill out the form below to get started</p>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">Name*</label>
            <input type="text" id="name" className="w-full rounded-md border border-gray-300 p-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">Email*</label>
            <input type="email" id="email" className="w-full rounded-md border border-gray-300 p-2" required />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">Phone*</label>
              <input type="tel" id="phone" className="w-full rounded-md border border-gray-300 p-2" required />
            </div>
            <div>
              <label htmlFor="zip" className="mb-2 block text-sm font-medium">Zip Code*</label>
              <input type="text" id="zip" className="w-full rounded-md border border-gray-300 p-2" required />
            </div>
          </div>
          <Button title="Request Free Estimate" className="w-full">
            Request Free Estimate
          </Button>
        </form>
      </div>
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10" style={{ backgroundImage: "url('https://www.windowworldla.com/wp-content/uploads/2020/01/SHOT6_2018_TCS_KIT_MI_SL-e1724807440388-1024x683.jpg')" }}></div>
    </section>
  );
}
