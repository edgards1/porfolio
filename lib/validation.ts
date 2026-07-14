export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface FormErrors {
  name?: ValidationErrorCode
  email?: ValidationErrorCode
  subject?: ValidationErrorCode
  message?: ValidationErrorCode
}

export type ValidationErrorCode =
  | 'REQUIRED'
  | 'TOO_SHORT'
  | 'TOO_LONG'
  | 'INVALID_EMAIL'

export function validateField(field: keyof ContactFormData, value: string): ValidationErrorCode | undefined {
  switch (field) {
    case "name":
      if (!value.trim()) return 'REQUIRED'
      if (value.trim().length < 2) return 'TOO_SHORT'
      if (value.trim().length > 50) return 'TOO_LONG'
      return undefined
    case "email":
      if (!value.trim()) return 'REQUIRED'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'INVALID_EMAIL'
      return undefined
    case "subject":
      if (!value.trim()) return 'REQUIRED'
      if (value.trim().length < 5) return 'TOO_SHORT'
      if (value.trim().length > 100) return 'TOO_LONG'
      return undefined
    case "message":
      if (!value.trim()) return 'REQUIRED'
      if (value.trim().length < 10) return 'TOO_SHORT'
      if (value.trim().length > 1000) return 'TOO_LONG'
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

const fieldOrder: (keyof ContactFormData)[] = ['name', 'email', 'subject', 'message']

export function getFirstErrorField(errors: FormErrors): keyof ContactFormData | null {
  for (const field of fieldOrder) {
    if (errors[field]) return field
  }
  return null
}
