import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor]';
const TEXT_FIELD_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

/**
 * Two-part pointer: a dot that tracks exactly and a ring that trails behind
 * on a spring. Position is written to motion values rather than React state,
 * so pointer movement never triggers a re-render.
 *
 * Only mounts on devices that have a real cursor to begin with.
 */
export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHoveringTarget, setIsHoveringTarget] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverTextField, setIsOverTextField] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // The dot is nearly rigid; the ring is deliberately looser so it swings.
  const dotX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.7 });

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setIsEnabled(query.matches);

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    document.documentElement.classList.add('has-custom-cursor');

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);

      const element = event.target as HTMLElement | null;
      // Over a text field the native caret takes over, so stand down entirely.
      const isTextField = Boolean(element?.closest(TEXT_FIELD_SELECTOR));
      setIsOverTextField(isTextField);

      const target = isTextField ? null : element?.closest<HTMLElement>(INTERACTIVE_SELECTOR);
      setIsHoveringTarget(Boolean(target));
      setLabel(target?.dataset.cursor ?? null);
    };

    const handleLeave = () => setIsVisible(false);
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    document.addEventListener('pointerleave', handleLeave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      document.removeEventListener('pointerleave', handleLeave);
    };
  }, [isEnabled, x, y]);

  if (!isEnabled) return null;

  const ringSize = label ? 76 : isHoveringTarget ? 46 : 30;
  const isShown = isVisible && !isOverTextField;

  return (
    <>
      {/* Zero-size flex anchors: the wrapper owns the transform that motion
          writes, and its flex centring keeps the visual dead on the pointer. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] flex h-0 w-0 items-center justify-center"
        style={{ x: dotX, y: dotY }}
      >
        <motion.span
          className="block rounded-full bg-cyan-200"
          animate={{
            width: isPressed ? 4 : 6,
            height: isPressed ? 4 : 6,
            opacity: isShown && !label ? 1 : 0,
          }}
          transition={{ duration: 0.18 }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] flex h-0 w-0 items-center justify-center"
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          className="flex items-center justify-center rounded-full border border-cyan-200/60 backdrop-blur-[1px]"
          animate={{
            width: isPressed ? ringSize * 0.84 : ringSize,
            height: isPressed ? ringSize * 0.84 : ringSize,
            opacity: isShown ? (isHoveringTarget ? 1 : 0.55) : 0,
            backgroundColor: label
              ? 'rgba(34,211,238,0.92)'
              : isHoveringTarget
                ? 'rgba(34,211,238,0.12)'
                : 'rgba(34,211,238,0)',
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.5 }}
        >
          {label ? (
            <span className="font-code text-[9px] font-bold uppercase tracking-[0.14em] text-[#06121a]">{label}</span>
          ) : null}
        </motion.span>
      </motion.div>
    </>
  );
}
