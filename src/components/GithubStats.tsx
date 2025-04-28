import { useEffect, useState } from 'react';

interface GithubStats {
  followers: number;
  public_repos: number;
  total_stars: number;
  total_forks: number;
}

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/narekmanukyan');
        const data = await response.json();
        
        // Fetch repositories to calculate stars and forks
        const reposResponse = await fetch('https://api.github.com/users/narekmanukyan/repos');
        const repos = await reposResponse.json();
        
        const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        const totalForks = repos.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

        setStats({
          followers: data.followers,
          public_repos: data.public_repos,
          total_stars: totalStars,
          total_forks: totalForks
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubStats();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading GitHub stats...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="bg-gray-800/50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-400">{stats.followers}</div>
        <div className="text-gray-400">Followers</div>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-400">{stats.public_repos}</div>
        <div className="text-gray-400">Repositories</div>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-400">{stats.total_stars}</div>
        <div className="text-gray-400">Stars</div>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-400">{stats.total_forks}</div>
        <div className="text-gray-400">Forks</div>
      </div>
    </div>
  );
} 