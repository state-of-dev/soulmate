"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMediaBlob } from '@/hooks/useMediaBlob'
import { MediaType } from '@/lib/blob'
import { Upload, Trash2, RefreshCw } from 'lucide-react'
import Image from 'next/image'

export default function MediaAdmin() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [mediaType, setMediaType] = useState<MediaType>('image')
  const [uploading, setUploading] = useState(false)
  
  const { media, loading, error, uploadMedia, deleteMedia, refreshMedia } = useMediaBlob()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Auto-detectar el tipo basado en la extensión
      if (file.name.endsWith('.mp4') || file.name.endsWith('.webm')) {
        setMediaType('video')
      } else if (file.name.endsWith('.gif')) {
        setMediaType('gif')
      } else {
        setMediaType('image')
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    
    setUploading(true)
    try {
      await uploadMedia(selectedFile, mediaType)
      setSelectedFile(null)
      // Reset input
      const input = document.getElementById('file-upload') as HTMLInputElement
      if (input) input.value = ''
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (url: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
      await deleteMedia(url)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Administrador de Medios</h1>
      
      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Subir Archivo</CardTitle>
          <CardDescription>
            Sube videos, GIFs e imágenes a Vercel Blob Storage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file-upload">Seleccionar archivo</Label>
            <Input
              id="file-upload"
              type="file"
              accept="image/*,video/*,.gif"
              onChange={handleFileSelect}
            />
          </div>
          
          <div>
            <Label htmlFor="media-type">Tipo de medio</Label>
            <Select value={mediaType} onValueChange={(value) => setMediaType(value as MediaType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Imagen</SelectItem>
                <SelectItem value="gif">GIF</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedFile && (
            <div className="p-4 bg-muted rounded-lg">
              <p><strong>Archivo:</strong> {selectedFile.name}</p>
              <p><strong>Tamaño:</strong> {formatFileSize(selectedFile.size)}</p>
              <p><strong>Tipo:</strong> {selectedFile.type}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || uploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'Subiendo...' : 'Subir'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={refreshMedia}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg">
              Error: {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media List */}
      <Card>
        <CardHeader>
          <CardTitle>Archivos en Blob Storage</CardTitle>
          <CardDescription>
            {media.length} archivo(s) subido(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Cargando...</p>
          ) : media.length === 0 ? (
            <p className="text-muted-foreground">No hay archivos subidos</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {media.map((item) => (
                <Card key={item.url} className="overflow-hidden">
                  <CardContent className="p-3">
                    {item.contentType.startsWith('image/') && (
                      <div className="relative h-40 mb-3">
                        <Image
                          src={item.url}
                          alt={item.pathname}
                          fill
                          className="object-cover rounded"
                          unoptimized={item.contentType === 'image/gif'}
                        />
                      </div>
                    )}
                    
                    {item.contentType.startsWith('video/') && (
                      <div className="mb-3">
                        <video 
                          src={item.url} 
                          controls 
                          className="w-full h-40 object-cover rounded"
                        />
                      </div>
                    )}

                    <div className="space-y-1 text-sm">
                      <p className="font-medium truncate">{item.pathname.split('/').pop()}</p>
                      <p className="text-muted-foreground">{formatFileSize(item.size)}</p>
                      <p className="text-muted-foreground">{item.contentType}</p>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(item.url)}
                      >
                        Copiar URL
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.url)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}