"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GlareCard } from "./ui/glare-card";
import ScrollAnimation from "./scroll-animation";

export default function SimpleSponsors() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 px-6">
      {/* ScrollAnimation Section */}
      <ScrollAnimation
        variant="slideUp"
        delay={0.5}
        className="flex flex-col items-center justify-center text-center space-y-4"
      >
        <div className="relative">
          <div className="relative rounded-lg bg-primary/10 px-3 py-1">
            <span className="text-sm font-semibold tracking-wider text-primary">
              Our Esteemed Collaborators
            </span>
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
          Meet Our Collaborators
        </h2>

        <p className="max-w-[700px] text-foreground/80 md:text-xl">
           We are grateful for the support of our incredible sponsors who help make everything possible.
        </p>
      </ScrollAnimation>

      {/* Sponsor Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  

       <ScrollAnimation
          variant="fadeIn"
          delay={0.8}
          className="flex flex-col items-center justify-center"
        >
          <GlareCard className="flex flex-col items-center justify-center">
            <Image
              src="/c.png" // Path to your SVG in the public folder
              alt="Bear Sponsor 1"
              width={100} // Adjust the width
              height={100} // Adjust the height
              className="h-24 w-24 text-white"
            />
            <p className="text-white font-bold text-xl mt-4">Company</p>
          </GlareCard>
        </ScrollAnimation>

        <ScrollAnimation
          variant="fadeIn"
          delay={0.8}
          className="flex flex-col items-center justify-center"
        >
          <GlareCard className="flex flex-col items-center justify-center">
            <Image
              src="/bb.png" // Path to your SVG in the public folder
              alt="Bear Sponsor 1"
              width={100} // Adjust the width
              height={100} // Adjust the height
              className="h-24 w-24 text-white"
            />
            <p className="text-white font-bold text-xl mt-4">Ball</p>
          </GlareCard>
        </ScrollAnimation>

        <ScrollAnimation
          variant="fadeIn"
          delay={0.8}
          className="flex flex-col items-center justify-center"
        >
          <GlareCard className="flex flex-col items-center justify-center">
            <Image
              src="/Bearnobg.png" // Path to your SVG in the public folder
              alt="Bear Sponsor 1"
              width={100} // Adjust the width
              height={100} // Adjust the height
              className="h-24 w-24 text-white"
            />
            <p className="text-white font-bold text-xl mt-4">Bear</p>
          </GlareCard>
        </ScrollAnimation>
      </div>
    </div>
  );
}
