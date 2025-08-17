import { useState, useRef, useEffect } from 'react'

interface UseAudioReturn {
  isPlaying: boolean
  toggleAudio: () => void
  volume: number
  setVolume: (volume: number) => void
  currentTime: number
  duration: number
  loading: boolean
  error: string | null
}

export function useAudio(audioUrl?: string): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioUrl) return

    // Crear el elemento de audio
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.loop = true
    audio.volume = volume

    const handleLoadStart = () => setLoading(true)
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setLoading(false)
      setError(null)
    }
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleError = (e: Event) => {
      setError('Error al cargar el audio')
      setLoading(false)
      console.error('Audio error:', e)
    }
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('error', handleError)
    audio.addEventListener('ended', handleEnded)

    audio.src = audioUrl
    audioRef.current = audio

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audioRef.current = null
    }
  }, [audioUrl, volume])

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error('Error playing audio:', error)
            setError('No se pudo reproducir el audio')
          })
      }
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return {
    isPlaying,
    toggleAudio,
    volume,
    setVolume,
    currentTime,
    duration,
    loading,
    error
  }
}