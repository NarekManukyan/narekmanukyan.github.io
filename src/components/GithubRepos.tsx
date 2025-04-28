import { useEffect, useState } from 'react';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function GithubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/narekmanukyan/repos?sort=updated&per_page=6');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading repositories...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {repos.map((repo) => (
        <a
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-colors duration-300"
        >
          <h3 className="text-lg font-semibold text-indigo-400">{repo.name}</h3>
          <p className="text-gray-300 mt-2 text-sm">{repo.description || 'No description available'}</p>
          <div className="flex items-center mt-4 text-sm text-gray-400">
            {repo.language && (
              <span className="flex items-center mr-4">
                <span className="w-3 h-3 rounded-full bg-indigo-400 mr-1"></span>
                {repo.language}
              </span>
            )}
            <span className="flex items-center mr-4">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {repo.stargazers_count}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 13.586V7a1 1 0 10-2 0v6.586l-1.293-1.293z" />
              </svg>
              {repo.forks_count}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
} 