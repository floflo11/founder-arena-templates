"use client"

import { useRef, useEffect } from "react"

interface IceCrystalEffectProps {
  crystalSize?: number
  shimmerSpeed?: number
  colorIntensity?: number
  detail?: number
}

export const IceCrystalEffect = ({
  crystalSize = 5.0,
  shimmerSpeed = 0.5,
  colorIntensity = 1.0,
  detail = 3.0,
}: IceCrystalEffectProps) => {
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
    uniform float uCrystalSize;
    uniform float uShimmerSpeed;
    uniform float uColorIntensity;
    uniform float uDetail;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    vec2 voronoi(vec2 uv) {
      vec2 baseCell = floor(uv);
      vec2 fst = vec2(1e10);
      
      for(int i = -1; i <= 1; i++) {
        for(int j = -1; j <= 1; j++) {
          vec2 cell = baseCell + vec2(float(i), float(j));
          vec2 cellPosition = cell + hash(cell) * 0.5;
          vec2 r = cellPosition - uv;
          float d = length(r);
          
          if(d < fst.x) {
            fst.y = fst.x;
            fst.x = d;
          } else if(d < fst.y) {
            fst.y = d;
          }
        }
      }
      return fst;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.xy;
      uv = uv * 2.0 - 1.0;
      uv.x *= iResolution.x / iResolution.y;
      
      uv *= uCrystalSize;
      
      float time = iTime * uShimmerSpeed;
      
      vec2 voronoiResult = voronoi(uv);
      float cells = voronoiResult.x;
      float cellBorders = voronoiResult.y - voronoiResult.x;
      
      for(float i = 1.0; i < 10.0; i++) {
        if(i > uDetail) break;
        float scale = pow(2.0, i);
        cells += voronoi(uv * scale + time * 0.1).x / scale;
      }
      
      float shimmer = sin(cells * 10.0 + time) * 0.5 + 0.5;
      
      vec3 iceBlue = vec3(0.2, 0.5, 0.9) * uColorIntensity;
      vec3 iceWhite = vec3(0.9, 0.95, 1.0) * uColorIntensity;
      vec3 color = mix(iceBlue, iceWhite, shimmer);
      
      float edge = smoothstep(0.02, 0.0, cellBorders);
      color = mix(color, vec3(1.0) * uColorIntensity, edge * 0.5);
      
      color *= 0.8 + cells * 0.4;
      
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
    const uCrystalSizeLocation = gl.getUniformLocation(program, "uCrystalSize")
    const uShimmerSpeedLocation = gl.getUniformLocation(program, "uShimmerSpeed")
    const uColorIntensityLocation = gl.getUniformLocation(program, "uColorIntensity")
    const uDetailLocation = gl.getUniformLocation(program, "uDetail")

    const startTime = performance.now()

    const renderLoop = () => {
      if (!canvasRef.current || !gl || gl.isContextLost()) {
        cancelAnimationFrame(animationFrameId)
        return
      }

      gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height)
      const currentTime = performance.now()
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0)
      gl.uniform1f(uCrystalSizeLocation, crystalSize)
      gl.uniform1f(uShimmerSpeedLocation, shimmerSpeed)
      gl.uniform1f(uColorIntensityLocation, colorIntensity)
      gl.uniform1f(uDetailLocation, detail)

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
  }, [crystalSize, shimmerSpeed, colorIntensity, detail])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
