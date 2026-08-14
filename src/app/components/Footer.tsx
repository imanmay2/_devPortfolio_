import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070913] px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-semibold text-white">Manmay Chakraborty</p>
          <p className="mt-1 text-sm text-muted-foreground">© {year} All rights reserved.</p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { label: 'GitHub', href: 'https://github.com/imanmay2', Icon: Github },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/imanmay2/', Icon: Linkedin },
            { label: 'Email', href: 'mailto:imanmay2@gmail.com', Icon: Mail },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={link.label}
              className="premium-focus flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/55 transition-colors hover:border-white/20 hover:text-white"
            >
              <link.Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
