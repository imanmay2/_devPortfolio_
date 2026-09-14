import { createContext, useContext, type ReactNode } from 'react';

/**
 * Whether the boot curtain has lifted. The hero's entrance is the first thing
 * a visitor sees, so it has to start *after* the preloader clears rather than
 * playing out behind it.
 */
const BootContext = createContext(true);

export function BootProvider({ value, children }: { value: boolean; children: ReactNode }) {
  return <BootContext.Provider value={value}>{children}</BootContext.Provider>;
}

export function useBoot() {
  return useContext(BootContext);
}
