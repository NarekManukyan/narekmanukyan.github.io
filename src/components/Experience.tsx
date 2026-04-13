import { memo } from 'react'
import { motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Project {
  name: string
  description: string
  role: string
  achievements: string[]
  technologies: string[]
}

interface ExperienceEntry {
  company: string
  position: string
  duration: string
  location: string
  projects: Project[]
}

// ---------------------------------------------------------------------------
// Static data — defined outside component so it is never re-allocated
// ---------------------------------------------------------------------------

const EXPERIENCES: ExperienceEntry[] = [
  {
    company: 'M-One',
    position: 'Flutter Developer & Team Leader',
    duration: 'May 2020 - Present',
    location: 'Armenia (On-site)',
    projects: [
      {
        name: 'Krisp Mobile',
        description: 'AI-powered noise cancellation app for mobile devices',
        role: 'Flutter Developer',
        achievements: [
          'Implementing real-time audio processing features',
          'Developing cross-platform audio handling',
          'Optimizing performance for low-latency audio processing',
          'Integrating with native audio APIs',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Native Audio/Video APIs'],
      },
      {
        name: 'Viveo Health',
        description: 'White-label platform for insurance providers, doctors, and patients',
        role: 'Flutter Developer',
        achievements: [
          'Developed chat and video call module with WebRTC integration',
          'Implemented real-time health data management system',
          'Created telemedicine features for remote consultations',
          'Optimized UI/UX for better patient engagement',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'WebRTC', 'WebSocket', 'Firebase'],
      },
      {
        name: 'Fudy',
        description: 'QR code platform for restaurants and hotels',
        role: 'Team Lead Mobile',
        achievements: [
          'Led team of 4 mobile developers',
          'Implemented QR code scanning and menu management',
          'Developed real-time order tracking system',
          'Integrated payment processing with Stripe',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'REST API', 'Stripe', 'Google Cloud'],
      },
      {
        name: 'JITMeal POS',
        description: 'Online cash register system for restaurants',
        role: 'Team Lead Mobile',
        achievements: [
          'Developed application architecture for orders processing',
          'Created real-time order management system',
          'Implemented inventory management features',
          'Optimized Web version for better performance',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Flutter WEB', 'WebSocket'],
      },
      {
        name: 'HiLife',
        description: 'Stretching and wellness app',
        role: 'Flutter Developer',
        achievements: [
          'Developed custom video player with caching',
          'Rewritten application architecture for better performance',
          'Reduced app startup time from 15s to 200ms',
          'Implemented in-app purchases and subscription system',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Video Streaming', 'In-app Purchases'],
      },
      {
        name: 'Perfect.Life',
        description: 'Premium concierge services app',
        role: 'Flutter Developer',
        achievements: [
          'Developed chat with concierge feature',
          'Created event calendar and booking system',
          'Implemented luxury goods catalog',
          'Integrated payment processing system',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Firebase', 'Stripe'],
      },
      {
        name: 'HR Drone',
        description: 'Anonymous recruitment platform',
        role: 'Flutter Developer',
        achievements: [
          'Developed registration and questionnaire system',
          'Created job matching algorithm',
          'Implemented anonymous chat system',
          'Built job listing and application management',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Flutter WEB', 'WebSocket'],
      },
      {
        name: 'Bitsgap',
        description: 'Cryptocurrency trading platform',
        role: 'Team Leader of Mobile',
        achievements: [
          'Led team of 4 developers',
          'Integrated Rust using flutter_rust_bridge',
          'Implemented TradingView and HighCharts',
          'Added passkey support for enhanced security',
        ],
        technologies: ['Flutter', 'Dart', 'MobX', 'Rust', 'TradingView', 'HighCharts'],
      },
    ],
  },
  {
    company: '10X Engineering',
    position: 'Software Engineer',
    duration: 'October 2018 - May 2020',
    location: 'Armenia (On-site)',
    projects: [
      {
        name: 'Smart Mirror',
        description: 'Marketing and advertising smart mirror',
        role: 'Solo Developer',
        achievements: [
          'Developed both software and hardware components',
          'Implemented distance-based content display',
          'Created content management system',
          'Integrated with Firebase for remote updates',
        ],
        technologies: ['Java', 'Firebase', 'Raspberry Pi', 'Distance Sensors'],
      },
      {
        name: 'PinoKIT',
        description: 'Educational platform for engineering students',
        role: 'Software Engineer',
        achievements: [
          'Developed hardware components with Raspberry Pi',
          'Created educational software interface',
          'Implemented experiment tracking system',
          'Built data visualization tools',
        ],
        technologies: ['Python', 'Python QT', 'Raspberry Pi', 'Figma'],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Animation variants — stable references, never recreated
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const TechBadge = memo(({ label }: { label: string }) => (
  <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 hover:bg-blue-500/50 transition-colors duration-200">
    {label}
  </span>
))
TechBadge.displayName = 'TechBadge'

const ProjectCard = memo(({ project }: { project: Project }) => (
  <motion.div
    variants={itemVariants}
    className="pl-6 border-l-2 border-blue-500 hover:border-purple-500 transition-colors duration-300"
  >
    <h4 className="text-xl font-medium mb-2 text-white">{project.name}</h4>
    <p className="text-gray-300 mb-3">{project.description}</p>
    <p className="text-gray-300 mb-4">Role: {project.role}</p>
    <div className="mb-4">
      <h5 className="text-sm font-semibold text-gray-300 mb-2">Achievements:</h5>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {project.achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </div>
    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech) => (
        <TechBadge key={tech} label={tech} />
      ))}
    </div>
  </motion.div>
))
ProjectCard.displayName = 'ProjectCard'

const ExperienceCard = memo(({ exp }: { exp: ExperienceEntry }) => (
  <motion.div
    variants={itemVariants}
    className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
  >
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-2">
      <div>
        <h3 className="text-2xl font-semibold text-blue-400">{exp.company}</h3>
        <p className="text-gray-300 mt-1">{exp.position}</p>
      </div>
      <div className="sm:text-right">
        <p className="text-gray-300">{exp.duration}</p>
        <p className="text-gray-300">{exp.location}</p>
      </div>
    </div>
    <div className="space-y-8">
      {exp.projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  </motion.div>
))
ExperienceCard.displayName = 'ExperienceCard'

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const Experience = () => (
  <section id="experience" className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
    <div className="max-w-6xl mx-auto px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-400">
          Experience
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.company} exp={exp} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
)

export default Experience
