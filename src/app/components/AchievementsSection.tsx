import { motion } from 'motion/react';
import { Award, CalendarDays, Medal, Sparkles, Trophy, type LucideIcon } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { Reveal } from './shared/Reveal';
import { TiltCard } from './shared/TiltCard';

type Achievement = {
  title: string;
  organization: string;
  status: string;
  year: string;
  description: string;
  gradient: string;
  Icon: LucideIcon;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Flipkart GRiD 8.0',
    organization: 'Flipkart',
    status: 'Semi-Finalist',
    year: '2026',
    description:
      'Selected as a Semi-Finalist in Flipkart GRiD 8.0, a competitive national-level technology challenge.',
    gradient: 'from-cyan-400 via-blue-500 to-violet-500',
    Icon: Trophy,
  },
  {
    title: 'MotorQ',
    organization: 'MotorQ',
    status: 'Top 10 OA',
    year: '2026',
    description:
      "Ranked among the Top 10 candidates in the Online Assessment round of MotorQ's on-campus selection process.",
    gradient: 'from-amber-300 via-orange-500 to-rose-500',
    Icon: Medal,
  },
];

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  return (
    <Reveal from="up" delay={index * 0.12} className="h-full" amount={0.2}>
      <TiltCard className="h-full" max={5}>
        <article className="premium-surface spotlight group relative h-full min-w-0 overflow-hidden p-4 transition-colors hover:border-white/25 sm:p-5">
          <div
            className={`pointer-events-none absolute -right-16 -top-20 h-52 w-52 bg-gradient-to-br ${achievement.gradient} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
          />

          <div className="grid min-h-full gap-5 md:grid-cols-[minmax(0,0.78fr)_minmax(200px,0.52fr)] md:items-stretch">
            <div className="relative z-10 flex min-w-0 flex-col p-2 sm:p-3">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${achievement.gradient} px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/30`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {achievement.status}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3.5 py-2 text-xs font-semibold text-white/65">
                  <CalendarDays className="h-3.5 w-3.5 text-cyan-200" />
                  {achievement.year}
                </span>
              </div>

              <div className="mt-auto">
                <p className="meta-label mb-2">{achievement.organization}</p>
                <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                  {achievement.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {achievement.description}
                </p>
              </div>
            </div>

            <div className="relative z-10 min-h-[210px] overflow-hidden rounded-xl border border-white/10 bg-[#080d1d]">
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-[0.22]`} />
              <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:26px_26px]" />

              {/* Zero-size anchors keep the centring out of any animated
                  transform, so motion is free to own `transform` outright. */}
              <div className="pointer-events-none absolute left-1/2 top-[42%] flex h-0 w-0 items-center justify-center">
                {[0, 1, 2].map((ring) => (
                  <motion.span
                    key={ring}
                    className="absolute h-24 w-24 rounded-full border border-white/25"
                    animate={{ scale: [1, 2.3], opacity: [0.5, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'easeOut', delay: ring * 1.2 }}
                  />
                ))}

                <motion.div
                  className="absolute flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-black/30 shadow-2xl backdrop-blur-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                >
                  <achievement.Icon className="h-11 w-11 text-white" aria-hidden="true" />
                </motion.div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
                <p className="truncate text-sm font-semibold text-white">{achievement.status}</p>
                <p className="text-xs text-white/50">{achievement.organization}</p>
              </div>
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function AchievementsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="achievements" ref={ref} className="portfolio-section py-24 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(34,211,238,0.11),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(236,72,153,0.10),transparent_32%)]" />

      <div className="portfolio-container">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <div className="section-kicker mb-7">
            <Award className="h-4 w-4 text-amber-300" />
            <span>Achievements</span>
          </div>

          <h2 className="section-title lg:text-7xl">
            <span className="section-title-gradient">Recognition &amp; Milestones</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            Competitive technology milestones that reflect problem-solving, consistency, and execution under
            pressure.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {ACHIEVEMENTS.map((achievement, index) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
