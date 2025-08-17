"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <section id="paquetes" className="section-padding bg-gradient-to-b from-pearl-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Nuestros Paquetes</h2>
        <div className="decorative-line" />
        <p className="section-subtitle">Elige el paquete que mejor se adapte a tus necesidades y presupuesto</p>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.id} variants={itemVariants}>
              <Card
                className={`relative h-full flex flex-col ${
                  pkg.popular ? "border-primary shadow-lg shadow-primary/10" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary hover:bg-primary">Más Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                  </div>
                  <CardDescription className="mt-2">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${pkg.popular ? "bg-primary hover:bg-primary/90" : ""}`} asChild>
                    <a href="#contacto">Solicitar Información</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
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
