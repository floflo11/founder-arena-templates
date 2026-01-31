import { Hero } from "@/components/hero"
import { Navigation } from "@/components/navigation"
import { FeaturedCollections } from "@/components/featured-collections"
import { ProductGrid } from "@/components/product-grid"
import { Heritage } from "@/components/heritage"
import { Footer } from "@/components/footer"
import { getCollections, getProducts } from "@/lib/shopify"

export default async function Home() {
  let collections = []
  let products = []

  try {
    collections = await getCollections(6)
  } catch (error) {
    console.error("Failed to fetch collections:", error)
  }

  try {
    products = await getProducts({ first: 8, sortKey: "CREATED_AT", reverse: true })
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedCollections collections={collections} />
      <ProductGrid products={products} />
      <Heritage />
      <Footer />
    </main>
  )
}
