"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion"; // Import useScroll correctly
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: any[];
  contentClassName: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  // Adjust active card based on scroll position
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const cardsBreakpoints = content.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      }, 0);
      setActiveCard(closestBreakpointIndex);
    });
  }, [content, cardLength, scrollYProgress]);

  const backgroundColors = [
    "#000000",
    "#000000",
    "#000000",
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #0ea5e9, #22d3ee)", // sky-500 to cyan-400
    "linear-gradient(to bottom right, #8b5cf6, #ec4899)", // violet-500 to pink-500
    "linear-gradient(to bottom right, #f59e0b, #ef4444)", // amber-500 to red-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[45rem] justify-center space-x-10 overflow-y-auto scrollbar-hide rounded-md p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="my-20"
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="text-kg mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
  key={activeCard} // Important: Re-render and re-animate on change
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  style={{ background: backgroundGradient }}
  className={cn(
    "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
    contentClassName
  )}
>
  {content[activeCard].content ?? null}
</motion.div>

    </motion.div>
  );
};
