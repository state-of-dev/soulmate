"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '@/hooks/useAudio'

interface AudioToggleProps {
  audioUrl?: string
  className?: string
  compact?: boolean
}

export default function AudioToggle({ audioUrl, className = '', compact = false }: AudioToggleProps) {
  const [hasInteracted, setHasInteracted] = useState(false)
  const { isPlaying, toggleAudio, loading, error } = useAudio(audioUrl)

  const handleClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
    toggleAudio()
  }

  // Si no hay audioUrl, mostrar botón deshabilitado
  const noAudio = !audioUrl

  // Modo compacto para posicionamiento sobre video
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className={`${className} group relative`}
      >
        <Button
          onClick={handleClick}
          size="sm"
          className={`rounded-full p-3 shadow-lg backdrop-blur-sm transition-all duration-300 ${
            noAudio 
              ? 'bg-gray-500/60 cursor-not-allowed text-gray-300'
              : isPlaying 
                ? 'bg-pearl-200/90 hover:bg-pearl-300/90 text-primary' 
                : 'bg-black/60 hover:bg-black/80 text-white'
          }`}
          disabled={loading || noAudio}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isPlaying ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </Button>

        {/* Tooltip con texto explicativo */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/80 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
            {noAudio 
              ? 'Audio no disponible' 
              : loading 
                ? 'Cargando...' 
                : isPlaying 
                  ? 'Click para desactivar audio' 
                  : 'Click para activar audio'
            }
          </div>
          <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
        </div>

        {/* Indicador visual de música activa */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-full h-full bg-green-400 rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className={`fixed bottom-6 right-6 z-50 ${className}`}
    >
      <AnimatePresence mode="wait">
        {!hasInteracted ? (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-3 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-full shadow-lg"
          >
            <span className="text-sm font-medium">
              Haz clic para activar música de fondo
            </span>
            <Button
              onClick={handleClick}
              size="sm"
              className="bg-pearl-200 hover:bg-pearl-300 text-primary rounded-full p-2 shadow-xl"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="toggle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button
              onClick={handleClick}
              size="lg"
              className={`rounded-full p-4 shadow-xl transition-all duration-300 ${
                isPlaying 
                  ? 'bg-pearl-200 hover:bg-pearl-300 text-primary' 
                  : 'bg-black/60 hover:bg-black/80 text-white'
              }`}
              disabled={loading}
            >
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : isPlaying ? (
                  <Volume2 className="h-6 w-6" />
                ) : (
                  <VolumeX className="h-6 w-6" />
                )}
              </motion.div>
            </Button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full right-0 mb-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap"
              >
                Error de audio
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador visual de música activa */}
      <AnimatePresence>
        {isPlaying && hasInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-full h-full bg-green-400 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}