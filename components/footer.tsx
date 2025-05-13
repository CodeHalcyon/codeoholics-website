"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Code } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }
const links = [
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo" />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ]
  // const socialLinks = [
  //   { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
  //   { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
  //   { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
  //   { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  // ]

  return (
    <footer className="w-full py-12 md:py-16 relative border-t border-border/50">
      <div className="container px-4 md:px-6 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 lg:grid-cols-3"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="relative"
              >
                {/* <Code className="h-6 w-6 text-primary relative z-10" /> */}
              </motion.div>
              <span className="font-bold text-xl tracking-tight">Codeoholics</span>
            </Link>
            <p className="text-foreground/70 max-w-sm">
              A community of passionate coders building the future together. Join us to learn, build, and grow.
            </p>

            {/* Replace the social media section with FloatingDock */}
             <FloatingDock
              mobileClassName="absolute bottom-8 left-4"  // Move a bit up from the bottom
              desktopClassName="absolute top-1/2 left-4 transform -translate-y-1/2 translate-y-50"  // Move 20 units down vertically from the center
              items={links}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Quick links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#about"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#events"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#team"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                  >
                    Team
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/resources"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                    aria-label="View learning resources for coding and development"
                  >
                    Learning Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/code-of-conduct"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                    aria-label="Read our community code of conduct"
                  >
                    Code of Conduct
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                    aria-label="View our privacy policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-sm text-foreground/70 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                    aria-label="Read our terms of service"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 border-t border-border/50 pt-6 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-sm text-foreground/60">© {new Date().getFullYear()} Codeoholics. All rights reserved.</p>
          <p className="text-sm text-foreground/60 mt-2 sm:mt-0">
            Made with <span className="text-primary">♥</span> by passionate coders
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
