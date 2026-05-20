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
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [weddingMonth, setWeddingMonth] = useState("")
  const [weddingYear, setWeddingYear] = useState("")

  const months = [
    ["01", "Enero"],
    ["02", "Febrero"],
    ["03", "Marzo"],
    ["04", "Abril"],
    ["05", "Mayo"],
    ["06", "Junio"],
    ["07", "Julio"],
    ["08", "Agosto"],
    ["09", "Septiembre"],
    ["10", "Octubre"],
    ["11", "Noviembre"],
    ["12", "Diciembre"],
  ]
  const today = new Date()
  const minTentativeDate = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const minYear = minTentativeDate.getFullYear()
  const minMonth = minTentativeDate.getMonth() + 1
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1
  const years = Array.from({ length: 6 }, (_, index) => String(minYear + index))
  const isMonthDisabled = (month: string) => {
    if (!weddingYear) return false
    return Number(weddingYear) === minYear && Number(month) < minMonth
  }
  const isYearDisabled = (year: string) => {
    return Number(year) === currentYear && !!weddingMonth && Number(weddingMonth) <= currentMonth
  }
  const handleWeddingMonthChange = (month: string) => {
    setWeddingMonth(month)

    if (Number(weddingYear) === currentYear && Number(month) <= currentMonth) {
      setWeddingYear("")
    }
  }
  const handleWeddingYearChange = (year: string) => {
    setWeddingYear(year)

    if (Number(year) === minYear && weddingMonth && Number(weddingMonth) < minMonth) {
      setWeddingMonth("")
    }
  }

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
        setWeddingMonth("")
        setWeddingYear("")
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contacto" className="section-padding border-b border-border bg-black">
      <div className="container mx-auto px-4">
        <div className="mono-label text-center">04 / Start the brief</div>
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
          className="mt-12 grid grid-cols-1 gap-0 border border-border lg:grid-cols-[1fr_420px]"
        >
          <div className="border-b border-border bg-black lg:border-b-0 lg:border-r">
            <div className="border-b border-border p-6 md:p-8">
              <div className="mono-label mb-4">Request quote</div>
              <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">Solicita una Cotización</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Nombre Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Correo Electrónico</Label>
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Teléfono</Label>
                  <Input id="phone" name="phone" placeholder="+34 600 000 000" disabled={formStatus === "submitting"} />
                </div>
                <div className="space-y-2">
                  <Label className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Fecha del Evento</Label>
                  <input type="hidden" name="weddingMonth" value={weddingMonth && weddingYear ? `${weddingYear}-${weddingMonth}` : ""} />
                  <div className="grid grid-cols-[1fr_104px] gap-2">
                    <Select value={weddingMonth} onValueChange={handleWeddingMonthChange} disabled={formStatus === "submitting"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Mes" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map(([value, label]) => (
                          <SelectItem key={value} value={value} disabled={isMonthDisabled(value)}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={weddingYear} onValueChange={handleWeddingYearChange} disabled={formStatus === "submitting"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Año" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year} disabled={isYearDisabled(year)}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="package" className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Paquete de Interés</Label>
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
                <Label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Mensaje</Label>
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
                className="w-full"
                disabled={formStatus === "submitting"}
              >
                {formStatus === "submitting" ? "Enviando..." : "Solicitar Cotización"}
              </Button>

              {formStatus === "success" && (
                <div className="border border-green-900 bg-green-950/40 p-4 text-center font-mono text-sm text-green-300">
                  ¡Gracias por contactarnos! Te responderemos a la brevedad.
                </div>
              )}

              {formStatus === "error" && (
                <div className="border border-red-900 bg-red-950/40 p-4 text-center font-mono text-sm text-red-300">
                  Ha ocurrido un error. Por favor, inténtalo de nuevo.
                </div>
              )}
            </form>
          </div>

          <div className="flex flex-col bg-neutral-950/50">
            <div className="border-b border-border p-6 md:p-8">
              <div className="mono-label mb-4">Project summary</div>
              <h3 className="mb-6 text-3xl font-semibold tracking-[-0.05em] text-white">Información de Contacto</h3>

              <div className="divide-y divide-border border border-border">
                <div className="flex items-start gap-4 p-4">
                  <Mail className="mt-1 h-5 w-5 text-neutral-400" />
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Correo Electrónico</h4>
                    <a href="mailto:info@momentoseternos.com" className="text-sm text-neutral-300 hover:text-white">
                      info@momentoseternos.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4">
                  <Phone className="mt-1 h-5 w-5 text-neutral-400" />
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Teléfono</h4>
                    <a href="tel:+34600000000" className="text-sm text-neutral-300 hover:text-white">
                      +55 60 19 75 32
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4">
                  <MapPin className="mt-1 h-5 w-5 text-neutral-400" />
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">Ubicación</h4>
                    <p className="text-sm leading-6 text-neutral-300">
                      CDMX, México
                      <br />
                      (Disponibles para viajes nacionales e internacionales)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h3 className="mb-4 text-2xl font-semibold tracking-[-0.05em] text-white">Horario de Atención</h3>
              <p className="mb-4 font-mono text-sm leading-6 text-neutral-400">Estamos disponibles para consultas y reuniones:</p>

              <div className="divide-y divide-border border border-border font-mono text-xs text-neutral-300">
                <div className="flex justify-between p-4">
                  <span>Lunes - Viernes:</span>
                  <span>9:00 - 19:00</span>
                </div>
                <div className="flex justify-between p-4">
                  <span>Sábados:</span>
                  <span>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between p-4">
                  <span>Domingos:</span>
                  <span>Cerrado</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-xs leading-5 text-neutral-500">
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
