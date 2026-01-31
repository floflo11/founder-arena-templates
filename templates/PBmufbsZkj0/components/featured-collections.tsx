import { Button } from "@/components/ui/button"
import type { ShopifyCollection } from "@/lib/shopify/types"
import Link from "next/link"

interface FeaturedCollectionsProps {
  collections: ShopifyCollection[]
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  const fallbackCollections = [
    {
      title: "Mountain Series",
      description: "Technical outerwear engineered for alpine conditions and extreme weather",
      image: "/mountain-climber-in-premium-outdoor-jacket-on-snow.jpg",
      handle: "mountain-series",
    },
    {
      title: "Forest Collection",
      description: "Refined layers crafted for woodland exploration and trail adventures",
      image: "/person-in-luxury-outdoor-clothing-walking-through-.jpg",
      handle: "forest-collection",
    },
    {
      title: "Expedition Gear",
      description: "Premium essentials designed for extended journeys and backcountry travel",
      image: "/outdoor-adventure-gear-laid-out-on-rustic-wooden-s.jpg",
      handle: "expedition-gear",
    },
  ]

  const displayCollections =
    collections.length > 0
      ? collections.slice(0, 3).map((col) => ({
          title: col.title,
          description: col.description || "Explore this collection",
          image: col.image?.url || "/outdoor-clothing-collection.jpg",
          handle: col.handle,
        }))
      : fallbackCollections

  return (
    <section id="collections" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light">
            Curated Collections
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">Crafted for Every Terrain</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayCollections.map((collection, index) => (
            <Link href={`/collections/${collection.handle}`} key={index} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-light mb-2 text-foreground">{collection.title}</h3>
              <p className="text-muted-foreground font-light mb-4">{collection.description}</p>
              <Button variant="link" className="p-0 h-auto font-light text-primary">
                Discover More →
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
