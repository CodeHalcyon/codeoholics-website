"use client"

import { useRef } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"
import ScrollAnimation from "@/components/scroll-animation"
import { Carousel } from "@/components/ui/carousel" // Assuming the Carousel component is available

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null)

  const events = [
    {
      title: "Hack 4 Mini",
      date: "Yet to confirm",
      description: "24 hours of coding, creativity, and collaboration. Build something awesome with your team!",
      location: "CMR Technical Campus",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Hackathon", "Competition", "Prizes"],
    },
    {
      title: "Hack The Verse 2.0",
      date: "Yet to confirm",
      description: "24 hours of coding, creativity, and collaboration. Build something awesome with your team!",
      location: "CMR Technical Campus",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Hackathon", "Competition", "Prizes"],
    },
  ]

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
  ]

  return (
    <section id="events" ref={sectionRef} className="w-full">
      <div className="container px-4 md:px-6">
        {/* Upcoming Events Section */}
        <ScrollAnimation
          variant="slideUp"
          delay={0.5}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="relative">
            <div className="relative rounded-lg bg-primary/10 px-3 py-1">
              <span className="text-sm font-semibold tracking-wider text-primary">What's Happening</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Upcoming Events</h2>

          <p className="max-w-[700px] text-foreground/80 md:text-xl">
            Join us for workshops, hackathons, and coding sessions. No experience necessary!
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {events.map((event, i) => (
            <ScrollAnimation key={event.title} variant="scaleUp" delay={0.5 + i * 0.2}>
              <EventCard {...event} />
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation variant="fadeIn" delay={1.2} className="flex justify-center mt-12">
          <Button variant="outline" className="border-2 border-primary/30 hover:border-primary group">
            <span className="flex items-center gap-2">
              View All Events
              <Calendar className="h-4 w-4 text-primary group-hover:text-primary" />
            </span>
          </Button>
        </ScrollAnimation>

        {/* Previous Events Section */}
        <ScrollAnimation
          variant="slideUp"
          delay={1.5}
          className="flex flex-col items-center justify-center space-y-4 text-center mt-16"
        >
          <div className="relative">
            <div className="relative rounded-lg bg-primary/10 px-3 py-1">
              <span className="text-sm font-semibold tracking-wider text-primary">Previous Events</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Past Events</h2>

          <p className="max-w-[700px] text-foreground/80 md:text-xl">
            Explore our past events to see what we’ve accomplished together.
          </p>
        </ScrollAnimation>

        {/* Carousel for Past Events */}
        <ScrollAnimation variant="fadeIn" delay={1.8} className="mt-10">
          <Carousel slides={previousEventsData} />
        </ScrollAnimation>
      </div>
    </section>
  )
}
