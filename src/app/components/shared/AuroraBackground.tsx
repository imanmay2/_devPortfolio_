import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

type Blob = {
  className: string;
  duration: string;
  delay: string;
  /** How strongly this blob drifts against page scroll. */
  parallax: number;
};

const BLOBS: Blob[] = [
  {
    className: 'left-[-12%] top-[-14%] h-[46rem] w-[46rem] bg-cyan-500/[0.13]',
    duration: '30s',
    delay: '0s',
    parallax: -140,
  },
  {
    className: 'right-[-14%] top-[6%] h-[42rem] w-[42rem] bg-violet-600/[0.14]',
    duration: '26s',
    delay: '-6s',
    parallax: 110,
  },
  {
    className: 'left-[24%] bottom-[-16%] h-[40rem] w-[40rem] bg-fuchsia-600/[0.10]',
    duration: '34s',
    delay: '-12s',
    parallax: -80,
  },
];

/**
 * The page-wide ambient field: three drifting aurora blobs, a perspective
 * grid, and film grain. Fixed behind the content so scrolling reads as one
 * continuous space rather than a stack of separately-lit sections.
 */
export function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.6 });

  const blobOne = useTransform(progress, [0, 1], [0, BLOBS[0].parallax]);
  const blobTwo = useTransform(progress, [0, 1], [0, BLOBS[1].parallax]);
  const blobThree = useTransform(progress, [0, 1], [0, BLOBS[2].parallax]);
  const drifts = [blobOne, blobTwo, blobThree];

  // Grid recedes slightly as you travel down the page.
  const gridOpacity = useTransform(progress, [0, 0.5, 1], [0.05, 0.028, 0.05]);

  return (
    <div className="app-backdrop" aria-hidden="true">
      <div className="absolute inset-0 bg-[#070913]" />

      {BLOBS.map((blob, index) => (
        <motion.div
          key={blob.className}
          className={`aurora-blob ${blob.className}`}
          style={
            shouldReduceMotion
              ? undefined
              : ({
                  y: drifts[index],
                  '--aurora-duration': blob.duration,
                  '--aurora-delay': blob.delay,
                } as React.CSSProperties)
          }
        />
      ))}

      <motion.div
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.85)_1px,transparent_1px)] [background-size:84px_84px]"
        style={{ opacity: gridOpacity }}
      />

      {/* Vignette keeps focus centred and hides the grid at the edges. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(7,9,19,0.88)_100%)]" />

      <div className="grain-overlay" />
    </div>
  );
}
