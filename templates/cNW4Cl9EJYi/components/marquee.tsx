"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { useMeasure } from "@/hooks/use-measure"
import { cn } from "@/lib/utils"

export type MarqueeProps = {
  items: Array<string | React.ReactNode>
  direction?: "left" | "right" | "up" | "down"
  speed?: number
  gap?: number
  pauseOnHover?: boolean
  pauseOnFocus?: boolean
  gradient?: boolean
  gradientWidth?: number
  className?: string
  itemClassName?: string
  repeatMultiplier?: number
  ariaLabel?: string
}

export function Marquee({
  items,
  direction = "left",
  speed = 100,
  gap = 48,
  pauseOnHover = true,
  pauseOnFocus = true,
  gradient = true,
  gradientWidth = 64,
  className,
  itemClassName,
  repeatMultiplier = 2,
  ariaLabel = "Scrolling content",
}: MarqueeProps) {
  const controls = useAnimationControls()
  const [measureRef, { width, height }] = useMeasure()
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const isHorizontal = direction === "left" || direction === "right"
  const contentSize = isHorizontal ? width : height
  const duration = contentSize > 0 ? contentSize / speed : 0

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Animation setup
  useEffect(() => {
    if (prefersReducedMotion || contentSize === 0) return

    const getAnimationProps = () => {
      switch (direction) {
        case "left":
          return { x: [0, -contentSize] }
        case "right":
          return { x: [-contentSize, 0] }
        case "up":
          return { y: [0, -contentSize] }
        case "down":
          return { y: [-contentSize, 0] }
        default:
          return { x: [0, -contentSize] }
      }
    }

    controls.start({
      ...getAnimationProps(),
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        duration,
      },
    })
  }, [controls, direction, contentSize, duration, prefersReducedMotion])

  // Pause/resume handlers
  const handleMouseEnter = () => {
    if (pauseOnHover && !prefersReducedMotion) {
      controls.stop()
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover && !prefersReducedMotion) {
      controls.start({
        ...(direction === "left" && { x: [0, -contentSize] }),
        ...(direction === "right" && { x: [-contentSize, 0] }),
        ...(direction === "up" && { y: [0, -contentSize] }),
        ...(direction === "down" && { y: [-contentSize, 0] }),
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          duration,
        },
      })
      setIsPaused(false)
    }
  }

  const handleFocus = () => {
    if (pauseOnFocus && !prefersReducedMotion) {
      controls.stop()
      setIsPaused(true)
    }
  }

  const handleBlur = () => {
    if (pauseOnFocus && !prefersReducedMotion) {
      controls.start({
        ...(direction === "left" && { x: [0, -contentSize] }),
        ...(direction === "right" && { x: [-contentSize, 0] }),
        ...(direction === "up" && { y: [0, -contentSize] }),
        ...(direction === "down" && { y: [-contentSize, 0] }),
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          duration,
        },
      })
      setIsPaused(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault()
      if (isPaused) {
        handleBlur()
      } else {
        handleFocus()
      }
    }
  }

  // Render content group
  const renderContentGroup = (key: string) => (
    <div
      key={key}
      className={cn(
        "flex shrink-0",
        isHorizontal ? "flex-row" : "flex-col",
        isHorizontal ? `gap-x-[${gap}px]` : `gap-y-[${gap}px]`,
      )}
      style={{
        gap: `${gap}px`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={`${key}-${index}`}
          role="listitem"
          className={cn(
            "shrink-0",
            isHorizontal && "whitespace-nowrap",
            "font-medium tracking-wide text-sm md:text-base lg:text-lg",
            itemClassName,
          )}
        >
          {typeof item === "string" ? <span>{item}</span> : item}
        </div>
      ))}
    </div>
  )

  // Gradient masks
  const renderGradientMasks = () => {
    if (!gradient) return null

    const maskStyle = { width: `${gradientWidth}px`, height: `${gradientWidth}px` }

    if (isHorizontal) {
      return (
        <>
          <div
            className="absolute left-0 top-0 z-10 h-full pointer-events-none"
            style={{
              width: `${gradientWidth}px`,
              background: "linear-gradient(to right, rgb(var(--color-background)), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 z-10 h-full pointer-events-none"
            style={{
              width: `${gradientWidth}px`,
              background: "linear-gradient(to left, rgb(var(--color-background)), transparent)",
            }}
          />
        </>
      )
    } else {
      return (
        <>
          <div
            className="absolute top-0 left-0 z-10 w-full pointer-events-none"
            style={{
              height: `${gradientWidth}px`,
              background: "linear-gradient(to bottom, rgb(var(--color-background)), transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 z-10 w-full pointer-events-none"
            style={{
              height: `${gradientWidth}px`,
              background: "linear-gradient(to top, rgb(var(--color-background)), transparent)",
            }}
          />
        </>
      )
    }
  }

  if (prefersReducedMotion) {
    return (
      <div
        className={cn("relative", isHorizontal ? "overflow-x-auto" : "overflow-y-auto", className)}
        role="list"
        aria-label={ariaLabel}
      >
        <div
          className={cn(
            "flex",
            isHorizontal ? "flex-row" : "flex-col",
            isHorizontal ? `gap-x-[${gap}px]` : `gap-y-[${gap}px]`,
          )}
          style={{ gap: `${gap}px` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              role="listitem"
              className={cn(
                "shrink-0",
                isHorizontal && "whitespace-nowrap",
                "font-medium tracking-wide text-sm md:text-base lg:text-lg",
                itemClassName,
              )}
            >
              {typeof item === "string" ? <span>{item}</span> : item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
    >
      {renderGradientMasks()}

      <motion.div
        ref={measureRef}
        animate={controls}
        className={cn("flex", isHorizontal ? "flex-row" : "flex-col")}
        style={{
          willChange: "transform",
        }}
        role="list"
      >
        {Array.from({ length: Math.max(2, repeatMultiplier) }, (_, i) => renderContentGroup(`group-${i}`))}
      </motion.div>
    </div>
  )
}
