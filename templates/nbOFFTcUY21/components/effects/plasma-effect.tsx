"use client"

import { useRef, useEffect } from "react"

interface PlasmaEffectProps {
  speed?: number
  scale?: number
  colorIntensity?: number
  colorShift?: number
}

export const PlasmaEffect = ({
  speed = 0.5,
  scale = 1.0,
  colorIntensity = 1.0,
  colorShift = 0.0,
}: PlasmaEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animationFrameId: number
    const gl = canvas.getContext("webgl")
    if (!gl) {
      console.error("WebGL not supported in this browser.")
      return
    }

    const resizeCanvas = () => {
      if (canvas.parentElement && canvas.parentElement.clientWidth > 0 && canvas.parentElement.clientHeight > 0) {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight
      } else {
        canvas.width = canvas.clientWidth || 300
        canvas.height = canvas.clientHeight || 150
      }
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    }

    window.addEventListener("resize", resizeCanvas)

    const vertexShaderSource = `
    attribute vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `

    const fragmentShaderSource = `
    precision mediump float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform float uScale;
    uniform float uColorIntensity;
    uniform float uColorShift;
    uniform float uSpeed;

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.xy;
      uv = uv * 2.0 - 1.0;
      uv.x *= iResolution.x / iResolution.y;
      
      float time = iTime * uSpeed;
      
      float v1 = sin((uv.x * uScale) * 10.0 + time);
      float v2 = sin((uv.y * uScale) * 10.0 + time);
      float v3 = sin((uv.x + uv.y) * uScale * 10.0 + time);
      float v4 = sin(sqrt(uv.x * uv.x + uv.y * uv.y) * uScale * 20.0 + time);
      
      float plasma = (v1 + v2 + v3 + v4) * 0.25;
      
      float hue = plasma * 0.5 + 0.5 + uColorShift;
      vec3 color = hsv2rgb(vec3(hue, 0.8, 0.9 * uColorIntensity));
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type)
      if (!shader) {
        console.error("Failed to create shader object.")
        return null
      }
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const shaderType = type === gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT"
        console.error(`Shader compile error (${shaderType}):`, gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
      window.removeEventListener("resize", resizeCanvas)
      return
    }

    const program = gl.createProgram()
    if (!program) {
      console.error("Failed to create GL program.")
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      window.removeEventListener("resize", resizeCanvas)
      return
    }
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      window.removeEventListener("resize", resizeCanvas)
      return
    }

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(program, "aPosition")
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution")
    const iTimeLocation = gl.getUniformLocation(program, "iTime")
    const uScaleLocation = gl.getUniformLocation(program, "uScale")
    const uColorIntensityLocation = gl.getUniformLocation(program, "uColorIntensity")
    const uColorShiftLocation = gl.getUniformLocation(program, "uColorShift")
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed")

    const startTime = performance.now()

    const renderLoop = () => {
      if (!canvasRef.current || !gl || gl.isContextLost()) {
        cancelAnimationFrame(animationFrameId)
        return
      }

      gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height)
      const currentTime = performance.now()
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0)
      gl.uniform1f(uScaleLocation, scale)
      gl.uniform1f(uColorIntensityLocation, colorIntensity)
      gl.uniform1f(uColorShiftLocation, colorShift)
      gl.uniform1f(uSpeedLocation, speed)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationFrameId = requestAnimationFrame(renderLoop)
    }

    resizeCanvas()
    animationFrameId = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)

      if (gl && !gl.isContextLost()) {
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        gl.deleteBuffer(vertexBuffer)
      }
    }
  }, [speed, scale, colorIntensity, colorShift])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
