"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, FileImage, Type } from 'lucide-react'
import MediaManager from '@/components/admin/media-manager'
import ContentEditor from '@/components/admin/content-editor'
import AdminAuth from '@/components/admin/admin-auth'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('media')

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gradient-to-br from-pearl-50 to-pearl-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-xl">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">Panel de Administración</h1>
              <p className="text-muted-foreground">Gestiona contenido, medios y configuraciones</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Sistema Activo
            </Badge>
            <Badge variant="outline">
              Soulmate.sh v1.0
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="media" className="flex items-center gap-2">
              <FileImage className="h-4 w-4" />
              <span className="hidden sm:inline">Medios</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span className="hidden sm:inline">Contenido</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileImage className="h-5 w-5" />
                  Gestión de Medios
                </CardTitle>
                <CardDescription>
                  Sube, organiza y gestiona imágenes, GIFs y videos en Vercel Blob Storage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Editor de Contenido
                </CardTitle>
                <CardDescription>
                  Edita textos, títulos y descripciones del sitio web
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContentEditor />
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
    </AdminAuth>
  )
}