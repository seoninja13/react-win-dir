"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  VideoIframe,
} from "@relume_io/relume-ui";
import React from "react";
import { BiSolidStar } from "react-icons/bi";
import { FaCirclePlay } from "react-icons/fa6";

export function Testimonial14() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
          <div className="order-last md:order-first">
            <Dialog>
              <DialogTrigger className="relative flex w-full items-center justify-center overflow-hidden rounded-image">
                <img
                  src="/assets/images/testimonials/customer-testimonial-video.jpg"
                  alt="Customer testimonial video thumbnail"
                  className="size-full object-cover"
                />
                <span className="absolute inset-0 z-10 bg-black/50" />
                <FaCirclePlay className="absolute z-20 size-16 text-white" />
              </DialogTrigger>
              <DialogContent>
                <VideoIframe video="https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW" />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col items-start">
            <div className="mb-6 flex md:mb-8">
              <BiSolidStar className="size-6 text-yellow-400" />
              <BiSolidStar className="size-6 text-yellow-400" />
              <BiSolidStar className="size-6 text-yellow-400" />
              <BiSolidStar className="size-6 text-yellow-400" />
              <BiSolidStar className="size-6 text-yellow-400" />
            </div>
            <blockquote className="text-xl font-bold md:text-2xl">
              "Window World LA transformed our home with beautiful, energy-efficient windows. 
              The installation team was professional, courteous, and completed the work ahead of schedule. 
              Our energy bills have noticeably decreased!"
            </blockquote>
            <div className="mt-6 flex flex-nowrap items-center gap-5 md:mt-8">
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p>Homeowner, Los Angeles</p>
              </div>
              <div className="mx-4 w-px self-stretch bg-background-alternative sm:mx-0" />
              <div>
                <img
                  src="/assets/images/logos/google-reviews.png"
                  alt="Google Reviews Logo"
                  className="max-h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
