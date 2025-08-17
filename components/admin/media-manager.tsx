"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useMediaBlob } from '@/hooks/useMediaBlob'
import { MediaType } from '@/lib/blob'
import { Upload, Trash2, RefreshCw, FileImage, Video, Zap, Copy, Check } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function MediaManager() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [mediaType, setMediaType] = useState<MediaType>('image')
  const [uploading, setUploading] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string>('free-upload')
  
  const { media, loading, error, uploadMedia, deleteMedia, refreshMedia } = useMediaBlob()

  // Definir slots de medios específicos
  const mediaSlots = [
    { id: 'hero-imagen', name: 'Imagen Hero', type: 'image' as MediaType },
    { id: 'about-estilo', name: 'Imagen About - Estilo', type: 'image' as MediaType },
    { id: 'about-trabajo', name: 'Imagen About - Trabajo', type: 'image' as MediaType },
    { id: 'tab-imagenes-1', name: 'Portfolio Imagen 1', type: 'image' as MediaType },
    { id: 'tab-imagenes-2', name: 'Portfolio Imagen 2', type: 'image' as MediaType },
    { id: 'tab-imagenes-3', name: 'Portfolio Imagen 3', type: 'image' as MediaType },
    { id: 'tab-imagenes-4', name: 'Portfolio Imagen 4', type: 'image' as MediaType },
    { id: 'tab-imagenes-5', name: 'Portfolio Imagen 5', type: 'image' as MediaType },
    { id: 'tab-imagenes-6', name: 'Portfolio Imagen 6', type: 'image' as MediaType },
    { id: 'tab-gif-1', name: 'GIF Portfolio 1', type: 'gif' as MediaType },
    { id: 'tab-gif-2', name: 'GIF Portfolio 2', type: 'gif' as MediaType },
    { id: 'tab-gif-3', name: 'GIF Portfolio 3', type: 'gif' as MediaType },
    { id: 'recap-video', name: 'Video Recap', type: 'video' as MediaType },
    { id: 'background-music', name: 'Música de Fondo', type: 'video' as MediaType },
  ]

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
      // Si hay un slot seleccionado (que no sea "free-upload"), usar ese nombre
      const fileName = selectedSlot && selectedSlot !== 'free-upload' 
        ? `${selectedSlot}.${selectedFile.name.split('.').pop()}` 
        : selectedFile.name
      await uploadMedia(selectedFile, mediaType)
      setSelectedFile(null)
      setSelectedSlot('free-upload')
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

  const handleCopyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getMediaIcon = (contentType: string) => {
    if (contentType.startsWith('video/')) return <Video className="h-4 w-4" />
    if (contentType === 'image/gif') return <Zap className="h-4 w-4" />
    return <FileImage className="h-4 w-4" />
  }

  const getMediaBadge = (contentType: string) => {
    if (contentType.startsWith('video/')) return <Badge className="bg-blue-100 text-blue-800">Video</Badge>
    if (contentType === 'image/gif') return <Badge className="bg-purple-100 text-purple-800">GIF</Badge>
    return <Badge className="bg-green-100 text-green-800">Imagen</Badge>
  }

  // Categorizar medios
  const categorizedMedia = {
    images: media.filter(item => item.contentType.startsWith('image/') && item.contentType !== 'image/gif'),
    gifs: media.filter(item => item.contentType === 'image/gif'),
    videos: media.filter(item => item.contentType.startsWith('video/') || item.contentType.startsWith('audio/'))
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <Card className="border-dashed border-2 border-pearl-200 bg-pearl-50/50">
        <CardHeader>
          <CardTitle className="text-lg">Subir Nuevo Archivo</CardTitle>
          <CardDescription>
            Arrastra y suelta o selecciona imágenes, GIFs y videos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="media-slot">Reemplazar elemento específico</Label>
              <Select value={selectedSlot} onValueChange={(value) => {
                setSelectedSlot(value)
                const slot = mediaSlots.find(s => s.id === value)
                if (slot) setMediaType(slot.type)
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar elemento..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free-upload">Subida libre</SelectItem>
                  {mediaSlots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {slot.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="file-upload">Seleccionar archivo</Label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*,video/*,.gif"
                onChange={handleFileSelect}
                className="cursor-pointer"
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
                  <SelectItem value="gif">GIF Animado</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white rounded-lg border border-pearl-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type}
                  </p>
                </div>
                {getMediaBadge(selectedFile.type)}
              </div>
              {selectedSlot && selectedSlot !== 'free-upload' && (
                <div className="text-sm text-primary font-medium">
                  → Reemplazará: {mediaSlots.find(s => s.id === selectedSlot)?.name}
                </div>
              )}
            </motion.div>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || uploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'Subiendo...' : 'Subir Archivo'}
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
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
              Error: {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media Grid by Category */}
      <div className="space-y-6">
        {/* Images */}
        {categorizedMedia.images.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="h-5 w-5" />
                Imágenes ({categorizedMedia.images.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categorizedMedia.images.map((item) => (
                  <MediaCard key={item.url} item={item} onDelete={handleDelete} onCopyUrl={handleCopyUrl} copiedUrl={copiedUrl} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* GIFs */}
        {categorizedMedia.gifs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                GIFs Animados ({categorizedMedia.gifs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categorizedMedia.gifs.map((item) => (
                  <MediaCard key={item.url} item={item} onDelete={handleDelete} onCopyUrl={handleCopyUrl} copiedUrl={copiedUrl} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Videos */}
        {categorizedMedia.videos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Videos ({categorizedMedia.videos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorizedMedia.videos.map((item) => (
                  <MediaCard key={item.url} item={item} onDelete={handleDelete} onCopyUrl={handleCopyUrl} copiedUrl={copiedUrl} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-pearl-200 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-2 text-muted-foreground">Cargando medios...</p>
          </div>
        )}

        {!loading && media.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No hay archivos subidos</p>
            <p className="text-sm">Sube tu primer archivo para comenzar</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente para cada card de media
function MediaCard({ 
  item, 
  onDelete, 
  onCopyUrl, 
  copiedUrl 
}: { 
  item: any
  onDelete: (url: string) => void
  onCopyUrl: (url: string) => void
  copiedUrl: string | null
}) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getMediaBadge = (contentType: string) => {
    if (contentType.startsWith('video/')) return <Badge className="bg-blue-100 text-blue-800">Video</Badge>
    if (contentType === 'image/gif') return <Badge className="bg-purple-100 text-purple-800">GIF</Badge>
    return <Badge className="bg-green-100 text-green-800">Imagen</Badge>
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* Preview */}
        <div className="relative h-48 bg-gray-100">
          {item.contentType.startsWith('image/') && (
            <Image
              src={item.url}
              alt={item.pathname}
              fill
              className="object-cover"
              unoptimized={item.contentType === 'image/gif'}
            />
          )}
          
          {item.contentType.startsWith('video/') && (
            <video 
              src={item.url} 
              className="w-full h-full object-cover"
              muted
              loop
              autoPlay
            />
          )}

          <div className="absolute top-2 right-2">
            {getMediaBadge(item.contentType)}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-medium text-sm truncate mb-1">
            {item.pathname.split('/').pop()}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {formatFileSize(item.size)}
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCopyUrl(item.url)}
              className="flex-1 text-xs"
            >
              {copiedUrl === item.url ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copiar URL
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(item.url)}
              className="px-3"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}