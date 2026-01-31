"use client"

import dynamic from "next/dynamic"

// Dynamically import client components with SSR disabled
export const AnimatedText = dynamic(() => import("@/components/animated-text").then((mod) => mod.AnimatedText), { ssr: false })
export const AnimatedSection = dynamic(() => import("@/components/animated-section").then((mod) => mod.AnimatedSection), {
  ssr: false,
})
export const AnimatedCard = dynamic(() => import("@/components/animated-card").then((mod) => mod.AnimatedCard), { ssr: false })
export const ParticleBackground = dynamic(
  () => import("@/components/particle-background").then((mod) => mod.ParticleBackground),
  { ssr: false },
)
export const AnimatedGradientBackground = dynamic(
  () => import("@/components/ui/animated-gradient-background").then((mod) => mod.AnimatedGradientBackground),
  { ssr: false },
)
export const ClientMotion = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })
