import { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AchievementsSection } from './components/AchievementsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GithubSection } from './components/GithubSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuroraBackground } from './components/shared/AuroraBackground';
import { BootProvider } from './components/shared/BootContext';
import { Preloader } from './components/shared/Preloader';
import { ScrollProgress } from './components/shared/ScrollProgress';

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const handleBooted = useCallback(() => setIsBooted(true), []);

  // Failsafe: never let the boot curtain be the reason the page stays blank.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooted(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      <div className="min-h-screen overflow-x-hidden bg-[#070913] text-foreground">
        <Preloader onFinish={handleBooted} />
        <CustomCursor />
        <AuroraBackground />
        <ScrollProgress />

        {/* Content rises into place once the boot curtain has cleared. */}
        <BootProvider value={isBooted}>
          <div
            className={`app-shell transition-opacity duration-700 ${isBooted ? 'opacity-100' : 'opacity-0'}`}
          >
            <Navbar />

            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ExperienceSection />
              <AchievementsSection />
              <TestimonialsSection />
              <GithubSection />
              <ContactSection />
            </main>

            <Footer />
          </div>
        </BootProvider>
      </div>
    </ThemeProvider>
  );
}
