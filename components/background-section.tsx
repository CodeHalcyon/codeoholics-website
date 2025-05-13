"use client"

import type { ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface BackgroundSectionProps {
  children: ReactNode
  imageUrl: string
  overlayColor?: string
  parallax?: boolean
  className?: string
  id?: string
}

export default function BackgroundSection({
  children,
  imageUrl,
  overlayColor = "bg-black/50",
  parallax = true,
  className = "",
  id,
}: BackgroundSectionProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", parallax ? "20%" : "0%"])

  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      {/* Background Image with Parallax Effect */}
      <motion.div className="absolute inset-0 w-full h-full" style={parallax ? { y } : undefined}>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${overlayColor}`} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
