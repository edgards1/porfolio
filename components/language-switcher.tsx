"use client"

import { motion } from "framer-motion"
import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full px-4 py-2"
    >
      <Languages className="h-4 w-4 text-zinc-400" />
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'es'
            ? 'bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 text-white'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 text-white'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        EN
      </button>
    </motion.div>
  )
}
