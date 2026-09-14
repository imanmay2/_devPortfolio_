import { motion, useReducedMotion } from 'motion/react';

type SplitTextProps = {
  text: string;
  className?: string;
  /** Seconds before the first character starts. */
  delay?: number;
  /** Seconds between consecutive characters. */
  stagger?: number;
  /** Hold at the initial state until this flips true. */
  play?: boolean;
};

/**
 * Reveals a headline character by character, each one rising and unblurring
 * into place. Words stay unbroken so the line still wraps naturally.
 */
export function SplitText({ text, className, delay = 0, stagger = 0.03, play = true }: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');
  let characterIndex = -1;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap" aria-hidden="true">
          {Array.from(word).map((character, index) => {
            characterIndex += 1;

            return (
              <motion.span
                key={`${character}-${index}`}
                className="inline-block"
                initial={{ opacity: 0, y: '0.42em', filter: 'blur(8px)' }}
                animate={
                  play
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: '0.42em', filter: 'blur(8px)' }
                }
                transition={{
                  duration: 0.6,
                  delay: delay + characterIndex * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {character}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
