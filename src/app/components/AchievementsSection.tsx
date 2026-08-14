import { motion } from 'motion/react';
import { Award, CalendarDays, Medal, Sparkles, Trophy } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useInView } from './hooks/useInView';

const achievements = [
  {
    title: 'Flipkart GRiD 8.0',
    organization: 'Flipkart',
    status: 'Semi-Finalist',
    year: '2026',
    description:
      'Selected as a Semi-Finalist in Flipkart GRiD 8.0, a competitive national-level technology challenge.',
    image: null,
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
    image: null,
    gradient: 'from-amber-300 via-orange-500 to-rose-500',
    Icon: Medal,
  },
];

export function AchievementsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="achievements" ref={ref} className="relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(236,72,153,0.11),transparent_32%),linear-gradient(180deg,transparent,rgba(15,23,42,0.34),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 backdrop-blur-xl">
            <Award className="h-5 w-5 text-amber-300" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Achievements</span>
          </div>

          <h2 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-amber-300 bg-clip-text text-transparent">
              Recognition & Milestones
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            Competitive technology milestones that reflect problem-solving, consistency, and execution under pressure.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({
  achievement,
  index,
  isInView,
}: {
  achievement: (typeof achievements)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 52 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.16 }}
      whileHover={{ y: -8 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.11] to-white/[0.045] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition-colors hover:border-white/25 sm:p-5"
    >
      <div className={`absolute -right-16 -top-20 h-52 w-52 bg-gradient-to-br ${achievement.gradient} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-30`} />
      <div className="grid min-h-full gap-5 md:grid-cols-[minmax(0,0.78fr)_minmax(220px,0.52fr)] md:items-stretch">
        <div className="relative z-10 flex min-w-0 flex-col p-2 sm:p-3">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${achievement.gradient} px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/25`}>
              <Sparkles className="h-4 w-4" />
              {achievement.status}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-semibold text-white/70">
              <CalendarDays className="h-4 w-4 text-cyan-200" />
              {achievement.year}
            </span>
          </div>

          <div className="mt-auto">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
              {achievement.organization}
            </p>
            <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              {achievement.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {achievement.description}
            </p>
          </div>
        </div>

        <div className="relative z-10 min-h-[220px] overflow-hidden rounded-xl border border-white/10 bg-[#080d1d]">
          {achievement.image ? (
            <ImageWithFallback
              src={achievement.image}
              alt={`${achievement.title} achievement visual`}
              className="h-full min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="relative flex h-full min-h-[220px] items-center justify-center overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-24`} />
              <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:28px_28px]" />
              <motion.div
                className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-black/25 shadow-2xl backdrop-blur-xl"
                animate={isInView ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
              >
                <achievement.Icon className="h-12 w-12 text-white" aria-hidden="true" />
              </motion.div>
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
                <p className="truncate text-sm font-semibold text-white">{achievement.status}</p>
                <p className="text-xs text-white/55">{achievement.organization}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
