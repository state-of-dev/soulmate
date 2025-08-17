"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulación de envío de formulario
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus("idle")
        ;(e.target as HTMLFormElement).reset()
        setDate(undefined)
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contacto" className="section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Contáctanos</h2>
        <div className="decorative-line" />
        <p className="section-subtitle">
          Cuéntanos sobre tu boda y cómo podemos ayudarte a capturar esos momentos especiales
        </p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12"
        >
          <div className="bg-white dark:bg-black/40 rounded-lg shadow-md p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Solicita una Cotización</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" name="phone" placeholder="+34 600 000 000" disabled={formStatus === "submitting"} />
                </div>
                <div className="space-y-2">
                  <Label>Fecha de la Boda</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        disabled={formStatus === "submitting"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="package">Paquete de Interés</Label>
                <Select disabled={formStatus === "submitting"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un paquete" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essential">Esencial</SelectItem>
                    <SelectItem value="classic">Clásico</SelectItem>
                    <SelectItem value="exclusive">Exclusivo</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntanos sobre tu boda y cualquier detalle importante..."
                  rows={5}
                  disabled={formStatus === "submitting"}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={formStatus === "submitting"}
              >
                {formStatus === "submitting" ? "Enviando..." : "Solicitar Cotización"}
              </Button>

              {formStatus === "success" && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 p-4 rounded-md text-center">
                  ¡Gracias por contactarnos! Te responderemos a la brevedad.
                </div>
              )}

              {formStatus === "error" && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 p-4 rounded-md text-center">
                  Ha ocurrido un error. Por favor, inténtalo de nuevo.
                </div>
              )}
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-white dark:bg-black/40 rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4" />
                  <div>
                    <h4 className="font-medium">Correo Electrónico</h4>
                    <a href="mailto:info@momentoseternos.com" className="text-muted-foreground hover:text-primary">
                      info@momentoseternos.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4" />
                  <div>
                    <h4 className="font-medium">Teléfono</h4>
                    <a href="tel:+34600000000" className="text-muted-foreground hover:text-primary">
                      +55 60 19 75 32
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4" />
                  <div>
                    <h4 className="font-medium">Ubicación</h4>
                    <p className="text-muted-foreground">
                      CDMX, México
                      <br />
                      (Disponibles para viajes nacionales e internacionales)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black/40 rounded-lg shadow-md p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4">Horario de Atención</h3>
              <p className="text-muted-foreground mb-4">Estamos disponibles para consultas y reuniones:</p>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span>9:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span>Cerrado</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  * También disponibles para reuniones virtuales fuera del horario habitual, previa cita.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
