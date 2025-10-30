'use client'

import { useEffect, useRef } from 'react'

export default function CloudySkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const glContext = canvas.getContext('webgl2')
    if (!glContext) {
      console.error('WebGL2 not supported')
      return
    }
    const gl = glContext

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Vertex shader
    const vertexShaderSource = `#version 300 es
      in vec2 position;
      out vec2 vUv;

      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    // Fragment shader with cloudy sky effect
    const fragmentShaderSource = `#version 300 es
      precision highp float;

      in vec2 vUv;
      out vec4 fragColor;

      uniform float uTime;
      uniform vec2 uResolution;

      // Noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Fractal Brownian Motion for clouds
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;

        for(int i = 0; i < 6; i++) {
          value += amplitude * snoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      // Cloud function with more billowy shapes
      float clouds(vec2 p, float time) {
        vec2 q = vec2(
          fbm(p + vec2(time * 0.05, time * 0.02)),
          fbm(p + vec2(time * 0.03, -time * 0.04))
        );

        vec2 r = vec2(
          fbm(p + 4.0 * q + vec2(1.7, 9.2)),
          fbm(p + 4.0 * q + vec2(8.3, 2.8))
        );

        float f = fbm(p + 3.0 * r);

        // Create billowy cloud shapes
        return smoothstep(0.2, 0.8, f * 0.5 + 0.5);
      }

      // Sky gradient colors
      vec3 getSkyColor(vec2 uv) {
        // Sky blue gradient (lighter at horizon, deeper blue at top)
        vec3 topColor = vec3(0.45, 0.55, 0.75);      // Deep blue
        vec3 horizonColor = vec3(0.75, 0.8, 0.88); // Light blue

        // Gradient from bottom to top
        float gradient = smoothstep(0.0, 0.7, uv.y);
        return mix(horizonColor, topColor, gradient);
      }

      // Cloud colors
      vec3 getCloudColor(float cloudDensity, vec2 uv) {
        // Base cloud color - soft white/light gray
        vec3 cloudWhite = vec3(0.95, 0.96, 0.98);
        vec3 cloudShadow = vec3(0.75, 0.78, 0.85);

        // Add subtle variation to clouds
        float variation = snoise(uv * 5.0) * 0.5 + 0.5;
        vec3 cloudColor = mix(cloudShadow, cloudWhite, variation);

        return cloudColor;
      }

      void main() {
        vec2 uv = vUv;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= uResolution.x / uResolution.y;

        // Slow time for gentle cloud movement
        float t = uTime * 0.1;

        // Get solid sky color
        vec3 skyColor = getSkyColor(uv);

        // Only render big puffy clouds in bottom half
        float puffyClouds = 0.0;
        if (uv.y < 0.6) {
          // Create big puffy clouds
          vec2 cloudP = p;
          cloudP.y += 0.5; // Shift down

          // Multiple cloud layers for puffiness
          float bigCloud1 = clouds(cloudP * 1.2, t * 0.9);
          float bigCloud2 = clouds(cloudP * 1.8, t * 0.7);
          float bigCloud3 = clouds(cloudP * 2.4, t * 0.5);

          puffyClouds = bigCloud1 * 0.7 + bigCloud2 * 0.5 + bigCloud3 * 0.3;
          puffyClouds = smoothstep(0.2, 0.9, puffyClouds);

          // Fade clouds smoothly at the top edge
          puffyClouds *= smoothstep(0.65, 0.4, uv.y);
        }

        // Pure white color for puffy clouds
        vec3 whiteCloudColor = vec3(0.98, 0.99, 1.0);

        // Start with solid sky, blend in puffy clouds
        vec3 finalColor = mix(skyColor, whiteCloudColor, puffyClouds * 0.92);

        // Add subtle atmospheric haze near horizon
        float haze = (1.0 - uv.y) * 0.08;
        finalColor += vec3(haze);

        // Output with full opacity
        fragColor = vec4(finalColor, 1.0);
      }
    `

    // Compile shader
    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl.createShader(type)
      if (!shader) return null

      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    // Create program
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Create full-screen quad
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ])

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const timeLoc = gl.getUniformLocation(program, 'uTime')
    const resolutionLoc = gl.getUniformLocation(program, 'uResolution')

    // Animation loop
    let animationId: number
    const startTime = Date.now()

    const render = () => {
      const time = (Date.now() - startTime) / 1000

      gl.uniform1f(timeLoc, time)
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height)

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  )
}
