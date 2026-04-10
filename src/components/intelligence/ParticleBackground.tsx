import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const particleCount = 90
    const connectionDistance = 160
    const mouseRadius = 200

    // Vanta NET style colors
    const bgColor = '#0f0b1a'
    const lineColor = { r: 190, g: 50, b: 255 }   // vibrant pink-purple lines
    const dotColor = { r: 220, g: 100, b: 255 }    // bright dots

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const createParticles = () => {
      particles.length = 0
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 400,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          vz: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 2 + 1,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Fill background
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, w, h)

      const mouse = mouseRef.current

      // Update particles
      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < mouseRadius && mDist > 0) {
          const force = (mouseRadius - mDist) / mouseRadius * 0.015
          p.vx += (mdx / mDist) * force
          p.vy += (mdy / mDist) * force
        }

        // Damping
        p.vx *= 0.998
        p.vy *= 0.998
        p.vz *= 0.998

        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        // Bounce off edges softly
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > w) { p.x = w; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > h) { p.y = h; p.vy *= -1 }
        if (p.z < 0) { p.z = 0; p.vz *= -1 }
        if (p.z > 400) { p.z = 400; p.vz *= -1 }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dz = (a.z - b.z) * 0.3
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.35
            const depthFade = 1 - ((a.z + b.z) / 2) / 600

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${alpha * depthFade})`
            ctx.lineWidth = (1 - dist / connectionDistance) * 1.2
            ctx.stroke()
          }
        }
      }

      // Draw dots with glow
      for (const p of particles) {
        const depthScale = 1 - p.z / 600
        const r = p.radius * (0.5 + depthScale * 0.8)
        const alpha = 0.3 + depthScale * 0.7

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4)
        gradient.addColorStop(0, `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, ${alpha * 0.3})`)
        gradient.addColorStop(1, `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, ${alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    const onResize = () => {
      resize()
      createParticles()
    }

    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      style={{ background: '#0f0b1a' }}
    />
  )
}

export default ParticleBackground
