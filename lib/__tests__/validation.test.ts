import { describe, it, expect } from 'vitest'
import { validateField, validateForm, isFormValid } from '../validation'

describe('validateField', () => {
  describe('name', () => {
    it('returns error when name is empty', () => {
      expect(validateField('name', '')).toBe('Name is required')
      expect(validateField('name', '   ')).toBe('Name is required')
    })

    it('returns error when name is too short', () => {
      expect(validateField('name', 'A')).toBe('Name must be at least 2 characters')
    })

    it('returns error when name exceeds 50 characters', () => {
      expect(validateField('name', 'A'.repeat(51))).toBe('Name cannot exceed 50 characters')
    })

    it('returns undefined for valid name', () => {
      expect(validateField('name', 'Edgar Delgado')).toBeUndefined()
    })

    it('returns undefined for name at minimum length', () => {
      expect(validateField('name', 'Ed')).toBeUndefined()
    })

    it('returns undefined for name at maximum length', () => {
      expect(validateField('name', 'A'.repeat(50))).toBeUndefined()
    })
  })

  describe('email', () => {
    it('returns error when email is empty', () => {
      expect(validateField('email', '')).toBe('Email is required')
      expect(validateField('email', '   ')).toBe('Email is required')
    })

    it('returns error for invalid email formats', () => {
      expect(validateField('email', 'notanemail')).toBe('Enter a valid email')
      expect(validateField('email', 'missing@domain')).toBe('Enter a valid email')
      expect(validateField('email', '@domain.com')).toBe('Enter a valid email')
      expect(validateField('email', 'user@.com')).toBe('Enter a valid email')
    })

    it('returns undefined for valid email', () => {
      expect(validateField('email', 'test@example.com')).toBeUndefined()
      expect(validateField('email', 'user.name@domain.co')).toBeUndefined()
      expect(validateField('email', 'user+tag@domain.org')).toBeUndefined()
    })
  })

  describe('subject', () => {
    it('returns error when subject is empty', () => {
      expect(validateField('subject', '')).toBe('Subject is required')
      expect(validateField('subject', '   ')).toBe('Subject is required')
    })

    it('returns error when subject is too short', () => {
      expect(validateField('subject', 'Hi')).toBe('Subject must be at least 5 characters')
    })

    it('returns error when subject exceeds 100 characters', () => {
      expect(validateField('subject', 'A'.repeat(101))).toBe('Subject cannot exceed 100 characters')
    })

    it('returns undefined for valid subject', () => {
      expect(validateField('subject', 'Collaboration Opportunity')).toBeUndefined()
    })
  })

  describe('message', () => {
    it('returns error when message is empty', () => {
      expect(validateField('message', '')).toBe('Message is required')
      expect(validateField('message', '   ')).toBe('Message is required')
    })

    it('returns error when message is too short', () => {
      expect(validateField('message', 'Hi there')).toBe('Message must be at least 10 characters')
    })

    it('returns error when message exceeds 1000 characters', () => {
      expect(validateField('message', 'A'.repeat(1001))).toBe('Message cannot exceed 1000 characters')
    })

    it('returns undefined for valid message', () => {
      const validMessage = 'Hello Edgar, I came across your portfolio and I am impressed by your work. I would like to discuss a potential project.'
      expect(validateField('message', validMessage)).toBeUndefined()
    })
  })

  describe('unknown field', () => {
    it('returns undefined for unknown fields', () => {
      expect(validateField('unknown' as any, 'value')).toBeUndefined()
    })
  })
})

describe('validateForm', () => {
  it('returns empty errors for valid form data', () => {
    const result = validateForm({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'I would like to hire you for a project. Please let me know your availability.',
    })
    expect(result).toEqual({})
  })

  it('returns errors for all empty fields', () => {
    const result = validateForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    expect(result.name).toBeDefined()
    expect(result.email).toBeDefined()
    expect(result.subject).toBeDefined()
    expect(result.message).toBeDefined()
  })

  it('returns errors for partially invalid data', () => {
    const result = validateForm({
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Hi',
      message: 'Hello Edgar, I would like to discuss a potential collaboration opportunity.',
    })
    expect(result.name).toBeUndefined()
    expect(result.email).toBe('Enter a valid email')
    expect(result.subject).toBe('Subject must be at least 5 characters')
    expect(result.message).toBeUndefined()
  })
})

describe('isFormValid', () => {
  it('returns true when errors object is empty', () => {
    expect(isFormValid({})).toBe(true)
  })

  it('returns false when errors object has entries', () => {
    expect(isFormValid({ name: 'Name is required' })).toBe(false)
    expect(isFormValid({ name: 'Name is required', email: 'Email is required' })).toBe(false)
  })
})
