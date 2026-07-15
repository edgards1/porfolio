"use client"

import { useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function HtmlLangSync() {
  const { language } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return null
}
