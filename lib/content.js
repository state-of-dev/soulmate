// Sistema de contenido centralizado
export const content = {
  // Navegación
  navigation: {
    logo: "Momentos Eternos",
    links: [
      { name: "Inicio", href: "#inicio" },
      { name: "Quiénes Somos", href: "#quienes-somos" },
      { name: "Portafolio", href: "#portafolio" },
      { name: "Paquetes", href: "#paquetes" },
      { name: "Contáctanos", href: "#contacto" },
    ],
    toggleMenu: "Toggle Menu"
  },
  
  // Hero Section
  hero: {
    services: [
      { text: "Videos Cinematográficos", color: "text-pearl-200" },
      { text: "Edición Profesional", color: "text-pearl-100" },
      { text: "Grabación con Drone", color: "text-pearl-200" },
      { text: "Documentales Pre-Boda", color: "text-pearl-100" },
      { text: "Videos de Afterparty", color: "text-pearl-200" },
      { text: "Videos Resumen", color: "text-pearl-100" },
      { text: "Sesiones Video-Entrevista", color: "text-pearl-200" },
      { text: "Resumen Documental", color: "text-pearl-100" },
    ],
    subtitle: "Tu día especial en una historia cinematográfica",
    buttons: {
      primary: "Solicitar Cotización",
      secondary: "Ver Nuestro Trabajo"
    }
  },
  
  // About Section
  about: {
    title: "Quiénes Somos",
    sections: {
      style: {
        title: "Nuestro Estilo",
        paragraphs: [
          "Nuestro enfoque cinematográfico combina la elegancia clásica con toques contemporáneos. Creamos narrativas visuales que capturan no solo los momentos, sino las emociones que los acompañan.",
          "Utilizamos técnicas de iluminación natural, composiciones artísticas y movimientos de cámara fluidos para crear videos que se sienten como películas románticas personalizadas."
        ],
        stats: [
          { value: "10+", label: "Años de Experiencia" },
          { value: "200+", label: "Bodas Documentadas" }
        ],
        alt: "Nuestro estilo cinematográfico"
      },
      work: {
        title: "Cómo Trabajamos",
        intro: "Nuestro proceso comienza mucho antes del día de la boda. Nos reunimos contigo para entender tu visión, conocer tu historia y planificar cada detalle de la cobertura.",
        process: [
          {
            title: "Consulta Inicial",
            description: "Conversamos sobre tu visión, estilo y momentos especiales que no queremos perdernos."
          },
          {
            title: "Día de la Boda",
            description: "Trabajamos de manera discreta, capturando momentos naturales sin interferir en tu celebración."
          },
          {
            title: "Post-Producción",
            description: "Editamos cuidadosamente cada toma para crear una narrativa emotiva y cinematográfica."
          }
        ],
        alt: "Cómo trabajamos en las bodas"
      }
    }
  },
  
  // Portfolio Section
  portfolio: {
    title: "Nuestro Portafolio",
    subtitle: "Descubre nuestros trabajos más destacados y déjate inspirar para tu día especial",
    tabs: {
      recap: "Recap",
      videos: "Videos Destacados",
      gallery: "Galería de Imágenes"
    },
    recap: {
      title: "Video Recap - Momentos Eternos",
      description: "Un resumen cinematográfico de nuestros mejores momentos capturados. Descubre el estilo único que caracteriza nuestro trabajo.",
      audioActivate: "Haz clic para activar el audio",
      audioActivated: "Audio activado",
      videoError: "Tu navegador no soporta la reproducción de video."
    },
    videos: [
      {
        title: "Ana & Roberto - Boda en la Playa",
        description: "Una hermosa ceremonia al atardecer con vistas al océano"
      },
      {
        title: "María & Juan - Boda en Viñedo",
        description: "Celebración íntima rodeada de naturaleza y viñedos"
      },
      {
        title: "Claudia & Daniel - Boda en Hacienda",
        description: "Una elegante celebración en una hacienda histórica"
      }
    ],
    gallery: [
      {
        title: "Momentos Emotivos",
        description: "Capturamos las lágrimas de alegría y los abrazos sinceros"
      },
      {
        title: "Detalles Únicos",
        description: "Cada pequeño detalle cuenta una parte de vuestra historia"
      },
      {
        title: "Primeros Bailes",
        description: "El primer baile como matrimonio, un momento mágico"
      },
      {
        title: "Celebraciones",
        description: "La alegría compartida con familiares y amigos"
      },
      {
        title: "Ceremonias",
        description: "El momento del 'sí, quiero' capturado para siempre"
      },
      {
        title: "Retratos de Pareja",
        description: "Sesiones íntimas que reflejan vuestro amor"
      }
    ]
  },
  
  // Packages Section
  packages: {
    title: "Nuestros Paquetes",
    subtitle: "Elige el paquete que mejor se adapte a tus necesidades y presupuesto",
    plans: [
      {
        id: "basic",
        name: "Esencial",
        price: "€1,499",
        description: "Cobertura básica para capturar los momentos clave de tu boda",
        popular: false,
        features: [
          { name: "6 horas de cobertura", included: true },
          { name: "1 videógrafo", included: true },
          { name: "Vídeo resumen (5-7 min)", included: true },
          { name: "Entrega digital", included: true },
          { name: "Drone", included: false },
          { name: "Vídeo documental (20-30 min)", included: false },
          { name: "Sesión pre-boda", included: false },
          { name: "Edición premium", included: false },
        ]
      },
      {
        id: "standard",
        name: "Clásico",
        price: "€2,499",
        description: "Nuestra opción más popular para una cobertura completa",
        popular: true,
        badge: "MÁS POPULAR",
        features: [
          { name: "10 horas de cobertura", included: true },
          { name: "2 videógrafos", included: true },
          { name: "Vídeo resumen (8-10 min)", included: true },
          { name: "Entrega digital", included: true },
          { name: "Drone", included: true },
          { name: "Vídeo documental (20-30 min)", included: true },
          { name: "Sesión pre-boda", included: false },
          { name: "Edición premium", included: false },
        ]
      },
      {
        id: "premium",
        name: "Exclusivo",
        price: "€3,999",
        description: "Experiencia cinematográfica completa con todos los extras",
        popular: false,
        features: [
          { name: "Cobertura ilimitada", included: true },
          { name: "3 videógrafos", included: true },
          { name: "Vídeo resumen (10-15 min)", included: true },
          { name: "Entrega digital y física", included: true },
          { name: "Drone", included: true },
          { name: "Vídeo documental (30-45 min)", included: true },
          { name: "Sesión pre-boda", included: true },
          { name: "Edición premium", included: true },
        ]
      }
    ],
    button: "Solicitar Información",
    custom: {
      title: "¿Necesitas algo diferente?",
      description: "Cada boda es única, por eso también ofrecemos paquetes personalizados adaptados a tus necesidades específicas y presupuesto.",
      button: "Solicitar Paquete Personalizado"
    }
  },
  
  // Contact Section
  contact: {
    title: "Contáctanos",
    subtitle: "Estamos aquí para hacer realidad la videografía de tus sueños",
    description: "Conversemos sobre tu día especial y cómo podemos capturar cada momento mágico.",
    info: {
      email: "info@momentoseternos.com",
      phone: "+34 600 000 000"
    },
    form: {
      name: "Nombre Completo",
      email: "Email",
      phone: "Teléfono",
      date: "Fecha de la Boda",
      location: "Ubicación del Evento",
      message: "Cuéntanos sobre tu boda...",
      button: "Enviar Mensaje"
    }
  },
  
  // Footer
  footer: {
    logo: "Momentos Eternos",
    description: "Capturamos los momentos más especiales de tu vida con un enfoque cinematográfico único.",
    sections: {
      about: "Sobre Nosotros",
      services: "Servicios", 
      legal: "Legal",
      contact: "Contacto"
    },
    links: {
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      faq: "Preguntas Frecuentes"
    },
    copyright: "© 2024 Momentos Eternos. Todos los derechos reservados."
  }
};