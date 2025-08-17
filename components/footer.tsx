import Link from "next/link"
import { Instagram, Facebook, Youtube, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-pearl-50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-playfair font-bold mb-4 text-pearl-100">Momentos Eternos</div>
            <p className="text-pearl-200 mb-4 font-light">
              Capturamos los momentos más especiales de tu vida con un estilo cinematográfico único.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-pearl-200 hover:text-pearl-100 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-pearl-200 hover:text-pearl-100 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-pearl-200 hover:text-pearl-100 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Actualizar los enlaces con nuevos colores */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-pearl-100">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#quienes-somos"
                  className="text-pearl-200 hover:text-pearl-100 transition-colors font-light"
                >
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="#portafolio" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="#paquetes" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Paquetes
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-pearl-100">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Videos de Boda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Sesiones Pre-Boda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Fotografía de Boda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Álbumes Personalizados
                </Link>
              </li>
              <li>
                <Link href="#" className="text-pearl-200 hover:text-pearl-100 transition-colors font-light">
                  Drone Aéreo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-pearl-100">Contáctanos</h3>
            <ul className="space-y-2 text-pearl-200">
              <li>
                <a href="mailto:info@momentoseternos.com" className="hover:text-pearl-100 transition-colors font-light">
                  info@momentoseternos.com
                </a>
              </li>
              <li>
                <a href="tel:+34600000000" className="hover:text-pearl-100 transition-colors font-light">
                  +55 59 24 87 21
                </a>
              </li>
              <li className="font-light">CDMX, México</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-pearl-600 pt-6 mt-6 text-center text-pearl-300 text-sm">
          <p>© {currentYear} Momentos Eternos. Todos los derechos reservados.</p>
        
        </div>
      </div>
    </footer>
  )
}
