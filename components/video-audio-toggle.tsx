"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

interface VideoAudioToggleProps {
  videoRef: React.RefObject<HTMLVideoElement>
  className?: string
}

export default function VideoAudioToggle({ videoRef, className = '' }: VideoAudioToggleProps) {
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVolumeChange = () => {
      setIsMuted(video.muted)
    }

    video.addEventListener('volumechange', handleVolumeChange)
    setIsMuted(video.muted)

    return () => {
      video.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [videoRef])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className={className}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={toggleMute}
          size="lg"
          className={`rounded-full p-4 shadow-xl transition-all duration-300 ${
            isMuted 
              ? 'bg-black/60 hover:bg-black/80 text-pearl-50' 
              : 'bg-pearl-200 hover:bg-pearl-300 text-primary'
          }`}
        >
          <motion.div
            animate={{ rotate: isMuted ? 0 : 360 }}
            transition={{ duration: 0.3 }}
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  )
}