"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConfetti } from "@/hooks/use-confetti"

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { triggerConfetti } = useConfetti()
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile for conditional rendering
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Parallax effect using Framer Motion's useScroll and useTransform
  const { scrollY } = useScroll()

  // Transform values for different parallax layers
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]) // Slowest layer
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]) // Medium layer
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]) // Fastest layer
  const opacity = useTransform(scrollY, [0, 300], [1, 0]) // Fade out effect

  const handleJoinClick = () => {
    triggerConfetti()
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background parallax layers */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-background to-background/80" />
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute inset-0 z-1">
        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </motion.div>

      {/* Floating particles */}
      <motion.div style={{ y: y3 }} className="absolute inset-0 z-2 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity: opacity }} className="container relative z-10 px-4 md:px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-2">
                Welcome to Codeoholics
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Where <span className="text-primary">code</span> meets community
              </h1>
              <p className="mt-4 text-lg text-foreground/80 max-w-lg mx-auto lg:mx-0">
                Join our community of passionate programmers, designers, and innovators building the future together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-medium"
                onClick={handleJoinClick}
                aria-label="Join our community"
              >
                <motion.span initial={{ x: 0 }} whileHover={{ x: -4 }} className="flex items-center gap-2">
                  Join Our Community
                  <motion.div initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </motion.div>
                </motion.span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/50 hover:border-primary"
                aria-label="Learn more about our community"
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="rounded-lg overflow-hidden shadow-2xl bg-background/80 backdrop-blur-sm border border-border/50 p-6">
              <div className="flex items-center px-4 py-2 border-b border-border/50 mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm text-foreground/70">codeoholics.js</div>
              </div>

              <div className="font-mono text-sm space-y-2 text-left">
                <p>
                  <span className="text-purple-400">const</span> <span className="text-yellow-400">welcome</span> ={" "}
                  <span className="text-green-400">"Hello, Codeoholics!"</span>;
                </p>
                <p>
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-yellow-400">joinCommunity</span>() {`{`}
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">return</span> {`{`}
                </p>
                <p className="pl-8">
                  <span className="text-yellow-400">learn</span>: <span className="text-green-400">"New skills"</span>,
                </p>
                <p className="pl-8">
                  <span className="text-yellow-400">build</span>:{" "}
                  <span className="text-green-400">"Amazing projects"</span>,
                </p>
                <p className="pl-8">
                  <span className="text-yellow-400">connect</span>:{" "}
                  <span className="text-green-400">"With developers"</span>
                </p>
                <p className="pl-4">{`}`};</p>
                <p>{`}`}</p>
                <p></p>
                <p>
                  <span className="text-slate-500">// Are you ready to join?</span>
                </p>
                <p>
                  <span className="text-yellow-400">joinCommunity</span>();
                </p>
              </div>

              <div className="mt-4 bg-muted/30 text-xs px-4 py-2 border-t border-border/50 flex justify-between">
                <span>JavaScript</span>
                <span>Codeoholics Editor</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-foreground/60">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.2 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
