import { useEffect, useState } from 'react'

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Navbar = ({ activeSection, setActiveSection }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const sections = ['home', 'about', 'experience', 'skills', 'contact']

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold">Narek Manukyan</div>
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize transition-colors duration-200 ${
                  activeSection === section
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                aria-label={`Go to ${section} section`}
              >
                {section}
              </a>
            ))}
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
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
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900/95 rounded-b-xl shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in-down">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize text-lg font-medium transition-colors duration-200 ${
                  activeSection === section
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                aria-label={`Go to ${section} section`}
                onClick={() => setMenuOpen(false)}
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