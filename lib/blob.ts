import { put, list, del } from '@vercel/blob'

export type MediaType = 'video' | 'gif' | 'image'

export interface MediaItem {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
  contentType: string
}

export async function uploadMedia(
  file: File | Buffer, 
  filename: string, 
  type: MediaType
): Promise<MediaItem> {
  try {
    const blob = await put(`${type}/${filename}`, file, {
      access: 'public',
      contentType: file instanceof File ? file.type : getContentType(filename)
    })

    return {
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      contentType: blob.contentType || getContentType(filename)
    }
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error)
    throw new Error('Failed to upload media')
  }
}

export async function listMedia(type?: MediaType): Promise<MediaItem[]> {
  try {
    const { blobs } = await list({
      prefix: type ? `${type}/` : undefined
    })

    return blobs.map(blob => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      contentType: blob.contentType || 'application/octet-stream'
    }))
  } catch (error) {
    console.error('Error listing media:', error)
    return []
  }
}

export async function deleteMedia(url: string): Promise<boolean> {
  try {
    await del(url)
    return true
  } catch (error) {
    console.error('Error deleting media:', error)
    return false
  }
}

function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  switch (ext) {
    case 'mp4': return 'video/mp4'
    case 'webm': return 'video/webm'
    case 'mov': return 'video/quicktime'
    case 'gif': return 'image/gif'
    case 'png': return 'image/png'
    case 'jpg':
    case 'jpeg': return 'image/jpeg'
    case 'webp': return 'image/webp'
    default: return 'application/octet-stream'
  }
}

// URLs de medios por defecto para desarrollo
export const DEFAULT_MEDIA = {
  heroImage: '/media/hero-imagen.png',
  aboutStyle: '/media/about-estilo.png',
  aboutWork: '/media/about-trabajo.png',
  tabImages: Array.from({length: 6}, (_, i) => `/media/tab-imagenes-${i + 1}.png`),
  tabGifs: Array.from({length: 3}, (_, i) => `/media/tab-gif-${i + 1}.gif`),
  recapVideo: 'https://www.youtube-nocookie.com/embed/6L0xLhs5_fg'
}