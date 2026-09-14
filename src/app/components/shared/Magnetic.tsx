import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to chase the pointer, in pixels. */
  strength?: number;
};

/**
 * Pulls its child toward the pointer while hovered, then springs home.
 * Used on primary calls-to-action so they feel physically attracted to the
 * cursor without any layout cost.
 */
export function Magnetic({ children, className, strength = 16 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    // Normalise against half the element size so the pull maxes out at the edge.
    x.set((offsetX / (bounds.width / 2)) * strength);
    y.set((offsetY / (bounds.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.div>
  );
}
