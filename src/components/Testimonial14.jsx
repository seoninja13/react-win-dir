"use client";

import React from "react";

export default function Testimonial14() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-gray-50 px-[5%] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12">
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
          <h3 className="text-lg font-semibold text-blue-600">5-Star Google Ratings</h3>
          <h2 className="text-3xl font-bold leading-[1.2] md:text-4xl md:leading-[1.2]">
            What Your Neighbors Are Saying
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote: "They were punctual, very friendly and did an amazing job with the install. I highly recommend them!",
              author: "Carla G.",
            },
            {
              quote: "Our experience with Window World was great! They communicated with us well using text and email. They answered all our questions as they came up. The crew were on time, polite and hard working! Windows look great and we are happy!",
              author: "Ilya M.",
            },
            {
              quote: "Window World did a fantastic job replacing all of our windows. The installation team was professional, efficient, and cleaned up thoroughly after the job was done.",
              author: "Michael S.",
            },
          ].map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center rounded-lg bg-white p-8 shadow-md">
              <div className="mb-6 text-center">
                <p className="mb-4 italic text-gray-700">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.author}</p>
              </div>
              <div className="flex">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <div className="mt-4">
                <svg className="h-6 w-auto" viewBox="0 0 272 92" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M115.75 46.75c0 12.937-9.813 23-23 23-13.188 0-23-10.063-23-23 0-13.375 9.813-23 23-23 13.188 0 23 9.625 23 23zm-10.125 0c0-8.063-5.813-13.563-12.875-13.563-7.063 0-12.875 5.5-12.875 13.563 0 7.625 5.813 13.563 12.875 13.563 7.063 0 12.875-5.938 12.875-13.563z"
                    fill="#EA4335"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M163.75 46.75c0 12.937-9.813 23-23 23-13.188 0-23-10.063-23-23 0-13.375 9.813-23 23-23 13.188 0 23 9.625 23 23zm-10.125 0c0-8.063-5.813-13.563-12.875-13.563-7.063 0-12.875 5.5-12.875 13.563 0 7.625 5.813 13.563 12.875 13.563 7.063 0 12.875-5.938 12.875-13.563z"
                    fill="#FBBC05"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M209.75 25.188v39.375c0 16.188-9.563 22.813-20.875 22.813-10.688 0-17.063-7.188-19.5-13.063l8.375-3.5c1.5 3.563 5.188 7.75 11.063 7.75 7.25 0 11.75-4.5 11.75-12.938v-3.188h-.375c-2.125 2.625-6.25 5-11.5 5-10.875 0-20.875-9.5-20.875-21.75 0-12.375 10-22 20.875-22 5.25 0 9.375 2.375 11.5 5h.375v-3.5h9.188zm-8.5 21.437c0-7.75-5.125-13.438-11.688-13.438-6.625 0-12.188 5.688-12.188 13.438 0 7.625 5.563 13.188 12.188 13.188 6.563 0 11.688-5.563 11.688-13.188z"
                    fill="#4285F4"
                  />
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M262.02 54.688l7.5 5c-2.438 3.563-8.25 9.688-18.375 9.688-12.5 0-21.875-9.688-21.875-22.125 0-13.188 9.438-22.125 20.75-22.125 11.438 0 17 9.063 18.813 13.938l1 2.5-29.313 12.125c2.25 4.375 5.688 6.625 10.625 6.625 4.875 0 8.313-2.438 10.875-6.125zm-23-7.938l19.5-8.125c-1.063-2.75-4.375-4.688-8.188-4.688-4.938 0-11.813 4.375-11.313 12.813z"
                    fill="#EA4335"
                  />
                  <path
                    d="M35 47.188c0 10.25-8.063 17.813-17.938 17.813C7.75 65 0 57.5 0 46.688 0 35.75 7.75 28.375 17.063 28.375c5.188 0 8.938 2.063 11.75 4.688l-3.313 3.313c-2-1.938-4.75-3.375-8.438-3.375-6.875 0-12.25 5.563-12.25 13.688 0 8.188 5.375 13.75 12.25 13.75 4.5 0 7.063-1.813 8.688-3.438 1.375-1.375 2.25-3.313 2.625-6h-11.313v-4.625H34.75c.25 1 .25 2.188.25 3.5z"
                    fill="#4285F4"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
