"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, FileText, ArrowRight, Linkedin, Github, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/contexts/language-context"
import { validateField, validateForm, isFormValid, getFirstErrorField, type ValidationErrorCode } from "@/lib/validation"
import type { TranslationKeys } from "@/lib/translations"
import { CharacterCount } from "@/components/ui/character-count"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: ValidationErrorCode
  email?: ValidationErrorCode
  subject?: ValidationErrorCode
  message?: ValidationErrorCode
}

type FormStatus = "idle" | "submitting" | "success" | "error"

const FormField = ({
  label,
  icon,
  children,
  error,
  success,
  disabled,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  error?: string
  success?: boolean
  disabled?: boolean
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

function SubmitButton({
  isSubmitting,
  isDisabled,
  label,
  sendingLabel,
  hintLabel,
  progressPercentage,
}: {
  isSubmitting: boolean
  isDisabled: boolean
  label: string
  sendingLabel: string
  hintLabel: string
  progressPercentage: number
}) {
  return (
    <div className="space-y-2">
      <Button
        type="submit"
        disabled={isSubmitting || isDisabled}
        className={cn(
          "w-full h-11 text-sm font-medium transition-all duration-200 relative overflow-hidden",
          "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20",
          !isSubmitting && !isDisabled && "shadow-[0_0_12px_rgba(6,182,212,0.15)]",
          isDisabled && !isSubmitting && "opacity-50 cursor-not-allowed hover:bg-cyan-500/10"
        )}
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
              {sendingLabel}
            </motion.div>
          ) : (
            <motion.div
              key="send"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              {label}
              <Send className="ml-2 h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <AnimatePresence>
        {isDisabled && !isSubmitting && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-center text-[#52525B]"
          >
            {hintLabel}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SuccessState({ name, t, onReset }: { name: string; t: TranslationKeys; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6"
      >
        <Check className="h-8 w-8 text-cyan-400" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg font-semibold text-[#FAFAFA] mb-2"
      >
        {t.contact.successTitle}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-[#A1A1AA] max-w-sm"
      >
        {t.contact.successMessage.replace('{name}', name)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 w-48 h-1 bg-[#27272A] rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-cyan-500 rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 4, ease: "linear" }}
          onAnimationComplete={onReset}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-[#52525B] mt-2"
      >
        {t.contact.resetting}
      </motion.p>
    </motion.div>
  )
}

export function ContactSection() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(new Set())
  const [shakeKey, setShakeKey] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({
    name: null,
    email: null,
    subject: null,
    message: null,
  })
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({})

  const setInputRef = useCallback((field: keyof FormData) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    inputRefs.current[field] = el
  }, [])

  const setFieldError = useCallback((field: keyof FormData, error: ValidationErrorCode | undefined) => {
    setErrors((prev) => {
      if (error) return { ...prev, [field]: error }
      const { [field]: _, ...rest } = prev
      return rest
    })
  }, [])

  const translateFieldError = useCallback((field: keyof FormData, code: ValidationErrorCode): string => {
    const map: Record<string, string> = {
      name_REQUIRED: t.contact.validationNameRequired,
      name_TOO_SHORT: t.contact.validationNameTooShort,
      name_TOO_LONG: t.contact.validationNameTooLong,
      email_REQUIRED: t.contact.validationEmailRequired,
      email_INVALID_EMAIL: t.contact.validationEmailInvalid,
      subject_REQUIRED: t.contact.validationSubjectRequired,
      subject_TOO_SHORT: t.contact.validationSubjectTooShort,
      subject_TOO_LONG: t.contact.validationSubjectTooLong,
      message_REQUIRED: t.contact.validationMessageRequired,
      message_TOO_SHORT: t.contact.validationMessageTooShort,
      message_TOO_LONG: t.contact.validationMessageTooLong,
    }
    return map[`${field}_${code}`] || code
  }, [t])

  const validateFieldFn = useCallback((field: keyof FormData, value: string): ValidationErrorCode | undefined => {
    return validateField(field, value)
  }, [])

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (touchedFields.has(field)) {
      if (debounceTimers.current[field]) {
        clearTimeout(debounceTimers.current[field]!)
      }
      debounceTimers.current[field] = setTimeout(() => {
        const error = validateFieldFn(field, value)
        setFieldError(field, error)
      }, 300)
    }
  }, [touchedFields, validateFieldFn, setFieldError])

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach((timer) => {
        if (timer) clearTimeout(timer)
      })
    }
  }, [])

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouchedFields((prev) => new Set([...prev, field]))
    const error = validateFieldFn(field, formData[field])
    setFieldError(field, error)
  }, [formData, validateFieldFn, setFieldError])

  const validateFormFn = useCallback((): boolean => {
    const newErrors = validateForm(formData)
    setErrors(newErrors)
    setTouchedFields(new Set(Object.keys(formData) as (keyof FormData)[]))
    return isFormValid(newErrors)
  }, [formData])

  const focusFirstError = useCallback(() => {
    const firstErrorField = getFirstErrorField(errors)
    if (firstErrorField && inputRefs.current[firstErrorField]) {
      inputRefs.current[firstErrorField]?.focus()
    }
  }, [errors])

  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", subject: "", message: "" })
    setErrors({})
    setTouchedFields(new Set())
    setFormStatus("idle")
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateFormFn()) {
      setShakeKey((k) => k + 1)
      toast({
        title: t.contact.toastValidationTitle,
        description: t.contact.toastValidationDescription,
        variant: "destructive",
      })
      setTimeout(() => focusFirstError(), 100)
      return
    }

    setFormStatus("submitting")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || t.contact.apiError)

      setFormStatus("success")
      toast({
        title: t.contact.toastSuccess,
        description: data.message || t.contact.toastSuccessDescription,
      })
    } catch (error) {
      setFormStatus("error")
      toast({
        title: t.contact.toastError,
        description: error instanceof Error ? error.message : t.contact.toastErrorDescription,
        variant: "destructive",
      })
      setFormStatus("idle")
    }
  }

  const getFieldError = (field: keyof FormData): string | undefined => {
    const code = errors[field]
    if (!code || !touchedFields.has(field)) return undefined
    return translateFieldError(field, code)
  }

  const isFieldValid = (field: keyof FormData): boolean =>
    !!touchedFields.has(field) && !errors[field] && formData[field].trim().length > 0

  const allFieldsFilled = Object.values(formData).every((v) => v.trim().length > 0)
  const noErrors = isFormValid(errors)
  const canSubmit = allFieldsFilled && noErrors

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
              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <SuccessState
                    key="success"
                    name={formData.name}
                    t={t}
                    onReset={resetForm}
                  />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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

                    <motion.form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      key={shakeKey}
                      animate={
                        shakeKey > 0
                          ? {
                              x: [0, -6, 6, -4, 4, -2, 2, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <FormField
                        label={t.about.name}
                        icon={<User className="h-3 w-3" />}
                        error={getFieldError("name")}
                        success={isFieldValid("name")}
                      >
                        <Input
                          ref={setInputRef("name")}
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          placeholder={t.contact.placeholderName}
                          disabled={formStatus === "submitting"}
                          className={cn(
                            "bg-[#1f1f23] border-[#27272A] focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 text-sm",
                            errors.name && touchedFields.has("name") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            isFieldValid("name") && "border-cyan-500/50"
                          )}
                        />
                      </FormField>

                      <FormField
                        label={t.contact.email}
                        icon={<Mail className="h-3 w-3" />}
                        error={getFieldError("email")}
                        success={isFieldValid("email")}
                      >
                        <Input
                          ref={setInputRef("email")}
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder={t.contact.placeholderEmail}
                          disabled={formStatus === "submitting"}
                          className={cn(
                            "bg-[#1f1f23] border-[#27272A] focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 text-sm",
                            errors.email && touchedFields.has("email") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            isFieldValid("email") && "border-cyan-500/50"
                          )}
                        />
                      </FormField>

                      <FormField
                        label={t.contact.subject}
                        icon={<FileText className="h-3 w-3" />}
                        error={getFieldError("subject")}
                        success={isFieldValid("subject")}
                      >
                        <Input
                          ref={setInputRef("subject")}
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          onBlur={() => handleBlur("subject")}
                          placeholder={t.contact.placeholderSubject}
                          disabled={formStatus === "submitting"}
                          className={cn(
                            "bg-[#1f1f23] border-[#27272A] focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 text-sm",
                            errors.subject && touchedFields.has("subject") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            isFieldValid("subject") && "border-cyan-500/50"
                          )}
                        />
                      </FormField>

                      <FormField
                        label={t.contact.message}
                        icon={<MessageSquare className="h-3 w-3" />}
                        error={getFieldError("message")}
                        success={isFieldValid("message")}
                      >
                        <div className="relative">
                          <Textarea
                            ref={setInputRef("message")}
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            onBlur={() => handleBlur("message")}
                            placeholder={t.contact.placeholderMessage}
                            rows={4}
                            disabled={formStatus === "submitting"}
                            className={cn(
                              "bg-[#1f1f23] border-[#27272A] focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 resize-none text-sm pb-6",
                              errors.message && touchedFields.has("message") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                              isFieldValid("message") && "border-cyan-500/50"
                            )}
                          />
                          <div className="absolute bottom-1.5 right-2 flex items-center gap-2">
                            <AnimatePresence>
                              {errors.message && touchedFields.has("message") && (
                                <motion.span
                                  initial={{ opacity: 0, x: -4 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -4 }}
                                  className="text-xs text-red-400"
                                >
                                  {getFieldError("message")}
                                </motion.span>
                              )}
                            </AnimatePresence>
                            <CharacterCount current={formData.message.length} max={1000} />
                          </div>
                        </div>
                      </FormField>

                      <SubmitButton
                        isSubmitting={formStatus === "submitting"}
                        isDisabled={!canSubmit}
                        label={t.contact.submit}
                        sendingLabel={t.contact.sending}
                        hintLabel={t.contact.completeFields}
                        progressPercentage={progressPercentage}
                      />
                    </motion.form>

                    <p className="text-xs text-[#52525B] text-center mt-4">
                      {t.contact.responseTime}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
