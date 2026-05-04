import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  Braces,
  Github,
  Linkedin,
  Mail,
  Menu,
  Server,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ImageWithFallback } from './figma/ImageWithFallback';

const roles = [
  'Full Stack Engineer',
  'Backend Developer',
  'Next.js Developer',
  'API Architect',
  'AI/ML Explorer',
];

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Profiles', id: 'profiles' },
  { label: 'Contact', id: 'contact' },
];

const profilePins = [
  { label: 'Backend', Icon: Server, className: '-left-7 top-12', delay: 0 },
  { label: 'Frontend', Icon: Braces, className: '-right-7 top-[42%]', delay: 0.2 },
  { label: 'AI/ML', Icon: BrainCircuit, className: '-left-6 bottom-24', delay: 0.4 },
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentRole.length) {
            setDisplayedText(currentRole.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      },
      isDeleting ? 42 : 82
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-24 pt-8">
      <div className="absolute inset-0 bg-[#070913]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_68%_20%,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_74%_82%,rgba(236,72,153,0.16),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:72px_72px]" />

      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-30 mx-auto flex max-w-7xl items-center justify-between border border-white/10 bg-black/35 px-5 py-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:px-7"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3"
          aria-label="Go to hero"
        >
          <span className="flex h-11 w-11 items-center justify-center bg-gradient-to-br from-cyan-300 via-violet-400 to-pink-400 text-lg font-black text-[#070913]">
            MC
          </span>
          <span className="hidden text-lg font-semibold tracking-tight text-white sm:block">
            Manmay Chakraborty
          </span>
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-bold uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.04] text-white lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-130px)] max-w-7xl items-center gap-12 pt-14 md:grid-cols-[minmax(0,1.22fr)_minmax(260px,0.68fr)] xl:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -55 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="min-w-0"
        >
          <motion.div
            className="mb-8 inline-flex items-center gap-3 border border-white/10 bg-white/[0.05] px-5 py-3 shadow-xl shadow-black/20 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-semibold text-white/80">Available for new opportunities</span>
          </motion.div>

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.36em] text-cyan-200/70">
            Hi, I am
          </p>

          <h1 className="max-w-[860px] text-6xl font-black leading-[0.92] tracking-tight md:text-7xl lg:text-[7.15rem] xl:text-[8.2rem]">
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
              Manmay
            </span>
            <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-300 to-sky-300 bg-clip-text text-transparent">
              Chakraborty
            </span>
          </h1>

          <div className="mt-8 flex min-h-16 items-center text-3xl font-bold md:text-5xl">
            <span className="text-white/48">I build as a&nbsp;</span>
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <motion.span
              className="ml-1 text-cyan-300"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.85, repeat: Infinity }}
            >
              |
            </motion.span>
          </div>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-300 md:text-2xl">
            I craft fast full-stack products with clean interfaces, dependable APIs, and backend systems that are built
            to scale.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-7 py-4 font-bold text-white shadow-2xl shadow-purple-950/40"
            >
              View Projects
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="border border-white/15 bg-white/[0.04] px-7 py-4 font-bold text-white backdrop-blur-xl transition-colors hover:bg-white/[0.08]"
            >
              Contact Me
            </motion.button>
          </div>

          <div className="mt-10 flex gap-4">
            {[
              { icon: Github, href: 'https://github.com' },
              { icon: Linkedin, href: 'https://linkedin.com' },
              { icon: Mail, href: 'mailto:manmay@example.com' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.05] text-white/70 backdrop-blur-xl transition-colors hover:text-white"
                whileHover={{ y: -5, rotate: 4 }}
                whileTap={{ scale: 0.92 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 55, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="group relative mx-auto w-full max-w-[340px] justify-self-center md:mx-0 md:justify-self-end lg:max-w-[390px] xl:max-w-[440px]"
        >
          <motion.div
            className="absolute -inset-6 bg-gradient-to-br from-cyan-400/25 via-purple-500/25 to-pink-500/25 blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-transform duration-500 ease-out group-hover:scale-[1.035]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#101426]">
              <ImageWithFallback
                src="/images/manmay-profile.png"
                alt="Manmay Chakraborty"
                className="h-full w-full object-cover grayscale contrast-110 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent" />
              <div className="absolute inset-0 mix-blend-screen bg-[radial-gradient(circle_at_70%_28%,rgba(34,211,238,0.28),transparent_24%),radial-gradient(circle_at_20%_82%,rgba(236,72,153,0.28),transparent_28%)]" />
            </div>
          </div>

          {profilePins.map((pin) => (
            <motion.div
              key={pin.label}
              className={`absolute hidden items-center gap-3 border border-white/10 bg-black/80 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:flex ${pin.className}`}
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.45, delay: 0.65 + pin.delay },
                scale: { duration: 0.45, delay: 0.65 + pin.delay },
                y: { duration: 3.4 + pin.delay, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <pin.Icon className="h-5 w-5 text-cyan-300" />
              <span className="font-bold text-white">{pin.label}</span>
            </motion.div>
          ))}

          <motion.div
            className="absolute -right-6 bottom-16 border border-white/10 bg-black/75 px-5 py-4 shadow-2xl backdrop-blur-xl"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-3xl font-black text-white">10+</p>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Projects</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-sm text-white/45 md:flex"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span>Scroll to explore</span>
        <ArrowDown className="h-5 w-5 text-cyan-300" />
      </motion.button>
    </section>
  );
}
