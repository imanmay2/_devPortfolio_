import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Briefcase, Calendar, Award, TrendingUp } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    period: '2023 - Present',
    description: 'Leading the development of scalable microservices architecture using Next.js and Node.js. Implemented CI/CD pipelines and reduced deployment time by 60%.',
    achievements: [
      'Architected and deployed 15+ microservices',
      'Improved application performance by 45%',
      'Mentored 5 junior developers',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2021 - 2023',
    description: 'Developed and maintained multiple client-facing applications using React and Express. Focused on backend optimization and API design.',
    achievements: [
      'Built RESTful APIs serving 100K+ requests daily',
      'Reduced database query time by 35%',
      'Implemented real-time features using WebSockets',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Backend Developer',
    company: 'Startup Hub',
    period: '2019 - 2021',
    description: 'Specialized in backend development with Node.js and PostgreSQL. Designed database schemas and implemented authentication systems.',
    achievements: [
      'Designed scalable database architecture',
      'Implemented JWT-based authentication',
      'Optimized server response times by 40%',
    ],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Junior Developer',
    company: 'Code Academy',
    period: '2018 - 2019',
    description: 'Started career focusing on web development fundamentals. Contributed to various projects and learned best practices.',
    achievements: [
      'Completed 20+ projects',
      'Learned modern web technologies',
      'Collaborated with cross-functional teams',
    ],
    color: 'from-green-500 to-emerald-500',
  },
];

export function ExperienceSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="experience" ref={ref} className="py-40 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/20 rounded-full mb-8"
            animate={isInView ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold">CAREER</span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl mb-6 font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Professional experience and{' '}
            <span className="text-purple-400 font-semibold">growth milestones</span>
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 hidden md:block rounded-full"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -80 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                {/* Animated Timeline dot */}
                <motion.div
                  className="absolute left-[18px] top-8 w-8 h-8 rounded-full border-4 border-background hidden md:flex items-center justify-center z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  style={{
                    background: `linear-gradient(135deg, ${exp.color.split(' ')[1]}, ${exp.color.split(' ')[3]})`,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="md:ml-24 relative group"
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${exp.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                  />

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
                    <div className="flex flex-wrap items-start justify-between mb-6 gap-4">
                      <div>
                        <motion.h3
                          className="text-3xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all"
                        >
                          {exp.title}
                        </motion.h3>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Briefcase className="w-5 h-5" />
                          <span className="text-lg">{exp.company}</span>
                        </div>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${exp.color} rounded-full text-white font-semibold shadow-lg`}
                      >
                        <Calendar className="w-5 h-5" />
                        {exp.period}
                      </motion.div>
                    </div>

                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <p className="font-semibold">Key Achievements:</p>
                      </div>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 + 0.5 }}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <motion.span
                              className={`text-2xl bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
                              whileHover={{ scale: 1.2 }}
                            >
                              ▸
                            </motion.span>
                            <span className="pt-1">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
