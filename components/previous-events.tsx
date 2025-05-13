"use client";

import { Carousel } from "./ui/carousel";
import ScrollAnimation from "./scroll-animation"; // Import ScrollAnimation component

const previousEventsData = [
  {
    title: "HACKFORET – Codeoholics CMRTC Chapter",
    button: "Read More",
    src: "/Picture.png",
  },
  {
    title: "HELLO Career Workshop - Codeoholics CMRTC & Intel Club CMRTC",
    button: "Read More",
    src: "/Picture2.png",
  },
  {
    title: "AARAMBH - Codeoholics Community CMRTC",
    button: "Read More",
    src: "/Picture3.png",
  },
  {
    title: "TECHNOCARNIVAL - CodeOholics Community",
    button: "Read More",
    src: "/Picture4.png",
  },
  {
    title: "HACK THE VERSE - Codeoholics",
    button: "Read More",
    src: "/Picture5.png",
  },
  {
    title: "TECH GENESIS",
    button: "Read More",
    src: "/Picture6.png",
  },
  {
    title: "GEMINI FOR EVERYTHING",
    button: "Read More",
    src: "/Picture7.png",
  },
  {
    title: "TECHPRENEURSHIP",
    button: "Read More",
    src: "/Picture8.png",
  },
];

export function PreviousEvents() {
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      {/* Title Section with Scroll Animation */}
      <ScrollAnimation
        variant="slideUp"
        delay={0.5}
        className="flex flex-col items-center justify-center space-y-4 text-center"
      >
        <div className="relative">
          <div className="relative rounded-lg bg-primary/10 px-3 py-1">
            <span className="text-sm font-semibold tracking-wider text-primary">
              Previous Events
            </span>
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
          Our Past Events
        </h2>

        <p className="max-w-[700px] text-foreground/80 md:text-xl">
          Explore our past events to see what we’ve accomplished together.
        </p>
      </ScrollAnimation>

      {/* Carousel Section with Scroll Animation */}
      <ScrollAnimation variant="fadeIn" delay={0.7} className="mt-10">
        <Carousel slides={previousEventsData} />
      </ScrollAnimation>
    </div>
  );
}
