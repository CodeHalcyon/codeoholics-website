"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import ScrollAnimation from "./scroll-animation";
export function ExpandableCardDemo() {
  const [active, setActive] = useState<any>(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

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
                  Meet the Team
                </span>
              </div>
            </div>
    
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Our Amazing Team
            </h2>
    
            <p className="max-w-[700px] text-foreground/80 md:text-xl">
              Get to know the brilliant minds behind Codeoholics and the work we’re doing.
            </p>
          </ScrollAnimation>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] px-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
              aria-label="Close details">
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src || "/placeholder.svg"}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base">
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base">
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul
        className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-4 px-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src || "/placeholder.svg"}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=240&width=320";
                  }}
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base">
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base">
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  
  {
    description: "Chetan Sirigiri",
    title: "President",
    src: "c1.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Leading with vision and dedication, Chetan has spearheaded Codeoholics as the President, fostering innovation, unity, and excellence within the community.
        </p>
      );
    },
  },
  {
    description: "Nikhil",
    title: "Vice President",
    src: "c2.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Nikhil, our Vice President, ensures seamless coordination across teams while inspiring the club with his strategic thinking and strong leadership.
        </p>
      );
    },
  },
  {
    description: "Ahmed",
    title: "General Secretary",
    src: "c3.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          As General Secretary, Ahmed handles the club’s operations and communication, ensuring everything runs smoothly behind the scenes.
        </p>
      );
    },
  },
  {
    description: "Sai Sruthi",
    title: "Competitive Programming Lead",
    src: "c8.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Sai Sruthi leads our Competitive Programming efforts, guiding members through complex problem-solving and DSA mastery.
        </p>
      );
    },
  },
  {
    description: "Srujanya Maringanti",
    title: "Design Head",
    src: "c9.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          As our Design Heads, Srujanya and Abdul Rahman craft stunning visuals and ensure the club’s creative presence stands out across all platforms.
        </p>
      );
    },
  },
  {
    description: "Mohammed Abdul Rahman",
    title: "Design Lead",
    src: "c10.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          As our Design Heads, Srujanya and Abdul Rahman craft stunning visuals and ensure the club’s creative presence stands out across all platforms.
        </p>
      );
    },
  },
  {
    description: "Bhavish Ankam",
    title: "Development Lead",
    src: "c4.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Bhavish is the driving force behind our web and software development initiatives, leading the technical implementation of our digital projects.
        </p>
      );
    },
  },
  {
    description: "Arnave",
    title: "Events Lead",
    src: "c5.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          From ideation to execution, Arnave ensures our events are impactful, well-organized, and engaging for all participants.
        </p>
      );
    },
  },
  {
    description: "Yash",
    title: "Tech Head",
    src: "c6.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Yash oversees all tech-related activities and ensures we stay on the cutting edge of technology through workshops, demos, and guidance.
        </p>
      );
    },
  },
  {
    description: "Shatham Anileshwar",
    title: "App Head",
    src: "c11.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Anileshwar leads mobile development and app projects, bridging user experience with functional design in all our digital products.
        </p>
      );
    },
  },
  {
    description: "Karti",
    title: "Public Relations",
    src: "c7.png",
    ctaText: "More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Karti handles PR and outreach, making sure Codeoholics is seen, heard, and appreciated across our college and the larger tech community.
        </p>
      );
    },
  },
];
