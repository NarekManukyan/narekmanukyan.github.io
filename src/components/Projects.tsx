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
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.016.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </svg>
                    {repo.stars}
                  </span>
                  <span className="flex items-center text-sm text-gray-300">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z" />
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
            <svg className="w-6 h-6 mr-2" viewBox="0 0 502.87 502.87">
              <defs>
                <style>
                  {`.cls-1{fill:#01579b;}.cls-2{fill:#40c4ff;}.cls-3{fill:#29b6f6;}.cls-4{fill:#fff;}.cls-4,.cls-5,.cls-6{opacity:0.2;isolation:isolate;}.cls-5{fill:#263238;}`}
                </style>
              </defs>
              <path className="cls-1" d="M102.56,400.31l-86-86C6.32,303.82,0,289,0,274.58c0-6.69,3.77-17.16,6.62-23.15L86,86Z" />
              <path className="cls-2" d="M397,102.56l-86-86C303.49,9,287.85,0,274.61,0c-11.38,0-22.55,2.29-29.76,6.62L86.07,86Z" />
              <polygon className="cls-2" points="205.11 502.87 413.55 502.87 413.55 413.55 258.05 363.9 115.79 413.55 205.11 502.87" />
              <path className="cls-3" d="M86,354c0,26.54,3.33,33.05,16.53,46.32l13.23,13.24H413.55L268,248.14,86,86Z" />
              <path className="cls-1" d="M350.7,86H86L413.55,413.51h89.32V208.4L397,102.52C382.12,87.62,368.92,86,350.7,86Z" />
              <path className="cls-4" d="M105.88,403.6C92.65,390.33,89.36,377.24,89.36,354V89.32L86.07,86V354c0,23.25,0,29.69,19.81,49.61l9.91,9.91h0Z" />
              <polygon className="cls-5" points="499.58 205.11 499.58 410.22 410.26 410.22 413.55 413.55 502.87 413.55 502.87 208.4 499.58 205.11" />
              <path className="cls-4" d="M397,102.56C380.61,86.14,367.19,86,347.41,86H86.07l3.29,3.29H347.41c9.87,0,34.79-1.66,49.61,13.24Z" />
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
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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