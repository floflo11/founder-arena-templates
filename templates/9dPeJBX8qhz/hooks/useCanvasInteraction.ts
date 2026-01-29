import { useState, useRef, useEffect } from "react"
import { getColorByShortcut } from "@/lib/colors"

type Tool = "brush" | "eraser" | "select"

// Function to detect iPad Safari
const isIpadSafari = () => {
  if (typeof window === "undefined") return false

  const userAgent = window.navigator.userAgent
  const isIpad = /iPad/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)

  return isIpad && isSafari
}

export function useCanvasInteraction() {
  const [selectedColor, setSelectedColor] = useState<string>(getColorByShortcut("b").color)
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [brushSize, setBrushSize] = useState([50])
  const [selectedTool, setSelectedTool] = useState<Tool>("brush")
  const [strokeCount, setStrokeCount] = useState(0)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  // Lock scroll for iPad Safari
  useEffect(() => {
    if (!isIpadSafari()) return

    let isDrawing = false

    const preventScroll = (e: TouchEvent) => {
      if (isDrawing) {
        e.preventDefault()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      // Check if touch started on canvas area
      const canvasContainer = canvasContainerRef.current
      if (canvasContainer && canvasContainer.contains(e.target as Node)) {
        isDrawing = true
        // Prevent scrolling on the entire document
        document.body.style.overflow = "hidden"
        document.body.style.position = "fixed"
        document.body.style.width = "100%"
      }
    }

    const handleTouchEnd = () => {
      if (isDrawing) {
        isDrawing = false
        // Re-enable scrolling
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.width = ""
      }
    }

    // Add event listeners
    document.addEventListener("touchstart", handleTouchStart, { passive: false })
    document.addEventListener("touchend", handleTouchEnd, { passive: false })
    document.addEventListener("touchmove", preventScroll, { passive: false })

    return () => {
      // Cleanup
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
      document.removeEventListener("touchmove", preventScroll)

      // Reset body styles
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }
  }, [])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    // Always switch to brush when picking a color
    setSelectedTool("brush")
  }

  return {
    selectedColor,
    backgroundColor,
    brushSize,
    selectedTool,
    strokeCount,
    canvasContainerRef,
    setSelectedColor,
    setBackgroundColor,
    setBrushSize,
    setSelectedTool,
    setStrokeCount,
    handleColorChange,
  }
}
