import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Linkedin, Quote, Sparkles, Star } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  linkedin: string;
  content: string;
  accent: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sasank V',
    role: 'Web Development Lead @ CodeChef VIT Chennai Student Chapter',
    avatar: '/images/testimonials/sasank-v.svg',
    linkedin: 'https://www.linkedin.com/in/sasank-v/',
    content:
      'Manmay is a proactive and committed backend developer who consistently delivers high-quality work. He takes ownership of the tasks assigned to him and follows through with dedication. His reliability and problem-solving mindset make him a strong contributor to any team.',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'V Srivatsan',
    role: 'Technical Lead @ E-Cell VIT Chennai',
    avatar: '/images/testimonials/v-srivatsan.svg',
    linkedin: 'https://www.linkedin.com/in/vatsan-v/',
    content:
      'Working with Manmay as the team lead was a fruitful experience. He is adaptable to different kinds of work, and prioritises learning while ensuring deadlines are met. He is a team player, and manages to produce satisfactory deliverables.',
    accent: 'from-emerald-300 to-teal-500',
  },
  {
    name: 'Pranay Gupta',
    role: 'Management Lead @ E-Cell VIT Chennai',
    avatar: '/images/testimonials/pranay-gupta.svg',
    linkedin: 'https://www.linkedin.com/in/pranaygupta202/',
    content:
      'It was a cheerful experience working with Manmay on building PharmaMind. His enthusiasm, strong work ethic, and commitment made it possible to transform our idea into a well-structured and presentable project. His development skills played a key role in bringing everything together.',
    accent: 'from-violet-400 to-fuchsia-500',
  },
  {
    name: 'Soumadeep',
    role: 'Long-time Collaborator',
    avatar: '/images/testimonials/soumadeep-choudhury.svg',
    linkedin: 'https://www.linkedin.com/in/drsoumadeep/',
    content:
      'I have known Manmay for years, and his passion for development is rare. Coding is something he genuinely loves. He thinks deeply, stays curious, keeps improving, and turns collaboration into a space for learning, building, and meaningful growth.',
    accent: 'from-amber-300 to-rose-500',
  },
];

const AUTOPLAY_MS = 6000;

function TestimonialCard({
  testimonial,
  stackIndex,
  isActive,
}: {
  testimonial: Testimonial;
  stackIndex: number;
  isActive: boolean;
}) {
  const offset = stackIndex * 14;
  const rotate = stackIndex === 0 ? 0 : stackIndex % 2 ? -1.8 : 1.8;

  return (
    <motion.article
      animate={{
        x: offset,
        y: offset,
        rotate,
        scale: 1 - stackIndex * 0.03,
        opacity: stackIndex === 0 ? 1 : 0.4,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 top-0 h-[calc(100%-36px)] w-[calc(100%-36px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1122]/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-8"
      style={{ zIndex: TESTIMONIALS.length - stackIndex }}
      aria-hidden={!isActive}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${testimonial.accent}`} />
      <Quote className="absolute right-5 top-5 h-14 w-14 text-white/[0.04] md:right-7 md:top-7 md:h-16 md:w-16" />

      <div
        className={`relative z-10 flex h-full flex-col transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mb-6 flex flex-wrap items-center gap-5 md:mb-7">
          <div className="relative h-20 w-20 shrink-0 md:h-24 md:w-24">
            <div
              className={`absolute -inset-1 rounded-full bg-gradient-to-br ${testimonial.accent} opacity-70 blur-md`}
            />
            <ImageWithFallback
              src={testimonial.avatar}
              alt={testimonial.name}
              className="relative h-full w-full rounded-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-4">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, starIndex) => (
                <motion.span
                  key={starIndex}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: starIndex * 0.06, type: 'spring', stiffness: 320, damping: 18 }}
                >
                  <Star className="h-4 w-4 fill-amber-300 text-amber-300 md:h-5 md:w-5" />
                </motion.span>
              ))}
            </div>

            <a
              href={testimonial.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-focus inline-flex items-center gap-2 rounded-lg border border-[#0a66c2]/50 bg-[#0a66c2] px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#0a66c2]/25 transition-colors hover:bg-[#084f98]"
              aria-label={`Open ${testimonial.name}'s LinkedIn profile`}
              tabIndex={isActive ? 0 : -1}
            >
              <Linkedin className="h-4 w-4 fill-white" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <p className="max-w-4xl text-[1rem] leading-8 text-white/90 md:text-[1.3rem] md:leading-[1.75]">
            &ldquo;{testimonial.content}&rdquo;
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-5">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold leading-tight text-white md:text-2xl">
              {testimonial.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              {testimonial.role}
            </p>
          </div>
          <span
            className={`shrink-0 bg-gradient-to-r ${testimonial.accent} bg-clip-text text-xs font-semibold uppercase tracking-[0.22em] text-transparent md:text-sm`}
          >
            Verified
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  const { ref, isInView } = useInView();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isInView || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isInView, isPaused]);

  return (
    <section id="testimonials" ref={ref} className="relative overflow-hidden px-5 py-28 sm:px-6 md:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(124,58,237,0.06),transparent_38%,rgba(14,165,233,0.05))]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <div className="section-kicker mb-7">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <span>Testimonials</span>
            </div>

            <h2 className="section-title lg:text-7xl">
              <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-fuchsia-400 bg-clip-text text-transparent">
                Feedback in Motion
              </span>
            </h2>
            <p className="section-copy mt-5">
              Real words from people I have built, shipped, and collaborated with.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous testimonial"
              className="premium-focus flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-white/70 backdrop-blur-xl transition-colors hover:border-cyan-300/35 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next testimonial"
              className="premium-focus flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-white/70 backdrop-blur-xl transition-colors hover:border-cyan-300/35 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div
          className="relative mx-auto h-[640px] max-w-5xl overflow-visible sm:h-[560px] md:h-[500px]"
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              stackIndex={(index - activeIndex + TESTIMONIALS.length) % TESTIMONIALS.length}
              isActive={index === activeIndex}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {TESTIMONIALS.map((testimonial, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => goTo(index)}
                className={`premium-focus h-2.5 overflow-hidden rounded-full transition-all duration-300 ${
                  isActive ? 'w-12 bg-white/20' : 'w-2.5 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Show ${testimonial.name}'s testimonial`}
                aria-current={isActive}
              >
                {/* The active pip doubles as the autoplay countdown. */}
                {isActive ? (
                  <motion.span
                    key={`${activeIndex}-${isPaused}`}
                    className="block h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                    initial={{ width: '0%' }}
                    animate={{ width: isPaused ? '100%' : ['0%', '100%'] }}
                    transition={{ duration: isPaused ? 0.3 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
