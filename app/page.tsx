
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Suspense } from "react"
import IntroAnimation from "@/components/intro-animation"
// import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Events from "@/components/events"
// import Projects from "@/components/projects"
import { ExpandableCardDemo } from "@/components/team"
// import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import LoadingSpinner from "@/components/ui/loading-spinner"
import BackgroundSection from "@/components/background-section"
import SimpleSponsors from "@/components/simple-sponsors"
import SimpleContactForm from "@/components/simple-contact-form"
import NewsletterSignup from "@/components/newsletter-signup"
import BackToTop from "@/components/back-to-top"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
// import { PreviousEvents } from "@/components/previous-events"
import { Gallery } from "@/components/gallary"

const testimonials = [
  {
    quote:
      "Joining Codeoholics gave me the direction I never knew I needed. I went from just writing code to building real solutions with an amazing team.",
    name: "Aarav Deshmukh",
    title: "Member, Codeoholics",
  },
  {
    quote:
      "Every late night debugging session and every line of code we pushed brought us closer as a team. This club is where developers become leaders.",
    name: "Ishita Reddy",
    title: "Member, Codeoholics",
  },
  {
    quote:
      "Before joining Codeoholics, coding was a solo journey. Now, it's a shared mission with some of the most talented minds on campus.",
    name: "Rohan Mehta",
    title: "Member, Codeoholics",
  },
  {
    quote:
      "What I love about this club is not just the tech—but the people. We grow, fail, learn, and win together. That’s what makes us different.",
    name: "Saanvi Iyer",
    title: "Member, Codeoholics",
  },
  {
    quote:
      "I came for the code. I stayed for the culture. Codeoholics taught me that community is as important as technology.",
    name: "Karthik Sharma",
    title: "Member, Codeoholics",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <AnimatePresence mode="wait">
        {loading ? (
          <IntroAnimation key="intro" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* <Header /> */}
            <Suspense fallback={<LoadingSpinner />}>
              <div id="home"><Hero /></div>

              <div id="about">
                <BackgroundSection
                  imageUrl="/images/code-bg-1.jpg"
                  overlayColor="bg-gradient-to-b from-background via-background/95 to-background/90"
                  className="py-20 md:py-32"
                >
                  <About />
                </BackgroundSection>
              </div>

              <div id="events">
                <BackgroundSection
                  imageUrl="/images/code-bg-2.jpg"
                  overlayColor="bg-gradient-to-r from-background/95 to-background/80"
                  className="py-20 md:py-32"
                >
                  <Events />
                </BackgroundSection>
              </div>

              {/* <div id="previous-events">
                <BackgroundSection
                  imageUrl="/images/code-bg-3.jpg"
                  overlayColor="bg-gradient-to-b from-background/90 to-background/95"
                  className="py-20 md:py-32"
                >
                  <PreviousEvents />
                </BackgroundSection>
              </div> */}

              <BackgroundSection
                imageUrl="/images/code-bg-4.jpg"
                overlayColor="bg-gradient-to-t from-background/90 via-background/80 to-background/90"
                className="py-20 md:py-32"
              >
                <div className="flex justify-center items-center h-full" id="testimonials">
                  <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                    className="your-classname-here"
                  />
                </div>
              </BackgroundSection>

              <div className="container px-4 md:px-6 py-16" id="sponsors">
                <SimpleSponsors />
              </div>

              <div id="team">
                <BackgroundSection
                  imageUrl="/images/code-bg-5.jpg"
                  overlayColor="bg-gradient-to-b from-background/80 to-background"
                  className="py-20 md:py-32"
                >
                  <ExpandableCardDemo />
                </BackgroundSection>
              </div>

              <div id="gallery">
                <BackgroundSection
                  imageUrl="/images/code-bg-5.jpg"
                  overlayColor="bg-gradient-to-b from-background/80 to-background"
                  className="py-20 md:py-32"
                >
                  <Gallery />
                </BackgroundSection>
              </div>

              <div id="contact" className="py-20 bg-muted/30">
                <div className="container px-4 md:px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <SimpleContactForm />
                    <div className="space-y-8">
                      <NewsletterSignup />
                      <div className="bg-muted/30 p-6 rounded-lg border border-border/50">
                        <h3 className="text-xl font-bold mb-4">Visit Us</h3>
                        <p className="mb-2">Cmr Technical Campus</p>
                        <p className="mb-2">Near ORR junction, Kandlakoya,</p>
                        <p className="mb-2">Medchal Road,</p>
                        <p className="mb-4">Hyderabad 501401,</p>
                        <p className="mb-4">Telangana</p>
                        <p className="font-medium">Email: codeoholics@cmrtc.ac.in</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Footer />
              <BackToTop />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
