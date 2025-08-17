"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VolumeX, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoMuteIndicatorProps {
  videoRef: React.RefObject<HTMLVideoElement>
}

export default function VideoMuteIndicator({ videoRef }: VideoMuteIndicatorProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVolumeChange = () => {
      setIsMuted(video.muted)
      if (video.muted && !video.paused) {
        setShowIndicator(true)
        // Ocultar el indicador después de 3 segundos
        setTimeout(() => setShowIndicator(false), 3000)
      } else {
        setShowIndicator(false)
      }
    }

    const handlePlay = () => {
      if (video.muted) {
        setShowIndicator(true)
        setTimeout(() => setShowIndicator(false), 3000)
      }
    }

    video.addEventListener('volumechange', handleVolumeChange)
    video.addEventListener('play', handlePlay)

    // Check initial state
    handleVolumeChange()

    return () => {
      video.removeEventListener('volumechange', handleVolumeChange)
      video.removeEventListener('play', handlePlay)
    }
  }, [videoRef])

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      setShowIndicator(false)
    }
  }

  return (
    <AnimatePresence>
      {showIndicator && isMuted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute bottom-4 left-4 z-20"
        >
          <Button
            onClick={handleUnmute}
            size="sm"
            className="bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
          >
            <VolumeX className="h-4 w-4" />
            <span className="text-sm">Click para activar audio</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}