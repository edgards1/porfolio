"use client"

import type { ReactNode } from "react"

interface TerminalCardProps {
  children: ReactNode
  className?: string
}

export function GlassmorphicCard({ children, className = "" }: TerminalCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-[#27272A] bg-[#18181B] transition-all duration-300 ${className}`}>
      <div className="relative">{children}</div>
    </div>
  )
}
