import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

type CountUpProps = {
  /** Numeric target, e.g. 15 for "15+". */
  to: number;
  /** Rendered before the number, e.g. "$". */
  prefix?: string;
  /** Rendered after the number, e.g. "+". */
  suffix?: string;
  durationMs?: number;
  className?: string;
};

// Fast start, long settle - reads as a counter locking onto its value.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts up to `to` the first time it scrolls into view. Driven by
 * requestAnimationFrame rather than a timer so it stays in step with paint.
 */
export function CountUp({ to, prefix = '', suffix = '', durationMs = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(easeOutExpo(progress) * to));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, shouldReduceMotion, to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
