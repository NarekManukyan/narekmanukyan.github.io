import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-400">Background</h3>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  I hold a Bachelor's degree in Software Engineering from the National Polytechnical University of Armenia.
                  With over 6 years of experience in software development, I've specialized in mobile app development using Flutter.
                </p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  My journey includes 2 years of hardware development experience, where I worked with Raspberry Pi and various sensors,
                  demonstrating my versatility in both software and hardware domains.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-400">Expertise</h3>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  As a Flutter Developer and Team Leader, I've successfully led projects across diverse industries including healthcare,
                  hospitality, retail, fitness, luxury services, recruitment, and cryptocurrency trading.
                </p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  I'm committed to continuous learning and staying current with the latest technologies and development trends,
                  ensuring that I deliver cutting-edge solutions to complex problems.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 