import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation on each axis, in degrees. */
  max?: number;
  /** Also writes --mx/--my so a `.spotlight` child can track the pointer. */
  spotlight?: boolean;
};

/**
 * Perspective tilt that follows the pointer across the card surface.
 * Rotation is driven by springs so the card settles instead of snapping.
 */
export function TiltCard({ children, className, max = 7, spotlight = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // -0.5 .. 0.5 relative to the card centre.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [max, -max]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-max, max]), springConfig);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const ratioX = (event.clientX - bounds.left) / bounds.width;
    const ratioY = (event.clientY - bounds.top) / bounds.height;

    pointerX.set(ratioX - 0.5);
    pointerY.set(ratioY - 0.5);

    if (spotlight) {
      ref.current.style.setProperty('--mx', `${ratioX * 100}%`);
      ref.current.style.setProperty('--my', `${ratioY * 100}%`);
    }
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Keep the same element either way; swapping tags would remount children.
  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={
        shouldReduceMotion
          ? undefined
          : { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }
      }
    >
      {children}
    </motion.div>
  );
}
