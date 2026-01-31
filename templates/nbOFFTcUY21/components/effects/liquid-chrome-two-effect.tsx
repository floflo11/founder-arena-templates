"use client"

import { useRef, useEffect } from "react"
import { Renderer, Program, Mesh, Triangle } from "ogl"

interface LiquidChromeTwoEffectProps {
  baseColor?: [number, number, number]
  speed?: number
  amplitude?: number
  frequencyX?: number
  frequencyY?: number
}

export const LiquidChromeTwoEffect = ({
  baseColor = [0.1, 0.1, 0.1],
  speed = 0.2,
  amplitude = 0.5,
  frequencyX = 3,
  frequencyY = 2,
}: LiquidChromeTwoEffectProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const oglObjectsRef = useRef<{
    renderer?: Renderer
    gl?: WebGLRenderingContext | WebGL2RenderingContext
    program?: Program
    mesh?: Mesh
  }>({})

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let animationId: number

    let { renderer, gl, program, mesh } = oglObjectsRef.current

    if (!renderer) {
      try {
        renderer = new Renderer({ antialias: true, dpr: window.devicePixelRatio || 1 })
        gl = renderer.gl
        gl.clearColor(0, 0, 0, 1) // Set background to black to match editor

        const vertexShader = `
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0.0, 1.0);
        }
        `

        const fragmentShader = `
        precision highp float;
        uniform float uTime;
        uniform vec3 uResolution;
        uniform vec3 uBaseColor;
        uniform float uAmplitude;
        uniform float uFrequencyX;
        uniform float uFrequencyY;
        uniform vec2 uMouse;
        varying vec2 vUv;

        vec4 renderImage(vec2 uvCoord) {
            vec2 fragCoord = uvCoord * uResolution.xy;
            vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

            for (float i = 1.0; i < 10.0; i++) {
                uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
                uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
            }

            vec2 diff = (uvCoord - uMouse);
            float dist = length(diff);
            float falloff = exp(-dist * 20.0);
            float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
            uv += (diff / (dist + 0.0001)) * ripple * falloff;

            vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x) + 0.0001);
            return vec4(color, 1.0);
        }

        void main() {
            vec4 col = vec4(0.0);
            int samples = 0;
            for (int i = -1; i <= 1; i++) {
                for (int j = -1; j <= 1; j++) {
                    vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                    col += renderImage(vUv + offset);
                    samples++;
                }
            }
            gl_FragColor = col / float(samples);
        }
        `

        const geometry = new Triangle(gl)
        program = new Program(gl, {
          vertex: vertexShader,
          fragment: fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new Float32Array([1, 1, 1]) },
            uBaseColor: { value: new Float32Array(baseColor) },
            uAmplitude: { value: amplitude },
            uFrequencyX: { value: frequencyX },
            uFrequencyY: { value: frequencyY },
            uMouse: { value: new Float32Array([0.5, 0.5]) },
          },
        })
        mesh = new Mesh(gl, { geometry, program })

        oglObjectsRef.current = { renderer, gl, program, mesh }

        if (container.firstChild) {
          container.removeChild(container.firstChild)
        }
        container.appendChild(gl.canvas)
      } catch (error) {
        console.error("Failed to initialize LiquidChromeTwo:", error)
        if (container && container.firstChild) {
          container.removeChild(container.firstChild)
        }
        return
      }
    } else {
      if (program) {
        program.uniforms.uBaseColor.value = new Float32Array(baseColor)
        program.uniforms.uAmplitude.value = amplitude
        program.uniforms.uFrequencyX.value = frequencyX
        program.uniforms.uFrequencyY.value = frequencyY
      }
    }

    function resize() {
      if (!renderer || !gl || !container || !program) return

      const dpr = window.devicePixelRatio || 1
      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      if (width === 0 || height === 0) {
        return
      }

      renderer.setSize(width * dpr, height * dpr)
      gl.canvas.style.width = `${width}px`
      gl.canvas.style.height = `${height}px`
      gl.canvas.style.display = "block" // Ensure canvas is visible

      const resUniform = program.uniforms.uResolution.value as Float32Array
      resUniform[0] = gl.canvas.width
      resUniform[1] = gl.canvas.height
      resUniform[2] = gl.canvas.width / gl.canvas.height
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize() // Initial resize

    function handleMouseMove(event: MouseEvent) {
      if (!container || !program) return
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1 - (event.clientY - rect.top) / rect.height // Invert Y for WebGL
      const mouseUniform = program.uniforms.uMouse.value as Float32Array
      mouseUniform[0] = x
      mouseUniform[1] = y
    }

    function handleTouchMove(event: TouchEvent) {
      if (event.touches.length > 0 && container && program) {
        const touch = event.touches[0]
        const rect = container.getBoundingClientRect()
        const x = (touch.clientX - rect.left) / rect.width
        const y = 1 - (touch.clientY - rect.top) / rect.height // Invert Y for WebGL
        const mouseUniform = program.uniforms.uMouse.value as Float32Array
        mouseUniform[0] = x
        mouseUniform[1] = y
      }
    }

    window.addEventListener("resize", resize)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("touchmove", handleTouchMove, { passive: true })

    function update(t: number) {
      animationId = requestAnimationFrame(update)
      if (program && renderer && mesh) {
        program.uniforms.uTime.value = t * 0.001 * speed
        renderer.render({ scene: mesh })
      }
    }
    animationId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      resizeObserver.unobserve(container)
      resizeObserver.disconnect()

      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("touchmove", handleTouchMove)
      }

      const currentGl = oglObjectsRef.current.gl
      if (currentGl && currentGl.canvas && currentGl.canvas.parentElement === container) {
        container.removeChild(currentGl.canvas)
      }
      if (currentGl) {
        currentGl.getExtension("WEBGL_lose_context")?.loseContext()
      }
      oglObjectsRef.current = {}
    }
  }, [baseColor, speed, amplitude, frequencyX, frequencyY])

  return <div ref={containerRef} className="w-full h-full" />
}
