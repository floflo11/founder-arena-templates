"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export function HeroSection7() {
  return (
    <section className="bg-muted pattern-1 py-16 lg:py-24" aria-labelledby="hero-heading">
      <div className="container px-6 flex flex-col items-center gap-12 lg:gap-16 mx-auto">
        <div className="flex gap-12 lg:gap-16">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
            <h1 id="hero-heading" className="text-foreground text-3xl lg:text-5xl font-bold flex-1">
              Work smarter, not harder with <span className="text-primary">Flowly</span>
            </h1>
            <div className="flex-1 w-full flex flex-col gap-8">
              <p className="text-muted-foreground text-base lg:text-lg">
                Automate workflows, streamline tasks, and collaborate seamlessly – all in one platform. Website built with <a className="text-foreground hover:underline" href="https://www.shadcndesign.com/pro-blocks" target="_blank">shadcndesign.com</a> pro blocks.
              </p>

              <div className="flex flex-col lg:flex-row gap-3">
                <Button>Start free trial</Button>
                <Button variant="ghost">
                  Explore
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-xl border bg-background shadow-xl">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero%20image-BfDDyqA7gEJi5nCcYfKEbZOJR8pYrr.png"
              alt="Flowly dashboard interface showing order statistics and revenue metrics"
              fill
              priority
              className="object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  )
}
