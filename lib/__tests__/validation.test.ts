import { describe, it, expect } from 'vitest'
import { validateField, validateForm, isFormValid } from '../validation'

describe('validateField', () => {
  describe('name', () => {
    it('returns REQUIRED when name is empty', () => {
      expect(validateField('name', '')).toBe('REQUIRED')
      expect(validateField('name', '   ')).toBe('REQUIRED')
    })

    it('returns TOO_SHORT when name is too short', () => {
      expect(validateField('name', 'A')).toBe('TOO_SHORT')
    })

    it('returns TOO_LONG when name exceeds 50 characters', () => {
      expect(validateField('name', 'A'.repeat(51))).toBe('TOO_LONG')
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
    it('returns REQUIRED when email is empty', () => {
      expect(validateField('email', '')).toBe('REQUIRED')
      expect(validateField('email', '   ')).toBe('REQUIRED')
    })

    it('returns INVALID_EMAIL for invalid email formats', () => {
      expect(validateField('email', 'notanemail')).toBe('INVALID_EMAIL')
      expect(validateField('email', 'missing@domain')).toBe('INVALID_EMAIL')
      expect(validateField('email', '@domain.com')).toBe('INVALID_EMAIL')
      expect(validateField('email', 'user@.com')).toBe('INVALID_EMAIL')
    })

    it('returns undefined for valid email', () => {
      expect(validateField('email', 'test@example.com')).toBeUndefined()
      expect(validateField('email', 'user.name@domain.co')).toBeUndefined()
      expect(validateField('email', 'user+tag@domain.org')).toBeUndefined()
    })
  })

  describe('subject', () => {
    it('returns REQUIRED when subject is empty', () => {
      expect(validateField('subject', '')).toBe('REQUIRED')
      expect(validateField('subject', '   ')).toBe('REQUIRED')
    })

    it('returns TOO_SHORT when subject is too short', () => {
      expect(validateField('subject', 'Hi')).toBe('TOO_SHORT')
    })

    it('returns TOO_LONG when subject exceeds 100 characters', () => {
      expect(validateField('subject', 'A'.repeat(101))).toBe('TOO_LONG')
    })

    it('returns undefined for valid subject', () => {
      expect(validateField('subject', 'Collaboration Opportunity')).toBeUndefined()
    })
  })

  describe('message', () => {
    it('returns REQUIRED when message is empty', () => {
      expect(validateField('message', '')).toBe('REQUIRED')
      expect(validateField('message', '   ')).toBe('REQUIRED')
    })

    it('returns TOO_SHORT when message is too short', () => {
      expect(validateField('message', 'Hi there')).toBe('TOO_SHORT')
    })

    it('returns TOO_LONG when message exceeds 1000 characters', () => {
      expect(validateField('message', 'A'.repeat(1001))).toBe('TOO_LONG')
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
    expect(result.email).toBe('INVALID_EMAIL')
    expect(result.subject).toBe('TOO_SHORT')
    expect(result.message).toBeUndefined()
  })
})

describe('isFormValid', () => {
  it('returns true when errors object is empty', () => {
    expect(isFormValid({})).toBe(true)
  })

  it('returns false when errors object has entries', () => {
    expect(isFormValid({ name: 'REQUIRED' })).toBe(false)
    expect(isFormValid({ name: 'REQUIRED', email: 'REQUIRED' })).toBe(false)
  })
})
