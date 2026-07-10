export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function validateField(field: keyof ContactFormData, value: string): string | undefined {
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
}

export function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {}
  const fields = Object.keys(data) as (keyof ContactFormData)[]

  for (const field of fields) {
    const error = validateField(field, data[field])
    if (error) {
      errors[field] = error
    }
  }

  return errors
}

export function isFormValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0
}
