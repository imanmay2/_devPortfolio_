import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Github, Code2, GitBranch, Star, Award } from 'lucide-react';

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
    <section id="profiles" ref={ref} className="py-32 px-6 bg-accent/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
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
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group hover:scale-105"
            >
              <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${profile.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <profile.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl mb-2">{profile.platform}</h3>
              <p className="text-sm text-muted-foreground mb-6">@{profile.username}</p>

              <div className="space-y-4">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className={`text-lg bg-gradient-to-r ${profile.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-sm text-blue-500 group-hover:text-blue-400 transition-colors">
                  View Profile →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-blue-500/20 rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <GitBranch className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <p className="text-3xl mb-1">150+</p>
              <p className="text-sm text-muted-foreground">Total Projects</p>
            </div>
            <div>
              <Star className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
              <p className="text-3xl mb-1">500+</p>
              <p className="text-sm text-muted-foreground">GitHub Stars</p>
            </div>
            <div>
              <Code2 className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <p className="text-3xl mb-1">2000+</p>
              <p className="text-sm text-muted-foreground">Commits</p>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-3 text-pink-500" />
              <p className="text-3xl mb-1">50+</p>
              <p className="text-sm text-muted-foreground">Contributions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
