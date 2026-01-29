"use client"

import { useState, useEffect, forwardRef } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Palette } from "lucide-react"

interface CustomColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

export const CustomColorPicker = forwardRef<HTMLButtonElement, CustomColorPickerProps>(function CustomColorPicker(
  { selectedColor, onColorChange }, 
  ref
) {
  const [hexColor, setHexColor] = useState(selectedColor)

  // Update internal state if the prop changes from outside
  useEffect(() => {
    setHexColor(selectedColor)
  }, [selectedColor])

  const handleColorChange = (newColor: string) => {
    setHexColor(newColor)
    onColorChange(newColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border-2 border-gray-300 hover:border-brand-400 transition-all hover:scale-110 flex items-center justify-center"
          style={{ backgroundColor: "#f8f9fa" }}
          title="Custom Color (f)"
        >
          <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 text-gray-600" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3 items-center justify-center rounded-full bg-white/90 text-[6px] sm:text-[7px] font-bold text-gray-600 ring-1 ring-gray-200 shadow-sm pointer-events-none">
            F
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Custom Color</h4>
            <p className="text-sm text-muted-foreground">Pick any color for your brush.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brush-color-hex">Color</Label>
            <div className="flex items-center gap-2">
              <input
                id="brush-color-hex"
                type="color"
                value={hexColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-10 w-10 cursor-pointer appearance-none rounded-md border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0"
              />
              <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                <span>{hexColor.toUpperCase()}</span>
                <Copy
                  className="h-4 w-4 cursor-pointer text-muted-foreground"
                  onClick={() => navigator.clipboard.writeText(hexColor)}
                />
              </div>
            </div>
            {/* Color Preview */}
            <div className="flex items-center gap-2 mt-2">
              <div 
                className="w-8 h-8 rounded-full border-2 border-gray-200" 
                style={{ backgroundColor: hexColor }}
              />
              <span className="text-sm text-muted-foreground">Preview</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
})
