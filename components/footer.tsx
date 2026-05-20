import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black py-10 text-neutral-400">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 border-y border-border py-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 text-2xl font-semibold tracking-[-0.05em] text-white">Momentos Eternos</div>
            <p className="mb-4 max-w-xs font-mono text-sm leading-6 text-neutral-500">
              Capturamos los momentos más especiales de tu vida con un estilo cinematográfico único.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-neutral-500 transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-neutral-500 transition-colors hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-neutral-500 transition-colors hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Actualizar los enlaces con nuevos colores */}
          <div>
            <h3 className="mono-label mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-[0.12em]">
              <li>
                <Link href="#inicio" className="transition-colors hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#quienes-somos"
                  className="transition-colors hover:text-white"
                >
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="#portafolio" className="transition-colors hover:text-white">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="#paquetes" className="transition-colors hover:text-white">
                  Paquetes
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="transition-colors hover:text-white">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mono-label mb-4">Servicios</h3>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-[0.12em]">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Videos de Boda
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Sesiones Pre-Boda
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Fotografía de Boda
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Álbumes Personalizados
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Drone Aéreo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mono-label mb-4">Contáctanos</h3>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-[0.12em]">
              <li>
                <a href="mailto:info@momentoseternos.com" className="transition-colors hover:text-white">
                  info@momentoseternos.com
                </a>
              </li>
              <li>
                <a href="tel:+34600000000" className="transition-colors hover:text-white">
                  +55 59 24 87 21
                </a>
              </li>
              <li>CDMX, México</li>
            </ul>
          </div>
        </div>

        <div className="text-center font-mono text-xs uppercase tracking-[0.14em] text-neutral-600">
          <p>© {currentYear} Momentos Eternos. Todos los derechos reservados.</p>
        
        </div>
      </div>
    </footer>
  )
}
