"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const accentColors = [
  { border: "border-cyan-500/30", bg: "bg-cyan-500/5", dot: "border-cyan-500", text: "text-cyan-400", glow: "bg-cyan-500/20" },
  { border: "border-emerald-500/30", bg: "bg-emerald-500/5", dot: "border-emerald-500", text: "text-emerald-400", glow: "bg-emerald-500/20" },
  { border: "border-violet-500/30", bg: "bg-violet-500/5", dot: "border-violet-500", text: "text-violet-400", glow: "bg-violet-500/20" },
  { border: "border-amber-500/30", bg: "bg-amber-500/5", dot: "border-amber-500", text: "text-amber-400", glow: "bg-amber-500/20" },
]

export function Timeline() {
  const { t } = useLanguage()
  const jobs = t.experience.jobs
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#27272A] overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-transparent"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="space-y-10">
        {jobs.map((job, index) => {
          const colors = accentColors[index % accentColors.length]

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative pl-10 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.12 + 0.15 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <div className={`w-[22px] h-[22px] -translate-x-[2px] rounded-full bg-[#09090B] border-2 ${colors.dot} flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_12px] ${colors.dot === "border-cyan-500" ? "group-hover:shadow-cyan-500/40" : colors.dot === "border-emerald-500" ? "group-hover:shadow-emerald-500/40" : colors.dot === "border-violet-500" ? "group-hover:shadow-violet-500/40" : "group-hover:shadow-amber-500/40"}`}>
                    <div className={`w-2 h-2 rounded-full ${colors.text} ${index === 0 ? "animate-pulse" : ""}`} />
                  </div>
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.12 + 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-sm p-6 transition-all duration-300 group-hover:border-opacity-60 group-hover:shadow-lg`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-[#FAFAFA]">{job.title}</h3>
                      {index === 0 && (
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.dot === "border-cyan-500" ? "bg-cyan-500/10 text-cyan-400" : colors.dot === "border-emerald-500" ? "bg-emerald-500/10 text-emerald-400" : colors.dot === "border-violet-500" ? "bg-violet-500/10 text-violet-400" : "bg-amber-500/10 text-amber-400"}`}>
                          Último
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#A1A1AA] mt-0.5">{job.company}</p>
                  </div>
                  <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${colors.border} ${colors.text} whitespace-nowrap shrink-0 self-start`}>
                    {job.period}
                  </span>
                </div>

                {/* Accent divider */}
                <div className={`h-px w-12 mb-4 ${colors.dot === "border-cyan-500" ? "bg-cyan-500/30" : colors.dot === "border-emerald-500" ? "bg-emerald-500/30" : colors.dot === "border-violet-500" ? "bg-violet-500/30" : "bg-amber-500/30"}`} />

                {/* Description list */}
                <ul className="space-y-2.5">
                  {job.description.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.12 + idx * 0.04 + 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2.5"
                    >
                      <ArrowRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${colors.text} opacity-60`} />
                      <span className="text-sm text-[#A1A1AA] leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
