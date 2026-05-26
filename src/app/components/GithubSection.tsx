import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  GitCommitHorizontal,
  Github,
  GitPullRequest,
  Loader2,
  RefreshCw,
  Star,
} from 'lucide-react';
import { useInView } from './hooks/useInView';

const GITHUB_USERNAME = 'imanmay2';
const LEETCODE_USERNAME = 'imanmay2';

type GitHubProfile = {
  public_repos: number;
  followers: number;
};

type GitHubRepo = {
  name: string;
  fork: boolean;
  updated_at: string;
  stargazers_count: number;
};

type GitHubPushEvent = {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload?: {
    commits?: Array<{
      message: string;
      sha: string;
      url: string;
    }>;
  };
};

type CommitItem = {
  id: string;
  repo: string;
  message: string;
  date: string;
};

type GitHubCommitResponse = {
  sha: string;
  commit: {
    message: string;
    committer?: {
      date?: string;
    };
    author?: {
      date?: string;
    };
  };
};

type GitHubStats = {
  profile: GitHubProfile | null;
  stars: number | null;
  commits: CommitItem[];
};

type LeetCodeStats = {
  totalSolved: number | null;
  easySolved: number | null;
  mediumSolved: number | null;
  hardSolved: number | null;
  ranking: number | null;
};

type LeetCodeApiResponse = Partial<LeetCodeStats> & {
  status?: string;
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number;
};

const initialGitHubStats: GitHubStats = {
  profile: null,
  stars: null,
  commits: [],
};

const initialLeetCodeStats: LeetCodeStats = {
  totalSolved: null,
  easySolved: null,
  mediumSolved: null,
  hardSolved: null,
  ranking: null,
};

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '--';
  return new Intl.NumberFormat('en', { notation: value > 999 ? 'compact' : 'standard' }).format(value);
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));

const getLeetCodeStats = async () => {
  const endpoints = [
    `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
    `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) continue;

      const data = (await response.json()) as LeetCodeApiResponse;
      if (data.status === 'error' || data.totalSolved === undefined) continue;

      return data;
    } catch {
      continue;
    }
  }

  return null;
};

export function GithubSection() {
  const { ref, isInView } = useInView();
  const [githubStats, setGithubStats] = useState<GitHubStats>(initialGitHubStats);
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats>(initialLeetCodeStats);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCodingStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [profileResponse, reposResponse, eventsResponse, leetcodeResponse] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`),
          getLeetCodeStats(),
        ]);

        if (!isMounted) return;

        const [profileData, reposData, eventsData, leetcodeData] = await Promise.all([
          profileResponse.status === 'fulfilled' && profileResponse.value.ok
            ? (profileResponse.value.json() as Promise<GitHubProfile>)
            : Promise.resolve(null),
          reposResponse.status === 'fulfilled' && reposResponse.value.ok
            ? (reposResponse.value.json() as Promise<GitHubRepo[]>)
            : Promise.resolve([]),
          eventsResponse.status === 'fulfilled' && eventsResponse.value.ok
            ? (eventsResponse.value.json() as Promise<GitHubPushEvent[]>)
            : Promise.resolve([]),
          leetcodeResponse.status === 'fulfilled' ? Promise.resolve(leetcodeResponse.value) : Promise.resolve(null),
        ]);

        if (!isMounted) return;

        let commits = eventsData
          .filter((event) => event.type === 'PushEvent')
          .flatMap((event) =>
            (event.payload?.commits ?? []).map((commit) => ({
              id: `${event.id}-${commit.sha}`,
              repo: event.repo.name.replace(`${GITHUB_USERNAME}/`, ''),
              message: commit.message.split('\n')[0],
              date: event.created_at,
            }))
          )
          .slice(0, 4);

        if (!commits.length && reposData.length) {
          const recentRepos = reposData
            .filter((repo) => !repo.fork)
            .sort((first, second) => new Date(second.updated_at).getTime() - new Date(first.updated_at).getTime())
            .slice(0, 5);

          const repoCommitResponses = await Promise.allSettled(
            recentRepos.map((repo) =>
              fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=2`).then(
                async (response) => ({
                  repo: repo.name,
                  commits: response.ok ? ((await response.json()) as GitHubCommitResponse[]) : [],
                })
              )
            )
          );

          if (!isMounted) return;

          commits = repoCommitResponses
            .filter((response): response is PromiseFulfilledResult<{ repo: string; commits: GitHubCommitResponse[] }> => response.status === 'fulfilled')
            .flatMap((response) =>
              response.value.commits.map((commit) => ({
                id: `${response.value.repo}-${commit.sha}`,
                repo: response.value.repo,
                message: commit.commit.message.split('\n')[0],
                date: commit.commit.committer?.date ?? commit.commit.author?.date ?? new Date().toISOString(),
              }))
            )
            .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
            .slice(0, 4);
        }

        setGithubStats({
          profile: profileData,
          stars: reposData.reduce((total, repo) => total + repo.stargazers_count, 0),
          commits,
        });

        if (leetcodeData && leetcodeData.status !== 'error') {
          setLeetcodeStats({
            totalSolved: leetcodeData.totalSolved ?? null,
            easySolved: leetcodeData.easySolved ?? null,
            mediumSolved: leetcodeData.mediumSolved ?? null,
            hardSolved: leetcodeData.hardSolved ?? null,
            ranking: leetcodeData.ranking ?? null,
          });
        }

        const failedRequests = [profileResponse, reposResponse, eventsResponse].filter(
          (request) => request.status === 'rejected' || (request.status === 'fulfilled' && !request.value.ok)
        );

        setUpdatedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setError(failedRequests.length || !leetcodeData ? 'Some live stats are temporarily unavailable.' : null);
      } catch {
        if (isMounted) {
          setError('Live coding stats are temporarily unavailable.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCodingStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const profileCards = useMemo(
    () => [
      {
        platform: 'GitHub',
        Icon: Github,
        username: GITHUB_USERNAME,
        url: `https://github.com/${GITHUB_USERNAME}`,
        color: 'from-slate-200 to-cyan-300',
        accent: 'text-cyan-300',
        stats: [
          { label: 'Public repos', value: formatNumber(githubStats.profile?.public_repos) },
          { label: 'Total stars', value: formatNumber(githubStats.stars) },
          { label: 'Followers', value: formatNumber(githubStats.profile?.followers) },
        ],
      },
      {
        platform: 'LeetCode',
        Icon: Code2,
        username: LEETCODE_USERNAME,
        url: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
        color: 'from-amber-300 to-orange-500',
        accent: 'text-amber-300',
        stats: [
          { label: 'Problems solved', value: formatNumber(leetcodeStats.totalSolved) },
          { label: 'Medium solved', value: formatNumber(leetcodeStats.mediumSolved) },
          { label: 'Global rank', value: formatNumber(leetcodeStats.ranking) },
        ],
      },
    ],
    [githubStats, leetcodeStats]
  );

  return (
    <section id="profiles" ref={ref} className="relative overflow-hidden px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_84%_32%,rgba(251,191,36,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(12,15,28,0.82),rgba(255,255,255,0.02))]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-3 border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">
            <GitPullRequest className="h-5 w-5 text-cyan-300" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Live Coding Stats</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="bg-gradient-to-r from-cyan-300 via-white to-amber-300 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                Coding Profiles
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
                Fresh GitHub activity and LeetCode progress, pulled live when the page loads.
              </p>
            </div>

            <div className="flex items-center gap-2 border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/65">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-cyan-300" /> : <RefreshCw className="h-4 w-4 text-emerald-300" />}
              {isLoading ? 'Updating now' : updatedAt ? `Updated ${updatedAt}` : 'Live data'}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {profileCards.map((profile, index) => (
              <motion.a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 42 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: index * 0.14 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden border border-white/10 bg-[#101426]/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition-colors hover:border-white/25"
              >
                <div className={`absolute -right-14 -top-16 h-40 w-40 bg-gradient-to-br ${profile.color} opacity-20 blur-3xl transition-opacity group-hover:opacity-30`} />
                <div className="relative z-10">
                  <div className="mb-7 flex items-start justify-between gap-5">
                    <div className={`flex h-16 w-16 items-center justify-center bg-gradient-to-br ${profile.color} shadow-xl shadow-black/30`}>
                      <profile.Icon className="h-8 w-8 text-[#080b14]" />
                    </div>
                    <ArrowUpRight className="h-6 w-6 text-white/35 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white">{profile.platform}</h3>
                  <p className="mb-7 text-sm text-muted-foreground">@{profile.username}</p>

                  <div className="space-y-4">
                    {profile.stats.map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className={`text-lg font-semibold ${profile.accent}`}>{isLoading ? '--' : stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 42 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="border border-white/10 bg-[#0c1020]/92 p-7 shadow-2xl shadow-black/35 backdrop-blur-xl"
          >
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">Latest GitHub Commits</h3>
                <p className="mt-1 text-sm text-muted-foreground">Recent public push activity from @{GITHUB_USERNAME}</p>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-cyan-200 transition-colors hover:bg-white/[0.1]"
              >
                GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-4">
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <div key={index} className="h-[86px] animate-pulse border border-white/10 bg-white/[0.04]" />
                ))
              ) : githubStats.commits.length ? (
                githubStats.commits.map((commit, index) => (
                  <motion.div
                    key={commit.id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: index * 0.08 + 0.32 }}
                    className="group/commit flex gap-4 border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-cyan-300/35 hover:bg-cyan-300/[0.06]"
                  >
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center bg-cyan-300/12 text-cyan-200">
                      <GitCommitHorizontal className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-semibold text-white">{commit.message}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        <span>{commit.repo}</span>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span>{formatDate(commit.date)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="border border-white/10 bg-white/[0.035] p-6 text-muted-foreground">
                  Latest public commits could not be loaded right now.
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.36 }}
          className="mt-6 grid gap-4 border border-white/10 bg-gradient-to-r from-cyan-500/10 via-white/[0.035] to-amber-500/10 p-6 shadow-2xl shadow-black/20 md:grid-cols-4"
        >
          <StatTile Icon={Github} label="Repositories" value={isLoading ? '--' : formatNumber(githubStats.profile?.public_repos)} />
          <StatTile Icon={Star} label="GitHub Stars" value={isLoading ? '--' : formatNumber(githubStats.stars)} />
          <StatTile Icon={Code2} label="LeetCode Solved" value={isLoading ? '--' : formatNumber(leetcodeStats.totalSolved)} />
          <StatTile Icon={CheckCircle2} label="Hard Solved" value={isLoading ? '--' : formatNumber(leetcodeStats.hardSolved)} />
        </motion.div>

        {error ? <p className="mt-4 text-sm text-amber-200/80">{error}</p> : null}
      </div>
    </section>
  );
}

function StatTile({
  Icon,
  label,
  value,
}: {
  Icon: typeof Github;
  label: string;
  value: string;
}) {
  return (
    <motion.div whileHover={{ y: -5 }} className="border border-white/10 bg-black/18 p-5 text-center">
      <Icon className="mx-auto mb-3 h-7 w-7 text-cyan-200" />
      <p className="mb-1 text-3xl font-semibold text-white">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}
