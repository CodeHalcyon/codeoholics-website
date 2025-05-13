"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Code, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTypewriter } from "@/hooks/use-typewriter";
import SimpleSearch from "@/components/simple-search";
import ThemeToggle from "@/components/theme-toggle";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [activeNavItem, setActiveNavItem] = useState("home");

  // Typewriter effect for tagline
  const tagline = useTypewriter({
    words: ["Code", "Create", "Connect"],
    loop: true,
    delaySpeed: 2000,
  });

  // Handle scroll effect with Framer Motion
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], ["5rem", "3.5rem"]);
  const headerPadding = useTransform(scrollY, [0, 100], ["1.25rem", "0.5rem"]);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(var(--background), 0.5)", "rgba(var(--background), 0.85)"]
  );
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Improve the scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "events",
        "previous-events",
        "Team",
        "Gallery",
        "sponsors",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      // Find the last section that has been scrolled past
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
          }
        }
      }

      if (currentSection !== activeNavItem) {
        setActiveNavItem(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeNavItem]);

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Events", href: "#events", id: "events" },
    { name: "Sponsors", href: "#sponsors", id: "sponsors" },
    { name: "Team", href: "#team", id: "team" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <motion.header
      ref={headerRef}
      style={{
        height: headerHeight,
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
        backgroundColor: headerBg,
        borderBottomWidth: "1px",
        borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg flex items-center rounded-b-lg border"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => setActiveNavItem("home")}
        >
          <motion.div
            style={{ scale: logoScale }}
            className="relative flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Removed the glow effect */}
            <Image
              src="/codeoholicsLogo.jpeg" // Replace this with the correct path to your college logo
              alt="College Logo"
              width={32} // Set the width of the logo
              height={32} // Set the height of the logo
              className="relative z-10" // Add any necessary styling
            />
          </motion.div>
          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl tracking-tight"
            >
              Codeoholics
            </motion.span>
            <motion.span className="text-xs text-foreground/70 hidden md:block">
              <span className="mr-1">Where you</span>
              <span className="text-lavender font-medium" style={{ color: "#E6E6FA" }}>{tagline}</span>
            </motion.span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative">
            <ul className="flex gap-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    data-nav={item.id}
                    className={cn(
                      "text-foreground/80 hover:text-primary transition-colors relative py-2 px-1",
                      activeNavItem === item.id && "text-primary"
                    )}
                    onClick={() => setActiveNavItem(item.id)}
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/0"
                      whileHover={{
                        backgroundColor: "rgba(var(--primary), 0.7)",
                        transition: { duration: 0.2 },
                      }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <SimpleSearch />
            <ThemeToggle />

            <Button
              className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-medium overflow-hidden group relative"
              size="sm"
            >
              <motion.span
                className="absolute inset-0 bg-white/20 rounded-md"
                initial={{ x: "-100%", opacity: 0.5 }}
                whileHover={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <span className="flex items-center gap-2">
                Join Us
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <SimpleSearch />
          <ThemeToggle />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b shadow-lg md:hidden"
          >
            <nav className="container mx-auto py-6 px-4">
              <ul className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveNavItem(item.id);
                      }}
                      className={cn(
                        "text-lg font-medium text-foreground/80 hover:text-primary transition-colors",
                        activeNavItem === item.id && "text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
