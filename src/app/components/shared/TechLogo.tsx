import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

type TechLogoProps = {
  /** Simple Icons slug, e.g. "typescript". Omit for tools without a mark. */
  slug?: string;
  /** Drawn instead of the logo when there is no slug or the request fails. */
  fallbackIcon: LucideIcon;
  name: string;
  className?: string;
};

/**
 * Renders a white brand mark from the Simple Icons CDN, falling back to a
 * Lucide glyph if the slug is missing or the request fails. The tile behind
 * it supplies the colour, so every logo stays legible on dark glass.
 */
export function TechLogo({ slug, fallbackIcon: FallbackIcon, name, className = 'h-5 w-5' }: TechLogoProps) {
  const [failed, setFailed] = useState(false);

  if (!slug || failed) {
    return <FallbackIcon className={className} strokeWidth={2.3} aria-hidden="true" />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/white`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={className}
      onError={() => setFailed(true)}
      data-tech={name}
    />
  );
}
