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
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState("recap")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Control de YouTube Player para pausar/reanudar al cambiar tabs
  useEffect(() => {
    if (activeTab === "recap") {
      // Reanudar video al volver a la tab recap
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        )
      }
    } else {
      // Pausar video al salir de la tab recap
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        )
      }
    }
  }, [activeTab])



  const featuredVideos: VideoItem[] = content.portfolio.videos.map((video, index) => ({
    id: (index + 1).toString(),
    title: video.title,
    description: video.description,
    thumbnail: `/media/tab-imagenes-${index + 1}.png`,
    videoUrl: "/media/tab-video.mp4",
  }))

  const galleryItems: GalleryItem[] = content.portfolio.gallery.map((item, index) => ({
    id: `g${index + 1}`,
    title: item.title,
    image: `/media/tab-imagenes-${index + 1}.png`,
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
                      <iframe
                        ref={iframeRef}
                        src="https://www.youtube-nocookie.com/embed/6L0xLhs5_fg?si=nVJDYQg3U75tl4v2&vq=hd1080&enablejsapi=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      />
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
                          src={`/media/tab-gif-${index + 1}.gif`}
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
