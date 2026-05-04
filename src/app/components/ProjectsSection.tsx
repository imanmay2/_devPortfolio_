import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useState } from 'react';
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
    liveUrl: '#',
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
    <section id="projects" ref={ref} className="py-40 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/20 rounded-full mb-8"
            animate={isInView ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Eye className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold">PORTFOLIO</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl lg:text-8xl mb-6 font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Some of my <span className="text-purple-400 font-semibold">recent work</span> and{' '}
            <span className="text-blue-400 font-semibold">achievements</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovering(false);
  };
  const hasLiveDemo = project.liveUrl !== '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.2s ease-out',
      }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
      />

      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative overflow-hidden h-56">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Floating tag */}
          <motion.div
            className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${project.gradient} rounded-full text-sm font-semibold text-white shadow-lg`}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Featured
          </motion.div>

          {/* Quick view buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.liveUrl}
              aria-disabled={!hasLiveDemo}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl ${hasLiveDemo ? '' : 'pointer-events-none opacity-45'}`}
            >
              <ExternalLink className="w-6 h-6 text-black" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl"
            >
              <Github className="w-6 h-6 text-black" />
            </motion.a>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-semibold backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.a
              href={project.liveUrl}
              aria-disabled={!hasLiveDemo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-xl font-semibold shadow-lg transition-shadow ${
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
