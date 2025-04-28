const Skills = () => {
  const skills = [
    {
      category: 'Mobile Development',
      items: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'React Native'],
      icon: '📱'
    },
    {
      category: 'State Management',
      items: ['MobX', 'BloC', 'Freezed', 'Provider', 'Riverpod'],
      icon: '🔄'
    },
    {
      category: 'Backend & APIs',
      items: ['REST API', 'WebSocket', 'Firebase', 'Stripe', 'Google Cloud Platform'],
      icon: '⚙️'
    },
    {
      category: 'UI/UX',
      items: ['Figma', 'Material Design', 'Custom Animations', 'Responsive Design'],
      icon: '🎨'
    },
    {
      category: 'DevOps & Tools',
      items: ['CI/CD', 'Git', 'Docker', 'VS Code', 'Android Studio', 'Xcode'],
      icon: '🛠️'
    },
    {
      category: 'Hardware & IoT',
      items: ['Raspberry Pi', 'Distance Sensors', 'Python', 'Python QT'],
      icon: '🔌'
    },
    {
      category: 'Payment Systems',
      items: ['Stripe', 'In-app Purchases', 'Online Payments', 'Subscription Management'],
      icon: '💳'
    },
    {
      category: 'Real-time Features',
      items: ['WebRTC', 'WebSocket', 'Video Streaming', 'Chat Systems'],
      icon: '⚡'
    },
    {
      category: 'Cross-platform',
      items: ['Flutter WEB', 'Responsive Design', 'Platform-specific Features'],
      icon: '🌐'
    }
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50 hover:border-blue-500/50"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <h3 className="text-xl font-semibold text-blue-400">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 hover:bg-blue-500/50 hover:text-white transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills 