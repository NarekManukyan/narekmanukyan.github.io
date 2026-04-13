// Declare only what we need from the Node.js runtime so @types/node is not required.
declare const process: { env: Record<string, string | undefined> }

// Minimal subset of @vercel/node types, inlined to avoid a dev-dependency.
// The real @vercel/node runtime provides these automatically at deploy time.
interface VercelRequest {
  method?: string
  body?: unknown
  query: Record<string, string | string[]>
}
interface VercelResponse {
  status: (code: number) => VercelResponse
  json: (body: unknown) => VercelResponse
  send: (body: unknown) => VercelResponse
  end: () => VercelResponse
  setHeader: (name: string, value: string | string[]) => VercelResponse
}

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

const PINNED_REPOS_QUERY = `
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

function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    res.status(500).json({ error: 'GITHUB_TOKEN is not configured' })
    return
  }

  const body = req.body as { login?: string } | undefined
  const login = body?.login
  if (!login) {
    res.status(400).json({ error: 'Missing required field: login' })
    return
  }

  try {
    const githubRes = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'narek-portfolio/1.0',
      },
      body: JSON.stringify({
        query: PINNED_REPOS_QUERY,
        variables: { login },
      }),
    })

    if (!githubRes.ok) {
      res
        .status(githubRes.status)
        .json({ error: `GitHub API error: ${githubRes.statusText}` })
      return
    }

    const data: unknown = await githubRes.json()
    res.status(200).json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: `Failed to fetch from GitHub: ${message}` })
  }
}
