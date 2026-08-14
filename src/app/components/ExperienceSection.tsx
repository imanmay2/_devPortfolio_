import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Briefcase, Calendar, MapPin, Sparkles, TrendingUp } from 'lucide-react';

const experiences = [
  {
    title: 'Full Stack Engineer Intern',
    company: 'TechnoNexis',
    type: 'Internship',
    period: 'Jun 2026 - Present',
    location: 'Remote',
    mode: 'Remote',
    isCurrent: true,
    description: [
      'Contributing to a production-grade ERP system with a primary focus on the Inventory Management module, including multi-tenant inventory workflows, stock-tracking logic, and purchase-order lifecycle management across isolated tenant schemas.',
      'Researching and building multi-tenancy features including tenant-specific configs, dynamic schema resolution, and role-based data isolation for concurrent clients.',
      'Translating domain-specific ERP requirements around SKUs, BOMs, GRNs, and FIFO/LIFO valuation into structured API endpoints and PostgreSQL schemas.',
    ],
    skills: ['Node.js', 'PostgreSQL', 'Multi-Tenancy', 'ERP', 'Inventory Management', 'REST APIs'],
    color: 'from-cyan-400 to-violet-500',
  },
  {
    title: 'Software Engineer Intern',
    company: 'Cestrum',
    type: 'Internship',
    period: 'Dec 2025 - Mar 2026',
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
    location: 'Chennai, Tamil Nadu, India',
    mode: 'On-site',
    description:
      'Leading web development initiatives for the chapter while building event, community, and technical workflows with the team.',
    timeline: [
      { role: 'Web Development Lead', period: 'Apr 2026 - Present' },
      { role: 'Web Development Member', period: 'Jul 2025 - Mar 2026' },
    ],
    skills: ['Server Side Programming', 'Gin', 'React', 'Web Development'],
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    title: 'Technical Team Member',
    company: 'E-Cell, VIT Chennai',
    type: 'Part-time',
    period: 'Aug 2025 - Present',
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
    <section id="experience" ref={ref} className="relative overflow-hidden px-6 py-24 md:py-28">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.11),transparent_28%),radial-gradient(circle_at_82%_55%,rgba(168,85,247,0.10),transparent_30%),linear-gradient(180deg,transparent,rgba(59,130,246,0.05),transparent)]" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-5 py-2.5 backdrop-blur-xl"
            animate={isInView ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Career</span>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Professional experience and{' '}
            <span className="text-purple-400 font-semibold">growth milestones</span>
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline line */}
          <motion.div
            className="absolute bottom-3 left-4 top-3 w-px rounded-full bg-gradient-to-b from-cyan-300/80 via-purple-500/70 to-pink-500/40 md:left-6"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-7">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.title}`}
                initial={{ opacity: 0, x: -36 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.72, delay: index * 0.12 }}
                className="relative pl-10 md:pl-0"
              >
                {/* Animated Timeline dot */}
                <motion.div
                  className={`absolute left-[9px] top-7 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background md:left-[17px] md:h-5 md:w-5 ${exp.isCurrent ? 'shadow-[0_0_28px_rgba(34,211,238,0.65)]' : ''}`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: index * 0.12 + 0.22 }}
                  style={{
                    background: `linear-gradient(135deg, ${exp.color.split(' ')[1]}, ${exp.color.split(' ')[3]})`,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2" />
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative md:ml-16"
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${exp.color} blur-xl transition-opacity duration-500 ${exp.isCurrent ? 'opacity-20 group-hover:opacity-35' : 'opacity-0 group-hover:opacity-25'}`}
                  />

                  <article className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white/[0.095] to-white/[0.04] p-4 shadow-2xl shadow-black/25 backdrop-blur-xl transition-colors sm:p-5 md:p-6 ${exp.isCurrent ? 'border-cyan-300/35' : 'border-white/15 group-hover:border-white/25'}`}>
                    <div className={`absolute right-0 top-0 h-24 w-24 bg-gradient-to-br ${exp.color} opacity-10 blur-2xl`} />

                    <div className="relative mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-white/65">{exp.company}</p>
                          {exp.isCurrent ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                              <Sparkles className="h-3.5 w-3.5" />
                              Current
                            </span>
                          ) : null}
                        </div>
                        <motion.h3
                          className="mb-2 break-words text-xl font-bold leading-tight text-white transition-all group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent md:text-2xl"
                        >
                          {exp.title}
                        </motion.h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Briefcase className="h-4 w-4 shrink-0 text-white/40" />
                            {exp.type}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4 shrink-0 text-white/40" />
                            {exp.location}
                            {exp.mode !== exp.location ? ` · ${exp.mode}` : ''}
                          </span>
                        </div>
                      </div>
                      
                      <motion.div
                        whileHover={{ y: -2 }}
                        className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r ${exp.color} px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-black/20 md:text-sm`}
                      >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span className="whitespace-nowrap">{exp.period}</span>
                      </motion.div>
                    </div>

                    {Array.isArray(exp.description) ? (
                      <ul className="relative mb-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                        {exp.description.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${exp.color}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                    )}

                    {exp.timeline && (
                      <div className="mb-4 grid gap-2 sm:grid-cols-2">
                        {exp.timeline.map((item) => (
                          <div key={item.role} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                            <p className="text-sm font-semibold text-white">{item.role}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{item.period}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1 text-xs font-semibold text-white/75"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
