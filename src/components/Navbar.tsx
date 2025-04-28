import { useEffect } from 'react'

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Navbar = ({ activeSection, setActiveSection }: NavbarProps) => {
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
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 