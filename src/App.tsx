import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Projects from './components/Projects'
import { motion } from 'framer-motion'

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
const SECTION_LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  contact: 'Contact',
}

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Floating button click handler
  const isLastSection = activeSection === SECTION_IDS[SECTION_IDS.length - 1]
  const handleFloatingButtonClick = () => {
    if (isLastSection) {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Download CV
      const link = document.createElement('a')
      link.href = '/CV_Narek_Manukyan.pdf'
      link.download = 'CV_Narek_Manukyan.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div id="home">
        <Hero />
      </div>
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <div className="fixed z-50 right-4 bottom-4 sm:right-8 sm:bottom-8">
        <motion.button
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleFloatingButtonClick}
          className={`px-7 py-3 rounded-full shadow-2xl font-semibold flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 animate-gradient-x ${
            isLastSection
              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-pink-500/40 focus:ring-pink-400'
              : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white hover:shadow-purple-500/40 focus:ring-purple-400'
          }`}
          aria-label={isLastSection ? 'Scroll to top' : 'Download CV'}
        >
          {isLastSection ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-label="Arrow Up"><title>Arrow Up</title><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Download CV"><title>Download CV</title><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
              Download CV
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

export default App
