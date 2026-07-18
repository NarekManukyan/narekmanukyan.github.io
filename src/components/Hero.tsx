import { useEffect, useRef, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { spring } from '../motion'

// ---------------------------------------------------------------------------
// Particle system constants
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 70
const PARTICLE_SIZE_BASE = 0.6
const PARTICLE_SIZE_RANGE = 1.4
const PARTICLE_SPEED_RANGE = 0.4 // half-range; actual speed ±0.2
const PARTICLE_OPACITY_MIN = 0.08
const PARTICLE_OPACITY_RANGE = 0.32 // min + random * range
const PARTICLE_COLOR_RGB = '86, 170, 232' // Flutter-azure accent

// ---------------------------------------------------------------------------
// Hero entrance animation variants
// ---------------------------------------------------------------------------

const heroTextVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...spring.entrance },
  },
}

const heroPanelVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...spring.entrance, delay: 0.35 },
  },
}

// ---------------------------------------------------------------------------
// Particle — defined outside the component so it is not re-created on each
// render. Canvas dimensions are passed in via reset() instead of the ctor.
// ---------------------------------------------------------------------------
interface ParticleConfig {
  canvasWidth: number
  canvasHeight: number
}

class Particle {
  x = 0
  y = 0
  size = 0
  speedX = 0
  speedY = 0
  color = ''

  reset({ canvasWidth, canvasHeight }: ParticleConfig): void {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.size = Math.random() * PARTICLE_SIZE_RANGE + PARTICLE_SIZE_BASE
    this.speedX = Math.random() * PARTICLE_SPEED_RANGE - PARTICLE_SPEED_RANGE / 2
    this.speedY = Math.random() * PARTICLE_SPEED_RANGE - PARTICLE_SPEED_RANGE / 2
    const opacity = Math.random() * PARTICLE_OPACITY_RANGE + PARTICLE_OPACITY_MIN
    this.color = `rgba(${PARTICLE_COLOR_RGB}, ${opacity})`
  }

  update(canvasWidth: number, canvasHeight: number): void {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > canvasWidth) this.x = 0
    if (this.x < 0) this.x = canvasWidth
    if (this.y > canvasHeight) this.y = 0
    if (this.y < 0) this.y = canvasHeight
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// ---------------------------------------------------------------------------
// Code card — the single hero visual. An engineer's own material, not
// decorative noise: a clean editor pane with real Dart.
// ---------------------------------------------------------------------------

// Each entry is one rendered code line; blank strings render as spacing.
const CODE_LINES: ReactNode[] = [
  <><span className="text-accent">import</span> <span className="text-ink">'package:flutter/material.dart'</span>;</>,
  '',
  <><span className="text-accent">class</span> <span className="text-ink">Portfolio</span> <span className="text-accent">extends</span> <span className="text-ink">StatelessWidget</span> {'{'}</>,
  <>{'  '}<span className="text-ink-faint">@override</span></>,
  <>{'  '}<span className="text-ink">Widget</span> build(<span className="text-ink">BuildContext</span> context) {'{'}</>,
  <>{'    '}<span className="text-accent">return</span> <span className="text-ink">Mobile</span>(</>,
  <>{'      '}team: <span className="text-warm-strong">10</span>.engineers,</>,
  <>{'      '}platforms: [<span className="text-ink">iOS</span>, <span className="text-ink">Android</span>],</>,
  <>{'      '}aiAssisted: <span className="text-accent">true</span>,</>,
  <>{'    '});</>,
  <>{'  '}{'}'}</>,
  <>{'}'}</>,
]

const codeContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.55 } },
}
const codeLine: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
}

const CodeCard = () => (
  <div className="card overflow-hidden">
    {/* Window chrome */}
    <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-surface-2" />
        <span className="w-2.5 h-2.5 rounded-full bg-surface-2" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-xs text-ink-faint">main.dart</span>
    </div>

    {/* Code body — reveals line by line, then a blinking caret */}
    <motion.pre
      className="px-5 py-5 font-mono text-[13px] leading-relaxed overflow-x-auto text-ink-muted"
      variants={codeContainer}
      initial="hidden"
      animate="visible"
    >
      {CODE_LINES.map((line, i) => (
        <motion.div key={i} variants={codeLine} className="whitespace-pre min-h-[1.4em]">
          {line}
          {i === CODE_LINES.length - 1 && <span className="caret" aria-hidden="true">&nbsp;</span>}
        </motion.div>
      ))}
    </motion.pre>
  </div>
)

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Skip canvas animation if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Debounce resize handler
    let resizeTimer: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resizeCanvas, 150)
    }
    window.addEventListener('resize', debouncedResize)

    // Build particle pool once
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const p = new Particle()
      p.reset({ canvasWidth: canvas.width, canvasHeight: canvas.height })
      return p
    })

    let rafId: number
    let isVisible = true

    const animate = () => {
      if (!isVisible) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const particle of particles) {
        particle.update(canvas.width, canvas.height)
        particle.draw(ctx)
      }
      rafId = requestAnimationFrame(animate)
    }

    // Pause canvas when Hero is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true
          rafId = requestAnimationFrame(animate)
        } else {
          isVisible = false
          cancelAnimationFrame(rafId)
        }
      },
      { threshold: 0.01 },
    )
    observer.observe(canvas)

    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimer)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Soft accent glow anchoring the composition, not decorating it */}
      <div
        className="absolute top-1/3 -right-32 w-[38rem] h-[38rem] rounded-full bg-accent-soft blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg pointer-events-none" />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">

          {/* Text — staggered entrance */}
          <motion.div variants={heroTextVariants} initial="hidden" animate="visible">
            <motion.p variants={heroItemVariants} className="mono-label mb-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Senior Flutter Engineer · Mobile Team Lead · Yerevan
            </motion.p>

            <motion.h1
              variants={heroItemVariants}
              className="font-display text-[clamp(2.4rem,5.5vw,4.25rem)] font-bold leading-[1.02] text-ink"
            >
              I ship production iOS &amp; Android apps — and lead the teams that build them.
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="mt-6 text-base sm:text-lg text-ink-muted max-w-prose leading-relaxed"
            >
              7+ years in Flutter with the native Swift and Kotlin depth to go lower when it matters.
              I'm Mobile Team Lead on <span className="text-accent-strong">Krisp</span> — real-time
              audio and native integrations — and I moved the team to AI-assisted delivery with
              Claude Code.
            </motion.p>

            <motion.p
              variants={heroItemVariants}
              className="mt-4 font-mono text-sm text-ink-faint max-w-prose"
            >
              Open to senior / lead mobile roles and freelance projects.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="px-7 py-3 rounded-lg font-semibold bg-accent text-accent-ink transition-colors duration-200 hover:bg-accent-strong text-center inline-flex items-center justify-center gap-2"
              >
                Get in touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href="/CV_Narek_Manukyan.pdf"
                download
                className="px-7 py-3 rounded-lg font-medium border border-line text-ink transition-colors duration-200 hover:border-accent-line hover:text-accent-strong text-center inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Download CV
              </a>
            </motion.div>

            <motion.div variants={heroItemVariants} className="mt-6 flex items-center gap-5 text-sm text-ink-faint">
              <a href="https://linkedin.com/in/narek--manukyan" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                LinkedIn
              </a>
              <span className="text-line" aria-hidden="true">·</span>
              <a href="https://github.com/narekmanukyan" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                GitHub
              </a>
              <span className="text-line" aria-hidden="true">·</span>
              <span className="font-mono text-xs">Yerevan · GMT+4 · remote-friendly</span>
            </motion.div>
          </motion.div>

          {/* Code card — the single hero visual */}
          <motion.div
            variants={heroPanelVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <CodeCard />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
