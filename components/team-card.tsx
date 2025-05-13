"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Twitter } from "lucide-react"
import { useState, useRef } from "react"

interface TeamCardProps {
  name: string
  role: string
  bio: string
  image: string
  github: string
  twitter: string
  clickable?: boolean
}

export default function TeamCard({ name, role, bio, image, github, twitter, clickable = false }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)
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
      className={`h-full ${clickable ? "cursor-pointer" : ""}`}
    >
      <Card className="overflow-hidden h-full border-border/50 hover:border-primary/30 transition-all duration-300 bg-background/80 backdrop-blur-sm relative group">
        <div className="relative">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        <CardContent className="p-5 relative z-10">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-sm font-medium text-primary">{role}</p>
          <p className="mt-2 text-sm text-foreground/80">{bio}</p>

          <div className="flex mt-4 space-x-3">
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 text-foreground/70 hover:text-primary transition-colors"
              aria-label={`Visit ${name}'s GitHub profile`}
              onClick={(e) => clickable && e.stopPropagation()}
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </motion.a>

            <motion.a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 text-foreground/70 hover:text-primary transition-colors"
              aria-label={`Visit ${name}'s Twitter profile`}
              onClick={(e) => clickable && e.stopPropagation()}
            >
              <Twitter className="h-5 w-5" aria-hidden="true" />
            </motion.a>
          </div>

          {clickable && (
            <div className="absolute bottom-3 right-3 text-xs text-foreground/40 italic">Click for details</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
