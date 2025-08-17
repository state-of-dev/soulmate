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

interface ContentData {
  navigation: {
    logo: string
    links: Array<{
      name: string
      href: string
    }>
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
    form: {
      name: string
      email: string
      message: string
      submit: string
    }
    info: {
      phone: string
      email: string
      location: string
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

  if (!content || !content.navigation) {
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
                    <Label>Título</Label>
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

                <Separator />

                <div>
                  <Label>Información de Contacto</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm">Teléfono</Label>
                      <Input
                        value={content.contact.info.phone}
                        onChange={(e) => updateContent('contact.info.phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Email</Label>
                      <Input
                        value={content.contact.info.email}
                        onChange={(e) => updateContent('contact.info.email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Ubicación</Label>
                      <Input
                        value={content.contact.info.location}
                        onChange={(e) => updateContent('contact.info.location', e.target.value)}
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