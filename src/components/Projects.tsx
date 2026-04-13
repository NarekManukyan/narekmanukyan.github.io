import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { spring, staggerContainer, viewportOnce } from '../motion'

const GITHUB_USERNAME = 'narekmanukyan'
const PUB_PUBLISHER = 'narek-manukyan.dev'

const PINNED_REPOS: GithubRepo[] = [
  {
    name: 'cupertino_native_plus',
    description: 'Native Liquid Glass widgets for iOS and macOS with pixel-perfect fidelity.',
    stars: 7,
    forks: 7,
    language: 'Dart',
    url: 'https://github.com/NarekManukyan/cupertino_native_plus',
  },
  {
    name: 'flutter_boilerplate',
    description: 'A boilerplate project created in flutter using MobX and hooks.',
    stars: 15,
    forks: 1,
    language: 'Dart',
    url: 'https://github.com/NarekManukyan/flutter_boilerplate',
  },
  {
    name: 'hydrated_mobx',
    description: 'A Flutter package that automatically persists and restores MobX stores. Built to work with Flutter\'s state management solution MobX.',
    stars: 1,
    forks: 0,
    language: 'Dart',
    url: 'https://github.com/NarekManukyan/hydrated_mobx',
  },
  {
    name: 'app_store_country',
    description: 'A Flutter plugin that returns the Apple App Store storefront country code (ISO-3166 alpha-3) on iOS using StoreKit.',
    stars: 0,
    forks: 0,
    language: 'Dart',
    url: 'https://github.com/NarekManukyan/app_store_country',
  },
  {
    name: 'flutter_blocknote_editor',
    description: 'A Flutter package that embeds BlockNoteJS inside a WebView with bidirectional communication, transaction batching, and undo/redo safety.',
    stars: 2,
    forks: 0,
    language: 'Dart',
    url: 'https://github.com/NarekManukyan/flutter_blocknote_editor',
  },
  {
    name: 'story_maker',
    description: 'A package for creating instagram like story, you can use this package to edit images and make it story ready by adding other contents over it like text and gradients.',
    stars: 7,
    forks: 11,
    language: 'Dart',
    url: 'https://github.com/NarekManukyan/story_maker',
  },
]

// /api/pub is handled by the Vite dev proxy and the Vercel route rewrite in
// production — no environment-specific branching needed.
const PUB_API_BASE = '/api/pub'

type GithubRepo = {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
  contribution?: string
}

type PubPackage = {
  name: string
  description: string
  likes: number
  points: number
  downloads: number
  url: string
  features: string[]
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = staggerContainer(0.08)

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...spring.entrance },
  },
}

// ---------------------------------------------------------------------------
// Skeleton loader for cards
// ---------------------------------------------------------------------------

const SkeletonCard = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 animate-pulse">
    <div className="h-5 w-2/3 bg-gray-700/60 rounded mb-3" />
    <div className="h-3 w-full bg-gray-700/40 rounded mb-2" />
    <div className="h-3 w-4/5 bg-gray-700/40 rounded mb-4" />
    <div className="flex gap-4 mb-4">
      <div className="h-3 w-12 bg-gray-700/40 rounded" />
      <div className="h-3 w-12 bg-gray-700/40 rounded" />
      <div className="h-3 w-16 bg-gray-700/40 rounded" />
    </div>
    <div className="h-3 w-24 bg-gray-700/40 rounded" />
  </div>
)

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Projects = () => {
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([])
  const [pubPackages, setPubPackages] = useState<PubPackage[]>([])
  const [pubError, setPubError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchGithub = async () => {
      type GraphQLNode = {
        name: string
        description: string | null
        stargazers: { totalCount: number }
        forkCount: number
        primaryLanguage: { name: string } | null
        url: string
      }
      type GraphQLResponse = {
        data?: {
          user?: {
            pinnedItems?: { nodes?: Array<GraphQLNode | null> }
          }
        }
        errors?: unknown[]
      }

      const mapNodes = (nodes: Array<GraphQLNode | null>): GithubRepo[] =>
        nodes
          .filter((n): n is GraphQLNode => n != null)
          .map((r) => ({
            name: r.name,
            description: r.description ?? r.name,
            stars: r.stargazers?.totalCount ?? 0,
            forks: r.forkCount ?? 0,
            language: r.primaryLanguage?.name ?? '-',
            url: r.url,
          }))

      // 1. Try the Vercel serverless proxy
      try {
        const proxyRes = await fetch('/api/github', {
          signal,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login: GITHUB_USERNAME }),
        })
        if (proxyRes.ok) {
          const json = await proxyRes.json() as GraphQLResponse
          const nodes = json.data?.user?.pinnedItems?.nodes
          if (!json.errors?.length && nodes?.length) {
            setGithubRepos(mapNodes(nodes))
            return
          }
        }
      } catch (e) {
        if (signal.aborted) return
      }

      // 2. Fallback: client-side GraphQL with VITE_GITHUB_TOKEN if present
      try {
        const graphqlQuery = `
          query($login: String!) {
            user(login: $login) {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    stargazers { totalCount }
                    forkCount
                    primaryLanguage { name }
                    url
                  }
                }
              }
            }
          }
        `
        const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
        const graphqlRes = await fetch('https://api.github.com/graphql', {
          signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ query: graphqlQuery, variables: { login: GITHUB_USERNAME } }),
        })
        if (graphqlRes.ok) {
          const json = await graphqlRes.json() as GraphQLResponse
          const nodes = json.data?.user?.pinnedItems?.nodes
          if (!json.errors?.length && nodes?.length) {
            setGithubRepos(mapNodes(nodes))
            return
          }
        }
      } catch (e) {
        if (signal.aborted) return
      }

      // 3. Last resort: use hardcoded pinned repos
      setGithubRepos(PINNED_REPOS)
    }

    const fetchPub = async () => {
      try {
        const searchRes = await fetch(`${PUB_API_BASE}/search?q=publisher:${encodeURIComponent(PUB_PUBLISHER)}`, { signal })
        if (!searchRes.ok) { setPubError(true); return }
        const search = await searchRes.json() as { packages?: { package: string }[] }
        const names = (search.packages ?? []).map((p) => p.package)
        if (names.length === 0) { setPubError(true); return }
        const results = await Promise.allSettled(
          names.map(async (name) => {
            const [pkgRes, scoreRes] = await Promise.all([
              fetch(`${PUB_API_BASE}/packages/${name}`, { signal }),
              fetch(`${PUB_API_BASE}/packages/${name}/score`, { signal })
            ])
            if (!pkgRes.ok || !scoreRes.ok) return null
            const pkg = await pkgRes.json()
            const score = await scoreRes.json()
            const description = pkg?.latest?.pubspec?.description ?? name
            return {
              name,
              description,
              likes: score.likeCount ?? 0,
              points: score.grantedPoints ?? 0,
              downloads: score.downloadCount30Days ?? 0,
              url: `https://pub.dev/packages/${name}`,
              features: [] as string[]
            } as PubPackage
          })
        )
        const packages = results
          .filter((r): r is PromiseFulfilledResult<PubPackage | null> => r.status === 'fulfilled' && r.value != null)
          .map((r) => r.value as PubPackage)
          .sort((a, b) => b.downloads - a.downloads)
        if (packages.length) {
          setPubPackages(packages)
        } else {
          setPubError(true)
        }
      } catch (e) {
        if (!signal.aborted) setPubError(true)
      }
    }

    Promise.all([fetchGithub(), fetchPub()]).finally(() => {
      if (!signal.aborted) setLoading(false)
    })

    return () => controller.abort()
  }, [])

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...spring.entrance }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-10 text-center text-pink-400"
        >
          Open Source Contributions
        </motion.h2>

        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...spring.entrance }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-blue-400 flex items-center"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-label="GitHub icon">
              <title>GitHub icon</title>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.016.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Repositories
          </motion.h3>
          {loading && githubRepos.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {githubRepos.map((repo) => (
                <motion.div
                  key={repo.url}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700/50 hover:border-blue-500/50"
                >
                  <h4 className="text-xl font-semibold text-blue-400 mb-2">{repo.name}</h4>
                  <p className="text-gray-300 mb-4">{repo.description}</p>
                  {repo.contribution != null && repo.contribution !== '' && (
                    <p className="text-sm text-gray-300 mb-4">{repo.contribution}</p>
                  )}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center text-sm text-gray-300">
                      <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" aria-label="Star icon">
                        <title>Star icon</title>
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                      </svg>
                      {repo.stars.toLocaleString()}
                    </span>
                    <span className="flex items-center text-sm text-gray-300">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-label="Fork icon">
                        <title>Fork icon</title>
                        <path d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z" />
                      </svg>
                      {repo.forks.toLocaleString()}
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
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link">
                      <title>External link</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...spring.entrance }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-blue-400 flex items-center"
          >
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
          </motion.h3>
          {loading && pubPackages.length === 0 && !pubError ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }, (_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : pubError && pubPackages.length === 0 ? (
            <p className="text-gray-300 col-span-full">
              Could not load packages. Visit{' '}
              <a
                href={`https://pub.dev/publishers/${PUB_PUBLISHER}/packages`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                pub.dev
              </a>{' '}
              to see published packages.
            </p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {pubPackages.map((pkg) => (
                <motion.div
                  key={pkg.url}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700/50 hover:border-blue-500/50"
                >
                  <h4 className="text-xl font-semibold text-blue-400 mb-2">{pkg.name}</h4>
                  <p className="text-gray-300 mb-4">{pkg.description}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center text-sm text-gray-300">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-label="Like icon">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {pkg.likes.toLocaleString()} likes
                    </span>
                    <span className="text-sm text-gray-300">{pkg.points} points</span>
                    <span className="text-sm text-gray-300">{pkg.downloads.toLocaleString()} downloads (30d)</span>
                  </div>
                  {pkg.features.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h5>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {pkg.features.map((feature, fIndex) => (
                          <li key={fIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a
                    href={pkg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    View on Pub.dev
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects
