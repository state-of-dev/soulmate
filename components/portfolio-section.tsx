"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContent } from "@/hooks/useContent"
import { useMediaUrls } from "@/hooks/useMediaUrls"
import VideoAudioToggle from "@/components/video-audio-toggle"

type VideoItem = {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
}

type GalleryItem = {
  id: string
  title: string
  image: string
  description: string
}

export default function PortfolioSection() {
  const content = useContent()
  const mediaUrls = useMediaUrls()
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState("recap")
  const [videoLoading, setVideoLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Control de video para pausar/reanudar al cambiar tabs
  useEffect(() => {
    if (activeTab === "recap" && videoRef.current && mediaUrls.tabVideo) {
      // Auto-play video al entrar a la tab recap (mantener muted)
      const video = videoRef.current
      video.play().catch(console.error)
    } else if (activeTab !== "recap" && videoRef.current) {
      // Pausar video al salir de la tab recap (mantiene la posición)
      videoRef.current.pause()
    }
  }, [activeTab, mediaUrls.tabVideo])

  // Auto-play cuando el video se carga por primera vez
  useEffect(() => {
    if (videoRef.current && activeTab === "recap" && mediaUrls.tabVideo) {
      const video = videoRef.current
      const handleLoadedData = () => {
        if (activeTab === "recap") {
          video.play().catch(console.error)
        }
      }
      
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA
        handleLoadedData()
      } else {
        video.addEventListener('loadeddata', handleLoadedData)
        return () => video.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [mediaUrls.tabVideo, activeTab])

  // Reset loading cuando cambie la URL del video
  useEffect(() => {
    if (mediaUrls.tabVideo) {
      setVideoLoading(true)
    }
  }, [mediaUrls.tabVideo])



  const featuredVideos: VideoItem[] = content.portfolio.videos.map((video, index) => ({
    id: (index + 1).toString(),
    title: video.title,
    description: video.description,
    thumbnail: mediaUrls.tabImages[index] || `/media/tab-imagenes-${index + 1}.png`,
    videoUrl: mediaUrls.tabVideo || "/media/tab-video.mp4",
  }))

  const galleryItems: GalleryItem[] = content.portfolio.gallery.map((item, index) => ({
    id: `g${index + 1}`,
    title: item.title,
    image: mediaUrls.tabImages[index] || `/media/tab-imagenes-${index + 1}.png`,
    description: item.description,
  }))

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.ceil(galleryItems.length / 3) - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(galleryItems.length / 3) - 1 : prev - 1))
  }

  const visibleGalleryItems = galleryItems.slice(currentSlide * 3, currentSlide * 3 + 3)

  return (
    <section id="portafolio" className="section-padding border-b border-border bg-black">
      <div className="container mx-auto px-4">
        <div className="mono-label text-center">02 / Selected work</div>
        <h2 className="section-title distort-title" data-text={content.portfolio.title}>{content.portfolio.title}</h2>
        <div className="decorative-line" />
        <p className="section-subtitle">
          {content.portfolio.subtitle}
        </p>

        <Tabs defaultValue="recap" className="mt-12" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3">
            <TabsTrigger value="recap">{content.portfolio.tabs.recap}</TabsTrigger>
            <TabsTrigger value="videos">{content.portfolio.tabs.videos}</TabsTrigger>
            <TabsTrigger value="gallery">{content.portfolio.tabs.gallery}</TabsTrigger>
          </TabsList>

          {/* Video Recap - Siempre montado, solo visible cuando activeTab === 'recap' */}
          <div className={`mt-8 ${activeTab === 'recap' ? 'block' : 'hidden'}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeTab === 'recap' ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-5xl">
                <Card className="overflow-hidden border-border bg-black">
                  <CardContent className="p-0">
                    <div className="relative aspect-video border-b border-border">
                      <>
                        {/* Loader mientras carga el video */}
                        {videoLoading && (
                          <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-black">
                            <div className="text-center text-white">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="mx-auto mb-4 h-10 w-10 border border-white border-t-transparent"
                              />
                              <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400">Cargando video...</p>
                            </div>
                          </div>
                        )}

                        {/* Video */}
                        {mediaUrls.tabVideo && (
                          <video
                            ref={videoRef}
                            controls
                            muted={true}
                            playsInline
                            preload="metadata"
                            className="h-full w-full bg-black"
                            onLoadStart={() => setVideoLoading(true)}
                            onLoadedData={() => {
                              setVideoLoading(false)
                              if (activeTab === "recap" && videoRef.current) {
                                videoRef.current.play().catch(console.error)
                              }
                            }}
                            onError={() => setVideoLoading(false)}
                          >
                            <source src={mediaUrls.tabVideo} type="video/mp4" />
                            Tu navegador no soporta el elemento video.
                          </video>
                        )}
                      </>
                      
                      {/* Botón de audio del video en la esquina superior derecha */}
                      {mediaUrls.tabVideo && (
                        <div className="absolute right-4 top-4 z-10">
                          <VideoAudioToggle 
                            videoRef={videoRef}
                            className="relative"
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid gap-4 p-6 md:grid-cols-[240px_1fr]">
                      <div className="mono-label">Featured recap</div>
                      <div>
                      <h3 className="distort-title mb-2 text-3xl font-semibold tracking-[-0.05em] text-white" data-text={content.portfolio.recap.title}>{content.portfolio.recap.title}</h3>
                      <p className="max-w-2xl text-neutral-400">
                        {content.portfolio.recap.description}
                      </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          <TabsContent value="recap" className="mt-8">
            {/* Contenido vacío - el video está arriba para evitar desmontaje */}
          </TabsContent>

          <TabsContent value="videos" className="mt-8">
            <motion.div
              ref={ref}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {featuredVideos.map((video, index) => (
                <Card key={video.id} className="group overflow-hidden border-border bg-black transition-colors hover:border-neutral-500">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="relative h-56 border-b border-border md:h-64 lg:h-72">
                        <Image
                          src={mediaUrls.tabGifs[index] || `/media/tab-gif-${index + 1}.gif`}
                          alt={video.title}
                          fill
                          className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                          unoptimized
                        />
                      </div>
                      <div className="p-5">
                        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">Film / {String(index + 1).padStart(2, "0")}</div>
                        <h3 className="distort-title text-xl font-semibold tracking-[-0.04em] text-white" data-text={video.title}>{video.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-400">{video.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

          </TabsContent>

          <TabsContent value="gallery" className="mt-8">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {visibleGalleryItems.map((item) => (
                  <Card key={item.id} className="group overflow-hidden border-border bg-black transition-colors hover:border-neutral-500">
                    <CardContent className="p-0">
                      <div className="relative h-[420px] md:h-[520px] lg:h-[560px]">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover object-top grayscale transition duration-500 group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-black/70 p-5 text-white backdrop-blur-sm">
                          <h3 className="distort-title text-lg font-semibold tracking-[-0.04em]" data-text={item.title}>{item.title}</h3>
                          <p className="mt-1 font-mono text-xs leading-5 text-neutral-400">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              <div className="mt-8 flex justify-center gap-2">
                <Button variant="outline" size="icon" onClick={prevSlide}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
