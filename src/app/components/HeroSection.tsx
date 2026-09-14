import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  Braces,
  Github,
  Linkedin,
  Mail,
  Server,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SplitText } from './shared/SplitText';
import { Magnetic } from './shared/Magnetic';
import { scrollToSection } from './Navbar';
import { useBoot } from './shared/BootContext';

const ROLES = [
  'Full Stack Engineer',
  'Backend Developer',
  'Next.js Developer',
  'API Architect',
  'AI/ML Explorer',
];

const PROFILE_PINS = [
  { label: 'Backend', Icon: Server, className: '-left-7 top-12', delay: 0 },
  { label: 'Frontend', Icon: Braces, className: '-right-7 top-[42%]', delay: 0.2 },
  { label: 'AI/ML', Icon: BrainCircuit, className: '-left-6 bottom-24', delay: 0.4 },
];

const SOCIALS = [
  { Icon: Github, href: 'https://github.com/imanmay2', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/imanmay2/', label: 'LinkedIn' },
  { Icon: Mail, href: 'mailto:imanmay2@gmail.com', label: 'Email' },
];

const HIGHLIGHTS = [
  { value: '10+', label: 'Shipped projects' },
  { value: '36+', label: 'Tools in rotation' },
  { value: '3+', label: 'Years building' },
];

/** Types a role out, holds, deletes, then advances to the next one. */
function useTypedRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < role.length) {
            setText(role.slice(0, text.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((previous) => (previous + 1) % ROLES.length);
        }
      },
      isDeleting ? 42 : 82
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return text;
}

export function HeroSection() {
  const isBooted = useBoot();
  const typedRole = useTypedRole();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Pointer parallax for the portrait cluster.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 90, damping: 20, mass: 0.6 };
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), springConfig);
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), springConfig);
  const shiftX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), springConfig);

  // Scroll parallax: the hero settles back as the next section arrives.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-5 pb-24 pt-28 sm:px-6 md:pt-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_72%_16%,rgba(168,85,247,0.13),transparent_31%),radial-gradient(circle_at_78%_84%,rgba(236,72,153,0.09),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#070913]" />

      <motion.div
        style={shouldReduceMotion ? undefined : { y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-12 md:grid-cols-[minmax(0,1.14fr)_minmax(260px,0.74fr)] xl:gap-16"
      >
        <div className="min-w-0">
          <motion.div
            className="section-kicker mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={isBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            <span>Available for new opportunities</span>
          </motion.div>

          <motion.p
            className="font-code mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-cyan-200/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: isBooted ? 1 : 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Hi, I am
          </motion.p>

          <h1 className="font-display max-w-[900px] text-[clamp(3.1rem,10.5vw,7.8rem)] font-black leading-[0.9] tracking-[-0.03em]">
            <span className="relative block">
              <SplitText
                text="Manmay"
                play={isBooted}
                delay={0.3}
                className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent"
              />
              {/* Specular pass over the finished headline. */}
              <span
                aria-hidden="true"
                className="text-sheen pointer-events-none absolute inset-0 block text-transparent"
              >
                Manmay
              </span>
            </span>
            <SplitText
              text="Chakraborty"
              play={isBooted}
              delay={0.5}
              className="block bg-gradient-to-r from-fuchsia-400 via-purple-300 to-sky-300 bg-clip-text text-transparent"
            />
          </h1>

          <motion.div
            className="font-display mt-8 flex min-h-16 flex-wrap items-center text-2xl font-bold sm:text-3xl md:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            animate={isBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.95, duration: 0.6 }}
          >
            <span className="text-white/45">I build as a&nbsp;</span>
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              {typedRole}
            </span>
            <motion.span
              className="ml-1 text-cyan-300"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.85, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.div>

          <motion.p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300/90 md:text-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={isBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 1.05, duration: 0.6 }}
          >
            I craft fast full-stack products with clean interfaces, dependable APIs, and backend systems that are
            built to scale.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={isBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 1.15, duration: 0.6 }}
          >
            <Magnetic strength={12}>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                data-cursor="view"
                className="premium-focus group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-6 py-3.5 font-bold text-white shadow-2xl shadow-purple-950/40 sm:px-7 sm:py-4"
              >
                {/* Light sweeps across the button on hover. */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">View Projects</span>
                <ArrowUpRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </Magnetic>

            <Magnetic strength={12}>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="premium-focus rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 font-bold text-white backdrop-blur-xl transition-colors hover:border-white/30 hover:bg-white/[0.09] sm:px-7 sm:py-4"
              >
                Contact Me
              </button>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={isBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 1.25, duration: 0.6 }}
          >
            {SOCIALS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={social.label}
                className="premium-focus flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/65 backdrop-blur-xl transition-colors hover:border-cyan-300/40 hover:text-white"
                whileHover={{ y: -5, rotate: 4 }}
                whileTap={{ scale: 0.92 }}
              >
                <social.Icon className="h-5 w-5" />
              </motion.a>
            ))}

            <span className="hidden h-10 w-px bg-white/10 sm:block" />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label}>
                  <p className="font-display text-xl font-black text-white">{item.value}</p>
                  <p className="meta-label mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.95 }}
          animate={isBooted ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 48, scale: 0.95 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          className="group relative mx-auto w-full max-w-[330px] justify-self-center md:mx-0 md:justify-self-end lg:max-w-[390px] xl:max-w-[430px]"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/22 via-purple-500/18 to-pink-500/16 blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            style={
              shouldReduceMotion
                ? undefined
                : { rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }
            }
            className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#101426]">
              <ImageWithFallback
                src="/images/manmay-profile.png"
                alt="Manmay Chakraborty"
                className="h-full w-full object-cover grayscale contrast-110 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent" />
              <div className="absolute inset-0 mix-blend-screen bg-[radial-gradient(circle_at_70%_28%,rgba(34,211,238,0.26),transparent_24%),radial-gradient(circle_at_20%_82%,rgba(236,72,153,0.26),transparent_28%)]" />

              {/* Scanline sweep, slow enough to read as ambience. */}
              <motion.div
                className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-200/10 to-transparent"
                animate={{ y: ['-20%', '420%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
              />
            </div>
          </motion.div>

          {PROFILE_PINS.map((pin) => (
            <motion.div
              key={pin.label}
              className={`absolute hidden items-center gap-3 rounded-xl border border-white/10 bg-black/80 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:flex ${pin.className}`}
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={isBooted ? { opacity: 1, scale: 1, y: [0, -8, 0] } : { opacity: 0, scale: 0.9, y: 16 }}
              style={shouldReduceMotion ? undefined : { x: shiftX }}
              transition={{
                opacity: { duration: 0.45, delay: 0.85 + pin.delay },
                scale: { duration: 0.45, delay: 0.85 + pin.delay },
                y: { duration: 3.4 + pin.delay, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <pin.Icon className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-bold text-white">{pin.label}</span>
            </motion.div>
          ))}

          <motion.div
            className="absolute -right-3 bottom-12 rounded-2xl border border-white/10 bg-black/75 px-5 py-4 shadow-2xl backdrop-blur-xl sm:-right-6 sm:bottom-16"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="font-display text-3xl font-black text-white">10+</p>
            <p className="meta-label mt-1">Projects</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 z-20 hidden justify-center md:flex">
        <motion.button
          type="button"
          onClick={() => scrollToSection('about')}
          className="premium-focus flex flex-col items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/40 transition-colors hover:text-white/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span>Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-cyan-300" />
        </motion.button>
      </div>
    </section>
  );
}
