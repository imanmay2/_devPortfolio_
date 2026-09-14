import { motion } from 'motion/react';
import { ArrowUpRight, Eye, Github, Sparkles } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Reveal } from './shared/Reveal';
import { TiltCard } from './shared/TiltCard';

type Project = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    title: 'NexCare',
    tagline: 'Telemedicine platform',
    description:
      'A full-stack telemedicine platform connecting patients, doctors, and pharmacies for digital consultations, prescription management, and medicine delivery.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
    tech: ['React', 'GoLang', 'Gin', 'PostgreSQL', 'Redis', 'WebSockets', 'Supabase'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imanmay2/NexCare',
    gradient: 'from-cyan-500 to-emerald-500',
  },
  {
    title: 'Wanderlust',
    tagline: 'Stay booking marketplace',
    description:
      'A full-stack accommodation booking platform inspired by modern travel apps, built for exploring, listing, and booking properties with a responsive experience.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=650&fit=crop',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Mapbox API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imanmay2/wander_lust',
    gradient: 'from-blue-500 to-sky-500',
  },
  {
    title: 'QNeX',
    tagline: 'Live quiz engine',
    description:
      'A dynamic quiz platform where users can create, share, and attempt MCQ-based tests through unique access IDs with real-time evaluation.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=650&fit=crop',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Cohere.ai API'],
    liveUrl: 'https://qnexv1.netlify.app',
    githubUrl: 'https://github.com/imanmay2/QNeX',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    title: 'PharmaMind',
    tagline: 'Drug discovery research',
    description:
      'A research-driven drug discovery platform that helps scientists analyze existing drug data, understand usage patterns, and accelerate pharmaceutical research.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&h=650&fit=crop',
    tech: ['React', 'Node.js', 'Express.js', 'Authentication'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imanmay2/PharmaMind',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'TwitInBook',
    tagline: 'Social networking',
    description:
      'A full-stack social networking platform inspired by Twitter and Facebook, supporting posts, likes, comments, and connected real-time interactions.',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=900&h=650&fit=crop',
    tech: ['HTML', 'CSS', 'JavaScript', 'Express.js', 'MySQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imanmay2/TwitInBook',
    gradient: 'from-orange-500 to-rose-500',
  },
];

function TechChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/70 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/90">
      {label}
    </span>
  );
}

function ProjectActions({ project, compact = false }: { project: Project; compact?: boolean }) {
  const hasLiveDemo = project.liveUrl !== '#';

  return (
    <div className="mt-auto flex flex-wrap gap-3 pt-1">
      <motion.a
        href={project.liveUrl}
        target={hasLiveDemo ? '_blank' : undefined}
        rel={hasLiveDemo ? 'noreferrer' : undefined}
        aria-disabled={!hasLiveDemo}
        aria-label={`Open live demo for ${project.title}`}
        data-cursor={hasLiveDemo ? 'live' : undefined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`premium-focus group/cta relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r ${project.gradient} px-4 font-semibold text-white shadow-lg ${
          compact ? 'py-2.5 text-sm' : 'py-3'
        } ${hasLiveDemo ? 'hover:shadow-xl' : 'pointer-events-none opacity-45'}`}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
        <span className="relative">{hasLiveDemo ? 'Live Demo' : 'Private Build'}</span>
        <ArrowUpRight className="relative h-4 w-4" />
      </motion.a>

      <motion.a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} on GitHub`}
        data-cursor="code"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`premium-focus inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] px-4 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/[0.14] ${
          compact ? 'py-2.5' : 'py-3'
        }`}
      >
        <Github className="h-5 w-5" />
      </motion.a>
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal from="up" className="md:col-span-2 xl:col-span-6" amount={0.12}>
      <article className="premium-surface spotlight group relative grid overflow-hidden transition-colors hover:border-white/20 lg:grid-cols-[1.05fr_0.95fr]">
        <div
          className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
        />

        <div className="relative min-h-[300px] overflow-hidden lg:min-h-full">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover grayscale-[0.45] transition-all duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b16] via-[#080b16]/45 to-transparent lg:bg-gradient-to-r" />

          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3.5 py-1.5 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span className="font-code text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              Featured
            </span>
          </span>
        </div>

        <div className="relative flex flex-col p-5 sm:p-7 lg:p-9">
          <p className="meta-label">{project.tagline}</p>
          <h3 className="font-display mt-3 text-3xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-cyan-200 md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.description}
          </p>

          <div className="mb-7 mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <TechChip key={tech} label={tech} />
            ))}
          </div>

          <ProjectActions project={project} />
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal from="up" delay={index * 0.08} className="xl:col-span-3" amount={0.15}>
      <TiltCard className="h-full" max={6}>
        <article className="premium-surface spotlight group relative flex h-full flex-col overflow-hidden transition-colors hover:border-white/20">
          <div
            className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.18]`}
          />

          <div className="relative h-48 overflow-hidden">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover grayscale-[0.5] transition-all duration-[900ms] ease-out group-hover:scale-[1.07] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b16] via-[#080b16]/35 to-transparent" />

            <span className="font-code absolute right-4 top-4 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-white/70 backdrop-blur-xl">
              {String(index + 2).padStart(2, '0')}
            </span>
          </div>

          <div className="relative flex flex-1 flex-col p-5 sm:p-6">
            <p className="meta-label">{project.tagline}</p>
            <h3 className="font-display mt-2.5 text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-cyan-200">
              {project.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mb-6 mt-5 flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
              {project.tech.length > 4 ? (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-semibold text-white/40">
                  +{project.tech.length - 4}
                </span>
              ) : null}
            </div>

            <ProjectActions project={project} compact />
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function ProjectsSection() {
  const { ref, isInView } = useInView();
  const [featured, ...rest] = PROJECTS;

  return (
    <section id="projects" ref={ref} className="portfolio-section py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(168,85,247,0.10),transparent_30%),radial-gradient(circle_at_86%_45%,rgba(34,211,238,0.09),transparent_30%)]" />

      <div className="portfolio-container">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <div className="section-kicker mb-7">
              <Eye className="h-4 w-4 text-blue-400" />
              <span>Portfolio</span>
            </div>

            <h2 className="section-title mb-5 lg:text-7xl">
              <span className="section-title-gradient">Featured Projects</span>
            </h2>
            <p className="section-copy max-w-2xl">
              Products I designed, built and shipped end to end — from database schema through to the last
              pixel of the interface.
            </p>
          </div>

          <a
            href="https://github.com/imanmay2?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="premium-focus group inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition-colors hover:border-cyan-300/35 hover:bg-white/[0.08]"
          >
            <Github className="h-4 w-4" />
            All repositories
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
          <FeaturedProject project={featured} />
          {rest.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
