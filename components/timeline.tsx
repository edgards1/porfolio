"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function Timeline() {
  const { t } = useLanguage()
  const jobs = t.experience.jobs

  return (
    <div className="space-y-6">
      {jobs.map((job, index) => (
        <div key={index} className="relative pl-8 border-l border-[#27272A] group">
          <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[6.5px] rounded-full bg-[#18181B] border-2 border-cyan-500 group-hover:bg-cyan-500/20 transition-colors duration-300" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg border border-[#27272A] bg-[#18181B] p-5 transition-all duration-300 group-hover:border-cyan-500/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-base font-semibold text-[#FAFAFA]">{job.title}</h3>
                  <p className="text-sm text-[#A1A1AA]">{job.company}</p>
                </div>
                <span className="text-xs font-mono text-[#52525B] whitespace-nowrap">{job.period}</span>
              </div>

              <ul className="space-y-1.5">
                {job.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-500/50 mt-1.5 flex-shrink-0">
                      <span className="block w-1 h-1 rounded-full bg-cyan-500" />
                    </span>
                    <span className="text-sm text-[#A1A1AA] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
