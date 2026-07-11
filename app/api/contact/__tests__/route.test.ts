import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '../route'

const mockSend = vi.hoisted(() => vi.fn().mockResolvedValue({ data: { id: 'mock-email-id' }, error: null }))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mockSend }
  },
}))

function mockRequest(body: Record<string, unknown>): NextRequest {
  return {
    json: () => Promise.resolve(body),
  } as unknown as NextRequest
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 200 and success message for valid submission', async () => {
    const response = await POST(mockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'I would like to discuss a potential collaboration.',
    }))

    const body = await response.json()
    expect(response.status).toBe(200)
    expect(body.success).toBe(true)
    expect(body.message).toBe('Mensaje enviado exitosamente.')
  })

  it('returns 400 when fields are missing', async () => {
    const response = await POST(mockRequest({
      name: '',
      email: '',
      subject: '',
      message: '',
    }))

    const body = await response.json()
    expect(response.status).toBe(400)
    expect(body.error).toBe('Todos los campos son requeridos')
  })

  it('returns 400 when only some fields are missing', async () => {
    const response = await POST(mockRequest({
      name: 'John Doe',
      email: '',
      subject: 'Project Inquiry',
      message: '',
    }))

    const body = await response.json()
    expect(response.status).toBe(400)
    expect(body.errors.email).toBeDefined()
    expect(body.errors.message).toBeDefined()
    expect(body.errors.name).toBeUndefined()
  })

  it('returns 500 when Resend throws an error', async () => {
    mockSend.mockRejectedValueOnce(new Error('Resend API error'))

    const response = await POST(mockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'I would like to discuss a potential collaboration.',
    }))

    const body = await response.json()
    expect(response.status).toBe(500)
    expect(body.error).toBe('Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.')
  })

  it('sends two emails on successful submission', async () => {
    await POST(mockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'I would like to discuss a potential collaboration.',
    }))

    expect(mockSend).toHaveBeenCalledTimes(2)
  })

  it('sends owner notification with correct recipient', async () => {
    await POST(mockRequest({
      name: 'Jane Smith',
      email: 'jane@test.com',
      subject: 'Job Opportunity',
      message: 'We have a position that matches your profile.',
    }))

    const ownerCall = mockSend.mock.calls[0][0]
    expect(ownerCall.to).toBe('edgar_delgado_scott@hotmail.com')
    expect(ownerCall.subject).toContain('Job Opportunity')
    expect(ownerCall.replyTo).toBe('jane@test.com')
    expect(ownerCall.html).toContain('Jane Smith')
    expect(ownerCall.html).toContain('jane@test.com')
  })

  it('sends visitor confirmation with correct recipient', async () => {
    await POST(mockRequest({
      name: 'Jane Smith',
      email: 'jane@test.com',
      subject: 'Job Opportunity',
      message: 'We have a position that matches your profile.',
    }))

    const visitorCall = mockSend.mock.calls[1][0]
    expect(visitorCall.to).toBe('jane@test.com')
    expect(visitorCall.subject).toContain('Gracias')
    expect(visitorCall.html).toContain('Jane Smith')
  })

  it('handles invalid JSON body gracefully', async () => {
    const request = {
      json: () => Promise.reject(new Error('Invalid JSON')),
    } as unknown as NextRequest

    const response = await POST(request)
    const body = await response.json()
    expect(response.status).toBe(500)
    expect(body.error).toBeDefined()
  })
})
