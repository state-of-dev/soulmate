"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { useContent } from "@/hooks/useContent"
import { useMediaUrls } from "@/hooks/useMediaUrls"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const content = useContent()
  const mediaUrls = useMediaUrls()
  const services = content.hero.services

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 2000) // Cambia cada 2 segundos

    return () => clearInterval(interval)
  }, [services.length])

  if (!mounted) return null

  const textVariants = {
    enter: {
      y: 100,
      opacity: 0,
      scale: 0.6,
      rotateX: -90,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      scale: 1.4,
      rotateX: 90,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center py-32"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('${mediaUrls.heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Texto animado principal - más grande */}
          <div className="mb-12 leading-tight">
            <div className="relative h-32 md:h-40 lg:h-48 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span
                    className={`text-4xl md:text-5xl lg:text-7xl font-playfair italic font-bold ${services[currentIndex].color} text-center px-4`}
                    style={{
                      textShadow: "0 0 40px rgba(248, 243, 236, 0.8), 0 0 80px rgba(248, 243, 236, 0.4)",
                      lineHeight: "1.1",
                    }}
                  >
                    {services[currentIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <motion.div
              animate={{
                width: [96, 128, 96],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="h-0.5 bg-pearl-200"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-pearl-100 mb-12 font-light leading-relaxed"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-pearl-200 hover:bg-pearl-300 text-primary rounded-full px-8 py-4 font-medium shadow-xl hover:shadow-2xl transition-all duration-300"
                asChild
              >
                <a href="#contacto">
                  {content.hero.buttons.primary} <Heart className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent backdrop-blur-sm border-2 border-pearl-200/50 text-pearl-50 hover:bg-pearl-50/10 hover:border-pearl-200 rounded-full px-8 py-4 font-light transition-all duration-300"
                asChild
              >
                <a href="#portafolio">{content.hero.buttons.secondary}</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <a href="#quienes-somos" className="text-pearl-200 hover:text-pearl-50 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
