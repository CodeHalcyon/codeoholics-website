"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"

type AnimationVariant = "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "none"

interface UseScrollAnimationProps {
  threshold?: number
  delay?: number
  once?: boolean
  variant?: AnimationVariant
  customVariant?: any
}

export function useScrollAnimation({
  threshold = 0.2,
  delay = 0.5,
  once = true,
  variant = "fadeIn",
  customVariant,
}: UseScrollAnimationProps = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isInView) {
      timeoutId = setTimeout(() => {
        setShouldAnimate(true)
      }, delay * 1000)
    } else if (!once) {
      setShouldAnimate(false)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isInView, delay, once])

  // Predefined animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6 } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    },
    none: {
      hidden: {},
      visible: {},
    },
  }

  // Select the appropriate variant
  const selectedVariant = customVariant || variants[variant]

  return {
    ref,
    isInView,
    shouldAnimate,
    variants: selectedVariant,
    initial: "hidden",
    animate: shouldAnimate ? "visible" : "hidden",
  }
}
