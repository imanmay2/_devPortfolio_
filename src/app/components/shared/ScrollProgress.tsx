import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

/**
 * A hairline read-out of page progress pinned to the top edge, plus a
 * back-to-top control that fades in once the hero is behind you.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > window.innerHeight * 0.9);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {showTopButton ? (
          <motion.button
            type="button"
            key="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.85 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Back to top"
            className="premium-focus fixed bottom-6 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#0b0f1e]/85 text-white shadow-2xl shadow-black/50 backdrop-blur-xl sm:bottom-8 sm:right-8"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/25 via-violet-500/20 to-fuchsia-500/25 opacity-0 transition-opacity duration-300 hover:opacity-100" />
            <ArrowUp className="relative h-5 w-5" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
