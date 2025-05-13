"use client"

import { motion } from "framer-motion"

const GlobeFallback = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="w-[300px] h-[300px] rounded-full border-2 border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </motion.div>

      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full border-2 border-primary/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute w-[100px] h-[100px] rounded-full border-2 border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}

export default GlobeFallback
