import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { NAV_ITEMS, scrollToSection } from './Navbar';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/imanmay2', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/imanmay2/', Icon: Linkedin },
  { label: 'Twitter', href: 'https://x.com/imanmay2', Icon: Twitter },
  { label: 'Email', href: 'mailto:imanmay2@gmail.com', Icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-5 pb-10 pt-16 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.12),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 via-violet-400 to-pink-400 text-sm font-black text-[#070913]">
                MC
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Manmay Chakraborty
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Full Stack Engineer building fast, dependable products — from database schema to the last pixel.
              Currently open to new opportunities.
            </p>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="premium-focus group mt-6 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-cyan-300/35 hover:bg-white/[0.08]"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <nav aria-label="Footer">
            <p className="meta-label">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="premium-focus rounded text-sm text-white/55 transition-colors hover:text-cyan-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="meta-label">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="premium-focus group inline-flex items-center gap-2.5 rounded text-sm text-white/55 transition-colors hover:text-cyan-200"
                  >
                    <social.Icon className="h-4 w-4" />
                    {social.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark, clipped at the baseline for a signature sign-off. */}
        <div className="pointer-events-none mt-14 select-none overflow-hidden">
          <p className="font-display -mb-3 bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-center text-[clamp(2.6rem,12vw,10rem)] font-black leading-[0.85] tracking-tight text-transparent">
            MANMAY
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/35">© {year} Manmay Chakraborty. All rights reserved.</p>
          <p className="font-code text-[11px] tracking-[0.14em] text-white/30">
            React · TypeScript · Tailwind · Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
