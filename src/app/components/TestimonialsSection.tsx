import { motion } from 'motion/react';
import { Quote, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: 'Sasank V',
    role: 'Web Development Lead @ CodeChef VIT Chennai Student Chapter',
    avatar: '/images/manmay-profile.png',
    content:
      'Manmay is a proactive and committed backend developer who consistently delivers high-quality work. He takes ownership of the tasks assigned to him and follows through with dedication. His reliability and problem-solving mindset make him a strong contributor to any team.',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'V Srivatsan',
    role: 'Technical Lead @ E-Cell VIT Chennai',
    avatar: '/images/manmay-profile.png',
    content:
      'Working with Manmay as the team lead was a fruitful experience. He is adaptable to different kinds of work, and prioritises learning while ensuring deadlines are met. He is a team player, and manages to produce satisfactory deliverables.',
    accent: 'from-emerald-300 to-teal-500',
  },
  {
    name: 'Pranay Gupta',
    role: 'Management Lead @ E-Cell VIT Chennai',
    avatar: '/images/manmay-profile.png',
    content:
      'It was a cheerful experience working with Manmay on building PharmaMind. His enthusiasm, strong work ethic, and commitment made it possible to transform our idea into a well-structured and presentable project. His development skills played a key role in bringing everything together.',
    accent: 'from-violet-400 to-fuchsia-500',
  },
];

function TestimonialCard({
  testimonial,
  stackIndex,
  isActive,
}: {
  testimonial: (typeof testimonials)[number];
  stackIndex: number;
  isActive: boolean;
}) {
  const offset = stackIndex * 14;
  const rotate = stackIndex === 0 ? 0 : stackIndex % 2 ? -1.8 : 1.8;

  return (
    <motion.article
      layout
      animate={{
        x: offset,
        y: offset,
        rotate,
        scale: 1 - stackIndex * 0.03,
        opacity: stackIndex === 0 ? 1 : 0.55,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 top-0 h-[calc(100%-36px)] w-[calc(100%-36px)] overflow-hidden border border-white/10 bg-[#0f1324]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-8"
      style={{ zIndex: testimonials.length - stackIndex }}
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
            <div className={`absolute -inset-1 bg-gradient-to-br ${testimonial.accent} opacity-70 blur-md`} />
            <ImageWithFallback
              src={testimonial.avatar}
              alt={testimonial.name}
              className="relative h-full w-full object-cover grayscale"
            />
          </div>

          <div className="flex gap-1.5">
            {[...Array(5)].map((_, starIndex) => (
              <motion.span
                key={starIndex}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: starIndex * 0.06, type: 'spring', stiffness: 320, damping: 18 }}
              >
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300 md:h-5 md:w-5" />
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <p className="max-w-4xl text-[1rem] leading-8 text-white md:text-[1.35rem] md:leading-[1.75]">
            &ldquo;{testimonial.content}&rdquo;
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-5">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-tight text-white md:text-2xl">{testimonial.name}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{testimonial.role}</p>
          </div>
          <span className={`shrink-0 bg-gradient-to-r ${testimonial.accent} bg-clip-text text-xs font-semibold uppercase tracking-[0.22em] text-transparent md:text-sm`}>
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

  useEffect(() => {
    if (!isInView) return;

    const shuffleTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(shuffleTimer);
  }, [isInView]);

  return (
    <section id="testimonials" ref={ref} className="relative overflow-hidden px-6 py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(124,58,237,0.06),transparent_38%,rgba(14,165,233,0.05))]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="mb-7 inline-flex items-center gap-3 border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Testimonials</span>
          </div>

          <h2 className="text-5xl font-bold md:text-7xl">
            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-fuchsia-400 bg-clip-text text-transparent">
              Feedback in Motion
            </span>
          </h2>
          <p className="mt-5 text-xl text-muted-foreground">
            Real words from people I have built, shipped, and collaborated with.
          </p>
        </motion.div>

        <div className="relative mx-auto h-[620px] max-w-5xl overflow-visible md:h-[500px]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              stackIndex={(index - activeIndex + testimonials.length) % testimonials.length}
              isActive={index === activeIndex}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-10 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Show ${testimonial.name}'s testimonial`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
