"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = () => {
      const target = document.elementFromPoint(mousePosition.x, mousePosition.y)
      setIsPointer(window.getComputedStyle(target as Element).cursor === 'pointer')
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', updateCursorType)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', updateCursorType)
    }
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary mix-blend-difference pointer-events-none z-50"
      animate={{ 
        x: mousePosition.x - 2, 
        y: mousePosition.y - 2,
        scale: isPointer ? 1.5 : 1
      }}
      transition={{ duration: 0 }}
    />
  )
}

export default CustomCursor

