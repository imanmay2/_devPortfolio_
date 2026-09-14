import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const BOOT_STEPS = ['interface', 'systems', 'projects', 'ready'];

type PreloaderProps = {
  onFinish: () => void;
};

/**
 * A short boot sequence that covers the first paint (fonts, hero image,
 * aurora layer) and hands over with a curtain wipe. Capped well under two
 * seconds so it reads as polish rather than a wait.
 */
export function Preloader({ onFinish }: PreloaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setProgress(100);
      setIsLeaving(true);
      onFinish();
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / duration);
      // Ease-out so the counter sprints early and settles on 100.
      setProgress(Math.round((1 - Math.pow(1 - ratio, 3)) * 100));

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setIsLeaving(true);
        // Let the curtain finish travelling before releasing the page.
        window.setTimeout(onFinish, 620);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onFinish, shouldReduceMotion]);

  const activeStep = Math.min(BOOT_STEPS.length - 1, Math.floor((progress / 100) * BOOT_STEPS.length));

  return (
    <AnimatePresence>
      {!isLeaving ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070913] px-6"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(34,211,238,0.14),transparent_46%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-violet-400 to-pink-400 text-xl font-black text-[#070913]">
              MC
              <motion.span
                className="absolute inset-0 rounded-2xl border border-cyan-200/50"
                animate={{ scale: [1, 1.35], opacity: [0.65, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              />
            </span>

            <p className="font-display mt-7 text-sm font-semibold uppercase tracking-[0.42em] text-white/60">
              Manmay
            </p>

            <div className="mt-7 h-[2px] w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex w-56 items-center justify-between sm:w-72">
              <span className="font-code text-[11px] uppercase tracking-[0.24em] text-white/40">
                {BOOT_STEPS[activeStep]}
              </span>
              <span className="font-code text-[11px] tabular-nums text-white/60">
                {String(progress).padStart(3, '0')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
