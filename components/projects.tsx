"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeFilter, setActiveFilter] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    image: string
    github: string
    demo: string
    category: string
  }

  const projects: Project[] = [
    {
      id: "campus-connect",
      title: "CampusConnect",
      description: "A mobile app that helps students find study groups and events on campus.",
      tags: ["Mobile", "React Native", "Firebase"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
      demo: "https://demo.com",
      category: "mobile",
    },
    {
      id: "eco-track",
      title: "EcoTrack",
      description: "IoT system that monitors and visualizes energy usage in campus buildings.",
      tags: ["IoT", "Arduino", "Data Viz"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
      demo: "https://demo.com",
      category: "hardware",
    },
    {
      id: "study-ai",
      title: "StudyAI",
      description: "AI-powered study assistant that generates practice questions and explanations.",
      tags: ["AI", "Machine Learning", "Web"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
      demo: "https://demo.com",
      category: "ai",
    },
    {
      id: "course-hub",
      title: "CourseHub",
      description: "Platform for sharing course notes and study materials among students.",
      tags: ["Web", "React", "Node.js"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
      demo: "https://demo.com",
      category: "web",
    },
    {
      id: "campus-nav",
      title: "CampusNav",
      description: "Indoor navigation system for campus buildings using AR technology.",
      tags: ["AR", "Mobile", "Unity"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
      demo: "https://demo.com",
      category: "mobile",
    },
    {
      id: "code-review",
      title: "CodeReview",
      description: "Automated code review tool that provides feedback on student assignments.",
      tags: ["AI", "Python", "Education"],
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com",
      demo: "https://demo.com",
      category: "ai",
    },
  ]

  const filters = [
    { name: "All", value: "all" },
    { name: "Web", value: "web" },
    { name: "Mobile", value: "mobile" },
    { name: "AI", value: "ai" },
    { name: "Hardware", value: "hardware" },
  ]

  // Update filtered projects when filter changes
  useEffect(() => {
    const filtered = activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

    // Add a small delay to allow exit animations to complete
    setTimeout(() => {
      setFilteredProjects(filtered)
    }, 50)
  }, [activeFilter])

  // Initialize filtered projects
  useEffect(() => {
    setFilteredProjects(projects)
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="w-full py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-lg bg-primary/10 px-3 py-1">
              <span className="text-sm font-semibold tracking-wider text-primary">Our Work</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tighter md:text-4xl/tight"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-foreground/80 md:text-xl"
          >
            Check out what our members have built. From web apps to hardware hacks, we do it all.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mt-4"
          >
            {filters.map((filter) => (
              <Badge
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "outline"}
                className={`cursor-pointer text-sm px-3 py-1 ${
                  activeFilter === filter.value ? "bg-primary text-white" : "hover:bg-primary/10"
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.name}
              </Badge>
            ))}
          </motion.div>
        </motion.div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="flex"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <Button variant="outline" className="border-2 border-primary/30 hover:border-primary group">
            <span className="flex items-center gap-2">
              Explore All Projects
              <motion.div initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Github className="h-4 w-4 text-primary group-hover:text-primary" />
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
