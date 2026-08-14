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
  { label: 'Achievements', id: 'achievements' },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = [...navItems].reverse().find((item) => {
        const element = document.getElementById(item.id);
        if (!element) return false;
        return element.getBoundingClientRect().top <= 140;
      });

      setActiveSection(currentSection?.id ?? 'hero');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-5 pb-24 pt-5 sm:px-6 md:pt-7">
      <div className="absolute inset-0 bg-[#070913]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(56,189,248,0.15),transparent_29%),radial-gradient(circle_at_70%_18%,rgba(168,85,247,0.13),transparent_30%),radial-gradient(circle_at_78%_84%,rgba(236,72,153,0.09),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#090a12]" />

      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="sticky top-4 z-30 mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#070913]/72 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl md:px-5"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="premium-focus flex items-center gap-3 rounded-xl"
          aria-label="Go to hero"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 via-violet-400 to-pink-400 text-base font-black text-[#070913] shadow-lg shadow-cyan-950/25">
            MC
          </span>
          <span className="hidden text-base font-semibold tracking-tight text-white sm:block">
            Manmay Chakraborty
          </span>
        </button>

        <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`premium-focus rounded-lg text-[11px] font-bold uppercase tracking-[0.22em] transition-colors ${
                activeSection === item.id ? 'text-cyan-200' : 'text-white/50 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="premium-focus flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-[calc(100%+0.75rem)] rounded-2xl border border-white/10 bg-[#090d19]/96 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`premium-focus flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    activeSection === item.id ? 'bg-cyan-300/10 text-cyan-100' : 'text-white/70 hover:bg-white/[0.055] hover:text-white'
                  }`}
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-45" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </motion.nav>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-112px)] max-w-7xl items-center gap-12 pt-14 md:grid-cols-[minmax(0,1.14fr)_minmax(260px,0.72fr)] xl:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -55 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="min-w-0"
        >
          <motion.div
            className="section-kicker mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span>Available for new opportunities</span>
          </motion.div>

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.36em] text-cyan-200/70">
            Hi, I am
          </p>

          <h1 className="max-w-[900px] text-[clamp(3.35rem,11vw,8.15rem)] font-black leading-[0.92] tracking-tight">
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
              Manmay
            </span>
            <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-300 to-sky-300 bg-clip-text text-transparent">
              Chakraborty
            </span>
          </h1>

          <div className="mt-8 flex min-h-16 flex-wrap items-center text-2xl font-bold sm:text-3xl md:text-5xl">
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

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-2xl">
            I craft fast full-stack products with clean interfaces, dependable APIs, and backend systems that are built
            to scale.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="premium-focus group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-6 py-3.5 font-bold text-white shadow-2xl shadow-purple-950/40 sm:px-7 sm:py-4"
            >
              View Projects
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="premium-focus rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 font-bold text-white backdrop-blur-xl transition-colors hover:bg-white/[0.08] sm:px-7 sm:py-4"
            >
              Contact Me
            </motion.button>
          </div>

          <div className="mt-10 flex gap-4">
            {[
              { icon: Github, href: 'https://github.com/imanmay2' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/imanmay2/' },
              { icon: Mail, href: 'mailto:imanmay2@gmail.com' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.href.includes('github') ? 'Open GitHub profile' : social.href.includes('linkedin') ? 'Open LinkedIn profile' : 'Send email'}
                className="premium-focus flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/70 backdrop-blur-xl transition-colors hover:border-white/20 hover:text-white"
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
          className="group relative mx-auto w-full max-w-[330px] justify-self-center md:mx-0 md:justify-self-end lg:max-w-[390px] xl:max-w-[430px]"
        >
          <motion.div
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-purple-500/18 to-pink-500/16 blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-transform duration-500 ease-out group-hover:scale-[1.025] sm:p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#101426]">
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
              className={`absolute hidden items-center gap-3 rounded-xl border border-white/10 bg-black/80 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:flex ${pin.className}`}
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
            className="absolute -right-3 bottom-12 rounded-2xl border border-white/10 bg-black/75 px-5 py-4 shadow-2xl backdrop-blur-xl sm:-right-6 sm:bottom-16"
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
