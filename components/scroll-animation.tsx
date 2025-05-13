"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

type ScrollAnimationProps = {
  children: React.ReactNode
  variant?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleUp" | "scaleDown"
  delay?: number
  duration?: number
  className?: string
}

export default function ScrollAnimation({
  children,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "slideUp" ? 50 : variant === "slideDown" ? -50 : 0,
      x: variant === "slideLeft" ? 50 : variant === "slideRight" ? -50 : 0,
      scale: variant === "scaleUp" ? 0.8 : variant === "scaleDown" ? 1.2 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
