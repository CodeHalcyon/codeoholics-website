"use client";

import { useRef } from "react";
import ScrollAnimation from "@/components/scroll-animation";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Founded in 2020",
    description:
      "Codeoholics began as a small group of curious and passionate developers who believed in the transformative power of collaboration and community. What united us wasn't just our love for code, but a shared vision — a vision to create something greater than ourselves. In the beginning, it was just a few students gathering after classes, often huddled over laptops late into the night, brainstorming ideas, debugging lines of code, and pushing each other to think beyond conventional boundaries. Our mission was clear, yet bold — to build a platform where aspiring coders could not only learn new skills but also apply them in real-world scenarios, collaborate on meaningful projects, and grow into confident, well-rounded technologists. These humble beginnings, filled with passion-fueled sessions and a relentless desire to innovate, eventually gave rise to a dynamic community — one that continues to evolve, inspire, and lead with purpose.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/c1.png"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-xl"
          alt="Codeoholics founding"
        />
      </div>
    ),
  },
  {
    title: "First Event: Hackathon 2021",
    description:
      "In 2021, we hosted our first major event — a 24-hour hackathon that would go down in history as a defining moment for Codeoholics. What started as an ambitious idea quickly turned into a gathering that would bring together a diverse group of innovators, designers, and programmers from all walks of life. The event was charged with an electric energy, the kind that only a shared goal can ignite. It wasn't just about coding; it was about pushing boundaries, collaborating across disciplines, and solving complex problems in real-time. Teams brainstormed tirelessly, their creativity running wild as they built prototypes, developed solutions, and even faced the inevitable challenges that come with any time-limited competition. The ideas that emerged were not just groundbreaking, but also practical, as participants worked towards creating tangible, real-world applications of their skills. But beyond the technical achievements, it was the camaraderie that made the event truly unforgettable. The spirit of teamwork, the bonds formed in those intense 24 hours, and the sheer excitement of overcoming obstacles together became the bedrock of what Codeoholics would become. This hackathon wasn't just a competition; it was the birth of Codeoholics as a true platform for problem-solving, collaboration, and hands-on learning, setting the stage for all the future endeavors to come.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/c2.png"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-xl"
          alt="Hackathon 2021"
        />
      </div>
    ),
  },
  {
    title: "Website Launch 2023",
    description:
      "After years of growth, countless late-night brainstorming sessions, and the successful execution of dozens of events, we reached an important milestone in 2023 — the launch of our official website. This was more than just a digital platform; it became the heart and soul of Codeoholics, a place where our entire community could come together, reflect on our journey, and showcase our collective accomplishments. The website wasn't just a collection of our past projects and events; it became a living, breathing testament to the dedication, passion, and talent that define our group.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/c3.png"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-xl"
          alt="Website Launch"
        />
      </div>
    ),
  },
  {
    title: "100+ Members in 2024",
    description:
      "In 2024, Codeoholics officially crossed 100 active members — a proud moment that reflected years of dedication, innovation, and teamwork. Each member brought their unique perspective and skills, contributing to a culture that values curiosity, mentorship, and creative problem-solving. Our journey is just beginning, and the future holds even more exciting milestones.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/c4.png"
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-xl"
          alt="100 Members Celebration"
        />
      </div>
    ),
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="w-full py-20">
      <div className="container px-4 mx-auto">
        <ScrollAnimation variant="slideUp" delay={0.5} className="mb-10">
          <div className="space-y-4 text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              About Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Discover the <span className="text-primary">joy of code</span>, together.
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Every day, hundreds of Codeoholics gather online and in-person to make things with code. Whether you're a
              beginner programmer or have years of experience, there's a place for you at Codeoholics.
            </p>
          </div>
        </ScrollAnimation>

        <div className="w-full py-10">
          <StickyScroll
            content={content}
            contentClassName="h-[400px] md:h-[500px] w-[500px] rounded-xl overflow-hidden no-scrollbar"
          />
        </div>
      </div>
    </section>
  );
}
