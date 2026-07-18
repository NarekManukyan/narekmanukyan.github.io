import { memo } from 'react'
import { motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SkillCategory {
  category: string
  items: string[]
}

// ---------------------------------------------------------------------------
// Static data — defined outside component so it is never re-allocated
// ---------------------------------------------------------------------------

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Leadership & Delivery',
    items: ['Team Leadership', 'Mentoring', 'Hiring & Interviewing', 'Estimation & Planning', 'Agile / Scrum', 'Code Review'],
  },
  {
    category: 'AI-Assisted Engineering',
    items: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Prompt Engineering', 'MCP Integrations', 'Team Enablement'],
  },
  {
    category: 'Mobile & Native',
    items: ['Flutter', 'Flutter Web', 'iOS / Swift', 'macOS / AppKit', 'Android / Kotlin', 'Platform Views', 'Platform Channels'],
  },
  {
    category: 'Languages',
    items: ['Dart', 'Swift', 'Kotlin', 'Java', 'Python', 'Rust', 'JavaScript'],
  },
  {
    category: 'Architecture & State',
    items: ['Clean Architecture', 'MVVM', 'BLoC', 'MobX', 'Riverpod', 'Provider', 'Freezed', 'DI'],
  },
  {
    category: 'Real-Time & APIs',
    items: ['REST', 'WebSocket', 'WebRTC', 'Firebase', 'Real-Time Audio'],
  },
  {
    category: 'Payments & Commerce',
    items: ['Stripe', 'In-App Purchases', 'Subscriptions', 'Passkey Auth'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['GCP', 'CI/CD', 'Codemagic', 'GitHub Actions', 'Fastlane', 'Docker', 'Git / GitLab'],
  },
  {
    category: 'Integrations & SDKs',
    items: ['flutter_rust_bridge', 'Twilio Voice', 'Krisp SDK', 'TradingView', 'HighCharts', 'StoreKit', 'Zendesk'],
  },
]

// ---------------------------------------------------------------------------
// Animation variants — stable references, never recreated
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const SkillBadge = memo(({ label }: { label: string }) => (
  <span className="px-2.5 py-1 rounded-md border border-line text-xs font-mono text-ink-muted hover:border-accent-line hover:text-accent-strong transition-colors duration-200">
    {label}
  </span>
))
SkillBadge.displayName = 'SkillBadge'

const SkillCard = memo(({ skill, index }: { skill: SkillCategory; index: number }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -3 }}
    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    className="card group p-6"
  >
    <div className="flex items-baseline gap-3 mb-4">
      <span className="font-mono text-sm text-accent tnum transition-colors duration-300 group-hover:text-warm" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="text-lg font-semibold text-ink">{skill.category}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skill.items.map((item) => (
        <SkillBadge key={item} label={item} />
      ))}
    </div>
  </motion.div>
))
SkillCard.displayName = 'SkillCard'

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const Skills = () => (
  <section id="skills" className="py-16 sm:py-24 relative">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-10 text-ink"
      >
        Skills &amp; Expertise
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {SKILL_CATEGORIES.map((skill, index) => (
          <SkillCard key={skill.category} skill={skill} index={index} />
        ))}
      </motion.div>
    </div>
  </section>
)

export default Skills
