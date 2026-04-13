import { useCallback, useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_SECTIONS = ['home', 'about', 'experience', 'skills', 'contact'] as const
type NavSection = (typeof NAV_SECTIONS)[number]

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
// Helpers
// ---------------------------------------------------------------------------

function getLinkClassName(isActive: boolean, mobile: boolean): string {
  const base = `capitalize transition-colors duration-200 ${
    isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
  }`
  return mobile ? `${base} text-lg font-medium` : base
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

      for (const section of NAV_SECTIONS) {
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
            {NAV_SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                role="listitem"
                className={getLinkClassName(activeSection === section, false)}
                aria-label={`Go to ${section} section`}
                aria-current={activeSection === section ? 'page' : undefined}
              >
                {section}
              </a>
            ))}
          </div>

          {/* Hamburger button (mobile) */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-gray-900/95 rounded-b-xl shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in-down"
            role="list"
          >
            {NAV_SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                role="listitem"
                className={getLinkClassName(activeSection === section, true)}
                aria-label={`Go to ${section} section`}
                aria-current={activeSection === section ? 'page' : undefined}
                onClick={closeMenu}
              >
                {section}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
