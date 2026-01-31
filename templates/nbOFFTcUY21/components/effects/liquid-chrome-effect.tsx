"use client"

import { useRef, useEffect } from "react"

interface LiquidChromeEffectProps {
  baseColor?: [number, number, number]
  speed?: number
  amplitude?: number
  frequencyX?: number
  frequencyY?: number
}

export const LiquidChromeEffect = ({
  baseColor = [0.1, 0.1, 0.1],
  speed = 0.2,
  amplitude = 0.5,
  frequencyX = 3,
  frequencyY = 2,
}: LiquidChromeEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      powerPreference: "high-performance",
    })
    if (!gl) return

    let animationId: number

    // Very simple vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(
      vertexShader,
      `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `,
    )
    gl.compileShader(vertexShader)

    // Extremely simplified fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(
      fragmentShader,
      `
      precision lowp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color;
      uniform float u_speed;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv = uv * 2.0 - 1.0;
        
        float wave = sin(uv.x * 5.0 + u_time * u_speed) * 0.1;
        wave += sin(uv.y * 3.0 + u_time * u_speed * 0.7) * 0.1;
        
        vec3 color = u_color + wave;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    )
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    // Simple quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const colorLocation = gl.getUniformLocation(program, "u_color")
    const speedLocation = gl.getUniformLocation(program, "u_speed")

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * 0.5 // Reduce resolution by half
      canvas.height = rect.height * 0.5
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
    }

    const startTime = Date.now()

    const render = () => {
      const time = (Date.now() - startTime) * 0.001

      gl.uniform1f(timeLocation, time)
      gl.uniform3f(colorLocation, baseColor[0], baseColor[1], baseColor[2])
      gl.uniform1f(speedLocation, speed)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationId = requestAnimationFrame(render)
    }

    gl.useProgram(program)

    resize()
    render()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(buffer)
    }
  }, [baseColor, speed, amplitude, frequencyX, frequencyY])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ imageRendering: "pixelated" }} />
}
