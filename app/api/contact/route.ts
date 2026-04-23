import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validación básica
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    const ownerEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color: #0891b2;">Nuevo mensaje de contacto</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Asunto:</strong> ${body.subject}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #0891b2;">
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${body.message}</p>
          </div>
        </div>
    `

    const visitorEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color: #0891b2;">¡Gracias por contactarme!</h2>
          <p>Hola ${body.name},</p>
          <p>He recibido tu mensaje y te responderé lo antes posible. Esto generalmente ocurre dentro de 24 horas.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Resumen de tu mensaje:</strong></p>
            <p><strong>Asunto:</strong> ${body.subject}</p>
            <div style="margin-top: 15px;">
              <p><strong>Tu mensaje:</strong></p>
              <p style="white-space: pre-wrap;">${body.message}</p>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p>Saludos,<br><strong>Edgar Delgado Scott</strong></p>
          <p style="color: #6b7280; font-size: 14px;">Desarrollador FullStack</p>
        </div>
    `

    // Email para el propietario del portafolio
    await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: 'edgar_delgado_scott@hotmail.com',
      subject: `Nuevo mensaje de contacto: ${body.subject}`,
      reply_to: body.email,
      html: ownerEmailHtml,
    })

    // Email de confirmación para el visitante (opcional)
    await resend.emails.send({
      from: 'Edgar Delgado Scott <onboarding@resend.dev>',
      to: body.email,
      subject: 'Recibimos tu mensaje - Gracias por contactarme',
      html: visitorEmailHtml,
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
