"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"

interface SkillBadgeProps {
  name: string
  level: number
  icon?: React.ReactNode
  colorFrom?: string
  colorTo?: string
}

export function SkillBadge({
  name,
  level,
  icon,
  colorFrom = "from-blue-deep-600",
  colorTo = "to-teal-professional-600",
}: SkillBadgeProps) {
  const prefersReducedMotion = useReducedMotion()
  const pct = Math.max(0, Math.min(100, Math.round(level)))

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      whileHover={!prefersReducedMotion ? { scale: 1.02, y: -6 } : {}}
      aria-label={`${name} ${pct} por ciento`}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-4 h-full transition-all duration-300 hover:border-teal-professional-500/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-3">
            {icon ? (
              <div className="w-10 h-10 rounded-lg bg-zinc-900/40 flex items-center justify-center text-white">
                {icon}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-sm font-medium">
                <span className="text-zinc-200">{name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm text-zinc-400">{name}</div>
            <div className="text-xs text-zinc-500">Nivel</div>
          </div>
          <div className="ml-auto text-sm font-medium text-zinc-300 tabular-nums">{pct}%</div>
        </div>

        <div className="relative h-3.5 w-full bg-zinc-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${colorFrom} ${colorTo}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            style={{ willChange: "width" }}
          />
          {/* moving dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg"
            initial={{ left: 0, scale: 0.8 }}
            whileInView={{ left: `${Math.max(4, pct)}%`, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
            viewport={{ once: true }}
            aria-hidden
          />
          {/* subtle animated stripe overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)25%,rgba(255,255,255,0)50%)] bg-repeat-x opacity-30 animate-[moveStripe_4s_linear_infinite]" />
        </div>

        {/* tooltip on hover */}
        <div className="pointer-events-none absolute -top-8 right-3 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:-translate-y-0 transition-all duration-200">
          <div className="px-2 py-1 rounded-md bg-zinc-900/80 text-xs text-white border border-zinc-700/60">
            {pct}% mastery
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveStripe {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
      `}</style>
    </motion.div>
  )
}
