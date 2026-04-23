# Configuración del Sistema de Contacto con Resend

## ⚡ Instalación Rápida (Recomendado)

```bash
npm install resend
```

## 🚀 Configuración Simple con Resend

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita
2. La cuenta gratuita incluye **100 emails/día** - perfecto para portafolios

### 2. Obtener tu API Key

1. En el dashboard de Resend, ve a [API Keys](https://resend.com/api-keys)
2. Haz clic en **Create API Key**
3. Dale un nombre (ej: "Portafolio Contact Form")
4. Copia la API key que se genera

### 3. Configurar Variable de Entorno

En el archivo `.env.local` (en la raíz del proyecto):

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

### 4. Reiniciar el Servidor

```bash
npm run dev
```

¡Listo! El formulario ya debería funcionar.

---

## 📧 Características

Cuando alguien envía el formulario:

1. **Tú recibes un email** con:
   - Nombre del visitante
   - Su email (puedes responder directamente)
   - Asunto del mensaje
   - Contenido completo

2. **El visitante recibe confirmación** automática con:
   - Resumen de su mensaje
   - Mensaje de agradecimiento
   - Tu firma

---

## 🔧 Personalización Avanzada (Opcional)

### Cambiar el remitente

Por defecto usa `onboarding@resend.dev`. Para usar tu propio dominio:

1. Verifica tu dominio en Resend
2. Actualiza el código en `route.ts`:

```typescript
from: 'Edgar <contacto@tudominio.com>',
```

### Desactivar email de confirmación

Si solo quieres recibir tú los mensajes, elimina el segundo `resend.emails.send()` en el archivo `route.ts`.

---

## ❌ Troubleshooting

**Error: "Invalid API key"**
- Verifica que copiaste correctamente la API key
- Debe empezar con `re_`
- Reinicia el servidor después de cambiar `.env.local`

**No llegan los emails**
- Revisa la carpeta de spam
- Verifica en el dashboard de Resend en la sección "Logs"
- Asegúrate de que la API key no esté expirada

**Error 402: Payment Required**
- Has excedido el límite gratuito de 100 emails/día
- Considera upgradearte o espera 24 horas

---

## 📊 Límites del Plan Gratuito

- ✅ 100 emails por día
- ✅ 1 dominio verificado
- ✅ API access completo
- ✅ Email tracking básico

Perfecto para portafolios personales.

---

## 🔄 Alternativa: Configuración con Gmail (Más Complicado)

Para usar el sistema de envío de emails con Gmail, sigue estos pasos:

### 1. Habilitar Autenticación de Dos Factores en tu cuenta de Gmail

1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. Selecciona **Seguridad** en el menú izquierdo
3. Habilita la **Autenticación de dos factores**

### 2. Crear una Contraseña de Aplicación

1. Ve a la [Página de Contraseñas de Aplicación](https://myaccount.google.com/apppasswords)
2. Selecciona:
   - **Aplicación**: Mail (Correo)
   - **Dispositivo**: Windows PC (o tu dispositivo)
3. Google generará una contraseña de 16 caracteres
4. Copia esta contraseña

### 3. Configurar Variables de Entorno

En el archivo `.env.local` (en la raíz del proyecto), añade:

```env
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**Importante**: Usa la contraseña de aplicación que generó Google (sin espacios al guardarla, aunque Gmail los muestre).

## Estructura de la API

- **Ruta**: `POST /api/contact`
- **Ubicación**: `app/api/contact/route.ts`

### Request Body

```json
{
  "name": "Nombre Completo",
  "email": "visitante@email.com",
  "subject": "Asunto del mensaje",
  "message": "Contenido del mensaje"
}
```

### Response Success (200)

```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente. Te responderé pronto."
}
```

### Response Error (400/500)

```json
{
  "error": "Descripción del error"
}
```

## Flujo de Emails

Cuando se envía un formulario exitosamente:

1. **Email al propietario**: Recibe un email con todos los detalles del mensaje en `edgar_delgado_scott@hotmail.com`
2. **Email al visitante**: Recibe un email de confirmación automática en su email

## Testing

Para probar localmente:

1. Asegúrate de que las variables de entorno estén configuradas
2. Reinicia el servidor de desarrollo
3. Completa el formulario de contacto
4. Deberías recibir un toast de éxito

## Notas de Seguridad

- Nunca hagas commit del archivo `.env.local` (ya debe estar en `.gitignore`)
- Usa contraseñas de aplicación, no la contraseña de tu cuenta
- Si usas otro proveedor de email (SendGrid, Resend, etc.), actualiza la configuración del transporter

## Alternativas a Gmail

Si prefieres usar otro servicio:

### Usando Resend (Recomendado para producción)

```bash
npm install resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'Subject',
  html: html,
})
```

### Usando SendGrid

```bash
npm install @sendgrid/mail
```

## Troubleshooting

**Error: "Invalid login credentials"**
- Verifica que estés usando la contraseña de aplicación, no la contraseña de tu cuenta
- Verifica que las variables de entorno estén correctamente configuradas

**Error: "Less secure app access"**
- Gmail requiere autenticación de dos factores y contraseña de aplicación
- No puedes usar la contraseña regular de tu cuenta

**Los emails no se envían**
- Revisa la consola del servidor para mensajes de error
- Verifica que `.env.local` esté configurado correctamente
- Asegúrate de que nodemailer esté instalado
