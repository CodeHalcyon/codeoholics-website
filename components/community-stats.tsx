"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Code, Globe } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"

// Sample locations data
const locations = [
  { name: "North America", members: 420, projects: 85 },
  { name: "Europe", members: 360, projects: 72 },
  { name: "Asia", members: 280, projects: 56 },
  { name: "Australia", members: 190, projects: 38 },
  { name: "South America", members: 120, projects: 24 },
  { name: "Africa", members: 150, projects: 30 },
]

export default function CommunityStats() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  // Calculate totals
  const totalMembers = locations.reduce((sum, location) => sum + location.members, 0)
  const totalProjects = locations.reduce((sum, location) => sum + location.projects, 0)

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <ScrollAnimation variant="fadeIn" delay={0.3}>
          <Card className="p-6 border border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Total Members</p>
                <h3 className="text-3xl font-bold">{totalMembers.toLocaleString()}</h3>
              </div>
            </div>
          </Card>
        </ScrollAnimation>

        <ScrollAnimation variant="fadeIn" delay={0.4}>
          <Card className="p-6 border border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Total Projects</p>
                <h3 className="text-3xl font-bold">{totalProjects.toLocaleString()}</h3>
              </div>
            </div>
          </Card>
        </ScrollAnimation>

        <ScrollAnimation variant="fadeIn" delay={0.5}>
          <Card className="p-6 border border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Regions</p>
                <h3 className="text-3xl font-bold">{locations.length}</h3>
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      </div>

      {/* Regional breakdown */}
      <ScrollAnimation variant="slideUp" delay={0.6}>
        <Card className="border border-border/50 bg-background/80 backdrop-blur-sm p-6">
          <h3 className="text-xl font-bold mb-4">Global Presence</h3>

          <div className="space-y-4">
            {locations.map((location) => (
              <div
                key={location.name}
                className="p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-colors bg-background/50"
                onMouseEnter={() => setHoveredRegion(location.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">{location.name}</h4>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    {location.members} members
                  </Badge>
                </div>

                <div className="w-full bg-muted/50 rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(location.members / totalMembers) * 100}%`,
                      transition: { duration: 1, delay: 0.8 },
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs text-foreground/60 mt-1">
                  <span>{location.projects} projects</span>
                  <span>{Math.round((location.members / totalMembers) * 100)}% of members</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-foreground/70 mt-6 text-center">
            Join our growing community of developers from around the world!
          </p>
        </Card>
      </ScrollAnimation>
    </div>
  )
}
