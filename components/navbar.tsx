"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContent } from "@/hooks/useContent"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const content = useContent()
  
  // Handle loading state and ensure navigation exists
  if (!content || !content.navigation || !content.navigation.links) {
    return null // or a loading skeleton
  }
  
  const navLinks = content.navigation.links.filter((link) => link.href !== "#paquetes")

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 72
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <header className="sticky left-0 right-0 top-0 z-50 border-b border-border bg-black">
      <div className="grid h-[72px] grid-cols-[1fr_auto] items-center px-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <nav className="contents">
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.slice(1, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-300 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="#inicio"
            className="justify-self-start md:justify-self-center"
            onClick={(e) => handleNavClick(e, "#inicio")}
            aria-label="Soulmate inicio"
          >
            <Image
              src="/logo-navbar.png"
              alt="Soulmate"
              width={220}
              height={82}
              priority
              className="h-10 w-auto object-contain md:h-12"
            />
          </Link>

          <div className="hidden items-center justify-end gap-8 md:flex">
            <Link
              href="#portafolio"
              onClick={(e) => handleNavClick(e, "#portafolio")}
              className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-300 transition-colors hover:text-white"
            >
              Reel
            </Link>
            <Link
              href="#contacto"
              onClick={(e) => handleNavClick(e, "#contacto")}
              className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:text-neutral-300"
            >
              Get a quote
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="justify-self-end text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={content.navigation.toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-border bg-black md:hidden">
            <div className="flex flex-col divide-y divide-border px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="py-5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
