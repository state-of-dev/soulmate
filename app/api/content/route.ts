import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const CONTENT_KEY = 'site_content'
const CONTENT_FILE = join(process.cwd(), 'lib/content-data.json')

// Función para verificar si Redis está disponible
const isRedisAvailable = () => {
  return process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
}

export async function GET() {
  try {
    // Si Redis está disponible, usarlo
    if (isRedisAvailable()) {
      const { Redis } = await import('@upstash/redis')
      const redis = new Redis({
        url: process.env.KV_REST_API_URL!,
        token: process.env.KV_REST_API_TOKEN!,
      })
      const content = await redis.get(CONTENT_KEY)
      if (content) {
        return NextResponse.json(content)
      }
    } else {
      // En desarrollo, usar archivo local
      try {
        const content = await readFile(CONTENT_FILE, 'utf8')
        return NextResponse.json(JSON.parse(content))
      } catch (fileError) {
        // Si no existe el archivo, continuar con contenido por defecto
      }
    }
    
    // Si no hay contenido guardado, devolver contenido por defecto
    return NextResponse.json({
      navigation: {
        logo: "Momentos Eternos",
        links: [
          { name: "Inicio", href: "#inicio" },
          { name: "Quiénes Somos", href: "#quienes-somos" },
          { name: "Portafolio", href: "#portafolio" },
          { name: "Paquetes", href: "#paquetes" },
          { name: "Contáctanos", href: "#contacto" }
        ]
      },
      media: {
        hero_background: '',
        about_style_image: '',
        about_work_image: '',
        portfolio_recap_video: '',
        gallery_images: []
      },
      hero: {
        title: "Soulmate",
        subtitle: "Capturamos los momentos más especiales de tu vida con un toque artístico único",
        services: [
          { text: "Fotografía de Bodas", color: "text-pearl-200" },
          { text: "Sesiones de Pareja", color: "text-pearl-300" },
          { text: "Eventos Especiales", color: "text-pearl-400" },
          { text: "Retratos Artísticos", color: "text-pearl-200" }
        ],
        buttons: {
          primary: "Contactanos",
          secondary: "Ver Portafolio"
        }
      },
      about: {
        title: "Quiénes Somos",
        sections: {
          style: {
            title: "Nuestro Estilo",
            paragraphs: [
              "Creemos que cada momento tiene una historia única que contar. Nuestro enfoque combina la espontaneidad del fotoperiodismo con la elegancia del arte clásico.",
              "Utilizamos técnicas de iluminación natural y composición artística para crear imágenes que no solo documenten, sino que también emocionen y perduren en el tiempo."
            ],
            alt: "Estilo fotográfico único",
            stats: [
              { value: "500+", label: "Eventos" },
              { value: "5 años", label: "Experiencia" }
            ]
          },
          work: {
            title: "Cómo Trabajamos",
            intro: "Nuestro proceso está diseñado para capturar la esencia auténtica de cada momento especial.",
            alt: "Proceso de trabajo profesional",
            process: [
              {
                title: "Consulta Inicial",
                description: "Conocemos tu visión y planificamos cada detalle del evento."
              },
              {
                title: "Preparación",
                description: "Exploramos la locación y preparamos el equipo necesario."
              },
              {
                title: "Captura",
                description: "Documentamos cada momento con discreción y profesionalismo."
              },
              {
                title: "Entrega",
                description: "Editamos y entregamos tu galería personalizada."
              }
            ]
          }
        }
      },
      portfolio: {
        title: "Nuestro Portafolio",
        subtitle: "Explora nuestro trabajo reciente y descubre el estilo que nos caracteriza",
        tabs: {
          recap: "Recap",
          videos: "Videos",
          gallery: "Galería"
        },
        recap: {
          title: "Recap de Bodas 2024",
          description: "Un vistazo a los momentos más hermosos que hemos capturado este año."
        },
        videos: [
          { title: "Boda Elena & Carlos", description: "Ceremonia íntima en jardín" },
          { title: "Sesión Ana & David", description: "Engagement en la playa" },
          { title: "Evento Corporativo", description: "Celebración empresarial" }
        ],
        gallery: [
          { title: "Momentos Únicos", description: "Selección de nuestras mejores capturas" },
          { title: "Detalles Especiales", description: "Los pequeños momentos que importan" },
          { title: "Emociones Puras", description: "Expresiones auténticas de felicidad" }
        ]
      },
      packages: {
        title: "Nuestros Paquetes",
        subtitle: "Planes diseñados para cada tipo de evento y presupuesto"
      },
      contact: {
        title: "Contacto",
        subtitle: "¿Listo para capturar tu momento especial? Conversemos sobre tu proyecto",
        description: "Cuéntanos sobre tu boda y cómo podemos ayudarte a capturar esos momentos especiales",
        form: {
          title: "Solicita una Cotización",
          name: "Tu nombre",
          email: "tu@email.com",
          phone: "+34 600 000 000",
          date: "Selecciona una fecha",
          package: "Selecciona un paquete",
          message: "Cuéntanos sobre tu boda y cualquier detalle importante...",
          submit: "Solicitar Cotización"
        },
        info: {
          title: "Información de Contacto",
          email: "info@momentoseternos.com",
          phone: "+55 60 19 75 32",
          location: "CDMX, México",
          locationDetail: "(Disponibles para viajes nacionales e internacionales)"
        },
        schedule: {
          title: "Horario de Atención",
          description: "Estamos disponibles para consultas y reuniones:",
          weekdays: "Lunes - Viernes:",
          weekdaysHours: "9:00 - 19:00",
          saturday: "Sábados:",
          saturdayHours: "10:00 - 14:00",
          sunday: "Cerrado",
          note: "* También disponibles para reuniones virtuales fuera del horario habitual, previa cita."
        }
      }
    })
  } catch (error) {
    console.error('Error loading content:', error)
    return NextResponse.json(
      { error: 'Failed to load content' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const content = await request.json()
    
    // Si Redis está disponible, usarlo (production)
    if (isRedisAvailable()) {
      const { Redis } = await import('@upstash/redis')
      const redis = new Redis({
        url: process.env.KV_REST_API_URL!,
        token: process.env.KV_REST_API_TOKEN!,
      })
      await redis.set(CONTENT_KEY, content)
    } else {
      // En desarrollo, usar archivo local
      await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2))
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Failed to save content' }, 
      { status: 500 }
    )
  }
}