"use client"

import { useState, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { AiPainterToggle } from "@/components/ai-painter-toggle"
import { Toolbar } from "@/components/toolbar"
import { PromptBar } from "@/components/prompt-bar"
import { CanvasArea } from "@/components/canvas-area"
import { GenerationArea } from "@/components/generation-area"
import { BackgroundArcSelectorRef } from "@/components/background-arc-selector"
import { usePrompt } from "@/hooks/usePrompt"
import { useCanvasInteraction } from "@/hooks/useCanvasInteraction"
import { useGeneration } from "@/hooks/useGeneration"
import { useShortcuts } from "@/hooks/useShortcuts"

export default function FalPlayground() {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [seed, setSeed] = useState(478637)
  const [strength, setStrength] = useState([0.85])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const customColorPickerRef = useRef<HTMLButtonElement>(null)
  const backgroundPickerRef = useRef<BackgroundArcSelectorRef>(null)

  // Custom hooks
  const { prompt, setPrompt } = usePrompt()
  const {
    selectedColor,
    backgroundColor,
    brushSize,
    selectedTool,
    strokeCount,
    canvasContainerRef,
    setBackgroundColor,
    setBrushSize,
    setSelectedTool,
    setStrokeCount,
    handleColorChange,
  } = useCanvasInteraction()

  const {
    isGenerating,
    generatedImage,
    triggerManualGeneration,
    handleCanvasChange,
  } = useGeneration({
    canvasRef,
    prompt,
    seed,
    strength,
    aiEnabled,
    strokeCount,
  })

  // Utility functions
  const randomizeSeed = useCallback(() => {
    setSeed(Math.floor(Math.random() * 1000000))
  }, [])

  const toggleAI = useCallback(() => {
    setAiEnabled(!aiEnabled)
  }, [aiEnabled])

  const handleBackgroundColorChange = useCallback((color: string) => {
    setBackgroundColor(color)
    // Trigger generation if AI is enabled and has generated once
    handleCanvasChange()
  }, [setBackgroundColor, handleCanvasChange])

  // Shortcut handlers
  const handleBackgroundPickerOpen = useCallback(() => {
    backgroundPickerRef.current?.openPicker()
  }, [])

  const handleCustomColorPickerOpen = useCallback(() => {
    customColorPickerRef.current?.click()
  }, [])

  // Set up keyboard shortcuts
  useShortcuts({
    onToolChange: setSelectedTool,
    onColorChange: handleColorChange,
    onBackgroundPickerOpen: handleBackgroundPickerOpen,
    onCustomColorPickerOpen: handleCustomColorPickerOpen,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-1 sm:p-2 lg:p-4 xl:p-6">
      <Card className="w-full max-w-7xl mx-auto p-2 sm:p-3 lg:p-4 border-0 shadow-2xl rounded-2xl lg:rounded-3xl bg-white/80 backdrop-blur-sm flex flex-col">
        {/* Unified Control Bar */}
        <div className="mb-2 sm:mb-3 lg:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 items-center mx-0">
            {/* Left side: Tools and Colors - Half screen */}
            <div className="flex justify-center md:justify-center px-0 sm:px-0.5 mb-2 md:mb-0">
              <Toolbar
                selectedTool={selectedTool}
                onToolChange={setSelectedTool}
                brushSize={brushSize}
                onBrushSizeChange={setBrushSize}
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
                customColorPickerRef={customColorPickerRef}
              />
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px h-12 lg:h-14 bg-gray-200 mx-0.5 lg:mx-10"></div>

            {/* Right side: Prompt + Generate Button - Half screen */}
            <div className="w-full px-0 sm:px-0.5">
              <PromptBar
                prompt={prompt}
                onPromptChange={setPrompt}
                onGenerate={triggerManualGeneration}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-1 sm:gap-2 lg:gap-3 relative items-center">
          {/* Left Side: Canvas */}
          <CanvasArea
            canvasRef={canvasRef}
            canvasContainerRef={canvasContainerRef}
            backgroundPickerRef={backgroundPickerRef}
            selectedColor={selectedColor}
            backgroundColor={backgroundColor}
            brushSize={brushSize}
            selectedTool={selectedTool}
            onDrawingChange={handleCanvasChange}
            onStrokeCountChange={setStrokeCount}
            onToolChange={setSelectedTool}
            onBackgroundColorChange={handleBackgroundColorChange}
          />

          {/* Center: Controls */}
          <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-1 my-2 md:my-0">
            <AiPainterToggle isEnabled={aiEnabled} onToggle={toggleAI} isGenerating={isGenerating} />
          </div>

          {/* Right Side: AI Generation */}
          <GenerationArea
            generatedImage={generatedImage}
            isGenerating={isGenerating}
            aiEnabled={aiEnabled}
            strokeCount={strokeCount}
            strength={strength}
            onStrengthChange={setStrength}
            seed={seed}
            onSeedChange={setSeed}
            onRandomizeSeed={randomizeSeed}
          />
        </div>
      </Card>
    </div>
  )
}
