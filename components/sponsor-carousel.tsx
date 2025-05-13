"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Sponsor {
  id: string
  name: string
  logo: string
  url: string
  tier: "platinum" | "gold" | "silver" | "bronze"
}

interface SponsorCarouselProps {
  sponsors: Sponsor[]
  autoPlay?: boolean
  interval?: number
  className?: string
}

export default function SponsorCarousel({
  sponsors,
  autoPlay = true,
  interval = 5000,
  className,
}: SponsorCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const totalPages = Math.ceil(sponsors.length / 4)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce(
    (acc, sponsor) => {
      if (!acc[sponsor.tier]) {
        acc[sponsor.tier] = []
      }
      acc[sponsor.tier].push(sponsor)
      return acc
    },
    {} as Record<string, Sponsor[]>,
  )

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || totalPages <= 1) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, currentPage, interval, isPaused, totalPages])

  // Handle next/prev navigation
  const handleNext = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Animation variants
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  }

  // Get sponsors for current page
  const getCurrentPageSponsors = () => {
    const start = currentPage * 4
    return sponsors.slice(start, start + 4)
  }

  // Get tier display name
  const getTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1)
  }

  // Get tier-specific styling
  const getTierStyle = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900"
      case "gold":
        return "border-yellow-400 bg-gradient-to-b from-yellow-100 to-yellow-300 dark:from-yellow-900/30 dark:to-yellow-700/30"
      case "silver":
        return "border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-700/50"
      case "bronze":
        return "border-amber-600 bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30"
      default:
        return "border-gray-200 bg-background"
    }
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="text-2xl font-bold text-center mb-8">Our Sponsors</h2>

      {/* Tier sections */}
      <div className="space-y-12">
        {["platinum", "gold", "silver", "bronze"].map((tier) => {
          const tieredSponsors = sponsorsByTier[tier]
          if (!tieredSponsors || tieredSponsors.length === 0) return null

          return (
            <div key={tier} className="space-y-4">
              <h3 className="text-lg font-medium text-center">{getTierName(tier)} Sponsors</h3>

              <div className={`grid grid-cols-2 md:grid-cols-${tier === "platinum" ? "2" : "4"} gap-6`}>
                {tieredSponsors.map((sponsor) => (
                  <motion.a
                    key={sponsor.id}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative flex items-center justify-center p-6 rounded-lg border-2 shadow-sm transition-all duration-300",
                      getTierStyle(sponsor.tier),
                      "hover:shadow-md hover:scale-105",
                    )}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative h-16 w-full">
                      <Image
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <span className="sr-only">{sponsor.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation buttons (only show if there are multiple pages) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="rounded-full"
            aria-label="Previous sponsors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1)
                  setCurrentPage(i)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentPage ? "bg-primary w-4" : "bg-primary/30"
                }`}
                aria-label={`Go to sponsor page ${i + 1}`}
                aria-current={i === currentPage ? "true" : "false"}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full"
            aria-label="Next sponsors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
