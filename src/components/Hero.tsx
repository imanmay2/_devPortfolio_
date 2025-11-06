import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const phrases = [
    "Backend Developer",
    "Machine Learning Engineer",
    "MERN Stack Developer",
    "TypeScript Enthusiast",
    "AI & System Design Explorer",
    "GoLang Developer",
    "Full Stack Engineer",
    "Cloud Architecture Specialist",
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
          >
            <span className="text-gradient">Manmay Chakraborty</span>
          </motion.h1>
          
          <div className="h-16 sm:h-20 mb-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhraseIndex}
                initial={{ y: 50, opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -50, opacity: 0, rotateX: -90 }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                className="text-lg sm:text-xl md:text-2xl font-semibold glow-text"
              >
                {phrases[currentPhraseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="text-xl sm:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto">
            Software Engineer specializing in scalable systems and real-world applications
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="hover-glow animate-glow-pulse"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover-glow"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors hover-glow p-3 rounded-full"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors hover-glow p-3 rounded-full"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-foreground/70 hover:text-primary transition-colors hover-glow p-3 rounded-full"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
