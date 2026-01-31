import type { ShopifyProduct } from "@/lib/shopify/types"
import Link from "next/link"

interface ProductGridProps {
  products: ShopifyProduct[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const fallbackProducts = [
    {
      name: "Heritage Wool Overcoat",
      price: "$895",
      image: "/luxury-wool-overcoat-on-model-in-natural-outdoor-s.jpg",
      tag: "New Arrival",
      handle: "heritage-wool-overcoat",
    },
    {
      name: "Alpine Merino Sweater",
      price: "$325",
      image: "/premium-merino-wool-sweater-outdoor-lifestyle.jpg",
      handle: "alpine-merino-sweater",
    },
    {
      name: "Expedition Field Jacket",
      price: "$1,250",
      image: "/high-end-field-jacket-outdoor-adventure-wear.jpg",
      tag: "Bestseller",
      handle: "expedition-field-jacket",
    },
    {
      name: "Mountain Flannel Shirt",
      price: "$195",
      image: "/luxury-flannel-shirt-outdoor-heritage-style.jpg",
      handle: "mountain-flannel-shirt",
    },
    {
      name: "Technical Down Parka",
      price: "$1,450",
      image: "/luxury-down-parka-outdoor-winter-jacket.jpg",
      tag: "New Arrival",
      handle: "technical-down-parka",
    },
    {
      name: "Cashmere Blend Hoodie",
      price: "$425",
      image: "/premium-cashmere-hoodie-outdoor-lifestyle.jpg",
      handle: "cashmere-blend-hoodie",
    },
    {
      name: "Waxed Canvas Vest",
      price: "$385",
      image: "/waxed-canvas-vest-heritage-outdoor-wear.jpg",
      handle: "waxed-canvas-vest",
    },
    {
      name: "Merino Base Layer",
      price: "$145",
      image: "/merino-wool-base-layer-outdoor-technical-wear.jpg",
      handle: "merino-base-layer",
    },
  ]

  const displayProducts =
    products.length > 0
      ? products.slice(0, 8).map((product) => ({
          name: product.title,
          price: `$${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
          image: product.images.edges[0]?.node.url || "/diverse-outdoor-clothing.png",
          handle: product.handle,
          tag: undefined,
        }))
      : fallbackProducts

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2 font-light">New Arrivals</p>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">Latest Essentials</h2>
          </div>
          <a
            href="#shop"
            className="hidden md:block text-sm tracking-wide hover:text-primary transition-colors font-light"
          >
            VIEW ALL →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, index) => (
            <Link href={`/products/${product.handle}`} key={index} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-muted/50">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs tracking-wide">
                    {product.tag}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-light mb-1 text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground font-light">{product.price}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <a href="#shop" className="text-sm tracking-wide hover:text-primary transition-colors font-light">
            VIEW ALL →
          </a>
        </div>
      </div>
    </section>
  )
}
