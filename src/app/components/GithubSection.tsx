import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Github, Code2, GitBranch, Star, Award, ArrowUpRight } from 'lucide-react';

const profiles = [
  {
    platform: 'GitHub',
    icon: Github,
    username: 'manmaychakraborty',
    stats: [
      { label: 'Repositories', value: '87' },
      { label: 'Contributions', value: '1.2K+' },
      { label: 'Stars', value: '245' },
    ],
    url: 'https://github.com',
    color: 'from-gray-600 to-gray-800',
  },
  {
    platform: 'LeetCode',
    icon: Code2,
    username: 'manmaychakraborty',
    stats: [
      { label: 'Problems Solved', value: '450+' },
      { label: 'Contest Rating', value: '1850' },
      { label: 'Ranking', value: 'Top 5%' },
    ],
    url: 'https://leetcode.com',
    color: 'from-orange-600 to-yellow-600',
  },
  {
    platform: 'CodeChef',
    icon: Award,
    username: 'manmaychakraborty',
    stats: [
      { label: 'Rating', value: '2100+' },
      { label: 'Stars', value: '5★' },
      { label: 'Global Rank', value: '2.5K' },
    ],
    url: 'https://codechef.com',
    color: 'from-brown-600 to-brown-800',
  },
];

export function GithubSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="profiles" ref={ref} className="relative overflow-hidden px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(124,58,237,0.07),rgba(255,255,255,0.02))]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Coding Profiles
          </h2>
          <p className="text-xl text-muted-foreground">
            My presence across platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <motion.a
              key={profile.platform}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -14, rotateX: 4, rotateY: index === 1 ? 0 : index === 0 ? -4 : 4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden border border-white/10 bg-[#101426]/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition-colors duration-300 hover:border-purple-400/40 hover:bg-white/[0.08]"
            >
              <motion.div
                className={`absolute -right-16 -top-16 h-40 w-40 bg-gradient-to-br ${profile.color} opacity-20 blur-3xl`}
                animate={{ scale: [1, 1.18, 1], opacity: [0.16, 0.28, 0.16] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3.8, delay: index * 0.5, repeat: Infinity, ease: 'linear' }}
              />

              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between gap-6">
                  <motion.div
                    className={`flex h-16 w-16 items-center justify-center bg-gradient-to-r ${profile.color} shadow-lg shadow-black/30`}
                    whileHover={{ rotate: 8, scale: 1.08 }}
                  >
                    <profile.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <ArrowUpRight className="h-6 w-6 text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                </div>

                <h3 className="text-2xl font-semibold">{profile.platform}</h3>
                <p className="mb-7 text-sm text-muted-foreground">@{profile.username}</p>

                <div className="space-y-4">
                  {profile.stats.map((stat, statIndex) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -18 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.18 + statIndex * 0.08 + 0.35 }}
                      className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0"
                    >
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className={`bg-gradient-to-r ${profile.color} bg-clip-text text-lg font-semibold text-transparent`}>
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7">
                  <span className="inline-flex items-center gap-2 text-sm text-cyan-300 transition-colors group-hover:text-pink-300">
                    View Profile <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-8 shadow-2xl shadow-purple-950/20"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div whileHover={{ y: -6 }}>
              <GitBranch className="w-8 h-8 mx-auto mb-3 text-cyan-300" />
              <p className="text-3xl mb-1">150+</p>
              <p className="text-sm text-muted-foreground">Total Projects</p>
            </motion.div>
            <motion.div whileHover={{ y: -6 }}>
              <Star className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
              <p className="text-3xl mb-1">500+</p>
              <p className="text-sm text-muted-foreground">GitHub Stars</p>
            </motion.div>
            <motion.div whileHover={{ y: -6 }}>
              <Code2 className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <p className="text-3xl mb-1">2000+</p>
              <p className="text-sm text-muted-foreground">Commits</p>
            </motion.div>
            <motion.div whileHover={{ y: -6 }}>
              <Award className="w-8 h-8 mx-auto mb-3 text-pink-500" />
              <p className="text-3xl mb-1">50+</p>
              <p className="text-sm text-muted-foreground">Contributions</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
