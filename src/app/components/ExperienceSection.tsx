import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Briefcase, Calendar, MapPin, Sparkles, TrendingUp } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { Reveal } from './shared/Reveal';

type Experience = {
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  mode: string;
  isCurrent?: boolean;
  description: string | string[];
  timeline?: Array<{ role: string; period: string }>;
  skills: string[];
  color: string;
  /** Dot fill, since Tailwind gradient classes cannot be read at runtime. */
  dot: string;
};

const EXPERIENCES: Experience[] = [
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
    dot: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
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
    dot: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
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
    dot: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
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
    dot: 'linear-gradient(135deg, #10b981, #14b8a6)',
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
    dot: 'linear-gradient(135deg, #f97316, #f43f5e)',
  },
];

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  return (
    <Reveal from="right" delay={index * 0.05} className="relative pl-11 md:pl-0" amount={0.15}>
      {/* Timeline node */}
      <motion.span
        className={`absolute left-[11px] top-7 z-10 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-[#070913] md:left-[19px] md:h-5 md:w-5 ${
          experience.isCurrent ? 'shadow-[0_0_26px_rgba(34,211,238,0.7)]' : ''
        }`}
        style={{ background: experience.dot }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.15 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2" />
        {experience.isCurrent ? (
          <motion.span
            className="absolute inset-0 rounded-full border border-cyan-300/70"
            animate={{ scale: [1, 2.1], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        ) : null}
      </motion.span>

      <motion.div whileHover={{ y: -5 }} className="group relative md:ml-16">
        <div
          className={`pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r ${experience.color} blur-xl transition-opacity duration-500 ${
            experience.isCurrent ? 'opacity-[0.18] group-hover:opacity-30' : 'opacity-0 group-hover:opacity-20'
          }`}
        />

        <article
          className={`spotlight relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white/[0.085] to-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition-colors sm:p-5 md:p-6 ${
            experience.isCurrent ? 'border-cyan-300/35' : 'border-white/12 group-hover:border-white/25'
          }`}
        >
          <div
            className={`pointer-events-none absolute right-0 top-0 h-28 w-28 bg-gradient-to-br ${experience.color} opacity-[0.12] blur-2xl`}
          />

          <div className="relative mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-white/65">{experience.company}</p>
                {experience.isCurrent ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                    <Sparkles className="h-3 w-3" />
                    Current
                  </span>
                ) : null}
              </div>

              <h3 className="font-display mb-2 break-words text-xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-cyan-200 md:text-2xl">
                {experience.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Briefcase className="h-4 w-4 shrink-0 text-white/35" />
                  {experience.type}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-white/35" />
                  {experience.location}
                  {experience.mode !== experience.location ? ` · ${experience.mode}` : ''}
                </span>
              </div>
            </div>

            <span
              className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r ${experience.color} px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-black/25 md:text-sm`}
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{experience.period}</span>
            </span>
          </div>

          {Array.isArray(experience.description) ? (
            <ul className="relative mb-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {experience.description.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${experience.color}`}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{experience.description}</p>
          )}

          {experience.timeline ? (
            <div className="mb-4 grid gap-2 sm:grid-cols-2">
              {experience.timeline.map((item) => (
                <div key={item.role} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="text-sm font-semibold text-white">{item.role}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.period}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1 text-xs font-semibold text-white/70 transition-colors group-hover:border-white/20 group-hover:text-white/90"
              >
                {skill}
              </span>
            ))}
          </div>
        </article>
      </motion.div>
    </Reveal>
  );
}

export function ExperienceSection() {
  const { ref, isInView } = useInView();
  const timelineRef = useRef<HTMLDivElement>(null);

  // The rail fills as you travel the list, so progress is legible at a glance.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });

  return (
    <section id="experience" ref={ref} className="relative overflow-hidden px-5 py-24 sm:px-6 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_82%_55%,rgba(168,85,247,0.09),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <div className="section-kicker mb-6">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span>Career</span>
          </div>

          <h2 className="section-title">
            <span className="section-title-gradient">My Journey</span>
          </h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">
            Internships, leadership and open source — the roles where I learned to ship under real constraints.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Unfilled rail */}
          <div className="absolute bottom-3 left-[18px] top-3 w-px bg-white/[0.08] md:left-[26px]" />
          {/* Filled rail, driven by scroll position */}
          <motion.div
            className="absolute bottom-3 left-[18px] top-3 w-px origin-top rounded-full bg-gradient-to-b from-cyan-300 via-violet-400 to-fuchsia-400 md:left-[26px]"
            style={{ scaleY: railScale }}
          />

          <div className="space-y-7">
            {EXPERIENCES.map((experience, index) => (
              <ExperienceCard key={`${experience.company}-${experience.title}`} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
