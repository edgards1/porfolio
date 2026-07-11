import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
import { Resend } from 'resend'
import { ownerNotificationHtml, visitorConfirmationHtml } from '../lib/emails'

const resendApiKey = process.env.RESEND_API_KEY

if (!resendApiKey) {
  console.error('RESEND_API_KEY no está definida en .env.local')
  process.exit(1)
}

const resend = new Resend(resendApiKey)

const testData = {
  name: 'Test Usuario',
  email: 'edgar_delgado_scott@hotmail.com',
  subject: 'Prueba del formulario de contacto',
  message:
    'Este es un mensaje de prueba para verificar que los correos electrónicos se están enviando correctamente desde el portafolio.\n\nSi estás viendo esto, la configuración de Resend funciona correctamente.',
}

async function main() {
  console.log('')
  console.log('═══ TEST DE EMAIL ═══')
  console.log('')
  console.log(`Enviando email de notificación al propietario...`)
  console.log(`  → Para: ${testData.email}`)
  console.log(`  → Asunto: Nuevo mensaje de contacto: ${testData.subject}`)

  const { data: ownerData, error: ownerError } = await resend.emails.send({
    from: 'Portafolio <onboarding@resend.dev>',
    to: testData.email,
    subject: `Nuevo mensaje de contacto: ${testData.subject}`,
    replyTo: testData.email,
    html: ownerNotificationHtml({
      name: testData.name,
      email: testData.email,
      subject: testData.subject,
      message: testData.message,
    }),
  })

  if (ownerError) {
    console.error(`  ✗ Error: ${ownerError.message}`)
    process.exit(1)
  }

  console.log(`  ✓ Enviado (id: ${ownerData?.id})`)
  console.log('')

  console.log(`Enviando email de confirmación al visitante...`)
  console.log(`  → Para: ${testData.email}`)
  console.log(`  → Asunto: Recibimos tu mensaje - Gracias por contactarme`)

  const { data: visitorData, error: visitorError } = await resend.emails.send({
    from: 'Edgar Delgado Scott <onboarding@resend.dev>',
    to: testData.email,
    subject: 'Recibimos tu mensaje - Gracias por contactarme',
    html: visitorConfirmationHtml({
      name: testData.name,
      subject: testData.subject,
      message: testData.message,
    }),
  })

  if (visitorError) {
    console.error(`  ✗ Error: ${visitorError.message}`)
    process.exit(1)
  }

  console.log(`  ✓ Enviado (id: ${visitorData?.id})`)
  console.log('')
  console.log('═══ TEST COMPLETADO ═══')
  console.log('Ambos correos se enviaron correctamente.')
  console.log('')
}

main().catch((err) => {
  console.error('Error inesperado:', err)
  process.exit(1)
})
