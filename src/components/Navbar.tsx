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
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold">Narek Manukyan</div>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-6" role="list">
            {SECTION_IDS.map((section) => {
              const isActive = activeSection === section
              return (
                <a
                  key={section}
                  href={`#${section}`}
                  role="listitem"
                  className={`relative capitalize transition-colors duration-200 ${
                    isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                  aria-label={`Go to ${section} section`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {SECTION_LABELS[section]}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* Hamburger button (mobile) — min 44×44 tap target */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <svg
              className="w-7 h-7 text-white"
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
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden bg-gray-900/95 rounded-b-xl shadow-lg py-4 px-6 flex flex-col space-y-4"
              role="list"
            >
              {SECTION_IDS.map((section) => {
                const isActive = activeSection === section
                return (
                  <a
                    key={section}
                    href={`#${section}`}
                    role="listitem"
                    className={`capitalize transition-colors duration-200 text-lg font-medium ${
                      isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                    aria-label={`Go to ${section} section`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {SECTION_LABELS[section]}
                  </a>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
