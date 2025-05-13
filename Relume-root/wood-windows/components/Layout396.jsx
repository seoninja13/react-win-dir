"use client";

import { CustomButton } from "./CustomButton";
import { CustomCard } from "./CustomCard";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout396() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Styles</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Explore Our Wood Windows
          </h1>
          <p className="md:text-md">Classic beauty meets modern efficiency.</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <CustomCard className="flex flex-col justify-center p-6 md:p-8">
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo 1"
                />
              </div>
              <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Double-Hung Windows
              </h2>
              <p>Timeless design with easy ventilation.</p>
            </div>
            <div className="mt-5 md:mt-6">
              <CustomButton
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Learn More
              </CustomButton>
            </div>
          </CustomCard>
          <CustomCard className="flex flex-col justify-center p-6 md:p-8">
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo 1"
                />
              </div>
              <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Casement Windows
              </h2>
              <p>Optimal airflow and unobstructed views.</p>
            </div>
            <div className="mt-5 md:mt-6">
              <CustomButton
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Learn More
              </CustomButton>
            </div>
          </CustomCard>
          <CustomCard className="flex flex-col justify-center p-6 md:p-8">
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo 1"
                />
              </div>
              <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Bay & Bow Windows
              </h2>
              <p>Expand your space with stunning angles.</p>
            </div>
            <div className="mt-5 md:mt-6">
              <CustomButton
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Learn More
              </CustomButton>
            </div>
          </CustomCard>
        </div>
      </div>
    </section>
  );
}
