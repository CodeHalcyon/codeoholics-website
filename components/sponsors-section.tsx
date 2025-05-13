"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Define sponsor types
interface Sponsor {
  id: number
  name: string
  logo: string
  website: string
  category: string
}

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    {
      id: 1,
      name: "Example Sponsor 1",
      logo: "https://via.placeholder.com/150",
      website: "https://example.com",
      category: "Gold",
    },
    {
      id: 2,
      name: "Example Sponsor 2",
      logo: "https://via.placeholder.com/150",
      website: "https://example.com",
      category: "Silver",
    },
    {
      id: 3,
      name: "Example Sponsor 3",
      logo: "https://via.placeholder.com/150",
      website: "https://example.com",
      category: "Bronze",
    },
    {
      id: 4,
      name: "Example Sponsor 4",
      logo: "https://via.placeholder.com/150",
      website: "https://example.com",
      category: "Gold",
    },
    {
      id: 5,
      name: "Example Sponsor 5",
      logo: "https://via.placeholder.com/150",
      website: "https://example.com",
      category: "Silver",
    },
    {
      id: 6,
      name: "Example Sponsor 6",
      logo: "https://via.placeholder.com/150",
      website: "https://example.com",
      category: "Bronze",
    },
  ])

  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const handleNext = () => {
    setCurrentSponsorIndex((prevIndex) => (prevIndex + 1 === sponsors.length ? 0 : prevIndex + 1))
  }

  const handlePrev = () => {
    setCurrentSponsorIndex((prevIndex) => (prevIndex - 1 < 0 ? sponsors.length - 1 : prevIndex - 1))
  }

  // Placeholder variables to resolve the errors.  These should be replaced with actual logic.
  const Advanced = "Advanced"
  const Website = "Website"
  const Enhancements = "Enhancements"
  const Implementation = "Implementation"
  const I = "I"

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Sponsors</h2>
        <div className="relative">
          <motion.div
            ref={ref}
            className="flex items-center justify-center overflow-hidden"
            variants={{
              hidden: { opacity: 0, x: -75 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Card className="w-full max-w-md p-100">
              <img
                src={sponsors[currentSponsorIndex].logo || "/placeholder.svg"}
                alt={sponsors[currentSponsorIndex].name}
                className="h-24 w-auto object-contain mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{sponsors[currentSponsorIndex].name}</h3>
              <p className="text-gray-600 mb-4">Category: {sponsors[currentSponsorIndex].category}</p>
              <Button asChild>
                <a
                  href={sponsors[currentSponsorIndex].website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Visit Website
                  <ExternalLink size={16} />
                </a>
              </Button>
            </Card>
          </motion.div>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <Button variant="outline" size="icon" onClick={handlePrev}>
              <ArrowLeft size={1000} />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SponsorsSection
