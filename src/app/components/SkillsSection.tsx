import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Zap } from 'lucide-react';

const skillCategories = [
  {
    category: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/10 to-cyan-500/10',
    skills: [
      { name: 'Next.js', level: 95, icon: '⚡' },
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'TypeScript', level: 88, icon: '📘' },
      { name: 'Tailwind CSS', level: 92, icon: '🎨' },
    ],
  },
  {
    category: 'Backend',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-500/10 to-pink-500/10',
    skills: [
      { name: 'Node.js', level: 93, icon: '🟢' },
      { name: 'Express', level: 90, icon: '🚂' },
      { name: 'PostgreSQL', level: 87, icon: '🐘' },
      { name: 'MongoDB', level: 85, icon: '🍃' },
    ],
  },
  {
    category: 'DevOps & Tools',
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-500/10 to-red-500/10',
    skills: [
      { name: 'Docker', level: 82, icon: '🐳' },
      { name: 'AWS', level: 80, icon: '☁️' },
      { name: 'Git', level: 92, icon: '📦' },
      { name: 'CI/CD', level: 78, icon: '🔄' },
    ],
  },
  {
    category: 'Other',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/10 to-emerald-500/10',
    skills: [
      { name: 'GraphQL', level: 84, icon: '🔷' },
      { name: 'Redis', level: 80, icon: '🔴' },
      { name: 'WebSockets', level: 86, icon: '🔌' },
      { name: 'REST APIs', level: 94, icon: '🌐' },
    ],
  },
];

export function SkillsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="skills" ref={ref} className="py-40 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/20 rounded-full mb-8"
            animate={isInView ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold">EXPERTISE</span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl mb-6 font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Technologies I work with to build{' '}
            <span className="text-purple-400 font-semibold">amazing products</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="relative group"
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${category.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              />

              <motion.div
                className={`relative bg-gradient-to-br ${category.bgColor} backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className={`px-6 py-3 bg-gradient-to-r ${category.color} rounded-2xl`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: categoryIndex * 0.2 + skillIndex * 0.1,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="font-semibold text-lg">{skill.name}</span>
                        </div>
                        <motion.span
                          className={`text-lg font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{
                            duration: 0.5,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      
                      <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1.5,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: 'easeOut',
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + 1,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
