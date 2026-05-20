"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useContent } from "@/hooks/useContent"
import { useMediaUrls } from "@/hooks/useMediaUrls"

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const content = useContent()
  const mediaUrls = useMediaUrls()
  const services = content.hero.services

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 2000) // Cambia cada 2 segundos

    return () => clearInterval(interval)
  }, [services.length])

  useEffect(() => {
    if (!mediaUrls.aboutWork || mediaUrls.aboutWork === "/placeholder.jpg") return

    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = mediaUrls.aboutWork
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [mediaUrls.aboutWork])

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
      className="grid-surface relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden border-b border-border bg-black px-4 md:px-8"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.92)), url('${mediaUrls.aboutWork}')`,
        backgroundPosition: "top left",
        backgroundRepeat: "repeat",
        backgroundSize: "80px auto",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(to_bottom,transparent,black_85%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 py-20 lg:grid-cols-[1fr_360px] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="mono-label mb-8">Wedding film studio / CDMX / 2026</div>

          <h1 className="text-balance text-6xl font-semibold leading-[0.86] tracking-[-0.08em] text-white md:text-8xl lg:text-[9.5rem]">
            Films for weddings that feel engineered.
          </h1>

          <div className="mt-8 border-y border-border py-6 md:mt-10">
            <div className="relative h-16 overflow-hidden md:h-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center"
                >
                  <span
                    className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-neutral-300 md:text-base"
                    style={{
                      lineHeight: "1.1",
                    }}
                  >
                    Currently crafting: {services[currentIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 max-w-2xl text-balance font-mono text-sm leading-7 text-neutral-400 md:text-base"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                size="lg"
                className="px-8"
                asChild
              >
                <a href="#contacto">{content.hero.buttons.primary}</a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                size="lg"
                variant="outline"
                className="px-8"
                asChild
              >
                <a href="#portafolio">{content.hero.buttons.secondary}</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="border border-border bg-black/60 backdrop-blur-md"
        >
          <div className="border-b border-border p-5">
            <div className="mono-label">Production brief</div>
          </div>
          {[
            ["Format", "Cinematic recap + documentary"],
            ["Coverage", "CDMX / National / International"],
            ["Look", "Sharp contrast / editorial"],
            ["Delivery", "Digital master files"],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[110px_1fr] border-b border-border last:border-b-0">
              <div className="border-r border-border p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">{label}</div>
              <div className="p-4 text-sm text-neutral-200">{value}</div>
            </div>
          ))}
        </motion.aside>
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
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <a href="#quienes-somos" className="text-neutral-500 transition-colors hover:text-white">
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
