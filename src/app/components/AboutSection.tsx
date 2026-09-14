import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BrainCircuit, Code2, Gauge, Server, ShieldCheck, Sparkles } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { CountUp } from './shared/CountUp';
import { Reveal } from './shared/Reveal';

const STATS = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Projects Completed' },
  { value: 36, suffix: '+', label: 'Technologies' },
];

const PRINCIPLES = [
  {
    Icon: Gauge,
    title: 'Performance first',
    copy: 'Fast paths, sane queries, and caching where it actually pays off.',
  },
  {
    Icon: ShieldCheck,
    title: 'Built to last',
    copy: 'Typed contracts, predictable errors, and schemas that survive change.',
  },
  {
    Icon: Sparkles,
    title: 'Interfaces that feel good',
    copy: 'Motion with intent, never decoration for its own sake.',
  },
];

const FLOATING_TAGS = [
  { Icon: Server, label: 'Backend', className: 'right-2 top-8 md:-right-8' },
  { Icon: Code2, label: 'Frontend', className: '-left-3 top-[44%] md:-left-12' },
  { Icon: BrainCircuit, label: 'AI/ML', className: 'bottom-10 right-10 md:-right-6' },
];

const DEVELOPER_CODE = [
  'const developer = {',
  '  name: "Manmay Chakraborty",',
  '  role: "Full Stack Developer",',
  '  skills: [',
  '    "React", "Next.js", "Node.js", "Express",',
  '    "MongoDB", "PostgreSQL", "Docker", "AWS",',
  '    "Go", "TypeScript", "WebRTC", "AI/ML"',
  '  ],',
  '  experience: "3+ years",',
  '  traits: ["hardWorker", "quickLearner", "problemSolver"],',
  '  hireable: function() {',
  '    return true;',
  '  },',
  '  currentStatus: "Building scalable products",',
  '};',
];

const LINE_INTERVAL_MS = 95;

function renderCodeLine(line: string) {
  const keyMatch = line.match(/^(\s*)([a-zA-Z]+):(.+)$/);

  if (line === 'const developer = {') {
    return (
      <>
        <span className="text-pink-400">const</span>
        <span className="text-white"> developer </span>
        <span className="text-pink-400">=</span>
        <span className="text-slate-400"> {'{'}</span>
      </>
    );
  }

  if (keyMatch) {
    const [, indent, key, value] = keyMatch;
    return (
      <>
        <span>{indent}</span>
        <span className="text-cyan-200">{key}</span>
        <span className="text-slate-300">:</span>
        {renderCodeValue(value)}
      </>
    );
  }

  if (line.includes('return true;')) {
    return (
      <>
        <span className="text-transparent">    </span>
        <span className="text-orange-400">return</span>
        <span className="text-emerald-300"> true</span>
        <span className="text-slate-300">;</span>
      </>
    );
  }

  if (line.trim() === '},') return <span className="text-slate-400">  {'}'},</span>;
  if (line.trim() === '};') return <span className="text-slate-400">{'};'}</span>;
  if (line.trim() === '],') return <span className="text-slate-400">  ],</span>;

  return <span className="text-amber-300">{line}</span>;
}

function renderCodeValue(value: string) {
  const parts = value.split(/("[^"]*"|true|function)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('"')) {
          return (
            <span key={`${part}-${index}`} className="text-amber-300">
              {part}
            </span>
          );
        }

        if (part === 'function') {
          return (
            <span key={`${part}-${index}`} className="text-orange-400">
              {part}
            </span>
          );
        }

        if (part === 'true') {
          return (
            <span key={`${part}-${index}`} className="text-emerald-300">
              {part}
            </span>
          );
        }

        return (
          <span key={`${part}-${index}`} className="text-slate-300">
            {part}
          </span>
        );
      })}
    </>
  );
}

/** Types the snippet out line by line once the panel scrolls into view. */
function useTypedCode(isActive: boolean) {
  const shouldReduceMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    if (shouldReduceMotion) {
      setVisibleLines(DEVELOPER_CODE.length);
      return;
    }

    const timer = window.setInterval(() => {
      setVisibleLines((count) => {
        if (count >= DEVELOPER_CODE.length) {
          window.clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, LINE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isActive, shouldReduceMotion]);

  return visibleLines;
}

export function AboutSection() {
  const { ref, isInView } = useInView();
  const visibleLines = useTypedCode(isInView);
  const isCodeComplete = visibleLines >= DEVELOPER_CODE.length;

  return (
    <section id="about" ref={ref} className="portfolio-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_45%,rgba(99,102,241,0.13),transparent_28%),radial-gradient(circle_at_86%_55%,rgba(236,72,153,0.09),transparent_28%)]" />

      <div className="portfolio-container grid items-center gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(340px,560px)] lg:gap-14">
        <div>
          <Reveal from="right">
            <div className="section-kicker mb-7">
              <Sparkles className="h-5 w-5 text-cyan-300" />
              <span>About Me</span>
            </div>

            <h2 className="section-title lg:text-7xl">
              Who I Am<span className="section-title-gradient">?</span>
            </h2>

            <div className="mt-8 space-y-6 border-b border-white/10 pb-10 text-lg leading-relaxed text-muted-foreground lg:text-xl">
              <p>
                I build fast, scalable, production-ready systems that actually get used. Full-stack by practice,
                backend-leaning by strength.
              </p>
              <p>
                I focus on solving real problems, not just writing code. Currently diving deeper into AI and
                real-time architectures.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} delay={0.12 + index * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="edge-glow h-full rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
                >
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    className="font-display block text-4xl font-black tabular-nums text-white lg:text-5xl"
                  />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={0.25 + index * 0.09}>
                <div className="group h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-cyan-300/25 hover:bg-white/[0.05]">
                  <principle.Icon className="h-5 w-5 text-cyan-300 transition-transform duration-300 group-hover:scale-110" />
                  <p className="mt-3 text-sm font-bold text-white">{principle.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{principle.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[520px] w-full max-w-[560px] justify-self-center lg:justify-self-end"
        >
          <motion.div
            className="absolute inset-5 rounded-2xl border border-indigo-500/20 bg-indigo-950/10 shadow-2xl shadow-black/40 backdrop-blur-2xl"
            animate={isInView ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute inset-0 overflow-hidden rounded-2xl border border-indigo-500/25 bg-[#080d1d] shadow-2xl shadow-indigo-950/30"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_112%,rgba(79,70,229,0.3),transparent_38%),linear-gradient(90deg,rgba(8,13,29,0.95),rgba(12,13,48,0.95))]" />

            <div className="relative z-10 flex h-14 items-center justify-between gap-4 border-b border-indigo-500/25 px-5 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full bg-red-400/90" />
                <span className="h-3 w-3 rounded-full bg-orange-400/90" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/90" />
              </div>
              <span className="font-code truncate text-[11px] tracking-[0.12em] text-white/35">
                developer.ts
              </span>
              <span
                className={`font-code hidden text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 sm:block ${
                  isCodeComplete ? 'text-emerald-300' : 'text-white/30'
                }`}
              >
                {isCodeComplete ? 'compiled' : 'typing'}
              </span>
            </div>

            <div className="font-code code-panel-scroll relative z-10 overflow-x-auto px-5 py-6 text-[11px] leading-[1.72] text-slate-300 sm:px-7 sm:text-[12px] md:text-[13px]">
              {DEVELOPER_CODE.slice(0, visibleLines).map((line, lineIndex) => (
                <motion.div
                  key={`${line}-${lineIndex}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex whitespace-pre-wrap"
                >
                  <span className="mr-4 hidden w-4 shrink-0 select-none text-right text-white/15 sm:inline">
                    {lineIndex + 1}
                  </span>
                  <code>{renderCodeLine(line)}</code>
                </motion.div>
              ))}

              {!isCodeComplete ? (
                <motion.span
                  className="mt-0.5 inline-block h-4 w-2 bg-cyan-300 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              ) : null}
            </div>
          </motion.div>

          {FLOATING_TAGS.map((tag, index) => (
            <motion.div
              key={tag.label}
              className={`absolute z-20 hidden items-center gap-3 rounded-xl border border-white/10 bg-black/80 px-5 py-3.5 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex ${tag.className}`}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={isInView ? { opacity: 1, y: [0, -10, 0], scale: 1 } : {}}
              transition={{
                opacity: { duration: 0.5, delay: 0.7 + index * 0.16 },
                scale: { duration: 0.5, delay: 0.7 + index * 0.16 },
                y: { duration: 3.4 + index * 0.35, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <tag.Icon className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-semibold text-white">{tag.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
