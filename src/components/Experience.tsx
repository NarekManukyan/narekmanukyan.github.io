import { memo, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Project {
  name: string
  description: string
  role: string
  achievements: string[]
  technologies: string[]
}

interface ExperienceEntry {
  company: string
  position: string
  duration: string
  location: string
  description?: string
  projects: Project[]
}

// ---------------------------------------------------------------------------
// Static data — defined outside component so it is never re-allocated
// ---------------------------------------------------------------------------

const EXPERIENCES: ExperienceEntry[] = [
  {
    company: 'M-One',
    position: 'Flutter Developer & Mobile Team Lead',
    duration: 'May 2020 - Present',
    location: 'Yerevan, Armenia (On-site)',
    description: 'Software company delivering mobile and web products for international clients. Krisp is one of the products my team builds and ships.',
    projects: [
      {
        name: 'Krisp Mobile',
        description: 'AI voice and meeting app for iOS and Android',
        role: 'Mobile Team Lead · Current',
        achievements: [
          'Lead Flutter development, mobile architecture, and delivery across iOS and Android',
          'Got the team onto AI tools: rolled out Claude Code, wrote internal guides for commands, subagents, MCP, and hooks, and coached engineers, designers, and PMs on agent workflows',
          'Natively integrated Twilio voice calling in Swift and Kotlin, paired with the Krisp noise-cancellation SDK for clear, low-latency calls',
          'Built a native background upload pipeline for large audio files that survives app suspension and auto-resumes on network failure',
          'Built real-time audio processing and Flutter platform-channel bridges to the native audio stack',
          'Mentor engineers through 1:1s and structured code review; interview and onboard new mobile hires',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Swift', 'Kotlin', 'Twilio Voice SDK', 'Krisp SDK', 'Platform Channels'],
      },
      {
        name: 'Bitsgap',
        description: 'Cryptocurrency trading platform',
        role: 'Mobile Team Lead',
        achievements: [
          'Led 4 Flutter developers within a 10-person cross-functional team to build the mobile app and architecture from scratch',
          'Integrated Dart with Rust via flutter_rust_bridge to share a secure core library across platforms',
          'Implemented passkey authentication to strengthen login security and reduce account-takeover risk',
          'Built React web integrations with TradingView, HighCharts, and Zendesk',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Freezed', 'Rust', 'React', 'WebSocket', 'Stripe', 'CI/CD'],
      },
      {
        name: 'Viveo Health',
        description: 'White-label telemedicine platform, built for Estonia then scaled globally',
        role: 'Flutter Developer',
        achievements: [
          'Part of a 10-person team building a white-label healthcare platform, later scaled globally over 1.5 years',
          'Owned the real-time chat and video-call module (WebRTC) across iOS and Android',
          'Drove UI/UX polish for better patient engagement',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Freezed', 'WebRTC', 'WebSocket', 'Firebase', 'Swift', 'Kotlin'],
      },
      {
        name: 'Fudy',
        description: 'QR-code ordering for restaurants & hotels',
        role: 'Mobile Team Lead',
        achievements: [
          'Led 4 mobile developers within a 12-person team over 7 months',
          'Shipped QR-based ordering and payments that cut customer wait times',
          'Implemented QR scanning, dynamic menu management, and real-time order tracking',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Freezed', 'REST API', 'Firebase', 'Stripe', 'Google Cloud'],
      },
      {
        name: 'JITMeal POS',
        description: 'Cloud point-of-sale system for restaurants',
        role: 'Mobile Team Lead',
        achievements: [
          'Led 3 Flutter developers in a 7-person team to build the POS from scratch: orders, inventory, reporting, and profit analytics',
          'Designed the architecture for order flow and real-time order processing',
          'Optimized the Flutter Web build for in-store terminals',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Freezed', 'Flutter Web', 'WebSocket', 'Online Payments'],
      },
      {
        name: 'HiLife',
        description: 'Stretching & wellness app',
        role: 'Flutter Developer',
        achievements: [
          'Rewrote the app architecture and added caching for a major performance overhaul',
          'Built a custom video player with caching',
          'Implemented in-app purchases and the subscription flow',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Video Streaming', 'In-app Purchases'],
      },
      {
        name: 'Perfect.Life',
        description: 'Premium concierge services app',
        role: 'Flutter Developer',
        achievements: [
          'Sole Flutter engineer on a 7-person team; shipped the MVP in 6 months',
          'Rewrote the architecture and added caching, cutting app startup from ~15s to ~200ms',
          'Built concierge chat, event calendar, and a curated luxury catalog with payments',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Firebase', 'Stripe'],
      },
      {
        name: 'HR Drone',
        description: 'Anonymous recruitment platform',
        role: 'Flutter Developer',
        achievements: [
          'Built registration, dynamic questionnaires, and job-match scoring',
          'Implemented an anonymous chat system',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Flutter Web', 'WebSocket'],
      },
    ],
  },
  {
    company: '10X Engineering',
    position: 'Software Engineer',
    duration: 'Oct 2018 - May 2020',
    location: 'Yerevan, Armenia (On-site)',
    description: 'Automated test systems and custom hardware/software for wireless products.',
    projects: [
      {
        name: 'Smart Mirror',
        description: 'Interactive advertising smart mirror',
        role: 'Solo Developer',
        achievements: [
          'Single-handedly built an interactive advertising display over 6 months (hardware + software)',
          'Implemented distance-triggered mode switching',
          'Built a Firebase-backed CMS for remote content updates',
        ],
        technologies: ['Java', 'Firebase', 'Raspberry Pi 4', 'Distance Sensors'],
      },
      {
        name: 'PinoKIT',
        description: 'STEM education hardware kits',
        role: 'Software Engineer',
        achievements: [
          'Delivered affordable STEM education kits with companion software',
          'Built experiment tracking and data-visualization tools',
        ],
        technologies: ['Python', 'Python QT', 'Raspberry Pi 4', 'Figma'],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Animation variants — stable references, never recreated
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const TechBadge = memo(({ label }: { label: string }) => (
  <span className="px-2.5 py-1 rounded-md border border-line text-xs font-mono text-ink-muted hover:border-accent-line hover:text-accent-strong transition-colors duration-200">
    {label}
  </span>
))
TechBadge.displayName = 'TechBadge'

/** One project rendered as a node on the company's timeline rail. */
const ProjectItem = memo(({ project }: { project: Project }) => {
  const isCurrent = /·\s*Current/.test(project.role)
  const roleLabel = project.role.replace(/\s*·\s*Current\s*/, '')

  return (
  <motion.li variants={itemVariants} className="relative pl-7">
    {/* Node marker on the rail — warm + pulsing for the current role */}
    <span
      className={`absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-[5px] rounded-full ring-4 ring-surface ${
        isCurrent ? 'bg-warm' : 'bg-accent'
      }`}
      aria-hidden="true"
    >
      {isCurrent && (
        <span className="absolute inset-0 rounded-full bg-warm opacity-60 animate-ping" />
      )}
    </span>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
      <h4 className="text-lg font-semibold text-ink">{project.name}</h4>
      <span className="font-mono text-xs text-ink-faint">{roleLabel}</span>
      {isCurrent && (
        <span className="px-2 py-0.5 rounded-full border border-warm-line bg-warm-soft text-warm-strong text-[10px] font-mono uppercase tracking-wider">
          Current
        </span>
      )}
    </div>
    <p className="text-ink-muted mb-4 max-w-prose">{project.description}</p>
    <ul className="space-y-1.5 mb-4">
      {project.achievements.map((achievement) => (
        <li key={achievement} className="flex gap-2.5 text-sm text-ink-muted">
          <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
          <span>{achievement}</span>
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech) => (
        <TechBadge key={tech} label={tech} />
      ))}
    </div>
  </motion.li>
  )
})
ProjectItem.displayName = 'ProjectItem'

const ExperienceCard = memo(({ exp }: { exp: ExperienceEntry }) => {
  const railRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.8', 'end 0.55'],
  })
  const fillScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div variants={itemVariants} className="card p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
        <div>
          <h3 className="text-2xl font-bold text-ink">{exp.company}</h3>
          <p className="text-accent-strong mt-1 font-medium">{exp.position}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-ink-muted font-mono text-sm tnum">{exp.duration}</p>
          <p className="text-ink-faint text-sm">{exp.location}</p>
        </div>
      </div>
      {exp.description && (
        <p className="text-sm text-ink-faint max-w-prose mb-8">{exp.description}</p>
      )}
      {/* Timeline: hairline rail + node dots, with an accent fill that tracks
          scroll progress through the card (a real chronology, not a side-stripe) */}
      <ol ref={railRef} className="relative border-l border-line ml-1 space-y-8">
        <motion.span
          className="absolute -left-px top-0 w-[2px] h-full origin-top bg-gradient-to-b from-accent via-accent to-accent/0"
          style={{ scaleY: fillScale }}
          aria-hidden="true"
        />
        {exp.projects.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))}
      </ol>
    </motion.div>
  )
})
ExperienceCard.displayName = 'ExperienceCard'

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const Experience = () => (
  <section id="experience" className="py-16 sm:py-24 relative">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-ink">
          Experience
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.company} exp={exp} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
)

export default Experience
