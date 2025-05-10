"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

/**
 * @typedef {Object} Props
 * @property {string} heading
 * @property {string} description
 * @property {Array<import('@relume_io/relume-ui').ButtonProps>} buttons
 * @property {import('@relume_io/relume-ui').ImageProps} image
 */

/**
 * @typedef {React.ComponentPropsWithoutRef<"section"> & Props} Header15Props
 */

/**
 * Header15 Component
 *
 * A header component with a title and description in a two-column layout,
 * followed by a full-width image.
 *
 * @component
 * @source Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/Header15.jsx
 */
/**
 * @param {Header15Props} props
 */
export function Header15(props) {
  const { heading, description, buttons, image, ...rest } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28" {...rest}>
      <div className="container">
        <div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
          <div>
            <h1 className="text-6xl font-bold md:text-9xl lg:text-10xl">
              {heading}
            </h1>
          </div>
          <div>
            <p className="md:text-md">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button
                  key={`${button.title}-${index}`}
                  variant={button.variant}
                  size={button.size}
                  iconRight={button.iconRight}
                  iconLeft={button.iconLeft}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <img
            src={image.src}
            className="w-full rounded-image object-cover"
            alt={image.alt}
          />
        </div>
      </div>
    </section>
  );
}

const defaultProps = {
  heading: "Premium Replacement Windows & Doors for Your Home",
  description: "Transform your living space with our energy-efficient windows and doors. Experience quality craftsmanship and exceptional service that you can trust.",
  buttons: [
    { title: "Get a Free Estimate", variant: "primary" },
    { title: "Explore", variant: "secondary" },
  ],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Relume placeholder image",
  },
};
