import { useState, useEffect } from 'react'
import { MediaItem, MediaType } from '@/lib/blob'

interface UseMediaBlobReturn {
  media: MediaItem[]
  loading: boolean
  error: string | null
  uploadMedia: (file: File, type: MediaType) => Promise<MediaItem | null>
  deleteMedia: (url: string) => Promise<boolean>
  refreshMedia: () => Promise<void>
}

export function useMediaBlob(type?: MediaType): UseMediaBlobReturn {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedia = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (type) params.set('type', type)
      
      const response = await fetch(`/api/media?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        setMedia(data.media)
      } else {
        throw new Error(data.error || 'Failed to fetch media')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching media:', err)
    } finally {
      setLoading(false)
    }
  }

  const uploadMedia = async (file: File, mediaType: MediaType): Promise<MediaItem | null> => {
    try {
      setError(null)
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', mediaType)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Actualizar la lista local
        setMedia(prev => [...prev, data.media])
        return data.media
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      console.error('Error uploading media:', err)
      return null
    }
  }

  const deleteMedia = async (url: string): Promise<boolean> => {
    try {
      setError(null)
      
      const params = new URLSearchParams({ url })
      const response = await fetch(`/api/media?${params.toString()}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Remover de la lista local
        setMedia(prev => prev.filter(item => item.url !== url))
        return true
      } else {
        throw new Error(data.error || 'Delete failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed'
      setError(errorMessage)
      console.error('Error deleting media:', err)
      return false
    }
  }

  const refreshMedia = async () => {
    await fetchMedia()
  }

  useEffect(() => {
    fetchMedia()
  }, [type])

  return {
    media,
    loading,
    error,
    uploadMedia,
    deleteMedia,
    refreshMedia
  }
}