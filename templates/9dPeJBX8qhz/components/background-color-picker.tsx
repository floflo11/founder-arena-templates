import { useState, useRef, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"

interface BackgroundColorPickerProps {
  backgroundColor: string
  onBackgroundColorChange: (color: string) => void
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function rgbaToHexAndAlpha(rgba: string): { hex: string; alpha: number } {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) {
    // Fallback for solid colors or invalid format
    if (rgba.startsWith("#")) {
      return { hex: rgba, alpha: 1 }
    }
    return { hex: "#ffffff", alpha: 1 }
  }

  const [, r, g, b, a] = match
  const toHex = (c: string) => parseInt(c).toString(16).padStart(2, "0")
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  const alpha = a !== undefined ? parseFloat(a) : 1

  return { hex, alpha }
}

export function BackgroundColorPicker({ backgroundColor, onBackgroundColorChange }: BackgroundColorPickerProps) {
  const { hex: initialHex, alpha: initialAlpha } = rgbaToHexAndAlpha(backgroundColor)

  const [hexColor, setHexColor] = useState(initialHex)
  const [alpha, setAlpha] = useState(initialAlpha)

  // Update parent state when color changes
  useEffect(() => {
    const newRgbaColor = hexToRgba(hexColor, alpha)
    onBackgroundColorChange(newRgbaColor)
  }, [hexColor, alpha, onBackgroundColorChange])

  // Update internal state if the prop changes from outside
  useEffect(() => {
    const { hex, alpha } = rgbaToHexAndAlpha(backgroundColor)
    setHexColor(hex)
    setAlpha(alpha)
  }, [backgroundColor])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 rounded-xl p-0"
          title="Change canvas background"
          style={{ backgroundColor: backgroundColor }}
        >
          <div className="h-full w-full rounded-xl border-4 border-white/50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Background Color</h4>
            <p className="text-sm text-muted-foreground">Adjust color and transparency.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bg-color-hex">Color</Label>
            <div className="flex items-center gap-2">
              <input
                id="bg-color-hex"
                type="color"
                value={hexColor}
                onChange={(e) => setHexColor(e.target.value)}
                className="h-8 w-8 cursor-pointer appearance-none rounded-md border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0"
              />
              <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                <span>{hexColor.toUpperCase()}</span>
                <Copy
                  className="h-4 w-4 cursor-pointer text-muted-foreground"
                  onClick={() => navigator.clipboard.writeText(hexColor)}
                />
              </div>
            </div>
            <Label htmlFor="bg-color-alpha">Transparency</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="bg-color-alpha"
                min={0}
                max={1}
                step={0.05}
                value={[alpha]}
                onValueChange={(value) => setAlpha(value[0])}
              />
              <span className="w-12 text-right text-sm text-muted-foreground">{(alpha * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
