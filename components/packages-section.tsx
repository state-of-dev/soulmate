"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type PackageFeature = {
  name: string
  included: boolean
}

type PricePackage = {
  id: string
  name: string
  price: string
  description: string
  popular?: boolean
  features: PackageFeature[]
}

export default function PackagesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const packages: PricePackage[] = [
    {
      id: "basic",
      name: "Esencial",
      price: "€1,499",
      description: "Cobertura básica para capturar los momentos clave de tu boda",
      features: [
        { name: "6 horas de cobertura", included: true },
        { name: "1 videógrafo", included: true },
        { name: "Vídeo resumen (5-7 min)", included: true },
        { name: "Entrega digital", included: true },
        { name: "Drone", included: false },
        { name: "Vídeo documental (20-30 min)", included: false },
        { name: "Sesión pre-boda", included: false },
        { name: "Edición premium", included: false },
      ],
    },
    {
      id: "standard",
      name: "Clásico",
      price: "€2,499",
      description: "Nuestra opción más popular para una cobertura completa",
      popular: true,
      features: [
        { name: "10 horas de cobertura", included: true },
        { name: "2 videógrafos", included: true },
        { name: "Vídeo resumen (8-10 min)", included: true },
        { name: "Entrega digital", included: true },
        { name: "Drone", included: true },
        { name: "Vídeo documental (20-30 min)", included: true },
        { name: "Sesión pre-boda", included: false },
        { name: "Edición premium", included: false },
      ],
    },
    {
      id: "premium",
      name: "Exclusivo",
      price: "€3,999",
      description: "Experiencia cinematográfica completa con todos los extras",
      features: [
        { name: "Cobertura ilimitada", included: true },
        { name: "3 videógrafos", included: true },
        { name: "Vídeo resumen (10-15 min)", included: true },
        { name: "Entrega digital y física", included: true },
        { name: "Drone", included: true },
        { name: "Vídeo documental (30-45 min)", included: true },
        { name: "Sesión pre-boda", included: true },
        { name: "Edición premium", included: true },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="paquetes" className="section-padding border-b border-border bg-black">
      <div className="container mx-auto px-4">
        <div className="mono-label text-center">03 / Production packages</div>
        <h2 className="section-title">Nuestros Paquetes</h2>
        <div className="decorative-line" />
        <p className="section-subtitle">Elige el paquete que mejor se adapte a tus necesidades y presupuesto</p>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 grid grid-cols-1 gap-0 border border-border md:grid-cols-2 lg:grid-cols-3"
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.id} variants={itemVariants}>
              <Card
                className={`relative flex h-full flex-col border-0 border-b border-border bg-black lg:border-b-0 lg:border-r lg:last:border-r-0 ${
                  pkg.popular ? "bg-neutral-950" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute right-0 top-0 border-b border-l border-white bg-white px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black">
                    Más Popular
                  </div>
                )}
                <CardHeader className="min-h-[220px] p-6 md:p-8">
                  <div className="mono-label">{pkg.id}</div>
                  <CardTitle className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-white">{pkg.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-semibold tracking-[-0.06em] text-white">{pkg.price}</span>
                  </div>
                  <CardDescription className="mt-4 max-w-xs text-sm leading-6 text-neutral-400">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-0">
                  <ul className="divide-y divide-border border-b border-border">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 px-6 py-4 md:px-8">
                        {feature.included ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                        ) : (
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                        )}
                        <span className={feature.included ? "text-sm text-neutral-200" : "text-sm text-neutral-600"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 md:p-8">
                  <Button className="w-full" variant={pkg.popular ? "default" : "outline"} asChild>
                    <a href="#contacto">Solicitar Información</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl border border-border p-6 text-center">
          <p className="mb-6 font-mono text-sm leading-6 text-neutral-400">
            ¿Necesitas un paquete personalizado? Contáctanos para crear una solución a medida para tu día especial.
          </p>
          <Button size="lg" variant="outline" asChild>
            <a href="#contacto">Solicitar Paquete Personalizado</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
