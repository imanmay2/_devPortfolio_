import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineer Intern',
    company: 'Cestrum',
    type: 'Internship',
    period: 'Dec 2025 - Mar 2026',
    duration: '4 mos',
    location: 'Chennai, Tamil Nadu, India',
    mode: 'Hybrid',
    description:
      'Received an internship offer for Software / Backend Development, focused on hands-on industry experience, real-world projects, and stronger technical problem-solving.',
    skills: ['Back-End Web Development', 'Server Programming', 'API Development', 'Problem Solving'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Web Development Lead',
    company: 'CodeChef VIT-Chennai Chapter',
    type: 'Part-time',
    period: 'Apr 2026 - Present',
    duration: '2 mos',
    location: 'Chennai, Tamil Nadu, India',
    mode: 'On-site',
    description:
      'Leading web development initiatives for the chapter while building event, community, and technical workflows with the team.',
    timeline: [
      { role: 'Web Development Lead', period: 'Apr 2026 - Present', duration: '2 mos' },
      { role: 'Web Development Member', period: 'Jul 2025 - Mar 2026', duration: '9 mos' },
    ],
    skills: ['Server Side Programming', 'Gin', 'React', 'Web Development'],
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    title: 'Technical Team Member',
    company: 'E-Cell, VIT Chennai',
    type: 'Part-time',
    period: 'Aug 2025 - Present',
    duration: '10 mos',
    location: 'Chennai, Tamil Nadu, India',
    mode: 'On-site',
    description:
      'Contributing to the technical team across product, event, and community-facing engineering work.',
    skills: ['React.js', 'MongoDB', 'Team Collaboration', 'Technical Operations'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Contributor',
    company: 'GirlScript Summer of Code',
    type: 'Open Source',
    period: 'Jul 2025 - Sep 2025',
    duration: '3 mos',
    location: 'Remote',
    mode: 'Remote',
    description:
      'Contributed to open-source development through collaborative coding, issue resolution, and project-based learning.',
    skills: ['Open Source', 'GitHub', 'JavaScript', 'Collaboration'],
    color: 'from-orange-500 to-rose-500',
  },
];

export function ExperienceSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="experience" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/20 rounded-full mb-6"
            animate={isInView ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold tracking-[0.18em]">CAREER</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl mb-4 font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional experience and{' '}
            <span className="text-purple-400 font-semibold">growth milestones</span>
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 hidden md:block rounded-full"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-6">
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
                  className="absolute left-[15px] top-6 w-5 h-5 rounded-full border-4 border-background hidden md:flex items-center justify-center z-10"
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
                    className="w-2 h-2 bg-white rounded-full"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01, x: 6 }}
                  className="md:ml-16 relative group"
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${exp.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-35 transition-opacity duration-500`}
                  />

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 md:p-6 shadow-2xl">
                    <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                      <div className="min-w-0">
                        <motion.h3
                          className="text-xl md:text-2xl font-bold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all"
                        >
                          {exp.title}
                        </motion.h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {exp.company}
                          </span>
                          <span>{exp.type}</span>
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {exp.location} · {exp.mode}
                          </span>
                        </div>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${exp.color} rounded-full text-xs md:text-sm text-white font-semibold shadow-lg`}
                      >
                        <Calendar className="w-4 h-4" />
                        {exp.period} · {exp.duration}
                      </motion.div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.timeline && (
                      <div className="mb-4 grid gap-2 sm:grid-cols-2">
                        {exp.timeline.map((item) => (
                          <div key={item.role} className="border border-white/10 bg-white/[0.04] px-3 py-2">
                            <p className="text-sm font-semibold text-white">{item.role}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{item.period} · {item.duration}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-white/75"
                        >
                          {skill}
                        </span>
                      ))}
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
