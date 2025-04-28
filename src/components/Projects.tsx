const Projects = () => {
  const githubRepos = [
    {
      name: 'flutter_rust_bridge',
      description: 'High-level memory-safe binding generator for Flutter/Dart <-> Rust',
      stars: 2300,
      forks: 150,
      language: 'Rust',
      url: 'https://github.com/fzyzcjy/flutter_rust_bridge',
      contribution: 'Contributed to core functionality and documentation'
    },
    {
      name: 'flutter_rust_bridge_template',
      description: 'Template for Flutter + Rust integration using flutter_rust_bridge',
      stars: 500,
      forks: 80,
      language: 'Dart',
      url: 'https://github.com/fzyzcjy/flutter_rust_bridge_template',
      contribution: 'Maintained and improved template structure'
    },
    {
      name: 'mobx.dart',
      description: 'MobX for the Dart language. Hassle-free, reactive state-management for your Dart and Flutter apps.',
      stars: 1200,
      forks: 200,
      language: 'Dart',
      url: 'https://github.com/mobxjs/mobx.dart',
      contribution: 'Contributed to state management improvements'
    }
  ]

  const pubPackages = [
    {
      name: 'story_maker',
      description: 'A Flutter package for creating Instagram-like stories with text overlay and gradient backgrounds',
      likes: 67,
      points: 140,
      downloads: 163,
      url: 'https://pub.dev/packages/story_maker',
      features: [
        'Image scaling and positioning',
        'Text overlay with custom styling',
        'Gradient background support',
        'Story-ready image export'
      ]
    },
    {
      name: 'hydrated_mobx',
      description: 'Hydrated MobX for Flutter - Automatic state persistence for MobX stores',
      likes: 6,
      points: 160,
      downloads: 176,
      url: 'https://pub.dev/packages/hydrated_mobx',
      features: [
        'Automatic state persistence',
        'Secure storage support',
        'Cross-platform compatibility',
        'Efficient storage using Hive'
      ]
    }
  ]

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
          Open Source Contributions
        </h2>
        
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-8 text-blue-400 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.016.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {githubRepos.map((repo, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50 hover:border-blue-500/50"
              >
                <h4 className="text-xl font-semibold text-blue-400 mb-2">{repo.name}</h4>
                <p className="text-gray-300 mb-4">{repo.description}</p>
                <p className="text-sm text-gray-400 mb-4">{repo.contribution}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="flex items-center text-sm text-gray-300">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878.625.125.875-.281.875-.625v-2.188c-3.438.625-4.125-1.5-4.125-1.5-.563-1.438-1.375-1.813-1.375-1.813-1.125-.75.094-.75.094-.75 1.25.094 1.906 1.281 1.906 1.281 1.094 1.875 2.875 1.344 3.594 1.031.094-.797.438-1.344.781-1.656-2.75-.313-5.625-1.375-5.625-6.125 0-1.375.469-2.5 1.25-3.375-.125-.313-.563-1.594.125-3.313 0 0 1.031-.344 3.375 1.281.969-.281 2-.438 3.031-.438 1.031 0 2.063.156 3.031.438 2.344-1.625 3.375-1.281 3.375-1.281.688 1.719.25 3 .125 3.313.781.875 1.25 2 1.25 3.375 0 4.75-2.875 5.813-5.625 6.125.438.375.813 1.125.813 2.25v3.313c0 .344.25.75.875.625C18.344 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    {repo.stars}
                  </span>
                  <span className="flex items-center text-sm text-gray-300">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10 0 5.514-4.486 10-10 10-5.514 0-10-4.486-10-10 0-5.514 4.486-10 10-10zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm-1 3h2v6h-2v-6zm0 8h2v2h-2v-2z"/>
                    </svg>
                    {repo.forks}
                  </span>
                  <span className="text-sm text-gray-300">{repo.language}</span>
                </div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  View on GitHub
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-8 text-blue-400 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.016.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Pub.dev Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pubPackages.map((pkg, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50 hover:border-blue-500/50"
              >
                <h4 className="text-xl font-semibold text-blue-400 mb-2">{pkg.name}</h4>
                <p className="text-gray-300 mb-4">{pkg.description}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="flex items-center text-sm text-gray-300">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878.625.125.875-.281.875-.625v-2.188c-3.438.625-4.125-1.5-4.125-1.5-.563-1.438-1.375-1.813-1.375-1.813-1.125-.75.094-.75.094-.75 1.25.094 1.906 1.281 1.906 1.281 1.094 1.875 2.875 1.344 3.594 1.031.094-.797.438-1.344.781-1.656-2.75-.313-5.625-1.375-5.625-6.125 0-1.375.469-2.5 1.25-3.375-.125-.313-.563-1.594.125-3.313 0 0 1.031-.344 3.375 1.281.969-.281 2-.438 3.031-.438 1.031 0 2.063.156 3.031.438 2.344-1.625 3.375-1.281 3.375-1.281.688 1.719.25 3 .125 3.313.781.875 1.25 2 1.25 3.375 0 4.75-2.875 5.813-5.625 6.125.438.375.813 1.125.813 2.25v3.313c0 .344.25.75.875.625C18.344 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    {pkg.likes} likes
                  </span>
                  <span className="text-sm text-gray-300">{pkg.points} points</span>
                  <span className="text-sm text-gray-300">{pkg.downloads} downloads</span>
                </div>
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Key Features:</h5>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={pkg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  View on Pub.dev
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects 