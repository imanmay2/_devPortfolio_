import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Awards', id: 'achievements' },
  { label: 'Profiles', id: 'profiles' },
];

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Persistent floating navigation. Sits above every section, tracks the
 * section currently under the fold line, and retracts while you scroll down
 * so it never covers content you are reading.
 */
export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isCondensed, setIsCondensed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsCondensed(currentY > 24);
      // Only retract once clear of the hero, and never while the menu is open.
      setIsHidden(currentY > 420 && currentY > lastScrollY.current && !isMenuOpen);
      lastScrollY.current = currentY;

      const current = [...NAV_ITEMS]
        .reverse()
        .find((item) => {
          const element = document.getElementById(item.id);
          return element ? element.getBoundingClientRect().top <= 160 : false;
        });

      setActiveSection(current?.id ?? 'hero');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const go = (id: string) => {
    setIsMenuOpen(false);
    // Let the sheet close before the scroll starts, or the animation stutters.
    window.setTimeout(() => scrollToSection(id), 120);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isHidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            isCondensed
              ? 'border-white/10 bg-[#070913]/80 shadow-2xl shadow-black/50 backdrop-blur-2xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="premium-focus flex items-center gap-3 rounded-xl"
            aria-label="Back to top"
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-300 via-violet-400 to-pink-400 text-sm font-black text-[#070913]">
              MC
            </span>
            <span className="font-display hidden text-sm font-semibold tracking-tight text-white sm:block">
              Manmay Chakraborty
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`premium-focus relative rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                    isActive ? 'text-white' : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg border border-cyan-300/25 bg-cyan-300/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => scrollToSection('contact')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="premium-focus group hidden items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-violet-950/40 sm:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="premium-focus flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white backdrop-blur-xl lg:hidden"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex flex-col bg-[#070913]/96 px-6 pb-10 pt-6 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold tracking-tight text-white">Navigate</span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="premium-focus flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10 flex flex-1 flex-col justify-center gap-1">
              {[...NAV_ITEMS, { label: 'Contact', id: 'contact' }].map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="premium-focus flex items-center justify-between border-b border-white/[0.07] py-4 text-left"
                >
                  <span className="font-display text-3xl font-bold text-white">{item.label}</span>
                  <span className="font-code text-xs text-white/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
