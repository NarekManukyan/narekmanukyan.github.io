import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Background</h3>
              <p className="text-gray-300 mb-4">
                I hold a Bachelor's degree in Software Engineering from the National Polytechnical University of Armenia.
                With over 6 years of experience in software development, I've specialized in mobile app development using Flutter.
              </p>
              <p className="text-gray-300 mb-4">
                My journey includes 2 years of hardware development experience, where I worked with Raspberry Pi and various sensors,
                demonstrating my versatility in both software and hardware domains.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Expertise</h3>
              <p className="text-gray-300 mb-4">
                As a Flutter Developer and Team Leader, I've successfully led projects across diverse industries including healthcare,
                hospitality, retail, fitness, luxury services, recruitment, and cryptocurrency trading.
              </p>
              <p className="text-gray-300">
                I'm committed to continuous learning and staying current with the latest technologies and development trends,
                ensuring that I deliver cutting-edge solutions to complex problems.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 