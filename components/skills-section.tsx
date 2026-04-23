"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SectionHeading } from "@/components/section-heading"
import { SkillBadge } from "@/components/skill-badge"


export type Skill = {
  name: string
  level: number
  category?: string
}

export interface SkillsSectionProps {
  skills?: Skill[]
}

const SKILLS = [
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Angular", level: 90, category: "frontend" },
  { name: "React", level: 80, category: "frontend" },
  { name: "HTML5", level: 95, category: "frontend" },
  { name: "CSS3", level: 90, category: "frontend" },
  { name: "Bootstrap", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 80, category: "frontend" },

  { name: "C#", level: 80, category: "backend" },
  { name: "Python", level: 85, category: "backend" },
  { name: ".NET", level: 80, category: "backend" },
  { name: "Django", level: 85, category: "backend" },
  { name: "Flask", level: 75, category: "backend" },
  { name: "NodeJS", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "SQL Server", level: 85, category: "backend" },
  { name: "MySQL", level: 80, category: "backend" },
  { name: "Docker", level: 70, category: "backend" },
  { name: "Git", level: 90, category: "other" },
]


export function SkillsSection({ skills = SKILLS }: SkillsSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  }

  const visibleSkills = (filter: string) =>
    skills.filter((s) => filter === "all" || (filter === "frontend" && s.category === "frontend") || (filter === "backend" && s.category === "backend"))

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-deep-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container relative z-10">
        <SectionHeading title="My Skills" subtitle="Tecnologías en las que me desempeño" />

        <Tabs defaultValue="all" className="w-full">
          <motion.div
            className="flex justify-center mt-2"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TabsList className="grid grid-cols-3 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-deep-600 data-[state=active]:to-teal-professional-600 data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="frontend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-deep-600 data-[state=active]:to-teal-professional-600 data-[state=active]:text-white">
                Frontend
              </TabsTrigger>
              <TabsTrigger value="backend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-deep-600 data-[state=active]:to-teal-professional-600 data-[state=active]:text-white">
                Backend
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "show"}
            variants={container}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleSkills("all").map((s) => (
                  <motion.div key={s.name} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                    <SkillBadge name={s.name} level={s.level} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="frontend" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleSkills("frontend").map((s) => (
                  <motion.div key={s.name} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                    <SkillBadge name={s.name} level={s.level} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backend" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleSkills("backend").map((s) => (
                  <motion.div key={s.name} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                    <SkillBadge name={s.name} level={s.level} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </section>
  )
}
