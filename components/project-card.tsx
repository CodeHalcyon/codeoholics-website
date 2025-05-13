"use client"

import type React from "react"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  github: string
  demo: string
  category?: string
}

export default function ProjectCard({ id, title, description, tags, image, github, demo }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect variables
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
      const rotateXValue = (y - centerY) / 20
      const rotateYValue = (centerX - x) / 20

      setRotateX(rotateXValue)
      setRotateY(rotateYValue)
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: "transform 0.2s ease-out",
      }}
      whileHover={{ z: 10 }}
      className="h-full w-full"
      layout
    >
      <Card className="overflow-hidden h-full border-border/50 hover:border-primary/30 transition-all duration-300 bg-background/80 backdrop-blur-sm relative group">
        <div className="relative">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Quick info button */}
          <motion.button
            className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowDetails(!showDetails)}
            aria-label="Toggle project details"
          >
            <Info className="h-4 w-4 text-primary" />
          </motion.button>
        </div>

        <CardContent className="p-5 relative z-10">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
          <p className="mt-3 text-sm text-foreground/80">{description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-foreground/90">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 relative z-10 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/30 hover:border-primary hover:bg-primary/5 group/btn"
            asChild
          >
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${title} project on GitHub`}
            >
              <span className="flex items-center gap-2">
                <Github className="h-4 w-4" aria-hidden="true" />
                Code
              </span>
            </a>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-primary/30 hover:border-primary hover:bg-primary/5 group/btn"
            asChild
          >
            <a href={demo} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${title} project`}>
              <span className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Demo
              </span>
            </a>
          </Button>
        </CardFooter>

        {/* Expanded details overlay */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-sm p-5 flex flex-col z-20"
            >
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-muted/50"
                aria-label="Close details"
              >
                <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                  <Info className="h-4 w-4 text-primary" />
                </motion.div>
              </button>

              <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
              <p className="text-sm text-foreground/80 mb-4">{description}</p>

              <h4 className="font-semibold text-sm mb-1">Technologies:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h4 className="font-semibold text-sm mb-1">Key Features:</h4>
              <ul className="text-sm text-foreground/80 list-disc list-inside mb-4">
                <li>Feature one of this amazing project</li>
                <li>Another cool feature that makes it stand out</li>
                <li>Technical achievement or innovation</li>
              </ul>

              <div className="mt-auto flex gap-2">
                <Button size="sm" className="w-full" asChild>
                  <a href={demo} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center justify-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Demo
                    </span>
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center justify-center gap-2">
                      <Github className="h-4 w-4" />
                      View Code
                    </span>
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
