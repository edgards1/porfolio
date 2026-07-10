"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Languages, ChevronDown, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { CvModal } from "@/components/cv-modal"
import { useLanguage } from "@/contexts/language-context"

export function FloatingNav() {
  const { t, language, setLanguage } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navItems = [
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ]

  const handleNavClick = () => {
    if (isMobile) setIsOpen(false)
  }

  return (
    <>
      {isMobile && (
        <motion.div
          className="fixed top-6 right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="relative p-3 rounded-full bg-[#18181B]/80 border border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-cyan-500/50 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </motion.div>
      )}

      {!isMobile && (
        <motion.div
          className="fixed top-6 z-50"
          style={{ left: "50%" }}
          initial={{ x: "-50%", y: -100 }}
          animate={{ x: "-50%", y: isVisible ? 0 : -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2.5 rounded-full bg-[#18181B]/90 border border-[#27272A] shadow-lg shadow-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] rounded-full transition-all duration-200"
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-5 w-px bg-[#27272A] mx-1.5" />

              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-all duration-200"
                >
                  <Languages className="h-3.5 w-3.5" />
                  <span className="uppercase font-semibold text-xs">{language}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isLangMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 w-28 bg-[#18181B] border border-[#27272A] rounded-lg shadow-xl overflow-hidden"
                    >
                      {(["es", "en"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { setLanguage(lang); setIsLangMenuOpen(false) }}
                          className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                            language === lang
                              ? "text-cyan-400 bg-cyan-500/10"
                              : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]"
                          }`}
                        >
                          <span>{lang === "es" ? "Español" : "English"}</span>
                          {language === lang && <span className="text-xs text-cyan-400">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-5 w-px bg-[#27272A] mx-1.5" />

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all duration-200"
              >
                <FileText className="h-3.5 w-3.5" />
                {t.about.downloadCV}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-[#09090B]/95 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-3">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="px-8 py-3 text-xl font-medium text-[#A1A1AA] hover:text-cyan-400 transition-colors"
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <div className="flex gap-2 bg-[#18181B] rounded-full p-1 border border-[#27272A]">
                {(["es", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setIsLangMenuOpen(false) }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      language === lang
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-[#A1A1AA] hover:text-[#FAFAFA]"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="mt-4"
            >
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="px-6 py-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium"
              >
                {t.about.downloadCV}
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}

      <CvModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  )
}
