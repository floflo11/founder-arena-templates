"use client"

import { useRef, useEffect } from "react"

interface RetroWavesEffectProps {
  speed?: number
  gridSize?: number
  colorIntensity?: number
  perspective?: number
}

export const RetroWavesEffect = ({
  speed = 0.5,
  gridSize = 16.0,
  colorIntensity = 1.0,
  perspective = 5.0,
}: RetroWavesEffectProps) => {
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
    uniform float uGridSize;
    uniform float uColorIntensity;
    uniform float uPerspective;
    uniform float uSpeed;

    float grid(vec2 uv, float size) {
      vec2 gridVal = fract(uv * size);
      return max(
        step(0.98, gridVal.x) * step(gridVal.y, 0.98),
        step(0.98, gridVal.y) * step(gridVal.x, 0.98)
      );
    }
    
    float sun(vec2 uv, vec2 pos, float size) {
      float dist = length(uv - pos);
      return smoothstep(size, size * 0.8, dist);
    }
    
    float mountains(vec2 uv, float height) {
      float mountain = 0.0;
      mountain += sin(uv.x * 2.5) * 0.25;
      mountain += sin(uv.x * 3.7 + 1.1) * 0.15;
      mountain += sin(uv.x * 5.9 + 2.3) * 0.05;
      return smoothstep(height, height + 0.01, mountain);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.xy;
      
      vec2 perspectiveUV = uv;
      perspectiveUV.y = pow(perspectiveUV.y, uPerspective);
      
      float time = iTime * uSpeed;
      perspectiveUV.y -= time * 0.05;
      
      float gridLines = grid(perspectiveUV, uGridSize);
      
      vec2 sunPos = vec2(0.5, 0.35);
      float sunMask = sun(uv, sunPos, 0.15);
      
      float mountainMask = mountains(uv, 0.3);
      
      vec3 bgColor = mix(
        vec3(0.8, 0.0, 0.8) * uColorIntensity,
        vec3(0.0, 0.5, 1.0) * uColorIntensity,
        uv.y
      );
      
      vec3 sunColor = vec3(1.0, 0.4, 0.0) * uColorIntensity * 1.5;
      vec3 mountainColor = vec3(0.3, 0.0, 0.5) * uColorIntensity;
      vec3 gridColor = vec3(1.0, 0.0, 1.0) * uColorIntensity;
      
      vec3 finalColor = bgColor;
      finalColor = mix(finalColor, sunColor, sunMask);
      finalColor = mix(finalColor, mountainColor, mountainMask);
      finalColor = mix(finalColor, gridColor, gridLines);
      
      gl_FragColor = vec4(finalColor, 1.0);
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
    const uGridSizeLocation = gl.getUniformLocation(program, "uGridSize")
    const uColorIntensityLocation = gl.getUniformLocation(program, "uColorIntensity")
    const uPerspectiveLocation = gl.getUniformLocation(program, "uPerspective")
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
      gl.uniform1f(uGridSizeLocation, gridSize)
      gl.uniform1f(uColorIntensityLocation, colorIntensity)
      gl.uniform1f(uPerspectiveLocation, perspective)
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
  }, [speed, gridSize, colorIntensity, perspective])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
