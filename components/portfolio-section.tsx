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
    <section id="portafolio" className="section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{content.portfolio.title}</h2>
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
              <div className="max-w-4xl w-full">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <>
                        {/* Loader mientras carga el video */}
                        {videoLoading && (
                          <div className="absolute inset-0 w-full h-full rounded-lg bg-black flex items-center justify-center z-10">
                            <div className="text-center text-white">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-12 border-4 border-pearl-200 border-t-transparent rounded-full mx-auto mb-4"
                              />
                              <p className="text-lg font-medium">Cargando video...</p>
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
                            className="w-full h-full rounded-lg bg-black"
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
                        <div className="absolute top-4 right-4 z-10">
                          <VideoAudioToggle 
                            videoRef={videoRef}
                            className="relative"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-2xl mb-2">{content.portfolio.recap.title}</h3>
                      <p className="text-muted-foreground">
                        {content.portfolio.recap.description}
                      </p>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredVideos.map((video, index) => (
                <Card key={video.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative group">
                      <div className="relative h-48 md:h-56 lg:h-64">
                        <Image
                          src={mediaUrls.tabGifs[index] || `/media/tab-gif-${index + 1}.gif`}
                          alt={video.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{video.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{video.description}</p>
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleGalleryItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-64 md:h-72">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <p className="text-sm text-white/80 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              <div className="flex justify-center mt-8 gap-2">
                <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
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
