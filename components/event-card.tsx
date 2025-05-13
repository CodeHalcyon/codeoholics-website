"use client"

import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EventCardProps {
  title: string
  date: string
  description: string
  location: string
  image: string
  tags: string[]
}

export default function EventCard({
  title,
  date,
  description,
  location,
  image,
  tags,
}: EventCardProps) {
  return (
    <li className="list-none w-full min-h-[22rem]">
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-background/70 backdrop-blur-sm">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-col gap-3">
            {/* Event image */}
            <div className="relative w-full h-40 rounded-xl overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* Tags */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm border border-primary/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
              {title}
            </h3>

            {/* Date & Location */}
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground mt-2">{description}</p>
          </div>

          {/* Register Button */}
          <div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/30 hover:border-primary hover:bg-primary/5 group"
            >
              <span className="flex items-center justify-center gap-2">
                Register
                <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}
