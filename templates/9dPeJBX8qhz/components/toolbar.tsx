import React, { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Brush, Eraser, Move } from "lucide-react"
import { BrushSizeControl } from "@/components/brush-size-control"
import { CustomColorPicker } from "@/components/custom-color-picker"

type Tool = "brush" | "eraser" | "select"

interface ToolbarProps {
  selectedTool: Tool
  onToolChange: (tool: Tool) => void
  brushSize: number[]
  onBrushSizeChange: (size: number[]) => void
  selectedColor: string
  onColorChange: (color: string) => void
  customColorPickerRef: React.RefObject<HTMLButtonElement | null>
}

export function Toolbar({
  selectedTool,
  onToolChange,
  brushSize,
  onBrushSizeChange,
  selectedColor,
  onColorChange,
  customColorPickerRef,
}: ToolbarProps) {
  // Memoize tools array to prevent recreation on each render
  const tools = useMemo(() => [
    { id: "brush" as Tool, icon: Brush, label: "Brush", shortcut: "1" },
    { id: "select" as Tool, icon: Move, label: "Select", shortcut: "2" },
    { id: "eraser" as Tool, icon: Eraser, label: "Eraser", shortcut: "3" },
  ], [])

  // Memoize simple colors to prevent recreation on each render
  const simpleColors = useMemo(() => [
    { color: "#4B5563", name: "Grey", shortcut: "a" },
    { color: "#FBBF24", name: "Yellow", shortcut: "b" },
    { color: "#3B82F6", name: "Blue", shortcut: "c" },
    { color: "#EF4444", name: "Red", shortcut: "d" },
    { color: "#10B981", name: "Green", shortcut: "e" },
  ], [])

  return (
    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
      {/* Tools */}
      <div className="flex flex-col items-center gap-0.5 sm:gap-1">
        <div className="flex items-center gap-0.5 sm:gap-1">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "outline"}
              size="icon"
              onClick={() => onToolChange(tool.id)}
              className={`relative rounded-lg w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 shadow-sm hover:shadow-md transition-all border-gray-200/60 ${
                selectedTool === tool.id
                  ? "bg-brand-600 hover:bg-brand-700 border-brand-600"
                  : "hover:border-brand-300 hover:bg-brand-50"
              }`}
              title={`${tool.label} (${tool.shortcut})`}
            >
              <tool.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3 items-center justify-center rounded-full bg-white/90 text-[6px] sm:text-[7px] font-bold text-gray-600 ring-1 ring-gray-200 shadow-sm">
                {tool.shortcut}
              </span>
            </Button>
          ))}
        </div>
        {/* Brush Size Slider with Circles */}
        <div className="flex items-center gap-0.5 sm:gap-1 w-24 sm:w-28 md:w-32 lg:w-36 mt-0.5 sm:mt-1">
          <span className="block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400" />
          <div className="flex-1">
            <BrushSizeControl
              brushSize={brushSize}
              onBrushSizeChange={onBrushSizeChange}
              className="w-full [&>span[role=slider]]:bg-brand-600 [&>span[role=slider]]:border-brand-600 [&>div]:bg-brand-400"
            />
          </div>
          <span className="block w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 rounded-full bg-gray-400" />
        </div>
      </div>

      {/* Simple Color Palette */}
      <div className="flex flex-wrap items-center justify-center gap-0.5 sm:gap-1">
        {simpleColors.map(({ color, name, shortcut }) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border-2 transition-all hover:scale-110 ${
              selectedColor === color
                ? "border-brand-600 shadow-md ring-2 ring-brand-200"
                : "border-gray-300 hover:border-brand-400"
            }`}
            style={{ backgroundColor: color }}
            title={`${name} (${shortcut})`}
          >
            <span className="sr-only">{name}</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3 items-center justify-center rounded-full bg-white/90 text-[6px] sm:text-[7px] font-bold text-gray-600 ring-1 ring-gray-200 shadow-sm pointer-events-none">
              {shortcut.toUpperCase()}
            </span>
          </button>
        ))}
        {/* Custom Color Picker */}
        <CustomColorPicker
          ref={customColorPickerRef}
          selectedColor={selectedColor}
          onColorChange={onColorChange}
        />
      </div>
    </div>
  )
}
