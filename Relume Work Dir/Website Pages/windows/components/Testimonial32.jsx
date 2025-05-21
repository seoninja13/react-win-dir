"use client";

import { Button, Card } from "@relume_io/relume-ui";
import React, { Fragment } from "react";
import { BiSolidStar } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";

export function Testimonial32() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="static md:sticky md:top-[30%]">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Customer Testimonials
            </h2>
            <p className="md:text-md">
              Our customers love the transformation our windows bring to their
              homes. Discover how we've made a difference in the Sacramento
              community.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Learn More" variant="secondary">
                Learn More
              </Button>
              <Button
                title="Submit"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Submit
              </Button>
            </div>
          </div>
          <div>
            <Card className="sticky mb-8 p-8" style={{ top: "30%" }}>
              <Fragment>
                <div className="rb-6 mb-6 flex items-center">
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                </div>
                <blockquote className="rb-5 mb-5 md:mb-6 md:text-md">
                  "The installation was seamless and the windows look
                  fantastic!"
                </blockquote>
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Testimonial avatar 1"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p>Homeowner, Sacramento</p>
                  </div>
                </div>
              </Fragment>
            </Card>
            <Card className="sticky mb-8 p-8" style={{ top: "32%" }}>
              <Fragment>
                <div className="rb-6 mb-6 flex items-center">
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                </div>
                <blockquote className="rb-5 mb-5 md:mb-6 md:text-md">
                  "The installation was seamless and the windows look
                  fantastic!"
                </blockquote>
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Testimonial avatar 2"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p>Homeowner, Sacramento</p>
                  </div>
                </div>
              </Fragment>
            </Card>
            <Card className="sticky mb-8 p-8" style={{ top: "34%" }}>
              <Fragment>
                <div className="rb-6 mb-6 flex items-center">
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                </div>
                <blockquote className="rb-5 mb-5 md:mb-6 md:text-md">
                  "The installation was seamless and the windows look
                  fantastic!"
                </blockquote>
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Testimonial avatar 3"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p>Homeowner, Sacramento</p>
                  </div>
                </div>
              </Fragment>
            </Card>
            <Card className="sticky mb-8 p-8" style={{ top: "36%" }}>
              <Fragment>
                <div className="rb-6 mb-6 flex items-center">
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                  <BiSolidStar className="mr-1 size-6" />
                </div>
                <blockquote className="rb-5 mb-5 md:mb-6 md:text-md">
                  "The installation was seamless and the windows look
                  fantastic!"
                </blockquote>
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Testimonial avatar 4"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p>Homeowner, Sacramento</p>
                  </div>
                </div>
              </Fragment>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
