"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { X, Github, Twitter, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  name: string
  role: string
  bio: string
  longBio?: string
  image: string
  github: string
  twitter: string
  skills?: string[]
  projects?: string[]
  email?: string
}

interface TeamMemberModalProps {
  member: TeamMember
  onClose: () => void
}

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative w-full max-w-4xl bg-background rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 text-foreground z-10 hover:bg-primary/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
          </div>

          <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh] md:max-h-[600px]">
            <h2 className="text-2xl md:text-3xl font-bold">{member.name}</h2>
            <p className="text-primary font-medium mt-1">{member.role}</p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-foreground/80">{member.longBio || member.bio}</p>
            </div>

            {member.skills && member.skills.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {member.projects && member.projects.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Projects</h3>
                <ul className="list-disc list-inside text-foreground/80">
                  {member.projects.map((project) => (
                    <li key={project}>{project}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 text-foreground/70 hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 text-foreground/70 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 text-foreground/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
