import { memo } from 'react'
import { motion } from 'framer-motion'
import { spring, staggerContainer, viewportOnce } from '../motion'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WorkProject {
  name: string
  tagline: string
  role: string
  outcome: string
  tech: string[]
  image: string
  alt: string
  link?: { label: string; url: string }
}

// ---------------------------------------------------------------------------
// Data — real shipped products (screenshots live in /public/images).
// ---------------------------------------------------------------------------

const PROJECTS: WorkProject[] = [
  {
    name: 'Bitsgap',
    tagline: 'Cryptocurrency trading platform',
    role: 'Mobile Team Lead',
    outcome: 'Built the iOS + Android app and architecture from scratch; shared a secure Dart↔Rust core via flutter_rust_bridge and added passkey authentication.',
    tech: ['Flutter', 'Rust', 'MobX', 'WebSocket', 'TradingView'],
    image: '/images/bitsgap.png',
    alt: 'Bitsgap crypto trading app interface with live charts',
    link: { label: 'bitsgap.com', url: 'https://bitsgap.com' },
  },
  {
    name: 'Viveo Health',
    tagline: 'White-label telemedicine platform',
    role: 'Flutter Developer',
    outcome: 'Owned the real-time chat and WebRTC video-call module across iOS and Android. Built for Estonia, then scaled globally.',
    tech: ['Flutter', 'WebRTC', 'WebSocket', 'Firebase', 'Swift', 'Kotlin'],
    image: '/images/viveo-health.png',
    alt: 'Viveo Health telemedicine app with video consultation',
  },
  {
    name: 'Fudy',
    tagline: 'QR-code ordering for restaurants & hotels',
    role: 'Mobile Team Lead',
    outcome: 'Led 4 developers to ship QR-based ordering and Stripe payments that cut customer wait times.',
    tech: ['Flutter', 'Stripe', 'REST API', 'Firebase', 'Google Cloud'],
    image: '/images/fudy.png',
    alt: 'Fudy QR-code restaurant ordering app',
  },
  {
    name: 'JITMeal POS',
    tagline: 'Cloud point-of-sale system',
    role: 'Mobile Team Lead',
    outcome: 'Built the POS from scratch (orders, inventory, reporting, profit analytics) and optimized the Flutter Web build for in-store terminals.',
    tech: ['Flutter', 'Flutter Web', 'WebSocket', 'MobX'],
    image: '/images/jitmeal.png',
    alt: 'JITMeal point-of-sale terminal interface',
  },
  {
    name: 'Perfect.Life',
    tagline: 'Premium concierge services app',
    role: 'Flutter Developer',
    outcome: 'Sole Flutter engineer on a 7-person team. Shipped the MVP in 6 months and cut app startup from ~15s to ~200ms with an architecture rewrite and caching.',
    tech: ['Flutter', 'Firebase', 'Stripe', 'MobX'],
    image: '/images/perfect-live.png',
    alt: 'Perfect.Life luxury concierge app',
  },
]

const STATS = [
  { value: '9+', label: 'products shipped' },
  { value: '10', label: 'engineers led' },
  { value: '7', label: 'pub.dev packages' },
  { value: '2k+', label: 'monthly downloads' },
]

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

const containerVariants = staggerContainer(0.1)
const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { ...spring.entrance } },
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const TechChip = memo(({ label }: { label: string }) => (
  <span className="px-2 py-0.5 rounded-md border border-line text-[11px] font-mono text-ink-muted">
    {label}
  </span>
))
TechChip.displayName = 'TechChip'

const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

const ProjectCard = memo(({ p }: { p: WorkProject }) => (
  <motion.article variants={cardVariants} className="card group overflow-hidden flex flex-col">
    {/* Screenshot */}
    <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 border-b border-line">
      <img
        src={p.image}
        alt={p.alt}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
    </div>

    {/* Body */}
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
        <span className="font-mono text-[11px] text-ink-faint shrink-0">{p.role}</span>
      </div>
      <p className="text-sm text-accent-strong mb-3">{p.tagline}</p>
      <p className="text-sm text-ink-muted leading-relaxed flex-1">{p.outcome}</p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {p.tech.map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>

      {p.link && (
        <a
          href={p.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong transition-colors"
        >
          {p.link.label}
          <ExternalIcon />
        </a>
      )}
    </div>
  </motion.article>
))
ProjectCard.displayName = 'ProjectCard'

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

const Work = () => (
  <section id="work" className="py-16 sm:py-24 relative">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ...spring.entrance }}
        viewport={viewportOnce}
        className="max-w-prose mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-3">Selected work</h2>
        <p className="text-ink-muted">
          Apps I've built and led end to end, from real-time audio and video to trading,
          telemedicine, and point-of-sale.
        </p>
      </motion.div>

      {/* Stat strip */}
      <motion.dl
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
      >
        {STATS.map((s) => (
          <motion.div key={s.label} variants={cardVariants} className="card p-5">
            <dd className="font-display text-3xl font-bold text-ink tnum">{s.value}</dd>
            <dt className="mt-1 text-sm text-ink-faint">{s.label}</dt>
          </motion.div>
        ))}
      </motion.dl>

      {/* Featured — Krisp */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ...spring.entrance }}
        viewport={viewportOnce}
        className="card p-6 sm:p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-soft blur-3xl pointer-events-none -z-0" aria-hidden="true" />
        <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full border border-warm-line bg-warm-soft text-warm-strong text-[10px] font-mono uppercase tracking-wider">
                Flagship · Current
              </span>
              <span className="font-mono text-xs text-ink-faint">Mobile Team Lead · via M-One</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">Krisp</h3>
            <p className="text-accent-strong mb-4">AI voice &amp; meeting app for iOS &amp; Android</p>
            <p className="text-ink-muted leading-relaxed max-w-prose mb-5">
              I lead the mobile team building Krisp across both platforms. The hard parts are native:
              Twilio voice calling wired up in Swift and Kotlin and paired with the Krisp
              noise-cancellation SDK for low-latency calls, plus a background upload pipeline for
              large audio files that survives app suspension and auto-resumes on network failure.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {['Flutter', 'Swift', 'Kotlin', 'Twilio Voice SDK', 'Krisp SDK', 'Platform Channels'].map((t) => (
                <TechChip key={t} label={t} />
              ))}
            </div>
            <a
              href="https://krisp.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong transition-colors"
            >
              krisp.ai
              <ExternalIcon />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
      </motion.div>
    </div>
  </section>
)

export default Work
