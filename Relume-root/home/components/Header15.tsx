"use client";

import { Button } from "@relume_io/relume-ui";
type ButtonProps = {
  title: string;
  variant: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

type ImageProps = {
  src: string;
  alt: string;
};
import React from "react";

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header15Props = React.ComponentPropsWithoutRef<"section"> & Props;

const defaultProps = {
  heading: "Premium Replacement Windows & Doors for Your Home",
  description: "Transform your living space with our energy-efficient windows and doors. Experience quality craftsmanship and exceptional service that you can trust.",
  buttons: [
    { title: "Get a Free Estimate", variant: "primary" },
    { title: "Explore Our Products", variant: "secondary" },
  ],
  image: { 
    src: "/assets/images/hero-windows-doors.jpg", 
    alt: "Modern home with beautiful windows and doors" 
  },
};

export function Header15(props: Header15Props) {
  const { heading, description, buttons, image } = {
    ...defaultProps,
    ...props,
  } as Props;

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{heading}</h1>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button: ButtonProps, index) => (
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
          <div>
            <img src={image.src} className="w-full rounded-image object-cover" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
}
