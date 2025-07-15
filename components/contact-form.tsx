"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

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

interface FormFieldProps {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  error?: string
  success?: boolean
}

const FormField = ({ label, icon, children, error, success }: FormFieldProps) => (
  <motion.div
    className="space-y-2"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
      {icon}
      {label}
      {success && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <CheckCircle className="h-4 w-4 text-green-500" />
        </motion.div>
      )}
    </div>
    <div className="relative">
      {children}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 mt-2 text-sm text-red-400"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
)

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(new Set())
  const formRef = useRef<HTMLFormElement>(null)

  // Validación en tiempo real
  const validateField = useCallback((field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "El nombre es requerido"
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres"
        if (value.trim().length > 50) return "El nombre no puede exceder 50 caracteres"
        return undefined

      case "email":
        if (!value.trim()) return "El email es requerido"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Ingresa un email válido"
        return undefined

      case "subject":
        if (!value.trim()) return "El asunto es requerido"
        if (value.trim().length < 5) return "El asunto debe tener al menos 5 caracteres"
        if (value.trim().length > 100) return "El asunto no puede exceder 100 caracteres"
        return undefined

      case "message":
        if (!value.trim()) return "El mensaje es requerido"
        if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres"
        if (value.trim().length > 1000) return "El mensaje no puede exceder 1000 caracteres"
        return undefined

      default:
        return undefined
    }
  }, [])

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Validar solo si el campo ya fue tocado
    if (touchedFields.has(field)) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }, [touchedFields, validateField])

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouchedFields(prev => new Set([...prev, field]))
    const error = validateField(field, formData[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [formData, validateField])

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(formData).forEach(key => {
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
        title: "Errores en el formulario",
        description: "Por favor corrige los errores antes de enviar.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simular envío con delay variable para realismo
      const delay = Math.random() * 1000 + 1500
      await new Promise((resolve) => setTimeout(resolve, delay))

      // Simular posible error (10% de probabilidad)
      if (Math.random() < 0.1) {
        throw new Error("Error simulado de red")
      }

      setIsSuccess(true)
      
      toast({
        title: "¡Mensaje enviado exitosamente!",
        description: "Gracias por contactarme. Te responderé pronto.",
      })

      // Reset form después de éxito
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTouchedFields(new Set())
        setErrors({})
        setIsSuccess(false)
      }, 3000)

    } catch (error) {
      toast({
        title: "Error al enviar mensaje",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFieldValid = (field: keyof FormData) => {
    return touchedFields.has(field) && !errors[field] && formData[field].trim()
  }

  const progressPercentage = Object.keys(formData).reduce((acc, key) => {
    const field = key as keyof FormData
    return acc + (formData[field].trim() && !errors[field] ? 25 : 0)
  }, 0)

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-700/50 p-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="h-8 w-8 text-green-500" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-2"
          >
            ¡Mensaje Enviado!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-green-200"
          >
            Gracias por contactarme. Te responderé lo antes posible.
          </motion.p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 hover:border-purple-500/50">
        {/* Gradient Background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">¡Colaboremos juntos!</h3>
            <p className="text-zinc-400">Cuéntame sobre tu proyecto y trabajemos en algo increíble</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-zinc-400">Progreso del formulario</span>
              <span className="text-sm text-zinc-400">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-zinc-700/50 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-deep-500 to-teal-professional-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Nombre completo"
              icon={<User className="h-4 w-4" />}
              error={touchedFields.has("name") ? errors.name : undefined}
              success={isFieldValid("name")}
            >
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="Tu nombre completo"
                className={cn(
                  "bg-zinc-900/50 border-zinc-700 focus:border-blue-deep-500 focus:ring-blue-deep-500/20 transition-all duration-200",
                  errors.name && touchedFields.has("name") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  isFieldValid("name") && "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                )}
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              label="Correo electrónico"
              icon={<Mail className="h-4 w-4" />}
              error={touchedFields.has("email") ? errors.email : undefined}
              success={isFieldValid("email")}
            >
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="tu@email.com"
                className={cn(
                  "bg-zinc-900/50 border-zinc-700 focus:border-blue-deep-500 focus:ring-blue-deep-500/20 transition-all duration-200",
                  errors.email && touchedFields.has("email") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  isFieldValid("email") && "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                )}
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              label="Asunto"
              icon={<FileText className="h-4 w-4" />}
              error={touchedFields.has("subject") ? errors.subject : undefined}
              success={isFieldValid("subject")}
            >
              <Input
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                onBlur={() => handleBlur("subject")}
                placeholder="¿De qué quieres hablar?"
                className={cn(
                  "bg-zinc-900/50 border-zinc-700 focus:border-blue-deep-500 focus:ring-blue-deep-500/20 transition-all duration-200",
                  errors.subject && touchedFields.has("subject") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  isFieldValid("subject") && "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                )}
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              label="Mensaje"
              icon={<MessageSquare className="h-4 w-4" />}
              error={touchedFields.has("message") ? errors.message : undefined}
              success={isFieldValid("message")}
            >
              <div className="relative">
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  placeholder="Cuéntame más detalles sobre tu proyecto o idea..."
                  rows={5}
                  className={cn(
                    "bg-zinc-900/50 border-zinc-700 focus:border-blue-deep-500 focus:ring-blue-deep-500/20 transition-all duration-200 resize-none",
                    errors.message && touchedFields.has("message") && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                    isFieldValid("message") && "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                  )}
                  disabled={isSubmitting}
                />
                <div className="absolute bottom-3 right-3 text-xs text-zinc-500">
                  {formData.message.length}/1000
                </div>
              </div>
            </FormField>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 hover:from-teal-professional-600 hover:to-blue-deep-600 border-0 h-12 text-base font-medium relative overflow-hidden"
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
                      <div className="w-5 h-5 mr-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando mensaje...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      Enviar mensaje
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Send className="ml-2 h-4 w-4" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>

          {/* Footer info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-zinc-500">
              Respondo todos los mensajes dentro de 24 horas 🚀
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}