import React from "react"
import { DrawingCanvas } from "@/components/drawing-canvas"
import { BackgroundArcSelector, type BackgroundArcSelectorRef } from "@/components/background-arc-selector"

type Tool = "brush" | "eraser" | "select"

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  canvasContainerRef: React.RefObject<HTMLDivElement | null>
  backgroundPickerRef: React.RefObject<BackgroundArcSelectorRef | null>
  selectedColor: string
  backgroundColor: string
  brushSize: number[]
  selectedTool: Tool
  onDrawingChange: () => void
  onStrokeCountChange: (count: number) => void
  onToolChange: (tool: Tool) => void
  onBackgroundColorChange: (color: string) => void
}

export function CanvasArea({
  canvasRef,
  canvasContainerRef,
  backgroundPickerRef,
  selectedColor,
  backgroundColor,
  brushSize,
  selectedTool,
  onDrawingChange,
  onStrokeCountChange,
  onToolChange,
  onBackgroundColorChange,
}: CanvasAreaProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        <div className="aspect-square w-full max-w-lg relative" ref={canvasContainerRef}>
          <DrawingCanvas
            ref={canvasRef}
            onDrawingChange={onDrawingChange}
            onStrokeCountChange={onStrokeCountChange}
            selectedColor={selectedColor}
            backgroundColor={backgroundColor}
            brushSize={brushSize}
            selectedTool={selectedTool}
            onToolChange={onToolChange}
          />
          <div className="absolute top-3 left-3">
            <div className="relative">
              <BackgroundArcSelector
                ref={backgroundPickerRef}
                backgroundColor={backgroundColor}
                onBackgroundColorChange={onBackgroundColorChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
