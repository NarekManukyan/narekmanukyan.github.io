import { motion, type Variants } from 'framer-motion'
import { spring, viewportOnce } from '../motion'

// ---------------------------------------------------------------------------
// Animation constants
// ---------------------------------------------------------------------------

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
const CARD_CLASS = 'card p-7'

const AboutCard = ({ title, paragraphs, variants, delay }: AboutCardProps) => (
  <motion.div
    variants={variants}
    initial="hidden"
    whileInView="visible"
    whileHover={{ y: -3 }}
    transition={{ ...spring.entrance, delay }}
    viewport={viewportOnce}
    className={CARD_CLASS}
  >
    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-ink">{title}</h3>
    <div className="space-y-4">
      {paragraphs.map((text) => (
        <p key={text} className="text-ink-muted text-[15px] sm:text-base leading-relaxed max-w-prose">
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
  "I hold a B.Sc. in Software Engineering from the National Polytechnic University of Armenia. I've spent 7+ years shipping iOS and Android apps. Flutter is my main tool, but I drop into Swift and Kotlin whenever cross-platform alone isn't enough.",
  "Before mobile I worked in hardware at 10X Engineering, building interactive displays and STEM kits with Raspberry Pi and sensors. That work is still why I pay attention to what's happening below the framework, especially latency.",
]

const EXPERTISE_PARAGRAPHS = [
  'I lead a 10-engineer mobile team running four or five products at once, including Krisp. I own delivery from scoping to release, and I have shipped across healthcare, hospitality, fitness, luxury, recruitment, and crypto trading.',
  "I have also pushed AI tools into how the team actually works. I got people using Claude Code every day, wrote internal guides for it, and coach both engineers and non-engineers on prompting and agent workflows.",
]

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
const About = () => (
  <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ...spring.entrance }}
        viewport={viewportOnce}
        className="text-3xl sm:text-4xl font-bold text-ink mb-10"
      >
        About
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
        <AboutCard
          title="Background"
          paragraphs={BACKGROUND_PARAGRAPHS}
          variants={slideInVariants.left}
          delay={0.1}
        />
        <AboutCard
          title="Expertise"
          paragraphs={EXPERTISE_PARAGRAPHS}
          variants={slideInVariants.right}
          delay={0.2}
        />
      </div>
    </div>
  </section>
)

export default About
