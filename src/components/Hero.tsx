import { useEffect, useRef } from 'react'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      x: number = 0
      y: number = 0
      size: number = 0
      speedX: number = 0
      speedY: number = 0
      color: string = ''

      constructor() {
        if (!canvas) return
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1})`
      }

      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80" />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
              Narek Manukyan
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-300">
              Senior Flutter Developer & Team Leader
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto lg:mx-0">
              Crafting exceptional mobile experiences with Flutter. Specializing in cross-platform development, real-time features, and innovative UI/UX solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Get in Touch
              </a>
              <a
                href="#experience"
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                View Experience
              </a>
            </div>
          </div>

          {/* Flutter Development Animation */}
          <div className="relative">
            {/* Premium Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(147,51,234,0.1),transparent_50%)] rounded-2xl"></div>
            
            <div className="relative w-full h-[400px] bg-gray-900/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {/* Geometric Background Elements */}
              <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-700"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                
                {/* Geometric Shapes */}
                <div className="absolute top-12 left-1/3 w-20 h-20 border-2 border-blue-500/20 rounded-lg transform rotate-45 animate-float-slower backdrop-blur-sm bg-blue-500/5"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-purple-500/20 transform rotate-12 animate-float-slow backdrop-blur-sm bg-purple-500/5"></div>
                <div className="absolute top-1/4 right-1/3 w-24 h-24 border-2 border-cyan-500/20 rounded-full animate-float backdrop-blur-sm bg-cyan-500/5"></div>

                {/* Hexagon Grid with Glow */}
                <div className="absolute inset-0 opacity-10 mix-blend-lighten">
                  <svg width="100%" height="100%" className="text-gray-400" aria-hidden="true">
                    <defs>
                      <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(96,165,250,0.3)" />
                        <stop offset="50%" stopColor="rgba(167,139,250,0.3)" />
                        <stop offset="100%" stopColor="rgba(79,209,197,0.3)" />
                      </linearGradient>
                    </defs>
                    <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                      <path d="M24.8 22.17L37.3 14.8V0L24.8 7.37L12.4 0V14.8L0 22.17V36.97L12.4 29.6L24.8 36.97L37.3 29.6V14.8" stroke="url(#grid-gradient)" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hexagons)"/>
                  </svg>
                </div>

                {/* Glowing Lines */}
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent blur-sm"></div>
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-sm"></div>
              </div>

              {/* Background Icons with enhanced blur */}
              <div className="absolute inset-0 overflow-hidden backdrop-blur-[2px]">
                {/* Flutter Logo */}
                <div className="absolute top-8 left-8 w-16 h-16 animate-float opacity-80">
                  <svg viewBox="-30.5 0 317 317" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" className="w-full h-full" aria-label="Flutter logo"><title>Flutter logo</title>
                    <defs>
                      <linearGradient x1="3.9517088%" y1="26.9930287%" x2="75.8970734%" y2="52.9192657%" id="linearGradient-1">
                        <stop stopColor="#000000" offset="0%"></stop>
                        <stop stopColor="#000000" stopOpacity="0" offset="100%"></stop>
                      </linearGradient>
                    </defs>
                    <g>
                      <polygon fill="#47C5FB" points="157.665785 0.000549356223 0.000549356223 157.665785 48.8009614 206.466197 255.267708 0.000549356223"></polygon>
                      <polygon fill="#47C5FB" points="156.567183 145.396793 72.1487107 229.815265 121.132608 279.530905 169.842925 230.820587 255.267818 145.396793"></polygon>
                      <polygon fill="#00569E" points="121.133047 279.531124 158.214592 316.61267 255.267159 316.61267 169.842266 230.820807"></polygon>
                      <polygon fill="#00B5F8" points="71.5995742 230.364072 120.401085 181.562561 169.842046 230.821136 121.132827 279.531454"></polygon>
                      <polygon fillOpacity="0.8" fill="url(#linearGradient-1)" points="121.132827 279.531454 161.692896 266.072227 165.721875 234.941308"></polygon>
                    </g>
                  </svg>
                </div>

                {/* One Planet Summit Icon */}
                <div className="absolute top-20 right-24 w-14 h-14 animate-float-slower opacity-60">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="One Planet Summit icon"><title>One Planet Summit icon</title>
                    <circle cx="12" cy="12" r="10" fill="#34D399" fillOpacity="0.2"/>
                    <path fill="#34D399" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z"/>
                  </svg>
                </div>

                {/* HR Drone Icon */}
                <div className="absolute top-36 left-20 w-12 h-12 animate-float opacity-70">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="HR Drone icon"><title>HR Drone icon</title>
                    <rect width="24" height="24" rx="6" fill="#6366F1" fillOpacity="0.2"/>
                    <path fill="#6366F1" d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 4l4 2.5v5L12 16l-4-2.5v-5L12 6z"/>
                  </svg>
                </div>

                {/* Bitsgap Icon */}
                <div className="absolute bottom-32 right-16 w-16 h-16 animate-float-slow opacity-75">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="Bitsgap icon"><title>Bitsgap icon</title>
                    <path fill="#3B82F6" fillOpacity="0.2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    <path fill="#3B82F6" d="M16.5 12l-2.25 2.25L12 16.5l-2.25-2.25L7.5 12l2.25-2.25L12 7.5l2.25 2.25L16.5 12zm-4.5 0L12 9.75 13.25 12 12 14.25 11.5 12z"/>
                  </svg>
                </div>

                {/* Krisp Logo */}
                <div className="absolute top-12 right-12 w-12 h-12 animate-float-slow opacity-60">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="Krisp logo"><title>Krisp logo</title>
                    <path fill="#4A90E2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path fill="#4A90E2" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  </svg>
                </div>

                {/* Story Maker Icon */}
                <div className="absolute top-40 right-1/3 w-14 h-14 animate-float-slower opacity-50">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="Story Maker icon"><title>Story Maker icon</title>
                    <path fill="#6C63FF" d="M21 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4.5c.5 0 1 .5 1 1s.5 1 1 1h1c.5 0 1-.5 1-1s.5-1 1-1H19a2 2 0 0 0 2-2z"/>
                    <circle cx="12" cy="10" r="3" fill="#FFF"/>
                  </svg>
                </div>

                {/* Hydrated MobX Icon */}
                <div className="absolute bottom-20 right-1/4 w-10 h-10 animate-float opacity-70">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="Hydrated MobX icon"><title>Hydrated MobX icon</title>
                    <path fill="#FF9800" d="M17.66 9.53l-7.07 7.07-4.24-4.24 1.41-1.41 2.83 2.83 5.66-5.66 1.41 1.41zM4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8zm2 0c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6-6 2.69-6 6z"/>
                  </svg>
                </div>

                {/* Flutter Rust Bridge Icon */}
                <div className="absolute bottom-24 left-16 w-12 h-12 animate-float-slow opacity-60">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-label="Flutter Rust Bridge icon"><title>Flutter Rust Bridge icon</title>
                    <path fill="#DEA584" d="M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z"/>
                  </svg>
                </div>

                {/* Additional Blurred Icons */}
                <div className="absolute top-1/4 left-1/2 w-20 h-20 -translate-x-1/2 opacity-30 blur-sm">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#60A5FA" strokeWidth="1"/>
                    <path d="M12 6v12M6 12h12" stroke="#60A5FA" strokeWidth="1"/>
                  </svg>
                </div>
                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 opacity-20 blur-sm animate-float-slower">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
                    <path d="M12 2L2 19h20L12 2z" fill="none" stroke="#A78BFA" strokeWidth="1"/>
                  </svg>
                </div>
                <div className="absolute top-1/3 right-1/5 w-24 h-24 opacity-25 blur-sm animate-float-slow">
                  <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="#34D399" strokeWidth="1"/>
                    <circle cx="12" cy="12" r="4" fill="none" stroke="#34D399" strokeWidth="1"/>
                  </svg>
                </div>
              </div>

              {/* Code Preview with enhanced blur */}
              <div className="absolute top-32 left-8 right-8 bg-gray-900/70 rounded-lg p-4 font-mono text-sm backdrop-blur-xl border border-gray-700/50 shadow-lg">
                <div className="text-blue-400">import 'package:flutter/material.dart';</div>
                <div className="text-blue-400">import 'package:mobx/mobx.dart';</div>
                <br/>
                <div className="text-purple-400 inline">class</div><div className="text-yellow-400 inline"> MyApp</div><div className="text-white inline"> extends</div><div className="text-yellow-400 inline"> StatelessWidget</div><div className="text-white inline"> {'{'}</div>
                <div className="text-white ml-4">@override</div>
                <div className="text-white ml-4">Widget build(BuildContext context) {'{'}</div>
                <div className="text-white ml-8">return MaterialApp(</div>
                <div className="text-white ml-12">title: 'Flutter Demo',</div>
                <div className="text-white ml-12">theme: ThemeData.dark(),</div>
                <div className="text-white ml-12">home: HomePage(),</div>
                <div className="text-white ml-8">);</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-white">{'}'}</div>
              </div>

              {/* iPhone-like Frame with enhanced blur and glow */}
              <div className="absolute -bottom-4 left-[70%] transform -translate-x-1/2 w-[180px] h-[360px] bg-gray-900/80 rounded-[28px] border-4 border-gray-700/50 overflow-hidden backdrop-blur-xl shadow-lg hover:shadow-blue-500/20 transition-shadow duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
                
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[60px] h-[20px] bg-black rounded-[12px] flex items-center justify-center">
                  {/* Front Camera & Sensors */}
                  <div className="absolute left-2.5 w-1.5 h-1.5 rounded-full bg-gray-800 ring-1 ring-gray-700" />
                  <div className="absolute right-2.5 w-1 h-1 rounded-full bg-gray-800 ring-1 ring-gray-700" />
                </div>

                {/* Screen Content */}
                <div className="absolute top-0 left-0 right-0 bottom-0 pt-7">
                  {/* Status Bar */}
                  <div className="h-4 px-4 flex justify-between items-center">
                    <div className="text-[10px] font-medium text-white">9:41</div>
                    <div className="flex space-x-1">
                      <div className="flex space-x-0.5">
                        <div className="h-2 w-0.5 bg-white rounded-sm"/>
                        <div className="h-2 w-0.5 bg-white/60 rounded-sm"/>
                        <div className="h-2 w-0.5 bg-white/60 rounded-sm"/>
                        <div className="h-2 w-0.5 bg-white/30 rounded-sm"/>
                      </div>
                    </div>
                  </div>

                  {/* App Bar */}
                  <div className="mt-2 px-3 h-8 flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-400" aria-label="Flutter app icon"><title>Flutter app icon</title>
                        <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                      </svg>
                    </div>
                    <div className="ml-2 text-xs font-medium text-white">Flutter App</div>
                  </div>

                  {/* Content Area */}
                  <div className="mt-2 px-2 space-y-2">
                    {/* Card Items */}
                    <div className="h-14 bg-gray-800/40 backdrop-blur rounded-lg p-2 flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-blue-500/40" />
                      </div>
                      <div className="ml-2 flex-1">
                        <div className="w-16 h-1.5 bg-gray-400/30 rounded-full mb-1" />
                        <div className="w-20 h-1 bg-gray-400/20 rounded-full" />
                      </div>
                    </div>

                    <div className="h-14 bg-gray-800/40 backdrop-blur rounded-lg p-2 flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-purple-500/40" />
                      </div>
                      <div className="ml-2 flex-1">
                        <div className="w-14 h-1.5 bg-gray-400/30 rounded-full mb-1" />
                        <div className="w-16 h-1 bg-gray-400/20 rounded-full" />
                      </div>
                    </div>

                    <div className="h-14 bg-gray-800/40 backdrop-blur rounded-lg p-2 flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-green-500/40" />
                      </div>
                      <div className="ml-2 flex-1">
                        <div className="w-20 h-1.5 bg-gray-400/30 rounded-full mb-1" />
                        <div className="w-14 h-1 bg-gray-400/20 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-1 left-2 right-2 h-12 bg-gray-800/40 backdrop-blur rounded-lg flex items-center justify-around px-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-md bg-blue-400" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-700/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-md bg-gray-500" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-700/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-md bg-gray-500" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-700/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-md bg-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 