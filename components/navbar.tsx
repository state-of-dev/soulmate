"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContent } from "@/hooks/useContent"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const content = useContent()
  
  // Handle loading state and ensure navigation exists
  if (!content || !content.navigation || !content.navigation.links) {
    return null // or a loading skeleton
  }
  
  const navLinks = content.navigation.links

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
    <header
      className={`sticky left-0 right-0 top-0 z-50 border-b border-border transition-colors duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-xl" : "bg-black/70 backdrop-blur-sm"
      }`}
    >
      <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8">
        <nav className="contents">
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.slice(1, 4).map((link) => (
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

          <Link href="#inicio" className="justify-self-center" onClick={(e) => handleNavClick(e, "#inicio")}>
            <div className="flex items-center gap-2 text-lg font-semibold tracking-[-0.04em] text-white">
              <span>{content.navigation.logo}</span>
              <span className="border border-white px-1 py-0.5 font-mono text-[9px] font-semibold tracking-normal">CDMX</span>
            </div>
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
