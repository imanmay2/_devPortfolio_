import { motion } from 'motion/react';
import {
  BrainCircuit,
  Code2,
  Server,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { useInView } from './hooks/useInView';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Completed' },
  { value: '15+', label: 'Technologies' },
];

const floatingTags = [
  { icon: Server, label: 'Backend', className: 'right-2 top-8 md:-right-8' },
  { icon: Code2, label: 'Frontend', className: '-left-3 top-[44%] md:-left-12' },
  { icon: BrainCircuit, label: 'AI/ML', className: 'bottom-10 right-10 md:-right-6' },
];

const developerCode = [
  'const developer = {',
  '  name: "Manmay Chakraborty",',
  '  role: "Full Stack Engineer",',
  '  stack: ["Next.js", "Node.js", "Go", "PostgreSQL", "Docker"],',
  '  strengths: ["backend systems", "clean UI", "real-time apps"],',
  '  focus: ["AI applications", "system design", "WebRTC"],',
  '  style: "build → test → iterate → scale",',
  '  edge: "ships usable products fast 🚀",',
  '};',
];

function getCodeLineClass(line: string) {
  if (line.includes('const developer')) return 'text-cyan-200';
  if (line.includes('stack') || line.includes('strengths') || line.includes('currentFocus')) return 'text-fuchsia-300';
  if (line.includes('"')) return 'text-emerald-300';
  if (line.includes('};') || line.trim() === '},' || line.trim() === '],') return 'text-slate-500';
  return 'text-slate-300';
}

export function AboutSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" ref={ref} className="relative overflow-hidden px-6 py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_45%,rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_86%_55%,rgba(236,72,153,0.10),transparent_28%),linear-gradient(180deg,transparent,rgba(15,23,42,0.35),transparent)]" />
      <motion.div
        className="absolute left-[7%] top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-indigo-400/40 text-indigo-300 md:flex"
        animate={isInView ? { rotate: 360, scale: [1, 1.12, 1] } : {}}
        transition={{ rotate: { duration: 18, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
      >
        <span className="h-2 w-2 bg-indigo-300" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 sm:grid-cols-[minmax(0,0.92fr)_minmax(340px,560px)] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85 }}
        >
          <div className="mb-7 inline-flex items-center gap-3 border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">About Me</span>
          </div>

          <h2 className="text-5xl font-bold leading-tight text-white lg:text-7xl">
            Who I Am<span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">?</span>
          </h2>

          <div className="mt-8 space-y-6 border-b border-white/10 pb-10 text-lg leading-relaxed text-muted-foreground lg:text-xl">
            <p>
              I build fast, scalable, production-ready systems that actually get used.
              Full-stack by practice, backend-leaning by strength.
            </p>
            <p>
              I focus on solving real problems, not just writing code. Currently diving deeper into AI and real-time
              architectures.
            </p>
          </div>

          <motion.div
            className="mt-10 grid gap-6 sm:grid-cols-3"
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <motion.p
                  className="text-4xl font-bold text-white lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45 + index * 0.12 }}
                >
                  {stat.value}
                </motion.p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 70, scale: 0.96 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative min-h-[520px] w-full max-w-[560px] justify-self-center sm:justify-self-end"
        >
          <motion.div
            className="absolute inset-5 border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-2xl [border-radius:34px]"
            animate={isInView ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute inset-0 overflow-hidden border border-white/10 bg-[#0b0e1b] p-5 shadow-2xl shadow-fuchsia-950/30 [border-radius:34px]"
            whileHover={{ rotate: -1, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-5 bg-gradient-to-br from-indigo-500/34 via-violet-500/20 to-rose-500/36 [border-radius:28px]" />
            <motion.div
              className="absolute inset-5 [border-radius:28px]"
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage:
                  'linear-gradient(120deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 80px)',
                backgroundSize: '120px 120px',
              }}
            />

            <motion.div
              className="absolute left-10 right-10 top-1/2 z-10 -translate-y-1/2 overflow-hidden border border-white/10 bg-[#151225]/82 shadow-2xl shadow-black/35 backdrop-blur-xl [border-radius:14px]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-3">
                <div className="flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-cyan-300" />
                  <span className="text-sm uppercase tracking-[0.28em] text-white/45">developer.ts</span>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 bg-rose-400" />
                  <span className="h-3 w-3 bg-amber-300" />
                  <span className="h-3 w-3 bg-emerald-300" />
                </div>
              </div>
              <div className="px-5 py-5 font-mono text-[10.5px] leading-[1.7] md:text-[11.5px]">
                {developerCode.map((line, lineIndex) => (
                  <div
                    key={`${line}-${lineIndex}`}
                    className="grid grid-cols-[2.15rem,1fr] gap-4 whitespace-pre px-1 py-1 transition-colors hover:bg-white/[0.035]"
                  >
                    <span className="select-none text-right text-white/18">
                      {String(lineIndex + 1).padStart(2, '0')}
                    </span>
                    <code className={getCodeLineClass(line)}>{line}</code>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="absolute bottom-8 left-8 grid grid-cols-3 gap-3">
              {[
                { value: '39+', label: 'Stack' },
                { value: '10+', label: 'Projects' },
                { value: 'AI', label: 'Focus' },
              ].map((metric) => (
                <div key={metric.label} className="border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
                  <p className="text-xl font-black text-white">{metric.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {floatingTags.map((tag, index) => (
            <motion.div
              key={tag.label}
              className={`absolute z-20 hidden items-center gap-3 border border-white/10 bg-black/80 px-5 py-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex ${tag.className}`}
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={isInView ? { opacity: 1, y: [0, -10, 0], scale: 1 } : {}}
              transition={{
                opacity: { duration: 0.5, delay: 0.7 + index * 0.16 },
                scale: { duration: 0.5, delay: 0.7 + index * 0.16 },
                y: { duration: 3.4 + index * 0.35, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <tag.icon className="h-6 w-6 text-cyan-300" />
              <span className="font-semibold text-white">{tag.label}</span>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}
