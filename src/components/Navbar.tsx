import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SECTION_IDS, SECTION_LABELS } from '../App'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Pixels added to scrollY so the active section switches slightly before the
 *  element's top edge reaches the viewport top. */
const SCROLL_OFFSET = 100

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Navbar = ({ activeSection, setActiveSection }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + SCROLL_OFFSET

      for (const section of SECTION_IDS) {
        const element = document.getElementById(section)
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-navbar backdrop-blur-md border-b border-line-soft z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="font-display text-lg font-bold tracking-tight text-ink">
            Narek Manukyan
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7">
            {SECTION_IDS.map((section) => {
              const isActive = activeSection === section
              return (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className={`relative text-sm transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-ink-faint hover:text-ink'
                    }`}
                    aria-label={`Go to ${section} section`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {SECTION_LABELS[section]}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Hamburger button (mobile) — min 44×44 tap target */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-3 rounded text-ink"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu with enter/exit animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden border-t border-line-soft py-4 flex flex-col"
            >
              {SECTION_IDS.map((section) => {
                const isActive = activeSection === section
                return (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className={`block py-2 text-lg font-medium transition-colors duration-200 ${
                        isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'
                      }`}
                      aria-label={`Go to ${section} section`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={closeMenu}
                    >
                      {SECTION_LABELS[section]}
                    </a>
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
