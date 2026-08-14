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

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 shadow-lg shadow-black/15 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/35 hover:bg-white/[0.07]"
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${skill.color} text-[#070913] shadow-md shadow-black/25`}>
        <skill.Icon className="h-5 w-5" strokeWidth={2.3} />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-bold tracking-tight text-white">{skill.name}</h3>
        <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{skill.detail}</p>
      </div>
    </motion.div>
  );
}

function SkillGroup({ row, rowIndex }: { row: (typeof skillRows)[number]; rowIndex: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: rowIndex * 0.06 }}
      className="premium-surface group relative overflow-hidden p-4 transition-colors hover:border-white/20 sm:p-5"
    >
      <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl transition-opacity group-hover:opacity-80" />
      <div className="relative mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-cyan-200">
          {rowIndex === 0 ? <Code2 className="h-5 w-5" /> : rowIndex === 1 ? <Layers3 className="h-5 w-5" /> : rowIndex === 2 ? <Server className="h-5 w-5" /> : rowIndex === 3 ? <Database className="h-5 w-5" /> : <Cloud className="h-5 w-5" />}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{row.label}</h3>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{row.skills.length} tools</p>
        </div>
      </div>
      <div className="relative grid gap-2 sm:grid-cols-2">
        {row.skills.map((skill) => (
          <SkillPill key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.article>
  );
}

export function SkillsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="skills" ref={ref} className="portfolio-section">
      <div className="absolute inset-0 bg-[#090a12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(217,70,239,0.06),transparent_26%)]" />

      <div className="portfolio-container">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="section-kicker mb-6">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span>Technical Skills</span>
          </div>

          <h2 className="section-title">
            <span className="section-title-gradient">
              Skills & Expertise
            </span>
          </h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">
            A focused stack across frontend, backend, databases, DevOps, and cloud work.
          </p>

          <motion.div
            className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-5 py-2.5 shadow-xl shadow-cyan-950/20"
            whileHover={{ y: -5 }}
          >
            <span className="text-2xl font-black text-white">{techStackCount}+</span>
            <span className="text-left text-xs font-bold uppercase tracking-[0.2em] text-cyan-200/70">Tools Known</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
        >
          {skillRows.map((row, index) => (
            <SkillGroup key={row.label} row={row} rowIndex={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
