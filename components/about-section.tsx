"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { Camera, Heart } from "lucide-react"
import { useContent } from "@/hooks/useContent"
import { useMediaUrls } from "@/hooks/useMediaUrls"

export default function AboutSection() {
  const content = useContent()
  const mediaUrls = useMediaUrls()
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
    <section id="quienes-somos" className="section-padding border-b border-border bg-black">
      <div className="container mx-auto px-4">
        <div className="mono-label text-center">01 / Studio operating system</div>
        <h2 className="section-title">{content.about.title}</h2>
        <div className="decorative-line" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 space-y-20"
        >
          <motion.div variants={itemVariants} className="grid gap-0 border border-border md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="border-b border-border p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Camera className="h-5 w-5 text-neutral-400" />
                  <span className="mono-label">Visual direction</span>
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">{content.about.sections.style.title}</h3>
              </div>
              <div className="p-6 md:p-8">
                {content.about.sections.style.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-6 max-w-xl text-base leading-7 text-neutral-400 md:text-lg">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-8 grid grid-cols-2 border border-border">
                  <div className="border-r border-border p-5">
                    <div className="mb-1 text-3xl font-semibold tracking-[-0.05em] text-white">{content.about.sections.style.stats[0].value}</div>
                    <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">{content.about.sections.style.stats[0].label}</div>
                  </div>
                  <div className="p-5">
                    <div className="mb-1 text-3xl font-semibold tracking-[-0.05em] text-white">{content.about.sections.style.stats[1].value}</div>
                    <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">{content.about.sections.style.stats[1].label}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative order-1 border-b border-border md:order-2 md:border-b-0 md:border-l">
              <div className="relative h-96 overflow-hidden md:h-full md:min-h-[620px]">
                <Image
                  src={mediaUrls.aboutStyle}
                  alt={content.about.sections.style.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-0 border border-border md:grid-cols-2">
            <div className="relative border-b border-border md:border-b-0 md:border-r">
              <div className="relative h-96 overflow-hidden md:h-full md:min-h-[560px]">
                <Image
                  src={mediaUrls.aboutWork}
                  alt={content.about.sections.work.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
            </div>
            <div>
              <div className="border-b border-border p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Heart className="h-5 w-5 text-neutral-400" />
                  <span className="mono-label">Process</span>
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">{content.about.sections.work.title}</h3>
              </div>
              <div className="p-6 md:p-8">
                <p className="mb-8 max-w-xl text-base leading-7 text-neutral-400 md:text-lg">
                  {content.about.sections.work.intro}
                </p>
              <div className="border border-border">
                {content.about.sections.work.process.map((step, index) => (
                  <div key={index} className="grid grid-cols-[64px_1fr] border-b border-border last:border-b-0">
                    <div className="border-r border-border p-4 font-mono text-xs text-neutral-500">{String(index + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="p-4">
                      <h4 className="mb-1 font-semibold text-white">{step.title}</h4>
                      <p className="text-sm leading-6 text-neutral-400">
                        {step.description}
                      </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
