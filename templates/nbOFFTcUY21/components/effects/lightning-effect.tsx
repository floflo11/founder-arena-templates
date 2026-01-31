"use client"

import { useRef, useEffect } from "react"

interface LightningEffectProps {
  hue?: number
  xOffset?: number
  speed?: number
  intensity?: number
  size?: number
  wavelength?: number
}

export const LightningEffect = ({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  wavelength = 10,
}: LightningEffectProps) => {
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

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(
      fragmentShader,
      `
      precision lowp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_hue;
      uniform float u_intensity;
      uniform float u_size;
      uniform float u_xOffset;
      uniform float u_wavelength;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;
        
        // Apply x offset
        uv.x += u_xOffset;
        
        float noise = sin(uv.x * u_wavelength + u_time) * 0.1;
        noise += sin(uv.x * (u_wavelength * 2.0) + u_time * 2.0) * 0.05;
        
        // Size affects the thickness of the lightning bolt
        float lightning = u_size / (abs(uv.y + noise) * 50.0 + 1.0);
        
        vec3 color = hsv2rgb(vec3(u_hue / 360.0, 0.8, lightning * u_intensity));
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    )
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const hueLocation = gl.getUniformLocation(program, "u_hue")
    const intensityLocation = gl.getUniformLocation(program, "u_intensity")
    const sizeLocation = gl.getUniformLocation(program, "u_size")
    const xOffsetLocation = gl.getUniformLocation(program, "u_xOffset")
    const wavelengthLocation = gl.getUniformLocation(program, "u_wavelength")

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * 0.5
      canvas.height = rect.height * 0.5
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const startTime = Date.now()

    const render = () => {
      const time = (Date.now() - startTime) * 0.001

      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
      gl.uniform1f(timeLocation, time * speed)
      gl.uniform1f(hueLocation, hue)
      gl.uniform1f(intensityLocation, intensity)
      gl.uniform1f(sizeLocation, size)
      gl.uniform1f(xOffsetLocation, xOffset)
      gl.uniform1f(wavelengthLocation, wavelength)

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
  }, [hue, xOffset, speed, intensity, size, wavelength])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ imageRendering: "pixelated" }} />
}
