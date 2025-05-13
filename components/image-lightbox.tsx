"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"

interface ImageWithLightboxProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function ImageWithLightbox({ src, alt, width, height, className }: ImageWithLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={`relative group cursor-zoom-in ${className || ""}`} onClick={() => setIsOpen(true)}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="rounded-md transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/50 rounded-full p-2">
            <ZoomIn className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.button
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white z-10"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={width * 2} // Larger size for lightbox
                height={height * 2}
                className="object-contain max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
