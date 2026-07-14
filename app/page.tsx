"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SkillsBento } from "@/components/skills-bento"
import { Timeline } from "@/components/timeline"
import { ContactSection } from "@/components/contact-section"
import { FloatingNav } from "@/components/floating-nav"
import { SectionHeading } from "@/components/section-heading"
import { GitHubProjects } from "@/components/services/github-proyects"
import { Typewriter } from "@/components/typewriter"
import { CvModal } from "@/components/cv-modal"
import { useLanguage } from "@/contexts/language-context"

const techLogos = [
  { name: "JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Next", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "NodeJS", icon: "https://www.myqnap.org/wp-content/uploads/nodejs-logo.gif" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/edgards1", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/edgard-s1", label: "LinkedIn" },
  { icon: Mail, href: "mailto:edgar_delgado_scott@hotmail.com", label: "Email" },
]

export default function Portfolio() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const { t } = useLanguage()

  const infoFields: [string, string][] = [
    [t.about.name, "Edgar Eduardo Delgado Scott"],
    [t.about.email, "edgar_delgado_scott@hotmail.com"],
    [t.about.location, t.about.locationValue],
    [t.about.phone, "0995658194"],
  ]

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      <FloatingNav />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-[100px]" />
        </div>

        <div className="container max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-20">
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-wider">
                  <Terminal className="h-3.5 w-3.5" />
                  <Typewriter
                    texts={t.roles}
                    speed={70}
                    deleteSpeed={35}
                    pauseDuration={2000}
                    loop={true}
                    mode="single"
                    cursor={true}
                    cursorChar="_"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <p className="text-sm sm:text-base font-mono text-[#52525B] uppercase tracking-[0.2em]">
                  {t.hero.greeting}
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight text-[#FAFAFA]">
                  Edgar
                  <br />
                  Delgado
                  <br />
                  Scott
                </h1>
              </motion.div>

              <motion.p
                className="text-base sm:text-lg text-[#A1A1AA] max-w-[540px] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                className="flex gap-8 sm:gap-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { value: "5+", label: t.hero.statsYears },
                  { value: "4+", label: t.hero.statsProjects },
                  { value: "8K+", label: t.hero.statsHours },
                ].map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-display text-cyan-400">{stat.value}</div>
                    <div className="text-xs font-mono text-[#52525B] uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link href="#projects">
                  <Button className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 h-11 px-4 rounded-full text-sm font-medium transition-all duration-200">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full w-11 h-11 border border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-cyan-500/30 hover:bg-[#18181B] transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{label}</span>
                    </Button>
                  </Link>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-5 md:d-none *: hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="grid grid-cols-4 gap-3">
                {techLogos.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.04 }}
                    className="group aspect-square rounded-lg border border-[#27272A] bg-[#18181B] flex flex-col items-center justify-center gap-1 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-300"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    <span className="text-[9px] font-mono text-[#52525B] group-hover:text-cyan-400 transition-colors duration-200">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 rounded-full border border-[#27272A] flex justify-center pt-2"
            >
              <div className="w-1 h-1.5 rounded-full bg-[#52525B]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <SectionHeading title={t.about.title} subtitle={t.about.subtitle} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-12 sm:mt-16">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-lg overflow-hidden border border-[#27272A]">
                <img
                  src="/img/perfil.jpg"
                  alt="Edgar Delgado Scott"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-400">{t.about.statusAvailable}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <p className="text-[#A1A1AA] leading-relaxed">{t.about.para1}</p>
              <p className="text-[#A1A1AA] leading-relaxed">{t.about.para2}</p>
              <p className="text-[#A1A1AA] leading-relaxed">{t.about.para3}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {infoFields.map(([label, value]) => (
                  <div key={label} className="border border-[#27272A] rounded-lg px-4 py-3">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#52525B]">{label}</p>
                    <p className="text-sm text-[#A1A1AA] mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setIsResumeModalOpen(true)}
                className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 text-sm font-medium transition-all duration-200"
              >
                {t.about.downloadCV}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0c0c0e]">
        <div className="container max-w-7xl mx-auto">
          <SectionHeading title={t.skills.title} subtitle={t.skills.subtitle} />
          <div className="mt-12 sm:mt-16">
            <SkillsBento />
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <SectionHeading title={t.projects.title} subtitle={t.projects.subtitle} />
          <div className="mt-12 sm:mt-16">
            <GitHubProjects />
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-[#52525B] mb-3">{t.projects.viewMore}</p>
            <Link href="https://github.com/edgards1" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-[#27272A] text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA] hover:border-cyan-500/30 rounded-full transition-all duration-200"
              >
                <Github className="h-4 w-4 mr-2" />
                {t.projects.viewAllGitHub}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0c0c0e]">
        <div className="container max-w-7xl mx-auto">
          <SectionHeading title={t.experience.title} subtitle={t.experience.subtitle} />
          <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
            <Timeline />
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <ContactSection />

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#27272A] py-8 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#52525B] font-mono">
              &copy; {new Date().getFullYear()} Edgar Delgado Scott
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
                  <span className="text-[#52525B] hover:text-cyan-400 transition-colors">
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{label}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <CvModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
  )
}
