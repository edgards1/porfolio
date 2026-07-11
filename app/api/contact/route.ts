import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateForm, isFormValid } from '@/lib/validation'
import { ownerNotificationHtml, visitorConfirmationHtml } from '@/lib/emails'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const errors = validateForm(body)
    if (!isFormValid(errors)) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos', errors },
        { status: 400 }
      )
    }

    // Email para el propietario del portafolio
    await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: 'edgar_delgado_scott@hotmail.com',
      subject: `Nuevo mensaje de contacto: ${body.subject}`,
      replyTo: body.email,
      html: ownerNotificationHtml({ name: body.name, email: body.email, subject: body.subject, message: body.message }),
    })

    // Email de confirmación para el visitante (opcional)
    await resend.emails.send({
      from: 'Edgar Delgado Scott <onboarding@resend.dev>',
      to: body.email,
      subject: 'Recibimos tu mensaje - Gracias por contactarme',
      html: visitorConfirmationHtml({ name: body.name, subject: body.subject, message: body.message }),
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado exitosamente.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al enviar email:', error)
    return NextResponse.json(
      { 
        error: 'Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.' 
      },
      { status: 500 }
    )
  }
}
