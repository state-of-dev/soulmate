# Configuración de Redis (KV) para Production

Para que el panel de admin funcione en production, necesitas configurar Redis a través de Upstash:

## Pasos para configurar Redis:

1. **Ve a tu proyecto en Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Ve a la pestaña "Storage"**
   - Click en tu proyecto
   - Ve a la pestaña "Storage"

3. **Crear una base de datos Redis**
   - Click en "Create New"
   - En "Marketplace Database Providers", selecciona **"Upstash"**
   - Selecciona "Serverless DB (Redis, Vector, Queue, Search)"
   - Click en "Continue"

4. **Configurar Upstash Redis**
   - Crea una cuenta en Upstash si no tienes una
   - Selecciona "Redis" 
   - Dale un nombre (ej: "soulmate-content")
   - Selecciona la región más cercana
   - Plan: "Free" (30K comandos/mes gratis)
   - Click en "Create Database"

5. **Conectar al proyecto Vercel**
   - Una vez creada, en Upstash dashboard click en "Connect"
   - Selecciona "Vercel" como integración
   - Autoriza la conexión con tu proyecto de Vercel
   - Esto agregará automáticamente las variables de entorno

6. **Variables de entorno que se agregan automáticamente:**
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

7. **Redeploy**
   - Haz un nuevo deploy o push para que las variables tomen efecto

## ¿Cómo funciona?

- **En desarrollo**: Usa archivos locales (como ahora)
- **En production**: Usa Vercel KV automáticamente

## Verificación

Una vez configurado, el admin funcionará perfectamente en production y los cambios se guardarán permanentemente.

## Costos

Vercel KV es gratuito hasta:
- 30,000 comandos por mes
- 256 MB de storage

Para un sitio de contenido como este, es más que suficiente.