"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

import { LightningEffect } from "./effects/lightning-effect"

export const EffectsEditor = () => {
  const [lightningSettings, setLightningSettings] = useState({
    hue: 230,
    xOffset: 0,
    speed: 1,
    intensity: 1,
    size: 1,
    wavelength: 10, // Add this new setting
  })

  return (
    <div className="relative h-screen w-full">
      {/* Full screen lightning effect */}
      <div className="absolute inset-0 bg-black">
        <LightningEffect {...lightningSettings} />
      </div>

      {/* Floating settings panel */}
      <div className="absolute top-4 left-4 w-80 bg-zinc-900/90 backdrop-blur-sm p-4 rounded-lg space-y-4 z-10">
        <h2 className="text-lg font-medium text-white">Lightning Settings</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="l-hue" className="text-white">
              Hue:
            </Label>
            <span className="text-white">{lightningSettings.hue}</span>
          </div>
          <Slider
            id="l-hue"
            min={0}
            max={360}
            step={1}
            value={[lightningSettings.hue]}
            onValueChange={(v) => setLightningSettings((s) => ({ ...s, hue: v[0] }))}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="l-intensity" className="text-white">
              Intensity:
            </Label>
            <span className="text-white">{lightningSettings.intensity.toFixed(1)}</span>
          </div>
          <Slider
            id="l-intensity"
            min={0.1}
            max={2}
            step={0.1}
            value={[lightningSettings.intensity]}
            onValueChange={(v) => setLightningSettings((s) => ({ ...s, intensity: v[0] }))}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="l-speed" className="text-white">
              Speed:
            </Label>
            <span className="text-white">{lightningSettings.speed.toFixed(1)}</span>
          </div>
          <Slider
            id="l-speed"
            min={0.1}
            max={2}
            step={0.1}
            value={[lightningSettings.speed]}
            onValueChange={(v) => setLightningSettings((s) => ({ ...s, speed: v[0] }))}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="l-size" className="text-white">
              Size:
            </Label>
            <span className="text-white">{lightningSettings.size.toFixed(1)}</span>
          </div>
          <Slider
            id="l-size"
            min={0.1}
            max={3}
            step={0.1}
            value={[lightningSettings.size]}
            onValueChange={(v) => setLightningSettings((s) => ({ ...s, size: v[0] }))}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="l-wavelength" className="text-white">
              Wave Length:
            </Label>
            <span className="text-white">{lightningSettings.wavelength.toFixed(1)}</span>
          </div>
          <Slider
            id="l-wavelength"
            min={1}
            max={50}
            step={0.5}
            value={[lightningSettings.wavelength]}
            onValueChange={(v) => setLightningSettings((s) => ({ ...s, wavelength: v[0] }))}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="l-xoffset" className="text-white">
              X Offset:
            </Label>
            <span className="text-white">{lightningSettings.xOffset.toFixed(2)}</span>
          </div>
          <Slider
            id="l-xoffset"
            min={-1}
            max={1}
            step={0.01}
            value={[lightningSettings.xOffset]}
            onValueChange={(v) => setLightningSettings((s) => ({ ...s, xOffset: v[0] }))}
          />
        </div>

        <div className="flex justify-between text-xs text-zinc-400 pt-4">
          <span>0xBalance</span>
          <span>© 2025</span>
        </div>
      </div>
    </div>
  )
}
