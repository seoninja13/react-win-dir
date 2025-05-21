"use client";

import {
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";

const useCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index) => () => {
    // No TypeScript annotation
    if (api) {
      api.scrollTo(index);
    }
  };

  const dotClassName = (index) => {
    return `mx-[3px] inline-block size-2 rounded-full ${
      current === index + 1 ? "bg-black" : "bg-neutral-light"
    }`;
  };

  return { api, setApi, current, handleDotClick, dotClassName };
};

export function Testimonial19() {
  const useCarousel = useCarousel();
  return (
    <section
      id="relume"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Customer Testimonials
          </h2>
          <p className="md:text-md">
            See what our satisfied customers have to say!
          </p>
        </div>
        <Carousel
          setApi={useCarousel.setApi}
          opts={{ loop: true, align: "start" }}
          className="overflow-hidden"
        >
          <div className="relative">
            <CarouselContent className="ml-0 md:mx-3.5">
              <CarouselItem className="pl-0 md:basis-1/2 md:px-4 lg:basis-1/3">
                <Card className="flex w-full flex-col items-start justify-between p-6 md:p-8">
                  <div className="mb-5 flex md:mb-6">
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                  </div>
                  <p className="md:text-md">
                    "The installation was quick and the windows look fantastic!"
                  </p>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Emily Johnson</p>
                      <p>Homeowner, Sacramento</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-0 md:basis-1/2 md:px-4 lg:basis-1/3">
                <Card className="flex w-full flex-col items-start justify-between p-6 md:p-8">
                  <div className="mb-5 flex md:mb-6">
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                  </div>
                  <p className="md:text-md">
                    "The installation was quick and the windows look fantastic!"
                  </p>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Emily Johnson</p>
                      <p>Homeowner, Sacramento</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-0 md:basis-1/2 md:px-4 lg:basis-1/3">
                <Card className="flex w-full flex-col items-start justify-between p-6 md:p-8">
                  <div className="mb-5 flex md:mb-6">
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                  </div>
                  <p className="md:text-md">
                    "The installation was quick and the windows look fantastic!"
                  </p>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Emily Johnson</p>
                      <p>Homeowner, Sacramento</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-0 md:basis-1/2 md:px-4 lg:basis-1/3">
                <Card className="flex w-full flex-col items-start justify-between p-6 md:p-8">
                  <div className="mb-5 flex md:mb-6">
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                  </div>
                  <p className="md:text-md">
                    "The installation was quick and the windows look fantastic!"
                  </p>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Emily Johnson</p>
                      <p>Homeowner, Sacramento</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-0 md:basis-1/2 md:px-4 lg:basis-1/3">
                <Card className="flex w-full flex-col items-start justify-between p-6 md:p-8">
                  <div className="mb-5 flex md:mb-6">
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                  </div>
                  <p className="md:text-md">
                    "The installation was quick and the windows look fantastic!"
                  </p>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Emily Johnson</p>
                      <p>Homeowner, Sacramento</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-0 md:basis-1/2 md:px-4 lg:basis-1/3">
                <Card className="flex w-full flex-col items-start justify-between p-6 md:p-8">
                  <div className="mb-5 flex md:mb-6">
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                    <BiSolidStar className="size-6" />
                  </div>
                  <p className="md:text-md">
                    "The installation was quick and the windows look fantastic!"
                  </p>
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-auto md:flex-row md:items-center">
                    <div>
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        alt="Testimonial avatar 1"
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Emily Johnson</p>
                      <p>Homeowner, Sacramento</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex md:size-12 lg:size-14" />
            <CarouselNext className="hidden md:flex md:size-12 lg:size-14" />
          </div>
          <div className="mt-[30px] flex items-center justify-center md:mt-[46px]">
            <button
              onClick={useCarousel.handleDotClick(0)}
              className={useCarousel.dotClassName(0)}
            />
            <button
              onClick={useCarousel.handleDotClick(1)}
              className={useCarousel.dotClassName(1)}
            />
            <button
              onClick={useCarousel.handleDotClick(2)}
              className={useCarousel.dotClassName(2)}
            />
            <button
              onClick={useCarousel.handleDotClick(3)}
              className={useCarousel.dotClassName(3)}
            />
            <button
              onClick={useCarousel.handleDotClick(4)}
              className={useCarousel.dotClassName(4)}
            />
            <button
              onClick={useCarousel.handleDotClick(5)}
              className={useCarousel.dotClassName(5)}
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
