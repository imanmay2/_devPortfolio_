import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 },
  none: { x: 0, y: 0 },
};

const RESTING = { opacity: 1, x: 0, y: 0, scale: 1 };

type RevealProps = {
  children: ReactNode;
  /** Side the content travels in from. */
  from?: Direction;
  delay?: number;
  duration?: number;
  /** Adds a subtle scale-in on top of the translation. */
  scale?: boolean;
  className?: string;
  /** Portion of the element that must be visible before playing. */
  amount?: number;
};

/**
 * Scroll-triggered entrance used across every section so reveals share one
 * easing curve and one timing language.
 *
 * Under prefers-reduced-motion the element type stays the same and only the
 * animation is dropped - swapping the rendered tag would remount children.
 */
export function Reveal({
  children,
  from = 'up',
  delay = 0,
  duration = 0.7,
  scale = false,
  className,
  amount = 0.2,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = OFFSETS[from];

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? RESTING
          : { opacity: 0, x: offset.x, y: offset.y, scale: scale ? 0.96 : 1 }
      }
      whileInView={RESTING}
      viewport={{ once: true, amount }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
