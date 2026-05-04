import { motion } from 'motion/react';
import {
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
} from 'lucide-react';
import { useInView } from './hooks/useInView';

const skillRows = [
  {
    label: 'Programming Languages',
    direction: 'left',
    skills: [
      { name: 'C', detail: 'Systems', Icon: Code2, color: 'from-sky-300 to-blue-500' },
      { name: 'C++', detail: 'DSA', Icon: Code2, color: 'from-indigo-300 to-blue-600' },
      { name: 'Java', detail: 'OOP', Icon: Braces, color: 'from-orange-300 to-red-500' },
      { name: 'Python', detail: 'Scripting', Icon: Terminal, color: 'from-yellow-300 to-blue-500' },
      { name: 'GoLang', detail: 'Backend', Icon: Zap, color: 'from-cyan-300 to-sky-500' },
      { name: 'JavaScript', detail: 'Web', Icon: Braces, color: 'from-yellow-300 to-amber-500' },
      { name: 'TypeScript', detail: 'Typed Web', Icon: Braces, color: 'from-blue-300 to-indigo-500' },
    ],
  },
  {
    label: 'Web Development',
    direction: 'right',
    skills: [
      { name: 'HTML', detail: 'Markup', Icon: Code2, color: 'from-orange-300 to-rose-500' },
      { name: 'CSS', detail: 'Styling', Icon: Sparkles, color: 'from-blue-300 to-cyan-500' },
      { name: 'React.js', detail: 'UI', Icon: Layers3, color: 'from-cyan-300 to-blue-500' },
      { name: 'Next.js', detail: 'Full Stack', Icon: Zap, color: 'from-white to-cyan-300' },
      { name: 'Redux', detail: 'State', Icon: Workflow, color: 'from-violet-300 to-purple-600' },
      { name: 'Tailwind CSS', detail: 'Design', Icon: Sparkles, color: 'from-teal-300 to-emerald-500' },
      { name: 'Framer Motion', detail: 'Animation', Icon: Sparkles, color: 'from-pink-300 to-fuchsia-500' },
    ],
  },
  {
    label: 'Frameworks & APIs',
    direction: 'left',
    skills: [
      { name: 'Node.js', detail: 'Runtime', Icon: Server, color: 'from-lime-300 to-green-500' },
      { name: 'Express.js', detail: 'API', Icon: Server, color: 'from-violet-300 to-purple-500' },
      { name: 'Gin', detail: 'Go API', Icon: Zap, color: 'from-cyan-300 to-teal-500' },
      { name: 'FastAPI', detail: 'Python API', Icon: Zap, color: 'from-emerald-300 to-teal-500' },
      { name: 'REST APIs', detail: 'Backend', Icon: Layers3, color: 'from-pink-300 to-fuchsia-500' },
      { name: 'GraphQL', detail: 'Query API', Icon: Workflow, color: 'from-rose-300 to-pink-600' },
      { name: 'WebSockets', detail: 'Realtime', Icon: Zap, color: 'from-indigo-300 to-violet-500' },
    ],
  },
  {
    label: 'Databases & Platforms',
    direction: 'right',
    skills: [
      { name: 'MySQL', detail: 'SQL', Icon: Database, color: 'from-blue-300 to-cyan-600' },
      { name: 'MongoDB', detail: 'NoSQL', Icon: Database, color: 'from-emerald-300 to-green-600' },
      { name: 'PostgreSQL', detail: 'SQL', Icon: Database, color: 'from-sky-300 to-blue-600' },
      { name: 'Supabase', detail: 'Backend', Icon: Database, color: 'from-green-300 to-emerald-600' },
      { name: 'Redis', detail: 'Cache', Icon: Database, color: 'from-red-300 to-rose-600' },
      { name: 'Prisma', detail: 'ORM', Icon: Database, color: 'from-slate-200 to-slate-500' },
    ],
  },
  {
    label: 'Tools, DevOps & Cloud',
    direction: 'left',
    skills: [
      { name: 'Git & GitHub', detail: 'Versioning', Icon: GitBranch, color: 'from-white to-slate-400' },
      { name: 'VS Code', detail: 'Editor', Icon: Code2, color: 'from-sky-300 to-blue-500' },
      { name: 'Postman API', detail: 'Testing', Icon: Workflow, color: 'from-orange-300 to-amber-500' },
      { name: 'Docker', detail: 'Containers', Icon: Container, color: 'from-sky-300 to-cyan-500' },
      { name: 'Kubernetes', detail: 'Orchestration', Icon: Container, color: 'from-blue-300 to-indigo-600' },
      { name: 'CI/CD Pipeline', detail: 'Automation', Icon: Workflow, color: 'from-emerald-300 to-cyan-500' },
      { name: 'GitHub Actions', detail: 'CI/CD', Icon: Workflow, color: 'from-purple-300 to-indigo-500' },
      { name: 'AWS', detail: 'Cloud', Icon: Cloud, color: 'from-orange-300 to-amber-500' },
      { name: 'Vercel', detail: 'Deploy', Icon: Cloud, color: 'from-white to-slate-400' },
      { name: 'Linux', detail: 'Systems', Icon: Terminal, color: 'from-lime-300 to-emerald-500' },
    ],
  },
];

const techStackCount = new Set(skillRows.flatMap((row) => row.skills.map((skill) => skill.name))).size;

type Skill = (typeof skillRows)[number]['skills'][number];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      className="mx-3 w-[210px] shrink-0 border border-white/10 bg-[#101322]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/40 hover:bg-white/[0.07] sm:w-[240px]"
      whileHover={{ y: -8, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className={`flex h-16 w-16 items-center justify-center bg-gradient-to-br ${skill.color} text-[#070913] shadow-lg shadow-black/25`}>
          <skill.Icon className="h-8 w-8" strokeWidth={2.2} />
        </div>
        <span className="border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-white/42">
          {skill.detail}
        </span>
      </div>

      <h3 className="text-2xl font-black tracking-tight text-white">{skill.name}</h3>
      <div className={`mt-6 h-1 w-24 bg-gradient-to-r ${skill.color}`} />
    </motion.div>
  );
}

function SkillMarquee({
  row,
  index,
}: {
  row: (typeof skillRows)[number];
  index: number;
}) {
  const repeatedSkills = [...row.skills, ...row.skills, ...row.skills];
  const reverse = row.direction === 'right';

  return (
    <div className="relative">
      <div className="mb-4 flex items-center gap-4 px-2">
        <span className="h-px w-10 bg-gradient-to-r from-cyan-300/0 to-cyan-300/60" />
        <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">{row.label}</p>
      </div>
      <div className="skills-marquee relative flex overflow-hidden py-2">
        <motion.div
          className="flex min-w-max"
          animate={{ x: reverse ? ['-33.333%', '0%'] : ['0%', '-33.333%'] }}
          transition={{ duration: 30 + index * 4, repeat: Infinity, ease: 'linear' }}
        >
          {repeatedSkills.map((skill, skillIndex) => (
            <SkillCard key={`${row.label}-${skill.name}-${skillIndex}`} skill={skill} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="skills" ref={ref} className="relative overflow-hidden px-6 py-36">
      <div className="absolute inset-0 bg-[#090a12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.10),transparent_34%),radial-gradient(circle_at_70%_55%,rgba(217,70,239,0.08),transparent_28%)]" />
      <div className="absolute inset-x-0 top-28 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-7 inline-flex items-center gap-4 border border-white/10 bg-white/[0.04] px-5 py-3 shadow-xl shadow-black/25 backdrop-blur-xl">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            <span className="text-sm font-black uppercase tracking-[0.24em] text-white/70">Technical Skills</span>
          </div>

          <h2 className="text-6xl font-black leading-none tracking-tight md:text-8xl">
            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-fuchsia-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            Multiple moving lanes of the stack I use across frontend, backend, databases, DevOps, and cloud-native work.
          </p>

          <motion.div
            className="mx-auto mt-8 inline-flex items-end gap-4 border border-cyan-300/20 bg-cyan-300/5 px-7 py-4 shadow-2xl shadow-cyan-950/20"
            whileHover={{ y: -5 }}
          >
            <span className="text-5xl font-black text-white">{techStackCount}+</span>
            <span className="pb-2 text-left text-xs font-bold uppercase tracking-[0.26em] text-cyan-200/70">
              Tech Stack
              <br />
              Known
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative -mx-6 space-y-9"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#090a12] to-transparent md:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#090a12] to-transparent md:w-36" />
          {skillRows.map((row, index) => (
            <SkillMarquee key={row.label} row={row} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
