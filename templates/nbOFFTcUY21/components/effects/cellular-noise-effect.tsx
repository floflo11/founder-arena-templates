"use client"

import { useRef, useEffect } from "react"

interface CellularNoiseEffectProps {
  scale?: number
  speed?: number
  edgeThickness?: number
  movement?: number
  hue?: number
  saturation?: number
  brightness?: number
}

export const CellularNoiseEffect = ({
  scale = 5.0,
  speed = 0.2,
  edgeThickness = 0.05,
  movement = 0.3,
  hue = 200,
  saturation = 0.7,
  brightness = 0.8,
}: CellularNoiseEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const vertexBufferRef = useRef<WebGLBuffer | null>(null)
  const startTimeRef = useRef<number>(0)
  const animationFrameIdRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) {
      console.error("WebGL not supported for CellularNoiseEffect.")
      return
    }

    glRef.current = gl

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
      uniform float uSpeed;
      uniform float uEdgeThickness;
      uniform float uMovement;
      uniform float uHue;
      uniform float uSaturation;
      uniform float uBrightness;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      // 2D Random
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      // Voronoi distance function
      vec2 voronoi(vec2 x, float time) {
        vec2 n = floor(x); // Integer part
        vec2 f = fract(x); // Fractional part

        float m = 1.0; // Min distance
        vec2 mr;       // Coords of closest point

        for (int j = -1; j <= 1; j++) {
          for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j)); // Neighbor cell
            vec2 o = vec2(random(n + g) * 0.8 + 0.1, random(n + g + vec2(1.0,0.0)) * 0.8 + 0.1); // Random point in cell
            o = 0.5 + 0.5 * sin(time * uSpeed + 6.2831 * o * uMovement); // Animate points

            float d = length(g + o - f);
            if (d < m) {
              m = d;
              mr = g + o;
            }
          }
        }
        return vec2(m, random(n + mr)); // Return distance and cell ID (random value)
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
        uv *= uScale;
        
        float time = iTime * uSpeed;
        vec2 vor = voronoi(uv, time);

        float distToEdge = vor.x;
        float cellID = vor.y;

        // Color based on cell ID and distance to edge
        vec3 color = hsv2rgb(vec3(mod(uHue/360.0 + cellID * 0.1, 1.0), uSaturation, uBrightness));
        
        // Darken edges
        float edgeFactor = smoothstep(0.0, uEdgeThickness, distToEdge);
        color *= edgeFactor;
        
        // Highlight cell centers slightly
        color += hsv2rgb(vec3(mod(uHue/360.0 + cellID * 0.1 + 0.05, 1.0), uSaturation * 0.8, uBrightness * 1.2)) * (1.0 - smoothstep(0.0, 0.3, distToEdge)) * 0.3;

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
          `Shader compile error (${type === gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT"}):`,
          gl.getShaderInfoLog(shader),
        )
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
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed")
    const uEdgeThicknessLocation = gl.getUniformLocation(program, "uEdgeThickness")
    const uMovementLocation = gl.getUniformLocation(program, "uMovement")
    const uHueLocation = gl.getUniformLocation(program, "uHue")
    const uSaturationLocation = gl.getUniformLocation(program, "uSaturation")
    const uBrightnessLocation = gl.getUniformLocation(program, "uBrightness")

    programRef.current = program
    vertexBufferRef.current = vertexBuffer
    startTimeRef.current = performance.now()

    const renderLoop = () => {
      const gl = glRef.current
      const program = programRef.current
      const canvas = canvasRef.current
      const animationFrameId = animationFrameIdRef.current

      if (!canvas || !gl || !program || gl.isContextLost()) {
        cancelAnimationFrame(animationFrameId)
        return
      }

      gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height)
      const currentTime = performance.now()
      gl.uniform1f(iTimeLocation, (currentTime - startTimeRef.current) / 1000.0)
      gl.uniform1f(uScaleLocation, scale)
      gl.uniform1f(uSpeedLocation, speed)
      gl.uniform1f(uEdgeThicknessLocation, edgeThickness)
      gl.uniform1f(uMovementLocation, movement)
      gl.uniform1f(uHueLocation, hue)
      gl.uniform1f(uSaturationLocation, saturation)
      gl.uniform1f(uBrightnessLocation, brightness)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationFrameIdRef.current = requestAnimationFrame(renderLoop)
    }

    resizeCanvas()
    animationFrameIdRef.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameIdRef.current)
      const gl = glRef.current
      if (gl && !gl.isContextLost()) {
        const program = programRef.current
        const vertexBuffer = vertexBufferRef.current
        if (program) gl.deleteProgram(program)
        if (vertexShader) gl.deleteShader(vertexShader)
        if (fragmentShader) gl.deleteShader(fragmentShader)
        if (vertexBuffer) gl.deleteBuffer(vertexBuffer)
      }
    }
  }, [scale, speed, edgeThickness, movement, hue, saturation, brightness])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
