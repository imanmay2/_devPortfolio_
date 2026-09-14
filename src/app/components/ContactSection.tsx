import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Clock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
} from 'lucide-react';
import { useInView } from './hooks/useInView';
import { Magnetic } from './shared/Magnetic';
import { Reveal } from './shared/Reveal';

const CONTACT_INFO = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'imanmay2@gmail.com',
    color: 'from-blue-500 to-cyan-500',
    link: 'mailto:imanmay2@gmail.com',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+91 8597927166',
    color: 'from-purple-500 to-pink-500',
    link: 'tel:+918597927166',
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: 'India · Open to relocate',
    color: 'from-orange-500 to-red-500',
    link: null,
  },
];

const SOCIALS = [
  { Icon: Github, href: 'https://github.com/imanmay2', color: 'from-slate-600 to-slate-900', label: 'GitHub' },
  {
    Icon: Linkedin,
    href: 'https://www.linkedin.com/in/imanmay2/',
    color: 'from-blue-600 to-blue-800',
    label: 'LinkedIn',
  },
  { Icon: Twitter, href: 'https://x.com/imanmay2', color: 'from-sky-500 to-blue-600', label: 'Twitter' },
];

const ASSURANCES = [
  { Icon: Clock, text: 'Usually replies within 24 hours' },
  { Icon: CheckCircle2, text: 'Open to internships, full-time and freelance' },
];

const FIELD_CLASS =
  'premium-focus peer w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white backdrop-blur-sm transition-all duration-300 placeholder:text-white/25 hover:border-white/20 focus:border-cyan-300/60 focus:bg-white/[0.07]';

export function ContactSection() {
  const { ref, isInView } = useInView();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section id="contact" ref={ref} className="portfolio-section py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_82%_66%,rgba(168,85,247,0.11),transparent_34%),linear-gradient(180deg,transparent,rgba(7,9,19,0.86))]" />

      <div className="portfolio-container">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >
          <div className="section-kicker mb-8">
            <MessageCircle className="h-4 w-4 text-blue-400" />
            <span>Get In Touch</span>
          </div>

          <h2 className="section-title mb-6 lg:text-7xl">
            <span className="section-title-gradient">Let&apos;s Work Together</span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl md:text-xl">
            Hiring, building, or just want to compare notes on backend architecture — my inbox is open.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="space-y-4 lg:col-span-2">
            {CONTACT_INFO.map((info, index) => {
              const content = (
                <>
                  <span
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                  />
                  <span
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${info.color} shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <info.Icon className="h-5 w-5 text-white" />
                  </span>
                  <span className="relative z-10 min-w-0">
                    <span className="meta-label block">{info.label}</span>
                    <span className="mt-1 block break-words font-semibold text-white">{info.value}</span>
                  </span>
                </>
              );

              const className =
                'premium-surface group relative flex min-w-0 items-center gap-4 overflow-hidden p-4 transition-colors hover:border-white/20 sm:p-5';

              return (
                <Reveal key={info.label} from="right" delay={index * 0.08}>
                  {info.link ? (
                    <a href={info.link} className={`premium-focus ${className}`}>
                      {content}
                    </a>
                  ) : (
                    <div className={className}>{content}</div>
                  )}
                </Reveal>
              );
            })}

            <Reveal from="right" delay={0.28}>
              <div className="premium-surface bg-gradient-to-br from-blue-500/[0.08] to-purple-500/[0.08] p-6 sm:p-7">
                <h3 className="font-display text-xl font-bold text-white">Find me online</h3>

                <div className="mb-6 mt-4 flex gap-3">
                  {SOCIALS.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${social.label}`}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.92 }}
                      className={`premium-focus flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${social.color} shadow-lg shadow-black/30`}
                    >
                      <social.Icon className="h-5 w-5 text-white" />
                    </motion.a>
                  ))}
                </div>

                <ul className="space-y-2.5">
                  {ASSURANCES.map((item) => (
                    <li key={item.text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <item.Icon className="h-4 w-4 shrink-0 text-emerald-300" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal from="left" delay={0.15} className="lg:col-span-3">
            <div className="group relative">
              <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-600 opacity-[0.18] blur-xl transition-opacity duration-500 group-hover:opacity-30" />

              <form
                action="https://formsubmit.co/imanmay2@gmail.com"
                method="POST"
                onSubmit={() => setIsSubmitting(true)}
                className="premium-surface relative space-y-6 p-5 sm:p-7 lg:p-8"
              >
                <input type="hidden" name="_subject" value="New portfolio message" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white/80">
                    Your Name
                  </label>
                  <input type="text" id="name" name="name" required className={FIELD_CLASS} placeholder="Jane Doe" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white/80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={FIELD_CLASS}
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white/80">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className={`${FIELD_CLASS} resize-none`}
                    placeholder="Tell me about the role or the project..."
                  />
                </div>

                <Magnetic strength={8}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="send"
                    className="premium-focus group/send relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-600 px-8 py-4 text-base font-bold text-white shadow-xl transition-shadow hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/send:translate-x-full" />
                    <span className="relative z-10 flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </span>
                  </button>
                </Magnetic>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
