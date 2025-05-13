"use client"

import { useState, useEffect } from "react"

interface UseTypewriterProps {
  words: string[]
  loop?: boolean
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
}

export function useTypewriter({
  words = [""],
  loop = false,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500,
}: UseTypewriterProps) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let typingInterval: NodeJS.Timeout | null = null

    const handleTyping = () => {
      if (isWaiting) return

      if (!isDeleting) {
        // Typing
        setText(currentWord.substring(0, text.length + 1))

        // If word is complete
        if (text === currentWord) {
          // Set delay before starting to delete
          setIsWaiting(true)
          typingInterval = setTimeout(() => {
            setIsDeleting(true)
            setIsWaiting(false)
          }, delaySpeed)
        }
      } else {
        // Deleting
        setText(currentWord.substring(0, text.length - 1))

        // If deletion is complete
        if (text === "") {
          setIsDeleting(false)
          setWordIndex((prev) => {
            if (prev === words.length - 1) {
              return loop ? 0 : prev
            }
            return prev + 1
          })
        }
      }
    }

    typingInterval = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed)

    return () => {
      if (typingInterval) clearTimeout(typingInterval)
    }
  }, [text, isDeleting, wordIndex, words, loop, typeSpeed, deleteSpeed, delaySpeed, isWaiting])

  return text
}
