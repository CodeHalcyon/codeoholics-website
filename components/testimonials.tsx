"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useInView } from "framer-motion"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  quote: string
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "Joining Codeoholics was the best decision I made in college. The community helped me land my dream job at a top tech company. The workshops and hackathons gave me practical experience that my classes couldn't provide.",
    },
    {
      id: 2,
      name: "Samantha Lee",
      role: "UX Designer",
      company: "DesignHub",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "As a design student interested in tech, I wasn't sure if I'd fit in. But Codeoholics welcomed me with open arms! I learned how to code and collaborate with developers, which has been invaluable for my career in UX design.",
    },
    {
      id: 3,
      name: "Marcus Chen",
      role: "Startup Founder",
      company: "InnovateTech",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "I met my co-founders at a Codeoholics hackathon. Three years later, we've raised our Series A funding! The mentorship and network I gained through this community were instrumental in our success.",
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Data Scientist",
      company: "DataDrive",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "When I joined Codeoholics, I knew nothing about programming. The patient mentors and supportive environment helped me discover my passion for data science. Now I'm helping other beginners learn to code!",
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevTestimonial()
      } else if (e.key === "ArrowRight") {
        nextTestimonial()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === 0 || touchEndX.current === 0) return

    const difference = touchStartX.current - touchEndX.current
    if (difference > 50) {
      // Swipe left
      nextTestimonial()
    } else if (difference < -50) {
      // Swipe right
      prevTestimonial()
    }

    // Reset values
    touchStartX.current = 0
    touchEndX.current = 0
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  }

  return (
    <div
      ref={sectionRef}
      className="w-full py-20 md:py-32 bg-muted/30"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Members Say</h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" aria-live="polite">
          {/* Carousel */}
          <div className="overflow-hidden relative min-h-[300px] md:min-h-[250px]">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-6 md:p-8 bg-background rounded-lg shadow-sm border border-border/50"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Quote className="h-8 w-8 text-primary/20 mb-2" />
                    <p className="text-foreground/80 italic mb-4">{testimonials[currentIndex].quote}</p>
                    <div>
                      <h3 className="font-bold text-lg">{testimonials[currentIndex].name}</h3>
                      <p className="text-sm text-foreground/60">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-background border border-border hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-4" : "bg-primary/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-background border border-border hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
