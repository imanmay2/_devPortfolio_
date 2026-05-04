import { motion, useScroll, useTransform } from 'motion/react';
import { Quote, Sparkles, Star } from 'lucide-react';
import { useRef } from 'react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at Tech Innovations',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    content:
      'Manmay is an exceptional developer who consistently delivers high-quality work. His expertise in backend development and Next.js has been invaluable to our team.',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager at Digital Solutions',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    content:
      'Working with Manmay has been a pleasure. He has a deep understanding of full-stack development and always finds elegant solutions to complex problems.',
    accent: 'from-emerald-300 to-teal-500',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Engineering Lead at Startup Hub',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    content:
      "Manmay's ability to architect scalable backend systems is outstanding. He's a true professional who brings both technical expertise and leadership to the team.",
    accent: 'from-violet-400 to-fuchsia-500',
  },
  {
    name: 'David Kim',
    role: 'Founder at Code Academy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    content:
      'An incredible talent with a passion for clean code and best practices. Manmay has been instrumental in building our platform from the ground up.',
    accent: 'from-rose-400 to-orange-500',
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -42]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 ? -2.5 : 2.5, 0, index % 2 ? 1.5 : -1.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.98]);

  return (
    <motion.article
      ref={cardRef}
      style={{ y, rotate, scale, top: `${88 + index * 18}px` }}
      initial={{ opacity: 0, x: index % 2 ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="sticky mb-10 border border-white/10 bg-[#0f1324]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-9"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${testimonial.accent}`} />
      <Quote className="absolute right-6 top-7 h-16 w-16 text-white/[0.04]" />

      <div className="relative z-10 grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
        <div className="relative h-24 w-24">
          <div className={`absolute -inset-1 bg-gradient-to-br ${testimonial.accent} opacity-70 blur-md`} />
          <ImageWithFallback
            src={testimonial.avatar}
            alt={testimonial.name}
            className="relative h-24 w-24 object-cover grayscale"
          />
        </div>

        <div>
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, starIndex) => (
              <motion.span
                key={starIndex}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: starIndex * 0.06, type: 'spring', stiffness: 320, damping: 18 }}
              >
                <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
              </motion.span>
            ))}
          </div>

          <p className="max-w-3xl text-xl leading-relaxed text-white md:text-2xl">
            "{testimonial.content}"
          </p>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-5 border-t border-white/10 pt-5">
            <div>
              <h3 className="text-2xl font-semibold text-white">{testimonial.name}</h3>
              <p className="text-muted-foreground">{testimonial.role}</p>
            </div>
            <span className={`bg-gradient-to-r ${testimonial.accent} bg-clip-text text-sm font-semibold uppercase tracking-[0.3em] text-transparent`}>
              Verified
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="testimonials" ref={ref} className="relative overflow-visible px-6 py-36">
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
            Scroll through layered cards that settle into place as each recommendation enters the viewport.
          </p>
        </motion.div>

        <div className="pb-24">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
