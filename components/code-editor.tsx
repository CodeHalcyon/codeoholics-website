"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function CodeEditor() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const editorRef = useRef<HTMLDivElement>(null)

  const codeLines = [
    "// Welcome to Codeoholics",
    "function joinCommunity() {",
    "  const passion = 'coding';",
    "  const community = 'supportive';",
    "  const projects = ['web', 'ai', 'mobile', 'games'];",
    "",
    "  return {",
    "    learn: () => 'New skills every day',",
    "    build: () => 'Amazing projects together',",
    "    connect: () => 'Meet like-minded people'",
    "  };",
    "}",
    "",
    "// Are you ready to join?",
    "joinCommunity();",
  ]

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    // Typing effect
    if (currentLine < codeLines.length) {
      const line = codeLines[currentLine]
      let charIndex = 0

      const typingInterval = setInterval(
        () => {
          if (charIndex <= line.length) {
            setText((prev) => {
              const lines = prev.split("\n")
              lines[currentLine] = line.substring(0, charIndex)
              return lines.join("\n")
            })
            charIndex++
          } else {
            clearInterval(typingInterval)
            setTimeout(() => {
              setText((prev) => prev + "\n")
              setCurrentLine((prev) => prev + 1)
            }, 100)
          }
        },
        Math.random() * 50 + 30,
      ) // Random typing speed for realism

      return () => clearInterval(typingInterval)
    }
  }, [currentLine])

  // Syntax highlighting function
  const highlightSyntax = (code: string) => {
    if (!code) return []

    return code.split("\n").map((line, i) => {
      // Replace with syntax highlighting
      const highlightedLine = line
        .replace(/(\/\/.*)/g, '<span class="text-slate-500">$1</span>') // Comments
        .replace(/\b(function|const|return|let|var|if|else|for|while)\b/g, '<span class="text-purple-400">$1</span>') // Keywords
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-amber-400">$1</span>') // Booleans and null
        .replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green-400">$&</span>') // Strings
        .replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>') // Numbers
        .replace(/($$|$$|\{|\}|\[|\]|;|,|\.)/g, '<span class="text-slate-400">$1</span>') // Punctuation
        .replace(/(\w+)(?=\s*\()/g, '<span class="text-yellow-400">$1</span>') // Function calls

      return (
        <div key={i} className="px-4 py-0.5 flex">
          <span className="w-8 text-right pr-4 text-slate-500 select-none">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightedLine || "&nbsp;" }} />
          {i === currentLine && cursorVisible && (
            <span className="border-l-2 border-white h-5 ml-0.5 animate-pulse"></span>
          )}
        </div>
      )
    })
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden shadow-2xl transform perspective-1000"
      style={{
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        rotateX: 5,
        rotateY: -5,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <div className="bg-slate-800 text-white rounded-t-lg">
        <div className="flex items-center px-4 py-2 border-b border-slate-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-sm text-slate-400">codeoholics.js</div>
        </div>
        <div ref={editorRef} className="font-mono text-sm overflow-auto p-2 max-h-[400px]">
          {highlightSyntax(text)}
        </div>
      </div>
      <div className="bg-slate-900 text-slate-400 text-xs px-4 py-2 border-t border-slate-700 flex justify-between">
        <span>JavaScript</span>
        <span>UTF-8</span>
        <span>Codeoholics Editor</span>
      </div>
    </motion.div>
  )
}
