import { motion, type Variants } from 'framer-motion'

// ---------------------------------------------------------------------------
// Animation constants — single source of truth for all motion values
// ---------------------------------------------------------------------------
const FADE_DURATION = 0.5

const SECTION_DELAYS = {
  heading: 0.2,
  leftCard: 0.3,
  rightCard: 0.4,
} as const

/** Shared viewport config so `viewport` prop is never duplicated. */
const ONCE_IN_VIEW = { once: true } as const

/** Fade-up variant reused by the section wrapper and heading. */
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

/** Slide-in variants for the two cards. */
const slideInVariants = {
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
} satisfies Record<string, Variants>

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AboutCardProps {
  title: string
  paragraphs: string[]
  variants: Variants
  delay: number
}

// ---------------------------------------------------------------------------
// AboutCard — reusable card with entrance animation
// ---------------------------------------------------------------------------
const CARD_CLASS =
  'bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all'

const AboutCard = ({ title, paragraphs, variants, delay }: AboutCardProps) => (
  <motion.div
    variants={variants}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: FADE_DURATION, delay }}
    viewport={ONCE_IN_VIEW}
    className={CARD_CLASS}
  >
    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-400">{title}</h3>
    <div className="space-y-4">
      {paragraphs.map((text) => (
        <p key={text} className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {text}
        </p>
      ))}
    </div>
  </motion.div>
)

// ---------------------------------------------------------------------------
// Card content data — separated from structure for easy editing
// ---------------------------------------------------------------------------
const BACKGROUND_PARAGRAPHS = [
  "I hold a Bachelor's degree in Software Engineering from the National Polytechnical University of Armenia. With over 6 years of experience in software development, I've specialized in mobile app development using Flutter.",
  'My journey includes 2 years of hardware development experience, where I worked with Raspberry Pi and various sensors, demonstrating my versatility in both software and hardware domains.',
]

const EXPERTISE_PARAGRAPHS = [
  "As a Flutter Developer and Team Leader, I've successfully led projects across diverse industries including healthcare, hospitality, retail, fitness, luxury services, recruitment, and cryptocurrency trading.",
  "I'm committed to continuous learning and staying current with the latest technologies and development trends, ensuring that I deliver cutting-edge solutions to complex problems.",
]

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
const About = () => (
  <section id="about" className="py-12 sm:py-20 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: FADE_DURATION }}
        viewport={ONCE_IN_VIEW}
        className="space-y-8"
      >
        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: FADE_DURATION, delay: SECTION_DELAYS.heading }}
          viewport={ONCE_IN_VIEW}
          className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <AboutCard
            title="Background"
            paragraphs={BACKGROUND_PARAGRAPHS}
            variants={slideInVariants.left}
            delay={SECTION_DELAYS.leftCard}
          />
          <AboutCard
            title="Expertise"
            paragraphs={EXPERTISE_PARAGRAPHS}
            variants={slideInVariants.right}
            delay={SECTION_DELAYS.rightCard}
          />
        </div>
      </motion.div>
    </div>
  </section>
)

export default About
