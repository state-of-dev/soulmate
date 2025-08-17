"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { Camera, Heart, Users, Award } from "lucide-react"
import { useContent } from "@/hooks/useContent"

export default function AboutSection() {
  const content = useContent()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="quienes-somos" className="section-padding bg-pearl-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{content.about.title}</h2>
        <div className="decorative-line" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-20 mt-16"
        >
          {/* Nuestro Estilo */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <Camera className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-3xl font-bold">{content.about.sections.style.title}</h3>
              </div>
              {content.about.sections.style.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-pearl-200">
                  <div className="text-2xl font-bold text-primary mb-1">{content.about.sections.style.stats[0].value}</div>
                  <div className="text-sm text-muted-foreground">{content.about.sections.style.stats[0].label}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-pearl-200">
                  <div className="text-2xl font-bold text-primary mb-1">{content.about.sections.style.stats[1].value}</div>
                  <div className="text-sm text-muted-foreground">{content.about.sections.style.stats[1].label}</div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/about-estilo.png"
                  alt={content.about.sections.style.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-pearl-200">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Cómo Trabajamos */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/about-trabajo.png"
                  alt={content.about.sections.work.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-pearl-200">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-3xl font-bold">{content.about.sections.work.title}</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {content.about.sections.work.intro}
              </p>
              <div className="space-y-4">
                {content.about.sections.work.process.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
