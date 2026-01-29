import { useState, useRef, useEffect, useCallback } from "react"

interface UseGenerationProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  prompt: string
  seed: number
  strength: number[]
  aiEnabled: boolean
  strokeCount: number
}

export function useGeneration({
  canvasRef,
  prompt,
  seed,
  strength,
  aiEnabled,
  strokeCount,
}: UseGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const promptRef = useRef<string>(prompt)

  // Update prompt ref when prompt changes
  useEffect(() => {
    promptRef.current = prompt
  }, [prompt])

  // Core generation function - shared logic
  const performGeneration = useCallback(
    async (forceGenerate = false) => {
      if (!canvasRef.current || (!aiEnabled && !forceGenerate) || strokeCount < 2) return

      // Clear previous debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      // Debounce the generation to avoid too many requests
      const delay = forceGenerate ? 0 : 500 // No delay for manual generation
      debounceRef.current = setTimeout(async () => {
        setIsGenerating(true)
        try {
          const canvas = canvasRef.current
          if (!canvas) return

          // Get current prompt value from ref (always up-to-date)
          const currentPrompt = promptRef.current

          // Render clean canvas without selection indicators
          const restoreCanvas = (canvas as any).renderCleanCanvas?.()

          // Convert canvas to blob
          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob: Blob | null) => resolve(blob!), "image/png")
          })

          // Restore original canvas state with selection indicators
          if (restoreCanvas) {
            restoreCanvas()
          }

          // Create form data
          const formData = new FormData()
          formData.append("image", blob)
          formData.append("prompt", currentPrompt)
          formData.append("seed", seed.toString())
          formData.append("strength", strength[0].toString())

          // Call our API route
          const response = await fetch("/api/generate-image", {
            method: "POST",
            body: formData,
          })

          if (response.ok) {
            const data = await response.json()
            setGeneratedImage(data.imageUrl)
            setHasGeneratedOnce(true)
          } else {
            console.error("Generation failed:", await response.text())
          }
        } catch (error) {
          console.error("Error generating image:", error)
        } finally {
          setIsGenerating(false)
        }
      }, delay)
    },
    [canvasRef, seed, strength, aiEnabled, strokeCount],
  )

  // Auto-generate when seed or strength changes (only if AI enabled and generated once)
  useEffect(() => {
    if (hasGeneratedOnce && aiEnabled) {
      performGeneration()
    }
  }, [seed, strength, hasGeneratedOnce, aiEnabled, performGeneration])

  // Auto-generate when reaching 2 strokes for the first time
  useEffect(() => {
    if (strokeCount >= 2 && !hasGeneratedOnce && aiEnabled) {
      performGeneration(true)
    }
  }, [strokeCount, hasGeneratedOnce, aiEnabled, performGeneration])

  // Manual generation trigger for button/Enter - bypasses AI enabled check
  const triggerManualGeneration = useCallback(() => {
    performGeneration(true)
  }, [performGeneration])

  // Auto-generate when canvas changes
  const handleCanvasChange = useCallback(() => {
    if (aiEnabled && hasGeneratedOnce) {
      performGeneration()
    }
  }, [aiEnabled, hasGeneratedOnce, performGeneration])

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return {
    isGenerating,
    generatedImage,
    hasGeneratedOnce,
    triggerManualGeneration,
    handleCanvasChange,
  }
}
