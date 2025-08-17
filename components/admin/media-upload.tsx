"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Image, X, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface MediaUploadProps {
  label: string
  description?: string
  currentUrl?: string
  onUpload: (url: string) => void
  acceptedTypes?: string
}

export default function MediaUpload({ 
  label, 
  description, 
  currentUrl, 
  onUpload,
  acceptedTypes = "image/*,video/*"
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null)

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true)
      
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const { url } = await response.json()
        setPreviewUrl(url)
        onUpload(url)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error al subir el archivo')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const removeMedia = () => {
    setPreviewUrl(null)
    onUpload('')
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      
      <div className="border-2 border-dashed border-pearl-200 rounded-lg p-4">
        {previewUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">Archivo subido</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeMedia}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {previewUrl.includes('.mp4') || previewUrl.includes('video') ? (
              <video 
                src={previewUrl} 
                className="mt-2 w-full max-w-xs rounded-lg" 
                controls 
                muted
              />
            ) : (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="mt-2 w-full max-w-xs rounded-lg object-cover"
              />
            )}
          </motion.div>
        ) : (
          <div className="text-center py-4">
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-pearl-100 rounded-full">
                <Upload className="h-6 w-6 text-pearl-600" />
              </div>
              <div>
                <Input
                  type="file"
                  accept={acceptedTypes}
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                  id={`file-${label.replace(/\s+/g, '-')}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                  onClick={() => document.getElementById(`file-${label.replace(/\s+/g, '-')}`)?.click()}
                  className="mt-2"
                >
                  {uploading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      Subiendo...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Seleccionar archivo
                    </div>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Arrastra un archivo aquí o haz clic para seleccionar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}