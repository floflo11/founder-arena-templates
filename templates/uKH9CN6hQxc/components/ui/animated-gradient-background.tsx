"use client"

import { useEffect, useRef } from "react"

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient circles
    const circles: Circle[] = []
    for (let i = 0; i < 5; i++) {
      circles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 300 + 100,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        color: i % 2 === 0 ? "rgba(147, 51, 234, 0.07)" : "rgba(79, 70, 229, 0.07)", // Purple and indigo with low opacity
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw and update circles
      circles.forEach((circle) => {
        // Update position
        circle.x += circle.vx
        circle.y += circle.vy

        // Bounce off edges
        if (circle.x - circle.radius < 0 || circle.x + circle.radius > width) {
          circle.vx *= -1
        }
        if (circle.y - circle.radius < 0 || circle.y + circle.radius > height) {
          circle.vy *= -1
        }

        // Draw gradient circle
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius)
        gradient.addColorStop(0, circle.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70 dark:opacity-30"
      style={{ pointerEvents: "none" }}
    />
  )
}

interface Circle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  color: string
}
