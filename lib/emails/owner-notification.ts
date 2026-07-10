interface OwnerNotificationProps {
  name: string
  email: string
  subject: string
  message: string
}

export function ownerNotificationHtml({ name, email, subject, message }: OwnerNotificationProps): string {
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
                  <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Nuevo mensaje de contacto</h1>
                  <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Alguien ha enviado un mensaje desde tu portafolio</p>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:12px 16px;background-color:#f8fafc;border-radius:8px;border-left:4px solid #0891b2;">
                        <p style="margin:0 0 4px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Nombre</p>
                        <p style="margin:0;font-size:16px;color:#111827;font-weight:600;">${name}</p>
                      </td>
                    </tr>
                    <tr><td style="height:12px;"></td></tr>
                    <tr>
                      <td style="padding:12px 16px;background-color:#f8fafc;border-radius:8px;border-left:4px solid #0891b2;">
                        <p style="margin:0 0 4px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                        <p style="margin:0;font-size:16px;color:#111827;font-weight:600;">${email}</p>
                      </td>
                    </tr>
                    <tr><td style="height:12px;"></td></tr>
                    <tr>
                      <td style="padding:12px 16px;background-color:#f8fafc;border-radius:8px;border-left:4px solid #0891b2;">
                        <p style="margin:0 0 4px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Asunto</p>
                        <p style="margin:0;font-size:16px;color:#111827;font-weight:600;">${subject}</p>
                      </td>
                    </tr>
                    <tr><td style="height:16px;"></td></tr>
                    <tr>
                      <td style="padding:20px;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;">
                        <p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Mensaje</p>
                        <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;white-space:pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 40px;background-color:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
                  <p style="margin:0;font-size:13px;color:#6b7280;">Este mensaje fue enviado desde el formulario de contacto de tu portafolio.</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Puedes responder directamente a <a href="mailto:${email}" style="color:#0891b2;text-decoration:none;">${email}</a></p>
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
