"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, FileText, ArrowRight, Linkedin, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/contexts/language-context"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const FormField = ({
  label,
  icon,
  children,
  error,
  success,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  error?: string
  success?: boolean
}) => (
  <motion.div
    className="space-y-1.5"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#52525B]">
      {icon}
      {label}
      {success && <CheckCircle className="h-3 w-3 text-cyan-500" />}
    </div>
    <div className="relative">
      {children}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 mt-1 text-xs text-red-400"
          >
            <AlertCircle className="h-3 w-3 flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
)

export function ContactSection() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(new Set())
  const formRef = useRef<HTMLFormElement>(null)

  const validateField = useCallback((field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        if (value.trim().length > 50) return "Name cannot exceed 50 characters"
        return undefined
      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email"
        return undefined
      case "subject":
        if (!value.trim()) return "Subject is required"
        if (value.trim().length < 5) return "Subject must be at least 5 characters"
        if (value.trim().length > 100) return "Subject cannot exceed 100 characters"
        return undefined
      case "message":
        if (!value.trim()) return "Message is required"
        if (value.trim().length < 10) return "Message must be at least 10 characters"
        if (value.trim().length > 1000) return "Message cannot exceed 1000 characters"
        return undefined
      default:
        return undefined
    }
  }, [])

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touchedFields.has(field)) {
      const error = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }, [touchedFields, validateField])

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouchedFields((prev) => new Set([...prev, field]))
    const error = validateField(field, formData[field])
    setErrors((prev) => ({ ...prev, [field]: error }))
  }, [formData, validateField])

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true
    Object.keys(formData).forEach((key) => {
      const field = key as keyof FormData
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })
    setErrors(newErrors)
    setTouchedFields(new Set(Object.keys(formData) as (keyof FormData)[]))
    return isValid
  }, [formData, validateField])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) {
      toast({
        title: "Form errors",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Error sending message")

      toast({
        title: "Message sent successfully!",
        description: data.message || "Thank you for reaching out. I'll respond shortly.",
      })

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTouchedFields(new Set())
        setErrors({})
      }, 3000)
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFieldValid = (field: keyof FormData): boolean =>
    !!touchedFields.has(field) && !errors[field] && formData[field].trim().length > 0

  const progressPercentage = Object.keys(formData).reduce((acc, key) => {
    const field = key as keyof FormData
    return acc + (formData[field].trim() && !errors[field] ? 25 : 0)
  }, 0)

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto">
        <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <GlassmorphicCard className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-[#FAFAFA] mb-6">{t.contact.infoTitle}</h3>
              <div className="space-y-4">
                <a
                  href="mailto:edgar_delgado_scott@hotmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg border border-[#27272A] bg-[#1f1f23] hover:border-cyan-500/30 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#52525B]">{t.contact.email}</p>
                    <p className="text-sm text-[#A1A1AA] truncate">edgar_delgado_scott@hotmail.com</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#52525B] group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="https://www.linkedin.com/in/edgard-s1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-[#27272A] bg-[#1f1f23] hover:border-cyan-500/30 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#52525B]">{t.contact.linkedin}</p>
                    <p className="text-sm text-[#A1A1AA] truncate">Edgar Delgado Scott</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#52525B] group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="https://github.com/edgards1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-[#27272A] bg-[#1f1f23] hover:border-cyan-500/30 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Github className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#52525B]">{t.contact.github}</p>
                    <p className="text-sm text-[#A1A1AA] truncate">@edgards1</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#52525B] group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-[#27272A] space-y-3">
                <div className="flex items-center gap-2 p-3 rounded bg-green-500/5 border border-green-500/10">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-400">{t.contact.availableFreelance}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded bg-cyan-500/5 border border-cyan-500/10">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-xs font-mono text-cyan-400">{t.contact.availableFulltime}</span>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassmorphicCard className="p-6">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-semibold text-[#FAFAFA] mb-1">{t.contact.formTitle}</h3>
                <p className="text-sm text-[#A1A1AA]">{t.contact.formSubtitle}</p>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-mono text-[#52525B]">{t.contact.formProgress}</span>
                  <span className="text-xs font-mono text-[#52525B]">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-[#27272A] rounded-full h-1">
                  <motion.div
                    className="bg-cyan-500 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <FormField
                  label={t.about.name}
                  icon={<User className="h-3 w-3" />}
                  error={touchedFields.has("name") ? errors.name : undefined}
                  success={isFieldValid("name")}
                >
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Your full name"
                    className={cn(
                      "bg-[#1f1f23] border-[#27272A] focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 text-sm",
                      errors.name && touchedFields.has("name") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                      isFieldValid("name") && "border-cyan-500/50"
                    )}
                    disabled={isSubmitting}
                  />
                </FormField>

                <FormField
                  label={t.contact.email}
                  icon={<Mail className="h-3 w-3" />}
                  error={touchedFields.has("email") ? errors.email : undefined}
                  success={isFieldValid("email")}
                >
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="you@email.com"
                    className={cn(
                      "bg-[#1f1f23] border-[#27272A] focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 text-sm",
                      errors.email && touchedFields.has("email") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                      isFieldValid("email") && "border-cyan-500/50"
                    )}
                    disabled={isSubmitting}
                  />
                </FormField>

                <FormField
                  label={t.contact.subject}
                  icon={<FileText className="h-3 w-3" />}
                  error={touchedFields.has("subject") ? errors.subject : undefined}
                  success={isFieldValid("subject")}
                >
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    placeholder="What's this about?"
                    className={cn(
                      "bg-[#1f1f23] border-[#27272A] focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 text-sm",
                      errors.subject && touchedFields.has("subject") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                      isFieldValid("subject") && "border-cyan-500/50"
                    )}
                    disabled={isSubmitting}
                  />
                </FormField>

                <FormField
                  label={t.contact.message}
                  icon={<MessageSquare className="h-3 w-3" />}
                  error={touchedFields.has("message") ? errors.message : undefined}
                  success={isFieldValid("message")}
                >
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    placeholder="Tell me more about your project or idea..."
                    rows={4}
                    className={cn(
                      "bg-[#1f1f23] border-[#27272A] focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 resize-none text-sm",
                      errors.message && touchedFields.has("message") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                      isFieldValid("message") && "border-cyan-500/50"
                    )}
                    disabled={isSubmitting}
                  />
                </FormField>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 h-11 text-sm font-medium transition-all duration-200"
                  disabled={isSubmitting || progressPercentage < 100}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <div className="w-4 h-4 mr-2 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                        {t.contact.sending}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        {t.contact.submit}
                        <Send className="ml-2 h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>

              <p className="text-xs text-[#52525B] text-center mt-4">
                {t.contact.responseTime}
              </p>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
