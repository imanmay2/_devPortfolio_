import { memo, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Boxes,
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  GitBranch,
  Layers3,
  Server,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { useInView } from './hooks/useInView';
import { TechLogo } from './shared/TechLogo';

type Skill = {
  name: string;
  detail: string;
  /** Simple Icons slug used for the brand mark. */
  slug?: string;
  Icon: LucideIcon;
  tile: string;
};

type Lane = {
  id: string;
  label: string;
  /** Short name used inside the boot loader strip. */
  code: string;
  Icon: LucideIcon;
  accent: string;
  /** Seconds for one full pass. Staggered so lanes never sync up. */
  duration: number;
  direction: 'normal' | 'reverse';
  skills: Skill[];
};

/*
 * Four lanes, four trains. Directions alternate and durations are mutually
 * non-divisible, so the lanes drift out of phase instead of marching in
 * lockstep - that is what sells the parallel-track effect.
 */
const LANES: Lane[] = [
  {
    id: 'languages',
    label: 'Languages',
    code: 'languages',
    Icon: Braces,
    accent: 'from-cyan-300 to-blue-500',
    duration: 38,
    direction: 'normal',
    skills: [
      { name: 'TypeScript', detail: 'Typed Web', slug: 'typescript', Icon: Braces, tile: 'from-blue-400 to-indigo-600' },
      { name: 'JavaScript', detail: 'Web', slug: 'javascript', Icon: Braces, tile: 'from-yellow-400 to-amber-600' },
      { name: 'GoLang', detail: 'Backend', slug: 'go', Icon: Zap, tile: 'from-cyan-400 to-sky-600' },
      { name: 'Python', detail: 'Scripting', slug: 'python', Icon: Terminal, tile: 'from-yellow-400 to-blue-600' },
      { name: 'Java', detail: 'OOP', slug: 'openjdk', Icon: Code2, tile: 'from-orange-400 to-red-600' },
      { name: 'C++', detail: 'DSA', slug: 'cplusplus', Icon: Code2, tile: 'from-indigo-400 to-blue-700' },
      { name: 'C', detail: 'Systems', slug: 'c', Icon: Code2, tile: 'from-sky-400 to-blue-600' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & Interfaces',
    code: 'interface',
    Icon: Layers3,
    accent: 'from-violet-300 to-fuchsia-500',
    duration: 47,
    direction: 'reverse',
    skills: [
      { name: 'React.js', detail: 'UI Library', slug: 'react', Icon: Layers3, tile: 'from-cyan-400 to-blue-600' },
      { name: 'Next.js', detail: 'Full Stack', slug: 'nextdotjs', Icon: Zap, tile: 'from-slate-300 to-slate-600' },
      { name: 'Redux', detail: 'State', slug: 'redux', Icon: Workflow, tile: 'from-violet-400 to-purple-700' },
      { name: 'Tailwind CSS', detail: 'Design', slug: 'tailwindcss', Icon: Sparkles, tile: 'from-teal-400 to-cyan-600' },
      { name: 'Framer Motion', detail: 'Animation', slug: 'framer', Icon: Sparkles, tile: 'from-pink-400 to-fuchsia-600' },
      { name: 'HTML5', detail: 'Markup', slug: 'html5', Icon: Code2, tile: 'from-orange-400 to-rose-600' },
      { name: 'CSS3', detail: 'Styling', slug: 'css3', Icon: Sparkles, tile: 'from-blue-400 to-cyan-600' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend, APIs & Data',
    code: 'services',
    Icon: Server,
    accent: 'from-emerald-300 to-teal-500',
    duration: 43,
    direction: 'normal',
    skills: [
      { name: 'Node.js', detail: 'Runtime', slug: 'nodedotjs', Icon: Server, tile: 'from-lime-400 to-green-600' },
      { name: 'Express.js', detail: 'API Layer', slug: 'express', Icon: Server, tile: 'from-slate-400 to-slate-700' },
      { name: 'Gin', detail: 'Go API', slug: 'gin', Icon: Zap, tile: 'from-cyan-400 to-teal-600' },
      { name: 'FastAPI', detail: 'Python API', slug: 'fastapi', Icon: Zap, tile: 'from-emerald-400 to-teal-600' },
      { name: 'GraphQL', detail: 'Query API', slug: 'graphql', Icon: Workflow, tile: 'from-rose-400 to-pink-600' },
      { name: 'WebSockets', detail: 'Realtime', slug: 'socketdotio', Icon: Zap, tile: 'from-indigo-400 to-violet-600' },
      { name: 'PostgreSQL', detail: 'Relational', slug: 'postgresql', Icon: Database, tile: 'from-sky-400 to-blue-700' },
      { name: 'MongoDB', detail: 'Document', slug: 'mongodb', Icon: Database, tile: 'from-emerald-400 to-green-700' },
      { name: 'MySQL', detail: 'Relational', slug: 'mysql', Icon: Database, tile: 'from-blue-400 to-cyan-700' },
      { name: 'Redis', detail: 'Cache', slug: 'redis', Icon: Database, tile: 'from-red-400 to-rose-700' },
      { name: 'Prisma', detail: 'ORM', slug: 'prisma', Icon: Database, tile: 'from-slate-300 to-slate-600' },
      { name: 'Supabase', detail: 'BaaS', slug: 'supabase', Icon: Database, tile: 'from-green-400 to-emerald-700' },
    ],
  },
  {
    id: 'platform',
    label: 'DevOps, Cloud & Tooling',
    code: 'platform',
    Icon: Cloud,
    accent: 'from-amber-300 to-orange-500',
    duration: 53,
    direction: 'reverse',
    skills: [
      { name: 'Docker', detail: 'Containers', slug: 'docker', Icon: Container, tile: 'from-sky-400 to-cyan-600' },
      { name: 'Kubernetes', detail: 'Orchestration', slug: 'kubernetes', Icon: Boxes, tile: 'from-blue-400 to-indigo-700' },
      { name: 'AWS', detail: 'Cloud', slug: 'amazonwebservices', Icon: Cloud, tile: 'from-orange-400 to-amber-600' },
      { name: 'GitHub Actions', detail: 'CI/CD', slug: 'githubactions', Icon: Workflow, tile: 'from-purple-400 to-indigo-600' },
      { name: 'CI/CD Pipeline', detail: 'Automation', Icon: Workflow, tile: 'from-emerald-400 to-cyan-600' },
      { name: 'Git & GitHub', detail: 'Versioning', slug: 'github', Icon: GitBranch, tile: 'from-slate-300 to-slate-600' },
      { name: 'Linux', detail: 'Systems', slug: 'linux', Icon: Terminal, tile: 'from-lime-400 to-emerald-600' },
      { name: 'Vercel', detail: 'Deploy', slug: 'vercel', Icon: Cloud, tile: 'from-slate-300 to-slate-600' },
      { name: 'Postman', detail: 'API Testing', slug: 'postman', Icon: Workflow, tile: 'from-orange-400 to-amber-600' },
      { name: 'VS Code', detail: 'Editor', slug: 'visualstudiocode', Icon: Code2, tile: 'from-sky-400 to-blue-600' },
    ],
  },
];

const TOTAL_SKILLS = new Set(LANES.flatMap((lane) => lane.skills.map((skill) => skill.name))).size;
const BOOT_DURATION_MS = 2200;

/** One carriage on a lane. Padding lives on the wrapper so every copy of the
 *  train measures identically and the -50% loop lands seamlessly. */
function SkillCar({ skill }: { skill: Skill }) {
  return (
    <div className="shrink-0 pr-3 sm:pr-4">
      <div className="edge-glow group/car flex w-[188px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2.5 shadow-lg shadow-black/25 backdrop-blur-xl transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:bg-white/[0.085] sm:w-[204px]">
        <span
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${skill.tile} shadow-md shadow-black/40`}
        >
          <TechLogo slug={skill.slug} fallbackIcon={skill.Icon} name={skill.name} className="h-5 w-5" />
          <span className="absolute inset-0 rounded-lg bg-white/0 transition-colors duration-300 group-hover/car:bg-white/15" />
        </span>

        <span className="min-w-0">
          <span className="block truncate text-sm font-bold tracking-tight text-white">{skill.name}</span>
          <span className="meta-label mt-0.5 block truncate">{skill.detail}</span>
        </span>
      </div>
    </div>
  );
}

const SkillLane = memo(function SkillLane({
  lane,
  index,
  isOnline,
}: {
  lane: Lane;
  index: number;
  isOnline: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="rail-lane group relative"
      initial={{ opacity: 0, y: 26 }}
      animate={isOnline ? { opacity: 1, y: 0 } : { opacity: 0.18, y: 12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Lane header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-0.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-code text-[11px] font-semibold tracking-[0.2em] text-white/25">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br ${lane.accent} bg-clip-padding text-[#070913]`}
          >
            <lane.Icon className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <h3 className="font-display truncate text-base font-semibold text-white sm:text-lg">{lane.label}</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="meta-label hidden sm:inline">{lane.skills.length} modules</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                isOnline ? 'bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]' : 'bg-white/20'
              }`}
            />
            <span className="font-code text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {isOnline ? 'running' : 'standby'}
            </span>
          </span>
        </div>
      </div>

      {/* The train */}
      <div className="rail-mask relative overflow-hidden py-3">
        <div
          className="rail-track"
          style={
            shouldReduceMotion
              ? undefined
              : ({
                  '--rail-duration': `${lane.duration}s`,
                  '--rail-direction': lane.direction,
                } as React.CSSProperties)
          }
        >
          {/* Two identical passes: the animation translates by exactly one. */}
          {[0, 1].flatMap((copy) =>
            lane.skills.map((skill) => <SkillCar key={`${copy}-${skill.name}`} skill={skill} />)
          )}
        </div>
      </div>

      {/* The rail the train rides on */}
      <div className="relative mt-2 h-6">
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${lane.accent} opacity-30`} />
        <div
          className="rail-sleepers absolute inset-x-0 top-[3px] h-2 opacity-25"
          style={
            shouldReduceMotion ? undefined : ({ '--rail-direction': lane.direction } as React.CSSProperties)
          }
        />
        {!shouldReduceMotion && isOnline ? (
          <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
            <div
              className="rail-pulse h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent sm:w-28"
              style={
                {
                  '--pulse-duration': `${lane.duration / 7}s`,
                  '--pulse-delay': `${index * 0.9}s`,
                } as React.CSSProperties
              }
            />
          </div>
        ) : null}
      </div>
    </motion.div>
  );
});

/** The four-segment boot strip that brings each lane online in turn. */
function BootLoader({ progress }: { progress: number }) {
  return (
    <div className="premium-surface relative overflow-hidden p-4 sm:p-5">
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
          </span>
          <span className="font-code text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
            stack.boot
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="meta-label">{LANES.length} lanes</span>
          <span className="font-code text-sm font-semibold tabular-nums text-cyan-200">
            {String(Math.round(progress)).padStart(3, '0')}%
          </span>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {LANES.map((lane, index) => {
          // Each lane owns one quarter of the bar and fills in sequence.
          const segment = Math.min(1, Math.max(0, (progress - index * 25) / 25));

          return (
            <div key={lane.id}>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${lane.accent}`}
                  style={{ width: `${segment * 100}%`, transition: 'width 120ms linear' }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="font-code truncate text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {lane.code}
                </span>
                <span
                  className={`font-code text-[10px] tabular-nums transition-colors duration-300 ${
                    segment === 1 ? 'text-emerald-300' : 'text-white/25'
                  }`}
                >
                  {segment === 1 ? 'ok' : `${Math.round(segment * 100)}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, isInView } = useInView();
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // Boot sequence: one shared 0-100 counter drives both the loader strip and
  // the moment each lane's train is released.
  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setProgress(100);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / BOOT_DURATION_MS);
      setProgress(ratio * 100);

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, shouldReduceMotion]);

  return (
    <section id="skills" ref={ref} className="portfolio-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_36%),radial-gradient(circle_at_84%_78%,rgba(217,70,239,0.07),transparent_28%)]" />

      <div className="portfolio-container">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <div className="section-kicker mb-6">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span>Technical Skills</span>
          </div>

          <h2 className="section-title">
            <span className="section-title-gradient">Skills &amp; Expertise</span>
          </h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">
            Four parallel tracks I work across every day — languages, interfaces, services and platform.
            Hover any lane to stop the train and read it.
          </p>

          <motion.div
            className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-5 py-2.5 shadow-xl shadow-cyan-950/20"
            whileHover={{ y: -4 }}
          >
            <span className="font-display text-2xl font-black text-white">{TOTAL_SKILLS}+</span>
            <span className="text-left text-xs font-bold uppercase tracking-[0.2em] text-cyan-200/70">
              Tools in rotation
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <BootLoader progress={progress} />
        </motion.div>

        <div className="relative mt-8 space-y-7 sm:mt-10 sm:space-y-8">
          {LANES.map((lane, index) => (
            <SkillLane key={lane.id} lane={lane} index={index} isOnline={progress >= (index + 1) * 25} />
          ))}
        </div>
      </div>
    </section>
  );
}
