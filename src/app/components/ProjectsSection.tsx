import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'NexCare',
    description: 'A full-stack telemedicine platform connecting patients, doctors, and pharmacies for digital consultations, prescription management, and medicine delivery.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=650&fit=crop',
    tech: ['React', 'GoLang', 'Gin', 'PostgreSQL', 'Redis', 'WebSockets', 'Supabase'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imanmay2/NexCare',
    gradient: 'from-cyan-600 to-emerald-600',
  },
  {
    title: 'Wanderlust',
    description: 'A full-stack accommodation booking platform inspired by modern travel apps, built for exploring, listing, and booking properties with a responsive experience.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=650&fit=crop',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Mapbox API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imanmay2/wander_lust',
    gradient: 'from-blue-600 to-sky-600',
  },
  {
    title: 'QNeX',
    description: 'A dynamic quiz platform where users can create, share, and attempt MCQ-based tests through unique access IDs with real-time evaluation.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=650&fit=crop',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Cohere.ai API'],
    liveUrl: 'https://qnexv1.netlify.app',
    githubUrl: 'https://github.com/imanmay2/QNeX',
    gradient: 'from-violet-600 to-fuchsia-600',
  },
  {
    title: 'PharmaMind',
    description: 'A research-driven drug discovery platform that helps scientists analyze existing drug data, understand usage patterns, and accelerate pharmaceutical research.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&h=650&fit=crop',
    tech: ['React', 'Node.js', 'Express.js', 'Authentication'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imanmay2/PharmaMind',
    gradient: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'TwitInBook',
    description: 'A full-stack social networking platform inspired by Twitter and Facebook, supporting posts, likes, comments, and connected real-time interactions.',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=900&h=650&fit=crop',
    tech: ['HTML', 'CSS', 'JavaScript', 'Express.js', 'MySQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imanmay2/TwitInBook',
    gradient: 'from-orange-600 to-rose-600',
  },
];

export function ProjectsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="projects" ref={ref} className="portfolio-section py-28 md:py-36">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(168,85,247,0.10),transparent_30%),radial-gradient(circle_at_86%_45%,rgba(34,211,238,0.09),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent,rgba(59,130,246,0.04))]" />
      
      <div className="portfolio-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-3xl"
        >
          <div className="section-kicker mb-7">
            <Eye className="w-5 h-5 text-blue-400" />
            <span>Portfolio</span>
          </div>
          
          <h2 className="section-title mb-5 lg:text-7xl">
            <span className="section-title-gradient">
              Featured Projects
            </span>
          </h2>
          <p className="section-copy max-w-2xl">
            Some of my <span className="text-purple-400 font-semibold">recent work</span> and{' '}
            <span className="text-blue-400 font-semibold">achievements</span>
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isInView={isInView} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
  featured,
}: {
  project: typeof projects[0];
  index: number;
  isInView: boolean;
  featured: boolean;
}) {
  const hasLiveDemo = project.liveUrl !== '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 54 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`group relative min-w-0 ${featured ? 'md:col-span-2 xl:col-span-4' : 'xl:col-span-2'}`}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${project.gradient} blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-25`}
      />

      <article className={`premium-surface relative h-full overflow-hidden transition-colors group-hover:border-white/20 ${featured ? 'grid lg:grid-cols-[1.05fr_0.95fr]' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'min-h-[280px] lg:min-h-full' : 'h-52'}`}>
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Floating tag */}
          <div className={`absolute right-4 top-4 rounded-full bg-gradient-to-r ${project.gradient} px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg`}>
            {featured ? 'Featured' : 'Project'}
          </div>

          {/* Quick view buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.a
              href={project.liveUrl}
              aria-disabled={!hasLiveDemo}
              aria-label={`Open live demo for ${project.title}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`premium-focus rounded-full bg-white/90 p-4 shadow-xl backdrop-blur-sm ${hasLiveDemo ? '' : 'pointer-events-none opacity-45'}`}
            >
              <ExternalLink className="w-6 h-6 text-black" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="premium-focus rounded-full bg-white/90 p-4 shadow-xl backdrop-blur-sm"
            >
              <Github className="w-6 h-6 text-black" />
            </motion.a>
          </div>
        </div>

        <div className={`flex flex-col p-5 sm:p-6 ${featured ? 'lg:p-8' : ''}`}>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200/60">
            Engineering Work
          </p>
          <h3 className={`${featured ? 'text-3xl md:text-4xl' : 'text-2xl'} mb-3 font-bold leading-tight transition-all group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent`}>
            {project.title}
          </h3>
          <p className={`mb-6 text-sm leading-relaxed text-muted-foreground ${featured ? 'md:text-base' : 'line-clamp-3'}`}>
            {project.description}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ y: -2 }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/75 backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <motion.a
              href={project.liveUrl}
              aria-disabled={!hasLiveDemo}
              aria-label={`Open live demo for ${project.title}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`premium-focus inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${project.gradient} px-4 py-3 font-semibold text-white shadow-lg transition-shadow ${
                hasLiveDemo ? 'hover:shadow-xl' : 'pointer-events-none opacity-50'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="premium-focus rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
