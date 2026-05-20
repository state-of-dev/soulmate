import { useState, useEffect } from 'react'
import { DEFAULT_MEDIA } from '@/lib/blob'

interface MediaUrls {
  heroImage: string
  aboutStyle: string
  aboutWork: string
  tabImages: string[]
  tabGifs: string[]
  tabVideo?: string
  recapVideo: string
  backgroundAudio?: string
}

const MEDIA_CACHE_KEY = 'soulmate-media-urls'

const getCachedMediaUrls = (): MediaUrls => {
  if (typeof window === 'undefined') return DEFAULT_MEDIA

  try {
    const cached = window.localStorage.getItem(MEDIA_CACHE_KEY)
    return cached ? { ...DEFAULT_MEDIA, ...JSON.parse(cached) } : DEFAULT_MEDIA
  } catch {
    return DEFAULT_MEDIA
  }
}

export function useMediaUrls(): MediaUrls {
  const [mediaUrls, setMediaUrls] = useState<MediaUrls>(getCachedMediaUrls)

  useEffect(() => {
    // Intentar obtener URLs de Blob si están disponibles
    const fetchBlobUrls = async () => {
      try {
        const response = await fetch('/api/media')
        const data = await response.json()
        
        if (data.success && data.media.length > 0) {
          const updatedUrls: MediaUrls = { ...DEFAULT_MEDIA }
          
          // Mapear los archivos de Blob a las URLs correspondientes
          data.media.forEach((item: any) => {
            const filename = item.pathname.split('/').pop()
            
            if (filename === 'hero-imagen.png') {
              updatedUrls.heroImage = item.url
            } else if (filename === 'about-estilo.png') {
              updatedUrls.aboutStyle = item.url
            } else if (filename === 'about-trabajo.png') {
              updatedUrls.aboutWork = item.url
            } else if (filename?.startsWith('tab-imagenes-')) {
              const index = parseInt(filename.match(/tab-imagenes-(\d+)/)?.[1] || '0') - 1
              if (index >= 0 && index < 6) {
                updatedUrls.tabImages[index] = item.url
              }
            } else if (filename?.startsWith('tab-gif-')) {
              const index = parseInt(filename.match(/tab-gif-(\d+)/)?.[1] || '0') - 1
              if (index >= 0 && index < 3) {
                updatedUrls.tabGifs[index] = item.url
              }
            } else if (filename?.endsWith('.mp4') || filename === 'recap-video.mp4') {
              updatedUrls.tabVideo = item.url
            } else if (filename?.endsWith('.mp3') || filename?.endsWith('.wav') || filename === 'background-music.mp3') {
              updatedUrls.backgroundAudio = item.url
            }
          })
          
          setMediaUrls(updatedUrls)

          try {
            window.localStorage.setItem(MEDIA_CACHE_KEY, JSON.stringify(updatedUrls))
          } catch {
            // Cache is a performance optimization only.
          }
        }
      } catch (error) {
        console.log('Using local media files as fallback')
        // Mantener URLs locales como fallback
      }
    }

    fetchBlobUrls()
  }, [])

  return mediaUrls
}
