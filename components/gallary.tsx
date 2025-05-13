"use client";
import React from "react";
import { LayoutGrid } from "@/components/ui/layout-grid"
import ScrollAnimation from "./scroll-animation";
export function Gallery() {
  return (
    <>
    <ScrollAnimation
                variant="slideUp"
                delay={0.5}
                className="flex flex-col items-center justify-center space-y-4 text-center"
              >
                <div className="relative">
                  <div className="relative rounded-lg bg-primary/10 px-3 py-1">
                    <span className="text-sm font-semibold tracking-wider text-primary">
                      Our Gallery
                    </span>
                  </div>
                </div>
        
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Explore Our Gallery
                </h2>
        
                <p className="max-w-[700px] text-foreground/80 md:text-xl">
                  Dive into a collection of moments captured from our journey together. See the creativity and passion we put into our work!
                </p>
              </ScrollAnimation>
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
    </>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        TECHPRENEURSHIP
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Unveiling the World of Technology & Entrepreneurship
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        HELLO CAREER
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
         The HELLO Career workshop by Codeoholics CMRTC & Intel Club CMRTC
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
         AARAMBH
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Aarambh, organized by Codeoholics Community CMRTC.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        TECHNOCARNIVAL
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        CodeOholics hosted two exciting events—WEB SPIRITS, a web development competition.
      </p>
    </div>
  );
};
const SkeletonFive = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        HACK THE VERSE
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Hack-The-Verse, a 24-hour national-level hackathon organized by Codeoholics
      </p>
    </div>
  );
};

const SkeletonSix = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        GEMINI FOR EVERYTHING
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Simplify Your AI Application Development
      </p>
    </div>
  );
};

const SkeletonSeven = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Rivers are serene
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};


const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-4",
    thumbnail:
      "picture8.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "picture2-g.png",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "picture3-g.png",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "picture4-g.png",
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "md:col-span-2",
    thumbnail:
      "picture5-g.png",
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "md:col-span-1",
    thumbnail:
      "picture7-g.png",
  },
  
];
