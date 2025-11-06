import { Code2, Rocket, Sparkles } from "lucide-react";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";

const About = () => {
  const highlights = [
    { icon: Code2, text: "MERN Stack Specialist" },
    { icon: Rocket, text: "System Design Expert" },
    { icon: Sparkles, text: "AI Enthusiast" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
            <span className="text-gradient">About Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <img
                  src={profilePlaceholder}
                  alt="Manmay Chakraborty"
                  className="relative rounded-lg w-full max-w-md mx-auto shadow-2xl"
                />
              </div>
            </div>

            <div className="space-y-6 animate-fade-in-up">
              <p className="text-lg text-foreground/80 leading-relaxed">
                I'm a <span className="text-primary font-semibold">2nd-year B.Tech Computer Science student</span> at 
                Vellore Institute of Technology (VIT). Passionate about building scalable systems and real-world 
                applications that make an impact.
              </p>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                I specialize in <span className="text-accent font-semibold">backend development, API design, and 
                cloud-native architectures</span> — constantly exploring AI, automation, and GoLang for 
                performance-driven systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="card-elegant p-4 text-center hover-glow transition-all duration-300"
                  >
                    <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground/90">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-gradient">Education</h3>
                <div className="card-elegant p-4">
                  <p className="font-semibold text-foreground">Vellore Institute of Technology (VIT)</p>
                  <p className="text-muted-foreground">B.Tech in Computer Science & Engineering</p>
                  <p className="text-sm text-muted-foreground">2024 – 2028</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
