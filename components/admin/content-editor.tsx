"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Save, RotateCcw, Eye, Type, Home, User, Briefcase, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { clearContentCache } from '@/lib/content-cache'
import MediaUpload from './media-upload'

interface ContentData {
  navigation: {
    logo: string
    links: Array<{
      name: string
      href: string
    }>
  }
  media: {
    hero_background?: string
    about_style_image?: string
    about_work_image?: string
    portfolio_recap_video?: string
    gallery_images?: string[]
  }
  hero: {
    title: string
    subtitle: string
    services: Array<{
      text: string
      color: string
    }>
    buttons: {
      primary: string
      secondary: string
    }
  }
  about: {
    title: string
    sections: {
      style: {
        title: string
        paragraphs: string[]
        alt: string
        stats: Array<{
          value: string
          label: string
        }>
      }
      work: {
        title: string
        intro: string
        alt: string
        process: Array<{
          title: string
          description: string
        }>
      }
    }
  }
  portfolio: {
    title: string
    subtitle: string
    tabs: {
      recap: string
      videos: string
      gallery: string
    }
    recap: {
      title: string
      description: string
    }
    videos: Array<{
      title: string
      description: string
    }>
    gallery: Array<{
      title: string
      description: string
    }>
  }
  packages: {
    title: string
    subtitle: string
  }
  contact: {
    title: string
    subtitle: string
    description: string
    form: {
      title: string
      name: string
      email: string
      phone: string
      date: string
      package: string
      message: string
      submit: string
    }
    info: {
      title: string
      email: string
      phone: string
      location: string
      locationDetail: string
    }
    schedule: {
      title: string
      description: string
      weekdays: string
      weekdaysHours: string
      saturday: string
      saturdayHours: string
      sunday: string
      note: string
    }
  }
}

export default function ContentEditor() {
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('navigation')

  useEffect(() => {
    // Cargar contenido actual
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content')
      const contentData: ContentData = await response.json()
      
      // Ensure navigation structure exists
      if (!contentData.navigation) {
        contentData.navigation = {
          logo: "Momentos Eternos",
          links: [
            { name: "Inicio", href: "#inicio" },
            { name: "Quiénes Somos", href: "#quienes-somos" },
            { name: "Portafolio", href: "#portafolio" },
            { name: "Paquetes", href: "#paquetes" },
            { name: "Contáctanos", href: "#contacto" }
          ]
        }
      }
      
      // Ensure media structure exists
      if (!contentData.media) {
        contentData.media = {
          hero_background: '',
          about_style_image: '',
          about_work_image: '',
          portfolio_recap_video: '',
          gallery_images: []
        }
      }

      // Ensure contact structure exists
      if (!contentData.contact) {
        contentData.contact = {
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
      }

      // Ensure contact.schedule exists even if contact exists
      if (!contentData.contact.schedule) {
        contentData.contact.schedule = {
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

      // Ensure contact.form exists
      if (!contentData.contact.form) {
        contentData.contact.form = {
          title: "Solicita una Cotización",
          name: "Tu nombre",
          email: "tu@email.com",
          phone: "+34 600 000 000",
          date: "Selecciona una fecha",
          package: "Selecciona un paquete",
          message: "Cuéntanos sobre tu boda y cualquier detalle importante...",
          submit: "Solicitar Cotización"
        }
      }

      // Ensure contact.info exists
      if (!contentData.contact.info) {
        contentData.contact.info = {
          title: "Información de Contacto",
          email: "info@momentoseternos.com",
          phone: "+55 60 19 75 32",
          location: "CDMX, México",
          locationDetail: "(Disponibles para viajes nacionales e internacionales)"
        }
      }
      
      setContent(contentData)
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    if (!content) return
    
    try {
      setSaving(true)
      console.log('Saving content:', content)
      
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('Save response:', result)
        
        // Limpiar cache y disparar evento de actualización
        clearContentCache()
        window.dispatchEvent(new CustomEvent('content-updated'))
        
        // Disparar evento para comunicación entre pestañas
        localStorage.setItem('content-update-trigger', Date.now().toString())
        localStorage.removeItem('content-update-trigger')
        
        console.log('Content saved successfully and cache cleared')
        
        // Mostrar alguna confirmación visual
        alert('Contenido guardado exitosamente')
      } else {
        const errorText = await response.text()
        console.error('Save failed:', response.status, errorText)
        throw new Error(`Failed to save content: ${response.status}`)
      }
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error al guardar el contenido: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (path: string, value: any) => {
    if (!content) return
    
    const keys = path.split('.')
    const newContent = { ...content }
    let current: any = newContent
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]] = value
    setContent(newContent)
  }

  const sections = [
    { id: 'navigation', name: 'Navegación', icon: Type },
    { id: 'hero', name: 'Hero', icon: Home },
    { id: 'about', name: 'Acerca de', icon: User },
    { id: 'portfolio', name: 'Portafolio', icon: Briefcase },
    { id: 'contact', name: 'Contacto', icon: Mail }
  ]

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block w-8 h-8 border-4 border-pearl-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-2 text-muted-foreground">Cargando contenido...</p>
      </div>
    )
  }

  if (!content || !content.navigation || !content.media || !content.contact || !content.contact.schedule) {
    return (
      <div className="text-center py-8 text-red-600">
        Error al cargar el contenido
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con acciones */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Editor de Contenido</h3>
          <p className="text-sm text-muted-foreground">
            Modifica los textos que aparecen en el sitio web
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadContent}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Recargar
          </Button>
          <Button onClick={saveContent} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 flex-wrap">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {section.name}
            </Button>
          )
        })}
      </div>

      {/* Content Editors */}
      <div className="space-y-6">
        {activeSection === 'navigation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Navegación</CardTitle>
                <CardDescription>Logo y enlaces del menú principal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Logo/Título</Label>
                  <Input
                    value={content.navigation.logo}
                    onChange={(e) => updateContent('navigation.logo', e.target.value)}
                  />
                </div>

                <Separator />

                <div>
                  <Label>Enlaces de navegación</Label>
                  <div className="space-y-2">
                    {content.navigation.links.map((link, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          value={link.name}
                          onChange={(e) => {
                            const newLinks = [...content.navigation.links]
                            newLinks[index] = { ...link, name: e.target.value }
                            updateContent('navigation.links', newLinks)
                          }}
                          placeholder="Nombre del enlace"
                        />
                        <Input
                          value={link.href}
                          onChange={(e) => {
                            const newLinks = [...content.navigation.links]
                            newLinks[index] = { ...link, href: e.target.value }
                            updateContent('navigation.links', newLinks)
                          }}
                          placeholder="#seccion"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSection === 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Sección Hero</CardTitle>
                <CardDescription>Texto principal y llamadas a la acción</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Título Principal</Label>
                  <Input
                    value={content.hero.title}
                    onChange={(e) => updateContent('hero.title', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Subtítulo</Label>
                  <Textarea
                    value={content.hero.subtitle}
                    onChange={(e) => updateContent('hero.subtitle', e.target.value)}
                    rows={3}
                  />
                </div>

                <Separator />

                <div>
                  <Label>Servicios (textos animados)</Label>
                  <div className="space-y-2">
                    {content.hero.services.map((service, index) => (
                      <Input
                        key={index}
                        value={service.text}
                        onChange={(e) => {
                          const newServices = [...content.hero.services]
                          newServices[index] = { ...service, text: e.target.value }
                          updateContent('hero.services', newServices)
                        }}
                        placeholder={`Servicio ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Botón Primario</Label>
                    <Input
                      value={content.hero.buttons.primary}
                      onChange={(e) => updateContent('hero.buttons.primary', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Botón Secundario</Label>
                    <Input
                      value={content.hero.buttons.secondary}
                      onChange={(e) => updateContent('hero.buttons.secondary', e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <MediaUpload
                  label="Imagen/Video de Fondo Hero"
                  description="Imagen o video que aparece de fondo en la sección principal"
                  currentUrl={content.media.hero_background}
                  onUpload={(url) => updateContent('media.hero_background', url)}
                  acceptedTypes="image/*,video/*"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSection === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Sección Acerca de</CardTitle>
                <CardDescription>Información sobre el equipo y proceso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Título de la Sección</Label>
                  <Input
                    value={content.about.title}
                    onChange={(e) => updateContent('about.title', e.target.value)}
                  />
                </div>

                <Separator />

                <div>
                  <Label>Nuestro Estilo - Título</Label>
                  <Input
                    value={content.about.sections.style.title}
                    onChange={(e) => updateContent('about.sections.style.title', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Párrafos de Estilo</Label>
                  {content.about.sections.style.paragraphs.map((paragraph, index) => (
                    <Textarea
                      key={index}
                      value={paragraph}
                      onChange={(e) => {
                        const newParagraphs = [...content.about.sections.style.paragraphs]
                        newParagraphs[index] = e.target.value
                        updateContent('about.sections.style.paragraphs', newParagraphs)
                      }}
                      rows={3}
                      className="mb-2"
                    />
                  ))}
                </div>

                <MediaUpload
                  label="Imagen para 'Nuestro Estilo'"
                  description="Imagen que acompaña la sección de estilo"
                  currentUrl={content.media.about_style_image}
                  onUpload={(url) => updateContent('media.about_style_image', url)}
                  acceptedTypes="image/*"
                />

                <Separator />

                <div>
                  <Label>Cómo Trabajamos - Título</Label>
                  <Input
                    value={content.about.sections.work.title}
                    onChange={(e) => updateContent('about.sections.work.title', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Introducción del Proceso</Label>
                  <Textarea
                    value={content.about.sections.work.intro}
                    onChange={(e) => updateContent('about.sections.work.intro', e.target.value)}
                    rows={2}
                  />
                </div>

                <MediaUpload
                  label="Imagen para 'Cómo Trabajamos'"
                  description="Imagen que acompaña la sección del proceso de trabajo"
                  currentUrl={content.media.about_work_image}
                  onUpload={(url) => updateContent('media.about_work_image', url)}
                  acceptedTypes="image/*"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSection === 'portfolio' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Sección Portafolio</CardTitle>
                <CardDescription>Títulos y descripciones del portafolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Título</Label>
                    <Input
                      value={content.portfolio.title}
                      onChange={(e) => updateContent('portfolio.title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Subtítulo</Label>
                    <Input
                      value={content.portfolio.subtitle}
                      onChange={(e) => updateContent('portfolio.subtitle', e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Título del Video Recap</Label>
                  <Input
                    value={content.portfolio.recap.title}
                    onChange={(e) => updateContent('portfolio.recap.title', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Descripción del Video Recap</Label>
                  <Textarea
                    value={content.portfolio.recap.description}
                    onChange={(e) => updateContent('portfolio.recap.description', e.target.value)}
                    rows={2}
                  />
                </div>

                <MediaUpload
                  label="Video Recap Principal"
                  description="Video que se reproduce en la sección de portafolio"
                  currentUrl={content.media.portfolio_recap_video}
                  onUpload={(url) => updateContent('media.portfolio_recap_video', url)}
                  acceptedTypes="video/*"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSection === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Sección Contacto</CardTitle>
                <CardDescription>Información de contacto y formulario</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Título Principal</Label>
                    <Input
                      value={content.contact.title}
                      onChange={(e) => updateContent('contact.title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Subtítulo</Label>
                    <Input
                      value={content.contact.subtitle}
                      onChange={(e) => updateContent('contact.subtitle', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={content.contact.description}
                    onChange={(e) => updateContent('contact.description', e.target.value)}
                    rows={2}
                  />
                </div>

                <Separator />

                <div>
                  <Label className="text-lg font-semibold">Formulario de Contacto</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Título del Formulario</Label>
                      <Input
                        value={content.contact.form.title}
                        onChange={(e) => updateContent('contact.form.title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Texto del Botón</Label>
                      <Input
                        value={content.contact.form.submit}
                        onChange={(e) => updateContent('contact.form.submit', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Placeholder - Nombre</Label>
                      <Input
                        value={content.contact.form.name}
                        onChange={(e) => updateContent('contact.form.name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Placeholder - Email</Label>
                      <Input
                        value={content.contact.form.email}
                        onChange={(e) => updateContent('contact.form.email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Placeholder - Teléfono</Label>
                      <Input
                        value={content.contact.form.phone}
                        onChange={(e) => updateContent('contact.form.phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Placeholder - Fecha</Label>
                      <Input
                        value={content.contact.form.date}
                        onChange={(e) => updateContent('contact.form.date', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Placeholder - Paquete</Label>
                      <Input
                        value={content.contact.form.package}
                        onChange={(e) => updateContent('contact.form.package', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Placeholder - Mensaje</Label>
                      <Input
                        value={content.contact.form.message}
                        onChange={(e) => updateContent('contact.form.message', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-lg font-semibold">Información de Contacto</Label>
                  
                  <div className="mt-2">
                    <Label>Título de la Sección</Label>
                    <Input
                      value={content.contact.info.title}
                      onChange={(e) => updateContent('contact.info.title', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Email de Contacto</Label>
                      <Input
                        value={content.contact.info.email}
                        onChange={(e) => updateContent('contact.info.email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Teléfono</Label>
                      <Input
                        value={content.contact.info.phone}
                        onChange={(e) => updateContent('contact.info.phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Ubicación</Label>
                      <Input
                        value={content.contact.info.location}
                        onChange={(e) => updateContent('contact.info.location', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Detalle de Ubicación</Label>
                      <Input
                        value={content.contact.info.locationDetail}
                        onChange={(e) => updateContent('contact.info.locationDetail', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-lg font-semibold">Horarios de Atención</Label>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Título de Horarios</Label>
                      <Input
                        value={content.contact.schedule.title}
                        onChange={(e) => updateContent('contact.schedule.title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Input
                        value={content.contact.schedule.description}
                        onChange={(e) => updateContent('contact.schedule.description', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Días de Semana</Label>
                      <Input
                        value={content.contact.schedule.weekdays}
                        onChange={(e) => updateContent('contact.schedule.weekdays', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Horario Semana</Label>
                      <Input
                        value={content.contact.schedule.weekdaysHours}
                        onChange={(e) => updateContent('contact.schedule.weekdaysHours', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Sábados</Label>
                      <Input
                        value={content.contact.schedule.saturday}
                        onChange={(e) => updateContent('contact.schedule.saturday', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Horario Sábados</Label>
                      <Input
                        value={content.contact.schedule.saturdayHours}
                        onChange={(e) => updateContent('contact.schedule.saturdayHours', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Domingos</Label>
                      <Input
                        value={content.contact.schedule.sunday}
                        onChange={(e) => updateContent('contact.schedule.sunday', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Nota Adicional</Label>
                      <Textarea
                        value={content.contact.schedule.note}
                        onChange={(e) => updateContent('contact.schedule.note', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}