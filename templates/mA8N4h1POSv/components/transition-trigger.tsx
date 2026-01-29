"use client"

import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types"
import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation"
import type React from "react"
import { type ReactNode, useEffect, useRef } from "react"
import { type AnimationVariant, createViewTransition } from "@/lib/animations"

interface TransitionTriggerProps {
  href: string
  children: ReactNode
  className?: string
  asChild?: boolean
  variant?: AnimationVariant
  onClick?: () => void
}

export function TransitionTrigger({ href, children, className, variant = "up", onClick }: TransitionTriggerProps) {
  const router = useTransitionRouter()
  const pathname = usePathname()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hasPrefetched = useRef(false)

  useEffect(() => {
    const button = buttonRef.current
    if (!button || hasPrefetched.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPrefetched.current) {
            router.prefetch(href, { kind: PrefetchKind.FULL })
            hasPrefetched.current = true
          }
        })
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      },
    )

    observer.observe(button)

    return () => {
      observer.unobserve(button)
    }
  }, [href, router])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Call optional onClick handler
    if (onClick) {
      onClick()
    }

    // Don't navigate if we're already on the target page
    if (pathname === href) {
      return
    }

    router.push(href, {
      onTransitionReady: () => createViewTransition(variant),
    })
  }

  return (
    <button ref={buttonRef} onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
