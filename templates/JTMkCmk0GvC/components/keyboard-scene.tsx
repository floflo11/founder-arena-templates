"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei"
import { Suspense, useState, useEffect } from "react"
import { Keyboard3D } from "./keyboard-3d"
import { useChat } from "@ai-sdk/react"
import { Terminal } from "./terminal"
import { RateLimitDialog } from "./rate-limit-dialog"

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const aspect = size.width / size.height
    const isMobile = size.width < 768

    // Base distance for desktop
    let zPos = 12
    let yPos = 8
    let targetY = 0

    if (isMobile) {
      // Adjust for mobile portrait to fit the wide keyboard
      // The keyboard is approx 16 units wide.
      // We need to move back significantly if the aspect ratio is narrow.
      const targetWidth = 20 // Keyboard width + padding
      const vFov = (camera as any).fov * (Math.PI / 180)

      // Calculate distance needed to fit width
      // visible_width = 2 * dist * tan(fov/2) * aspect
      // dist = visible_width / (2 * tan(fov/2) * aspect)

      const dist = targetWidth / (2 * Math.tan(vFov / 2) * aspect)

      // Clamp distance to reasonable values
      zPos = Math.max(dist, 15)
      yPos = zPos * 0.6 // Maintain roughly the same angle

      targetY = 2
    }

    camera.position.set(0, yPos, zPos)
    camera.lookAt(0, targetY, 0)
    camera.updateProjectionMatrix()
  }, [camera, size])

  return null
}

export function KeyboardScene() {
  const [typedText, setTypedText] = useState<string>("")
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set())
  const [capsLock, setCapsLock] = useState(false)
  const [shiftPressed, setShiftPressed] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)

  const { messages, sendMessage, status } = useChat({
    onError: (error) => {
      console.log("[v0] Chat error:", error)
      if (error.message.includes("Too many requests") || error.message.includes("429")) {
        setIsRateLimited(true)
      }
    },
  })

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, code } = e

      setActiveKeys((prev) => new Set(prev).add(code))

      if (key === "Shift") {
        setShiftPressed(true)
      }

      if (code === "CapsLock" && !e.repeat) {
        setCapsLock((prev) => !prev)
      }

      // Typing logic
      if (key.length === 1) {
        // Check if it's a letter
        const isLetter = /^[a-zA-Z]$/.test(key)

        if (isLetter) {
          // Determine case based on virtual state
          // XOR logic: Shift OR CapsLock (but not both) results in uppercase
          const isUpperCase = shiftPressed !== capsLock
          const char = isUpperCase ? key.toUpperCase() : key.toLowerCase()
          setTypedText((prev) => prev + char)
        } else {
          // For non-letters, we use the key as provided (handling physical shift mapping automatically)
          setTypedText((prev) => prev + key)
        }
      } else if (key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1))
      } else if (key === "Enter") {
        if (typedText.trim()) {
          sendMessage({ text: typedText })
          setTypedText("")
        }
      } else if (key === "Tab") {
        e.preventDefault()
        setTypedText((prev) => prev + "  ")
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const { key, code } = e
      setActiveKeys((prev) => {
        const next = new Set(prev)
        next.delete(code)
        return next
      })

      if (key === "Shift") {
        setShiftPressed(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [capsLock, shiftPressed, typedText, sendMessage])

  return (
    <div className="relative w-full h-full">
      <Terminal
        capsLock={capsLock}
        messages={messages}
        status={status}
        typedText={typedText}
      />

      <RateLimitDialog open={isRateLimited} onOpenChange={setIsRateLimited} />

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={45} />
        <ResponsiveCamera />

        <color attach="background" args={["#111"]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Keyboard3D activeKeys={activeKeys} capsLock={capsLock} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={40} blur={2} far={4} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
        <p className="text-white/20 text-sm font-mono">Type on your physical keyboard or click the 3D keys</p>
      </div>
    </div>
  )
}
