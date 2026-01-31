import { ScrollText } from "@/components/scroll-text"
import { useState } from "react"

export default function Home() {
  const rightPhrases = [
    "the Vercel platform",
    "Geist Design System",
    "the Next.js framework",
    "the Vercel brand",
    "Next.js Conf",
    "the v0 platform",
    "Vercel Ship",
  ]

  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className="bg-white">
      <ScrollText leftText="We design" rightPhrases={rightPhrases} />

      <section className="min-h-screen bg-gray-50 text-gray-900">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900">How the Animation Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A deep dive into the scroll-based text animation you just experienced. Built with React, TypeScript, and
                smooth scroll hijacking techniques.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Scroll Detection</h3>
                <p className="text-gray-600">
                  Custom hook monitors wheel events and component visibility. When 80% visible, scroll is hijacked to
                  control the animation internally.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">State Management</h3>
                <p className="text-gray-600">
                  Internal scroll state tracks progress through phrases. Each 100px of scroll advances to the next text
                  item with smooth transitions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-gray-600 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Visual Effects</h3>
                <p className="text-gray-600">
                  CSS transforms handle positioning, opacity changes create focus effects, and gradient overlays provide
                  smooth fade transitions.
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 rounded-xl p-8 mb-8 px-2 py-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white px-2">Full Component Code</h3>
                  <button
                    onClick={async () => {
                      const fullCode = `"use client"

import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useEffect, useState, useRef } from "react"

interface ScrollTextProps {
  leftText: string
  rightPhrases: string[]
  className?: string
}

export function ScrollText({ leftText, rightPhrases, className = "" }: ScrollTextProps) {
  const { scrollDirection, scrollY } = useScrollDirection()
  const [activeIndex, setActiveIndex] = useState(0)
  const [internalScroll, setInternalScroll] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const componentHeight = rect.height
      const visibleTop = Math.max(0, -rect.top)
      const visibleBottom = Math.min(componentHeight, viewportHeight - rect.top)
      const visibleHeight = visibleBottom - visibleTop
      const visibilityRatio = visibleHeight / Math.min(componentHeight, viewportHeight)

      const isSubstantiallyVisible = visibilityRatio > 0.8

      if (isSubstantiallyVisible) {
        document.documentElement.classList.add("animation-active")

        const currentProgress = internalScroll / 100
        const maxProgress = rightPhrases.length - 1

        if ((e.deltaY > 0 && currentProgress >= maxProgress) || (e.deltaY < 0 && currentProgress <= 0)) {
          document.documentElement.classList.remove("animation-active")
          return
        }

        e.preventDefault()

        setInternalScroll((prev) => {
          const newScroll = prev + e.deltaY * 0.7
          const maxScroll = (rightPhrases.length - 1) * 100
          return Math.max(0, Math.min(maxScroll, newScroll))
        })
      } else {
        document.documentElement.classList.remove("animation-active")
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      document.documentElement.classList.remove("animation-active")
    }
  }, [rightPhrases.length, internalScroll, isClient])

  useEffect(() => {
    const newIndex = Math.floor(internalScroll / 100)
    setActiveIndex(Math.max(0, Math.min(rightPhrases.length - 1, newIndex)))
  }, [internalScroll, rightPhrases.length])

  if (!isClient) {
    return (
      <div className={\`min-h-screen flex items-center gap-8 px-16 py-28 max-lg:gap-6 max-lg:px-8 max-lg:py-16 \${className}\`}>
        <div className="flex-shrink-0">
          <h1 className="text-7xl max-lg:text-5xl font-medium text-black leading-none">{leftText}</h1>
        </div>
        <div className="flex-1 relative h-screen max-lg:h-[80vh] overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center">
            {rightPhrases.map((phrase, index) => (
              <div
                key={phrase}
                className={\`text-7xl max-lg:text-5xl font-medium leading-none absolute whitespace-nowrap transition-all duration-500 ease-in-out \${
                  index === 0 ? "text-black opacity-100" : "text-gray-300 opacity-60"
                }\`}
                style={{
                  transform: \`translateY(\${index * 80}px)\`,
                }}
              >
                {phrase}
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 right-0 h-40 max-lg:h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-40 max-lg:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={\`min-h-screen flex items-center gap-8 px-16 py-28 max-lg:gap-6 max-lg:px-8 max-lg:py-16 \${className}\`}
    >
      <div className="flex-shrink-0">
        <h1 className="text-7xl max-lg:text-5xl font-medium text-black leading-none">{leftText}</h1>
      </div>

      <div className="flex-1 relative h-screen max-lg:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center">
          {rightPhrases.map((phrase, index) => {
            const offset = (index - activeIndex) * (isClient && window.innerWidth < 1024 ? 60 : 80)
            const isActive = index === activeIndex

            return (
              <div
                key={phrase}
                className={\`text-7xl max-lg:text-5xl font-medium leading-none absolute whitespace-nowrap transition-all duration-500 ease-in-out \${
                  isActive ? "text-black opacity-100" : "text-gray-300 opacity-60"
                }\`}
                style={{
                  transform: \`translateY(\${offset}px)\`,
                }}
              >
                {phrase}
              </div>
            )
          })}
        </div>

        <div className="absolute top-0 left-0 right-0 h-40 max-lg:h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 max-lg:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}`
                      await navigator.clipboard.writeText(fullCode)
                      setIsCopied(true)
                      setTimeout(() => setIsCopied(false), 2000)
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isCopied
                        ? "bg-green-600 hover:bg-green-700 text-white transform scale-105"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto border border-[rgba(255,255,255,0.1)]">
                  <pre className="text-gray-300 text-sm">
                    <code>{`"use client"

import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useEffect, useState, useRef } from "react"

interface ScrollTextProps {
  leftText: string
  rightPhrases: string[]
  className?: string
}

export function ScrollText({ leftText, rightPhrases, className = "" }: ScrollTextProps) {
  const { scrollDirection, scrollY } = useScrollDirection()
  const [activeIndex, setActiveIndex] = useState(0)
  const [internalScroll, setInternalScroll] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const componentHeight = rect.height
      const visibleTop = Math.max(0, -rect.top)
      const visibleBottom = Math.min(componentHeight, viewportHeight - rect.top)
      const visibleHeight = visibleBottom - visibleTop
      const visibilityRatio = visibleHeight / Math.min(componentHeight, viewportHeight)

      const isSubstantiallyVisible = visibilityRatio > 0.8

      if (isSubstantiallyVisible) {
        document.documentElement.classList.add("animation-active")

        const currentProgress = internalScroll / 100
        const maxProgress = rightPhrases.length - 1

        if ((e.deltaY > 0 && currentProgress >= maxProgress) || (e.deltaY < 0 && currentProgress <= 0)) {
          document.documentElement.classList.remove("animation-active")
          return
        }

        e.preventDefault()

        setInternalScroll((prev) => {
          const newScroll = prev + e.deltaY * 0.7
          const maxScroll = (rightPhrases.length - 1) * 100
          return Math.max(0, Math.min(maxScroll, newScroll))
        })
      } else {
        document.documentElement.classList.remove("animation-active")
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      document.documentElement.classList.remove("animation-active")
    }
  }, [rightPhrases.length, internalScroll, isClient])

  useEffect(() => {
    const newIndex = Math.floor(internalScroll / 100)
    setActiveIndex(Math.max(0, Math.min(rightPhrases.length - 1, newIndex)))
  }, [internalScroll, rightPhrases.length])

  if (!isClient) {
    return (
      <div className={\`min-h-screen flex items-center gap-8 px-16 py-28 max-lg:gap-6 max-lg:px-8 max-lg:py-16 \${className}\`}>
        <div className="flex-shrink-0">
          <h1 className="text-7xl max-lg:text-5xl font-medium text-black leading-none">{leftText}</h1>
        </div>
        <div className="flex-1 relative h-screen max-lg:h-[80vh] overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center">
            {rightPhrases.map((phrase, index) => (
              <div
                key={phrase}
                className={\`text-7xl max-lg:text-5xl font-medium leading-none absolute whitespace-nowrap transition-all duration-500 ease-in-out \${
                  index === 0 ? "text-black opacity-100" : "text-gray-300 opacity-60"
                }\`}
                style={{
                  transform: \`translateY(\${index * 80}px)\`,
                }}
              >
                {phrase}
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 right-0 h-40 max-lg:h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-40 max-lg:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={\`min-h-screen flex items-center gap-8 px-16 py-28 max-lg:gap-6 max-lg:px-8 max-lg:py-16 \${className}\`}
    >
      <div className="flex-shrink-0">
        <h1 className="text-7xl max-lg:text-5xl font-medium text-black leading-none">{leftText}</h1>
      </div>

      <div className="flex-1 relative h-screen max-lg:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center">
          {rightPhrases.map((phrase, index) => {
            const offset = (index - activeIndex) * (isClient && window.innerWidth < 1024 ? 60 : 80)
            const isActive = index === activeIndex

            return (
              <div
                key={phrase}
                className={\`text-7xl max-lg:text-5xl font-medium leading-none absolute whitespace-nowrap transition-all duration-500 ease-in-out \${
                  isActive ? "text-black opacity-100" : "text-gray-300 opacity-60"
                }\`}
                style={{
                  transform: \`translateY(\${offset}px)\`,
                }}
              >
                {phrase}
              </div>
            )
          })}
        </div>

        <div className="absolute top-0 left-0 right-0 h-40 max-lg:h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 max-lg:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
