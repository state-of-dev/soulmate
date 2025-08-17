import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const CONTENT_FILE = join(process.cwd(), 'lib/content-data.json')

export async function GET() {
  try {
    const content = await readFile(CONTENT_FILE, 'utf8')
    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    // Si no existe el archivo, devolver contenido por defecto
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
        form: {
          name: "Nombre completo",
          email: "Correo electrónico", 
          message: "Cuéntanos sobre tu evento...",
          submit: "Enviar mensaje"
        },
        info: {
          phone: "+1 (555) 123-4567",
          email: "hola@soulmate.com",
          location: "Ciudad, País"
        }
      }
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const content = await request.json()
    await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Failed to save content' }, 
      { status: 500 }
    )
  }
}