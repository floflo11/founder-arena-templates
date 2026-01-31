"use client"

import { useRef, useEffect } from "react"

interface WavyTextEffectProps {
  waveAmplitude?: number
  waveFrequency?: number
  lineDensity?: number
  speed?: number
  grainAmount?: number
  hue1Start?: number // Hue for '2'
  hue2Start?: number // Hue for '1'
  textScale?: number
  lineWidth?: number
}

export const WavyTextEffect = ({
  waveAmplitude = 0.03,
  waveFrequency = 15.0,
  lineDensity = 25.0,
  speed = 0.3,
  grainAmount = 0.05,
  hue1Start = 0.0, // Red
  hue2Start = 0.6, // Blue/Cyan
  textScale = 0.8,
  lineWidth = 0.02,
}: WavyTextEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const vertexShaderRef = useRef<WebGLShader | null>(null)
  const fragmentShaderRef = useRef<WebGLShader | null>(null)
  const vertexBufferRef = useRef<WebGLBuffer | null>(null)
  const startTimeRef = useRef<number>(0)
  const animationFrameIdRef = useRef<number>(0)

  const compileShader = (source: string, type: number): WebGLShader | null => {
    const gl = glRef.current
    if (!gl) {
      console.error("WebGL context not available in compileShader for WavyTextEffect.")
      return null
    }

    const shader = gl.createShader(type)
    if (!shader) {
      console.error("Failed to create shader object in WavyTextEffect.")
      return null
    }
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const shaderTypeString = type === gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT"
      console.error(`WavyTextEffect Shader compile error (${shaderTypeString}):`, gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    return shader
  }

  const initGL = () => {
    const canvas = canvasRef.current
    if (!canvas) return false // Indicate failure

    const gl = canvas.getContext("webgl")
    if (!gl) {
      console.error("WebGL not supported for WavyTextEffect.")
      return false // Indicate failure
    }
    glRef.current = gl

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uWaveAmplitude;
      uniform float uWaveFrequency;
      uniform float uLineDensity;
      uniform float uSpeed;
      uniform float uGrainAmount;
      uniform float uHue1Start;
      uniform float uHue2Start;
      uniform float uTextScale;
      uniform float uLineWidth;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float sdRoundedBox(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
      }
      
      float sdfOne(vec2 p) {
        float mainStroke = sdRoundedBox(p - vec2(0.0, 0.0), vec2(0.05, 0.25), 0.02);
        float topStroke = sdRoundedBox(p - vec2(-0.03, 0.22), vec2(0.08, 0.03), 0.02);
        return min(mainStroke, topStroke);
      }

      float sdfTwo(vec2 p) {
        float s2 = 1e10;
        s2 = min(s2, sdRoundedBox(p-vec2(0.0, 0.2), vec2(0.1,0.03), 0.01)); 
        s2 = min(s2, sdRoundedBox(p-vec2(0.07,0.1), vec2(0.03,0.08), 0.01)); 
        s2 = min(s2, sdRoundedBox(p-vec2(0.0,0.0), vec2(0.1,0.03), 0.01)); 
        s2 = min(s2, sdRoundedBox(p-vec2(-0.07,-0.1), vec2(0.03,0.08), 0.01));
        s2 = min(s2, sdRoundedBox(p-vec2(0.0,-0.2), vec2(0.1,0.03), 0.01)); 
        return s2;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
        uv /= uTextScale;

        vec3 finalColor = vec3(0.0);
        float time = iTime * uSpeed;

        vec2 uv2 = uv + vec2(0.25, 0.0); 
        vec2 uv1 = uv - vec2(0.15, 0.0); 

        float dist2 = sdfTwo(uv2);
        float dist1 = sdfOne(uv1);

        float shapeMask = 1.0 - smoothstep(-0.01, 0.01, min(dist1, dist2));
        
        if (shapeMask > 0.01) {
          float modifiedY = uv.y + sin(uv.x * uWaveFrequency + time) * uWaveAmplitude;
          float line = smoothstep(uLineWidth - 0.005, uLineWidth, abs(fract(modifiedY * uLineDensity) - 0.5));
          line = 1.0 - line; 

          float intensity = line * shapeMask;
          
          vec3 color2 = hsv2rgb(vec3(uHue1Start + uv2.x * 0.2, 0.8, 0.9)); 
          vec3 color1 = hsv2rgb(vec3(uHue2Start - uv1.x * 0.2, 0.8, 0.9)); 
          
          vec3 chosenColor = dist2 < dist1 ? color2 : color1;
          if (abs(dist1 - dist2) < 0.05 && dist1 < 0.0 && dist2 < 0.0) { 
             chosenColor = mix(color2, color1, smoothstep(-0.02, 0.02, uv.x + 0.05));
          }

          finalColor = chosenColor * intensity;
          finalColor += (random(gl_FragCoord.xy * 0.1) - 0.5) * uGrainAmount;
          finalColor = clamp(finalColor, 0.0, 1.0);
        }
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    vertexShaderRef.current = vs
    fragmentShaderRef.current = fs

    if (!vs || !fs) {
      console.error("WavyTextEffect: Shader compilation failed. Aborting initGL.")
      return false // Indicate failure
    }

    const prog = gl.createProgram()
    if (!prog) {
      console.error("WavyTextEffect: Failed to create GL program.")
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      vertexShaderRef.current = null
      fragmentShaderRef.current = null
      return false // Indicate failure
    }

    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("WavyTextEffect: Program linking error:", gl.getProgramInfoLog(prog))
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      vertexShaderRef.current = null
      fragmentShaderRef.current = null
      gl.deleteProgram(prog) // Delete the failed program
      return false // Indicate failure
    }

    programRef.current = prog

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    vertexBufferRef.current = buffer

    const aPosition = gl.getAttribLocation(prog, "aPosition")
    if (aPosition < 0) {
      console.error("WavyTextEffect: Failed to get attribute location for aPosition.")
      // Perform cleanup if attribute location fails
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      vertexShaderRef.current = null
      fragmentShaderRef.current = null
      gl.deleteProgram(prog)
      programRef.current = null
      if (buffer) gl.deleteBuffer(buffer)
      vertexBufferRef.current = null
      return false // Indicate failure
    }
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
    return true // Indicate success
  }

  useEffect(() => {
    // This effect now runs only once on mount to initialize WebGL
    const success = initGL()

    if (!success) {
      console.error("WavyTextEffect: WebGL Initialization failed.")
      return // Don't proceed if init failed
    }

    const canvas = canvasRef.current
    const gl = glRef.current

    if (!canvas || !gl) return

    const resizeCanvas = () => {
      const currentGl = glRef.current
      const currentCanvas = canvasRef.current
      if (!currentCanvas || !currentGl) return

      if (
        currentCanvas.parentElement &&
        currentCanvas.parentElement.clientWidth > 0 &&
        currentCanvas.parentElement.clientHeight > 0
      ) {
        currentCanvas.width = currentCanvas.parentElement.clientWidth
        currentCanvas.height = currentCanvas.parentElement.clientHeight
      } else {
        currentCanvas.width = currentCanvas.clientWidth || 300
        currentCanvas.height = currentCanvas.clientHeight || 150
      }
      currentGl.viewport(0, 0, currentGl.canvas.width, currentGl.canvas.height)
    }
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    startTimeRef.current = performance.now()
    animationFrameIdRef.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameIdRef.current)

      const currentGl = glRef.current
      if (currentGl && !currentGl.isContextLost()) {
        if (programRef.current && vertexShaderRef.current) {
          currentGl.detachShader(programRef.current, vertexShaderRef.current)
        }
        if (programRef.current && fragmentShaderRef.current) {
          currentGl.detachShader(programRef.current, fragmentShaderRef.current)
        }

        if (programRef.current) {
          currentGl.deleteProgram(programRef.current)
          programRef.current = null
        }
        if (vertexShaderRef.current) {
          currentGl.deleteShader(vertexShaderRef.current)
          vertexShaderRef.current = null
        }
        if (fragmentShaderRef.current) {
          currentGl.deleteShader(fragmentShaderRef.current)
          fragmentShaderRef.current = null
        }
        if (vertexBufferRef.current) {
          currentGl.deleteBuffer(vertexBufferRef.current)
          vertexBufferRef.current = null
        }
      }
      glRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array: run once on mount

  // Separate useEffect for updating uniforms when props change
  useEffect(() => {
    const gl = glRef.current
    const program = programRef.current

    if (gl && program && !gl.isContextLost()) {
      gl.uniform1f(gl.getUniformLocation(program, "uWaveAmplitude"), waveAmplitude)
      gl.uniform1f(gl.getUniformLocation(program, "uWaveFrequency"), waveFrequency)
      gl.uniform1f(gl.getUniformLocation(program, "uLineDensity"), lineDensity)
      gl.uniform1f(gl.getUniformLocation(program, "uSpeed"), speed)
      gl.uniform1f(gl.getUniformLocation(program, "uGrainAmount"), grainAmount)
      gl.uniform1f(gl.getUniformLocation(program, "uHue1Start"), hue1Start)
      gl.uniform1f(gl.getUniformLocation(program, "uHue2Start"), hue2Start)
      gl.uniform1f(gl.getUniformLocation(program, "uTextScale"), textScale)
      gl.uniform1f(gl.getUniformLocation(program, "uLineWidth"), lineWidth)
    }
  }, [waveAmplitude, waveFrequency, lineDensity, speed, grainAmount, hue1Start, hue2Start, textScale, lineWidth])

  const renderLoop = () => {
    const currentGl = glRef.current
    const currentProgram = programRef.current

    if (!currentGl || !currentProgram || !canvasRef.current || currentGl.isContextLost()) {
      animationFrameIdRef.current = requestAnimationFrame(renderLoop) // Keep trying or it might stop
      return
    }

    currentGl.clearColor(0.0, 0.0, 0.0, 1.0) // Set clear color to black
    currentGl.clear(currentGl.COLOR_BUFFER_BIT) // Clear the color buffer

    // Uniforms are now set by the dedicated useEffect, but time and resolution are per-frame
    currentGl.uniform2f(
      currentGl.getUniformLocation(currentProgram, "iResolution"),
      currentGl.canvas.width,
      currentGl.canvas.height,
    )
    currentGl.uniform1f(
      currentGl.getUniformLocation(currentProgram, "iTime"),
      (performance.now() - startTimeRef.current) / 1000.0,
    )

    currentGl.drawArrays(currentGl.TRIANGLES, 0, 6)
    animationFrameIdRef.current = requestAnimationFrame(renderLoop)
  }

  return <canvas ref={canvasRef} className="w-full h-full bg-black" />
}
