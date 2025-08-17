"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings } from 'lucide-react'
import ContentEditor from '@/components/admin/content-editor'
import AdminAuth from '@/components/admin/admin-auth'

export default function AdminPage() {

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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Editor de Contenido y Medios
            </CardTitle>
            <CardDescription>
              Edita textos e imágenes del sitio web en una sola interfaz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContentEditor />
          </CardContent>
        </Card>
      </div>
    </div>
    </AdminAuth>
  )
}