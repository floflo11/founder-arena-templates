"use client"

import { useRef, useEffect } from "react"

interface IridescenceEffectProps {
  speed?: number
  amplitude?: number
  mouseReact?: boolean
}

export const IridescenceEffect = ({ speed = 1.0, amplitude = 0.1, mouseReact = true }: IridescenceEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

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

    // Very simple iridescence
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(
      fragmentShader,
      `
      precision lowp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_speed;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;
        
        float dist = length(uv - (u_mouse * 2.0 - 1.0));
        float wave = sin(dist * 10.0 - u_time * u_speed) * 0.5 + 0.5;
        
        vec3 color = vec3(
          sin(wave + 0.0) * 0.5 + 0.5,
          sin(wave + 2.0) * 0.5 + 0.5,
          sin(wave + 4.0) * 0.5 + 0.5
        );
        
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
    const mouseLocation = gl.getUniformLocation(program, "u_mouse")
    const speedLocation = gl.getUniformLocation(program, "u_speed")

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * 0.5
      canvas.height = rect.height * 0.5
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseReact) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / rect.width
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height
    }

    const startTime = Date.now()

    const render = () => {
      const time = (Date.now() - startTime) * 0.001

      gl.uniform1f(timeLocation, time)
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)
      gl.uniform1f(speedLocation, speed)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      requestAnimationFrame(render)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    resize()
    render()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(window.requestAnimationFrame(render))
      canvas.removeEventListener("mousemove", handleMouseMove)
      resizeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(buffer)
    }
  }, [speed, amplitude, mouseReact])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ imageRendering: "pixelated" }} />
}
