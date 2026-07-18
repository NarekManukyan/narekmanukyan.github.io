import { useCallback, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Projects from './components/Projects'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const SECTION_IDS = ['home', 'work', 'about', 'experience', 'skills', 'projects', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export const SECTION_LABELS: Record<SectionId, string> = {
  home: 'Home',
  work: 'Work',
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Open Source',
  contact: 'Contact',
}

const FIRST_SECTION = SECTION_IDS[0]
const LAST_SECTION = SECTION_IDS[SECTION_IDS.length - 1]

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

function App() {
  const [activeSection, setActiveSection] = useState<string>(FIRST_SECTION)

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const isLastSection = activeSection === LAST_SECTION

  const handleFloatingButtonClick = useCallback(() => {
    const target = isLastSection ? FIRST_SECTION : LAST_SECTION
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
  }, [isLastSection])

  return (
    <MotionConfig reducedMotion="user">
      <div className="text-ink min-h-screen">
        <Analytics />

        {/* Ambient background field — depth behind all content */}
        <div className="bg-aurora" aria-hidden="true" />
        <div className="bg-grid" aria-hidden="true" />

        {/* Scroll progress indicator — solid accent */}
        <motion.div
          style={{ scaleX, transformOrigin: 'left' }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[60]"
        />

        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div id={FIRST_SECTION}>
          <Hero />
        </div>
        <Work />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />

        {/* Footer */}
        <footer className="border-t border-line-soft py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <span className="font-display font-bold text-ink">Narek Manukyan</span>
            <nav className="flex items-center gap-6 text-ink-faint">
              <a href="https://github.com/narekmanukyan" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/narek--manukyan" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                LinkedIn
              </a>
              <a href="mailto:narek.manukyan.2031@gmail.com" className="hover:text-accent transition-colors">
                Email
              </a>
            </nav>
            <span className="font-mono text-ink-faint tnum">© {new Date().getFullYear()}</span>
          </div>
        </footer>

        {/* Floating action button */}
        <div className="fixed z-50 right-4 bottom-4 sm:right-8 sm:bottom-8">
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleFloatingButtonClick}
            aria-label={isLastSection ? 'Back to top' : 'Get in touch'}
            className={
              isLastSection
                ? 'px-6 py-3 rounded-full font-medium flex items-center gap-2 border border-line bg-surface text-ink shadow-card-hover hover:border-accent-line transition-colors duration-200'
                : 'px-6 py-3 rounded-full font-semibold flex items-center gap-2 bg-accent text-accent-ink shadow-glow hover:bg-accent-strong transition-colors duration-200'
            }
          >
            {isLastSection ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Back to top</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <>
                Get in touch
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <title>Get in touch</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </MotionConfig>
  )
}

export default App
