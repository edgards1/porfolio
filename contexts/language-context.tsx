"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKeys } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    // Detect browser language on mount
    const browserLang = navigator.language.toLowerCase()
    const savedLang = localStorage.getItem('preferred-language') as Language
    
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang)
    } else if (browserLang.startsWith('es')) {
      setLanguageState('es')
    } else {
      setLanguageState('en')
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('preferred-language', lang)
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('Error en LanguageContext')
  }
  return context
}
