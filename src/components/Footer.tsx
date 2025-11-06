import { Heart, Github, Linkedin, Mail, Plane, Code } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const hobbies = [
    { icon: Plane, text: "Travelling" },
    { icon: Code, text: "Programming" },
    { icon: Heart, text: "Enjoying Little Moments" },
  ];

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hobbies Section */}
          <div className="mb-8">
            <h3 className="text-center text-lg font-semibold mb-4 text-gradient">
              When I'm not coding...
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full"
                >
                  <hobby.icon className="h-4 w-4 text-primary" />
                  <span className="text-foreground/90">{hobby.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-muted hover:bg-primary/20 rounded-full transition-colors hover-glow"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-muted hover:bg-primary/20 rounded-full transition-colors hover-glow"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-3 bg-muted hover:bg-primary/20 rounded-full transition-colors hover-glow"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Built with <Heart className="inline h-4 w-4 text-primary" /> by Manmay Chakraborty
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
