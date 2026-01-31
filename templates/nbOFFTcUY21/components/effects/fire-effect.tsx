"use client"

import { useRef, useEffect } from "react"

interface FireEffectProps {
  flameHeight?: number
  intensity?: number
  speed?: number
  wind?: number
}

export const FireEffect = ({ flameHeight = 1.0, intensity = 1.0, speed = 0.5, wind = 0.0 }: FireEffectProps) => {
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
    uniform float uFlameHeight;
    uniform float uIntensity;
    uniform float uSpeed;
    uniform float uWind;

    float hash(float n) { return fract(sin(n) * 43758.5453); }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float n = i.x + i.y * 57.0;
      return mix(mix(hash(n), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.xy;
      uv.y = 1.0 - uv.y;
      uv.x = uv.x * 2.0 - 1.0;
      uv.x *= iResolution.x / iResolution.y;
      
      float time = iTime * uSpeed;
      uv.x += uWind * uv.y * 0.2;
      
      float y = uv.y * uFlameHeight;
      float shape = max(0.0, 1.0 - abs(uv.x) * 2.0 / (y + 0.01));
      
      vec2 flameUV = vec2(uv.x * 2.0, uv.y);
      float noise1 = fbm(flameUV * vec2(1.0, 2.0) + vec2(time * 0.5, time));
      float noise2 = fbm(flameUV * vec2(2.0, 1.0) - vec2(time * 0.5, 0.0));
      
      float flames = shape * (noise1 * 0.5 + noise2 * 0.5);
      flames *= (1.0 - pow(uv.y, 2.0) * 0.6);
      
      vec3 yellow = vec3(1.0, 0.9, 0.0) * uIntensity;
      vec3 orange = vec3(1.0, 0.5, 0.0) * uIntensity;
      vec3 red = vec3(0.8, 0.2, 0.0) * uIntensity;
      
      vec3 color = yellow;
      color = mix(color, orange, smoothstep(0.6, 0.3, uv.y));
      color = mix(color, red, smoothstep(0.3, 0.0, uv.y));
      
      color *= flames * 1.5;
      
      float glow = pow(flames, 2.0) * 0.5;
      color += vec3(1.0, 0.5, 0.0) * glow * uIntensity;
      
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
    const uFlameHeightLocation = gl.getUniformLocation(program, "uFlameHeight")
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity")
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed")
    const uWindLocation = gl.getUniformLocation(program, "uWind")

    const startTime = performance.now()

    const renderLoop = () => {
      if (!canvasRef.current || !gl || gl.isContextLost()) {
        cancelAnimationFrame(animationFrameId)
        return
      }

      gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height)
      const currentTime = performance.now()
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0)
      gl.uniform1f(uFlameHeightLocation, flameHeight)
      gl.uniform1f(uIntensityLocation, intensity)
      gl.uniform1f(uSpeedLocation, speed)
      gl.uniform1f(uWindLocation, wind)

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
  }, [flameHeight, intensity, speed, wind])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
