"use client";

import React from "react";

export function Layout90() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-8 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <h3 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
            Discover the Local Advantages of Choosing Window World for Your Home
          </h3>
          <p className="md:text-md">
            At Window World, we pride ourselves on our local ownership, ensuring
            personalized service tailored to your needs. Our lifetime warranty
            guarantees peace of mind, while our professional installation team
            ensures a flawless fit every time. With our value pricing, you can
            enjoy premium quality without breaking the bank—simply the best for
            less!
          </p>
        </div>
        <img
          src="/images/windows/windows-local-advantages.png"
          className="w-full rounded-image object-cover"
          alt="Window World Sacramento local team and storefront"
        />
      </div>
    </section>
  );
}
