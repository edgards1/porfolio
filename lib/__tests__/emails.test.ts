import { describe, it, expect } from 'vitest'
import { ownerNotificationHtml, visitorConfirmationHtml } from '../emails'

describe('ownerNotificationHtml', () => {
  const props = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'I would like to hire you for a project.',
  }

  it('includes the sender name in the output', () => {
    const html = ownerNotificationHtml(props)
    expect(html).toContain('John Doe')
  })

  it('includes the sender email in the output', () => {
    const html = ownerNotificationHtml(props)
    expect(html).toContain('john@example.com')
  })

  it('includes the subject in the output', () => {
    const html = ownerNotificationHtml(props)
    expect(html).toContain('Project Inquiry')
  })

  it('includes the message in the output', () => {
    const html = ownerNotificationHtml(props)
    expect(html).toContain('I would like to hire you for a project.')
  })

  it('includes a mailto link with the sender email', () => {
    const html = ownerNotificationHtml(props)
    expect(html).toContain('href="mailto:john@example.com"')
  })

  it('has a valid HTML doctype', () => {
    const html = ownerNotificationHtml(props)
    expect(html).toContain('<!DOCTYPE html>')
  })
})

describe('visitorConfirmationHtml', () => {
  const props = {
    name: 'John Doe',
    subject: 'Project Inquiry',
    message: 'I would like to hire you for a project.',
  }

  it('greets the visitor by name', () => {
    const html = visitorConfirmationHtml(props)
    expect(html).toContain('John Doe')
  })

  it('includes the subject in the summary', () => {
    const html = visitorConfirmationHtml(props)
    expect(html).toContain('Project Inquiry')
  })

  it('includes the original message', () => {
    const html = visitorConfirmationHtml(props)
    expect(html).toContain('I would like to hire you for a project.')
  })

  it('thanks the visitor', () => {
    const html = visitorConfirmationHtml(props)
    expect(html).toContain('Gracias')
  })

  it('includes the owner name', () => {
    const html = visitorConfirmationHtml(props)
    expect(html).toContain('Edgar Delgado Scott')
  })

  it('has a valid HTML doctype', () => {
    const html = visitorConfirmationHtml(props)
    expect(html).toContain('<!DOCTYPE html>')
  })
})
