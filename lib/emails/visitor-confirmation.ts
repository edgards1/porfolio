interface VisitorConfirmationProps {
  name: string
  subject: string
  message: string
}

export function visitorConfirmationHtml({ name, subject, message }: VisitorConfirmationProps): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <tr>
                <td style="background:linear-gradient(135deg,#0891b2,#06b6d4);padding:32px 40px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">¡Gracias por contactarme!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;">
                  <p style="font-size:16px;color:#374151;line-height:1.6;">Hola <strong style="color:#0891b2;">${name}</strong>,</p>
                  <p style="font-size:15px;color:#4b5563;line-height:1.6;margin-top:12px;">
                    He recibido tu mensaje y te responderé lo antes posible.
                    Generalmente respondo dentro de las <strong>24 horas hábiles</strong>.
                  </p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background-color:#f0fdfa;border:1px solid #ccfbf1;border-radius:8px;">
                    <tr>
                      <td style="padding:20px;">
                        <p style="margin:0 0 12px;font-size:13px;color:#0d9488;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Resumen de tu mensaje</p>
                        <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Asunto:</strong> ${subject}</p>
                        <hr style="border:none;border-top:1px solid #ccfbf1;margin:12px 0;">
                        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Tu mensaje:</p>
                        <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size:15px;color:#4b5563;line-height:1.6;">Mientras tanto, puedes explorar mis proyectos o conectarte conmigo en redes.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 40px;background-color:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
                  <p style="margin:0;font-size:16px;color:#111827;">Saludos,</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#0891b2;font-weight:700;">Edgar Delgado Scott</p>
                  <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">Desarrollador FullStack</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
