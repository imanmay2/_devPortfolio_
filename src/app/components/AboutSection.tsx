import { motion } from 'motion/react';
import {
  BrainCircuit,
  Code2,
  Server,
  Sparkles,
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
        <span className="text-white">{key}</span>
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
        <span className="text-white"> true</span>
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
            <span key={`${part}-${index}`} className="text-yellow-300">
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
            <span key={`${part}-${index}`} className="text-cyan-200">
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
            className="absolute inset-5 border border-indigo-500/20 bg-indigo-950/10 shadow-2xl shadow-black/40 backdrop-blur-2xl"
            animate={isInView ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute inset-0 overflow-hidden border border-indigo-500/30 bg-[#080d1d] shadow-2xl shadow-indigo-950/40"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_112%,rgba(79,70,229,0.32),transparent_38%),linear-gradient(90deg,rgba(8,13,29,0.95),rgba(12,13,48,0.95))]" />

            <div className="relative z-10 flex h-24 items-center border-b-4 border-indigo-500/45 px-8">
              <div className="flex items-center gap-4">
                <span className="h-3.5 w-3.5 rounded-full bg-red-400" />
                <span className="h-3.5 w-3.5 rounded-full bg-orange-400" />
                <span className="h-3.5 w-3.5 rounded-full bg-emerald-300" />
              </div>
            </div>

            <div className="relative z-10 px-8 py-7 font-mono text-[11px] leading-[1.68] text-slate-300 sm:text-[12px] md:text-[13px]">
              {developerCode.map((line, lineIndex) => (
                <div key={`${line}-${lineIndex}`} className="whitespace-pre-wrap">
                  <code>{renderCodeLine(line)}</code>
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
