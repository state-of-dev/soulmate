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
  const navLinks = content.navigation.links

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-pearl-50/95 backdrop-blur-md shadow-lg border-b border-pearl-200"
          : "bg-gradient-to-b from-black/30 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="#inicio" className="flex items-center" onClick={(e) => handleNavClick(e, "#inicio")}>
            <div className="text-2xl font-playfair font-bold">
              <span className={isScrolled ? "text-primary" : "text-pearl-50"}>{content.navigation.logo}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  link.name === "Contáctanos"
                    ? `rounded-full px-6 py-3 ${
                        isScrolled
                          ? "bg-primary text-pearl-50 hover:bg-primary/90 shadow-md"
                          : "bg-pearl-50/20 backdrop-blur-sm text-pearl-50 border border-pearl-50/30 hover:bg-pearl-50/30"
                      }`
                    : isScrolled
                      ? "text-primary/80 hover:text-primary font-medium"
                      : "text-pearl-50/90 hover:text-pearl-50 font-light"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled ? "text-primary hover:bg-pearl-100" : "text-pearl-50 hover:bg-pearl-50/20"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={content.navigation.toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-pearl-50/98 backdrop-blur-md shadow-xl border-b border-pearl-200">
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 text-primary/80 hover:text-primary font-medium transition-colors rounded-lg hover:bg-pearl-100 ${
                    link.name === "Contáctanos"
                      ? "bg-primary text-pearl-50 hover:bg-primary/90 hover:text-pearl-50 text-center"
                      : ""
                  }`}
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
