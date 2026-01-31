"use client"

import { ShoppingBag, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-light tracking-wider text-foreground">
              FRONTIER <span className="font-semibold">1607</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#new-arrivals" className="text-sm font-light tracking-wide hover:text-primary transition-colors">
              NEW ARRIVALS
            </a>
            <a href="#collections" className="text-sm font-light tracking-wide hover:text-primary transition-colors">
              COLLECTIONS
            </a>
            <a href="#outerwear" className="text-sm font-light tracking-wide hover:text-primary transition-colors">
              OUTERWEAR
            </a>
            <a href="#heritage" className="text-sm font-light tracking-wide hover:text-primary transition-colors">
              HERITAGE
            </a>
            <a href="#about" className="text-sm font-light tracking-wide hover:text-primary transition-colors">
              ABOUT
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shopping bag</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#new-arrivals"
              className="block text-sm font-light tracking-wide hover:text-primary transition-colors"
            >
              NEW ARRIVALS
            </a>
            <a
              href="#collections"
              className="block text-sm font-light tracking-wide hover:text-primary transition-colors"
            >
              COLLECTIONS
            </a>
            <a
              href="#outerwear"
              className="block text-sm font-light tracking-wide hover:text-primary transition-colors"
            >
              OUTERWEAR
            </a>
            <a href="#heritage" className="block text-sm font-light tracking-wide hover:text-primary transition-colors">
              HERITAGE
            </a>
            <a href="#about" className="block text-sm font-light tracking-wide hover:text-primary transition-colors">
              ABOUT
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
