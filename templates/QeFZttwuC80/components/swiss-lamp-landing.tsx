"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Menu, ShoppingCart, X, Minus, Plus } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// --- Types & Data ---

interface Product {
  id: string
  name: string
  designer: string
  year: string
  price: number
  image: string
  darkImage?: string
}

interface CartItem extends Product {
  quantity: number
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Akari 1A",
    designer: "Isamu Noguchi",
    year: "1951",
    price: 450,
    image: "/images/20image-2016.png",
    darkImage: "/images/nighttime-lamp-scene.png",
  },
  {
    id: "2",
    name: "Taccia Small",
    designer: "Achille Castiglioni",
    year: "1962",
    price: 1250,
    image: "/images/20image-2019.png",
    darkImage: "/images/nighttime-lamp-scene-19.png",
  },
  {
    id: "3",
    name: "Atollo 233",
    designer: "Vico Magistretti",
    year: "1977",
    price: 980,
    image: "/images/20image-2017.png",
    darkImage: "/images/nighttime-lamp-scene-new.png",
  },
  {
    id: "4",
    name: "Snoopy",
    designer: "A. & P. Castiglioni",
    year: "1967",
    price: 1100,
    image: "/images/20image-2021.png",
    darkImage: "/images/nighttime-lamp-scene-21.png",
  },
  {
    id: "5",
    name: "Panthella Portable",
    designer: "Verner Panton",
    year: "1971",
    price: 350,
    image: "/images/20image-2022.png",
    darkImage: "/images/nighttime-lamp-scene-22.png",
  },
  {
    id: "6",
    name: "Nessino",
    designer: "Giancarlo Mattioli",
    year: "1967",
    price: 280,
    image: "/images/20image-2020.png",
    darkImage: "/images/nighttime-lamp-scene-20.png",
  },
]

// --- Sub-Components ---

const Header = ({
  isDark,
  toggleTheme,
  cartCount,
  onCartClick,
  isMobileMenuOpen,
  onMobileMenuToggle,
}: {
  isDark: boolean
  toggleTheme: () => void
  cartCount: number
  onCartClick: () => void
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}) => (
  <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border transition-colors duration-500">
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
      <div className="flex-1 flex items-center">
        <h1 className="text-lg md:text-xl font-medium tracking-tight text-foreground transition-colors duration-500">
          LUCENT ARCHIVE
        </h1>
      </div>

      <nav className="hidden md:flex flex-1 justify-end gap-8 lg:gap-12 items-center">
        {["Collection", "Designers", "Journal", "About"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {item}
          </a>
        ))}

        <button
          onClick={onCartClick}
          className="relative ml-4 p-2 text-foreground hover:text-muted-foreground transition-colors duration-300"
          aria-label="Shopping cart"
        >
          <ShoppingCart size={20} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={toggleTheme}
          className="ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          style={{
            backgroundColor: isDark ? "#404040" : "#d4d4d4",
          }}
          aria-label="Toggle theme"
          role="switch"
          aria-checked={isDark}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
      </nav>

      <div className="md:hidden flex items-center gap-3">
        <button onClick={onCartClick} className="relative text-foreground" aria-label="Shopping cart">
          <ShoppingCart size={20} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={toggleTheme}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none"
          style={{
            backgroundColor: isDark ? "#404040" : "#d4d4d4",
          }}
          aria-label="Toggle theme"
          role="switch"
          aria-checked={isDark}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
        <button onClick={onMobileMenuToggle} className="text-foreground" aria-label="Toggle mobile menu">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  </header>
)

const IntroSection = () => (
  <section className="w-full pt-20 pb-20 md:pt-32 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-transparent md:border-transparent">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 lg:col-span-7">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[1.1] transition-colors duration-500 tracking-[-0.065em]"
        >
          Form follows light. <br />A curated selection of timeless illumination.
        </motion.h2>
      </div>
      <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-end items-start md:pl-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-xs"
        >
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light transition-colors duration-500">
            Defining spaces through clarity, proportion, and purposeful design. Objects that exist between function and
            sculpture.
          </p>
          <div className="mt-8 h-px w-12 bg-foreground transition-colors duration-500"></div>
        </motion.div>
      </div>
    </div>
  </section>
)

const ProductCard = ({
  product,
  index,
  isDark,
  onClick,
}: {
  product: Product
  index: number
  isDark: boolean
  onClick: () => void
}) => {
  const imageToShow = isDark && product.darkImage ? product.darkImage : product.image

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-secondary mb-6">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ opacity: isDark && product.darkImage ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {product.darkImage && (
          <motion.img
            src={product.darkImage}
            alt={`${product.name} - dark mode`}
            animate={{ opacity: isDark ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-medium text-foreground">{product.name}</h3>
          <span className="text-sm font-normal text-foreground">${product.price}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-muted-foreground font-light">
            {product.designer}, {product.year}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const ProductLightbox = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isDark,
}: {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
  isDark: boolean
}) => {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-[75vw] lg:max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background sm:max-w-[95vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-secondary overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              animate={{ opacity: isDark && product.darkImage ? 0 : 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {product.darkImage && (
              <motion.img
                src={product.darkImage}
                alt={`${product.name} - dark mode`}
                animate={{ opacity: isDark ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-3 text-foreground tracking-tight">
                {product.name}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-1">{product.designer}</p>
              <p className="text-sm text-muted-foreground mb-6">Designed in {product.year}</p>

              <Separator className="my-6" />

              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                An iconic piece of lighting design that embodies timeless elegance and functional beauty. Crafted with
                precision and attention to detail, this lamp represents the pinnacle of mid-century modern design
                philosophy.
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl sm:text-3xl font-normal text-foreground">${product.price}</span>
                <span className="text-sm text-muted-foreground">USD</span>
              </div>
            </div>

            <Button
              onClick={() => {
                onAddToCart(product)
                onClose()
              }}
              className="w-full h-12 text-base font-medium"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  isDark,
}: {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  isDark: boolean
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 50 : 0
  const total = subtotal + shipping

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="px-6 py-6 border-b border-border">
          <SheetTitle className="text-xl font-medium">Shopping Cart</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <ShoppingCart size={48} className="mx-auto mb-4 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const imageToShow = isDark && item.darkImage ? item.darkImage : item.image
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-secondary rounded overflow-hidden flex-shrink-0 relative">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          animate={{ opacity: isDark && item.darkImage ? 0 : 1 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {item.darkImage && (
                          <motion.img
                            src={item.darkImage}
                            alt={`${item.name} - dark mode`}
                            animate={{ opacity: isDark ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.designer}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="h-8 w-8 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-border p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">${shipping}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <Button className="w-full h-12 text-base font-medium">Proceed to Checkout</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

const Footer = () => (
  <footer className="w-full border-t border-border mt-20 md:mt-32 bg-background transition-colors duration-500">
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-lg font-medium mb-6 text-foreground transition-colors duration-500">LUCENT ARCHIVE</h4>
          <p className="text-muted-foreground max-w-md font-light transition-colors duration-500">
            Dedicated to the preservation and distribution of iconic lighting design. Based in Zurich, shipping
            worldwide.
          </p>
        </div>
        <div>
          <h5 className="text-sm font-medium uppercase tracking-wider text-foreground mb-6 transition-colors duration-500">
            Explore
          </h5>
          <ul className="flex flex-col gap-4">
            {["Collection", "Designers", "About", "Contact"].map((link) => (
              <li key={link}>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-medium uppercase tracking-wider text-foreground mb-6 transition-colors duration-500">
            Connect
          </h5>
          <ul className="flex flex-col gap-4">
            {["Instagram", "Pinterest", "Newsletter"].map((link) => (
              <li key={link}>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-end mt-20 pt-8 border-t border-border transition-colors duration-500">
        <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest transition-colors duration-500">
          © 2026 Lucent Archive
        </span>
        <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest mt-4 md:mt-0 transition-colors duration-500">
          Typographic System: Inter
        </span>
      </div>
    </div>
  </footer>
)

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent side="right" className="w-[280px] sm:w-[350px]">
      <SheetHeader className="mb-8">
        <SheetTitle className="text-xl font-medium">Menu</SheetTitle>
      </SheetHeader>
      <nav className="flex flex-col gap-6">
        {["Collection", "Designers", "Journal", "About"].map((item) => (
          <a
            key={item}
            href="#"
            onClick={onClose}
            className="text-lg font-normal text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
)

export function SwissLampLanding() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme")
    if (stored) {
      setIsDark(stored === "dark")
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark, mounted])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsLightboxOpen(true)
  }

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="relative w-full min-h-screen bg-background font-sans text-foreground selection:bg-foreground selection:text-background">
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        cartCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="w-full">
        <IntroSection />

        {/* Editorial Divider */}
        <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto mb-12">
          <div className="w-full h-px bg-border" />
          <div className="flex justify-between mt-2">
            <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
              Fig. 01 — Collection
            </span>
            <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">2024</span>
          </div>
        </div>

        {/* Product Grid */}
        <section className="w-full px-6 md:px-12 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24">
            {PRODUCTS.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isDark={isDark}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </section>

        {/* Featured Editorial Block */}
        <section className="w-full mt-32 px-6 md:px-12 max-w-[1600px] mx-auto">
          <div className="border-t border-border pt-12 md:pt-24 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl md:text-5xl font-normal leading-tight mb-8 text-foreground">
                  The philosophy of reduction.
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8 font-light">
                  Our approach is rooted in the belief that lighting should be felt before it is seen. We select pieces
                  that demonstrate restraint, honesty in materials, and absolute precision.
                </p>
                <button className="group flex items-center text-sm font-medium uppercase tracking-widest hover:text-muted-foreground transition-colors duration-300">
                  Read the Journal{" "}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <div className="order-1 lg:order-2 w-full aspect-[4/3] bg-secondary overflow-hidden relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop"
                  alt="Interior detail - light mode"
                  animate={{ opacity: isDark ? 0 : 1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <motion.img
                  src="/images/nighttime-lamp-scene-23.png"
                  alt="Interior detail - dark mode"
                  animate={{ opacity: isDark ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ProductLightbox and CartSidebar */}
      <ProductLightbox
        product={selectedProduct}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onAddToCart={handleAddToCart}
        isDark={isDark}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        isDark={isDark}
      />

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  )
}
