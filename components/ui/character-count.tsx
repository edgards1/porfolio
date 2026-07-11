"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CharacterCountProps {
  current: number
  max: number
  className?: string
}

export function CharacterCount({ current, max, className }: CharacterCountProps) {
  const percentage = current / max
  const nearing = percentage > 0.8
  const over = current > max

  return (
    <motion.span
      layout
      className={cn(
        "text-xs font-mono transition-colors duration-200",
        over ? "text-red-400" : nearing ? "text-yellow-400" : "text-[#52525B]",
        className
      )}
    >
      {current} / {max}
    </motion.span>
  )
}
