"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function IntroAnimation() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const phrases = ["We", "Code.", "We", "Create.", "We", "Collaborate."]

  useEffect(() => {
    if (currentPhrase < phrases.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPhrase(currentPhrase + 1)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [currentPhrase])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.h1
          key={currentPhrase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl md:text-7xl font-bold"
        >
          {phrases[currentPhrase] === "We" ? (
            <span>{phrases[currentPhrase]}</span>
          ) : (
            <span>
              <span className="text-white/50 mr-2">We</span>
              <span className="text-white">{phrases[currentPhrase].replace("We ", "")}</span>
            </span>
          )}
        </motion.h1>
      </div>
    </motion.div>
  )
}
