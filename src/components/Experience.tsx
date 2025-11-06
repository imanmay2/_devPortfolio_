import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Backend Developer Intern",
      company: "Cestrum Technologies Pvt. Ltd.",
      period: "Nov 2025 – Present",
      description: "Backend development, API design, and system optimization for live client systems.",
      tags: ["Backend", "API Design", "System Optimization"],
    },
    {
      title: "Contract Web Developer",
      company: "Freelance",
      period: "Ongoing",
      description: "Building custom web solutions for clients, from landing pages to full-stack applications.",
      tags: ["React", "Node.js", "Full-Stack"],
    },
    {
      title: "Technical Team Member",
      company: "E-Cell, VIT Chennai",
      period: "Aug 2025 – Present",
      description: "Building web platforms and dashboards for entrepreneurship initiatives.",
      tags: ["Web Development", "Dashboards", "React"],
    },
    {
      title: "Backend Developer",
      company: "CodeChef VIT-Chennai Chapter",
      period: "Jul 2025 – Present",
      description: "Designing GoLang-based backend APIs, performance-oriented systems.",
      tags: ["GoLang", "APIs", "Performance"],
    },
    {
      title: "Contributor",
      company: "GirlScript Summer of Code",
      period: "Jul 2025 – Sep 2025",
      description: "Open-source contributions to backend repositories and documentation.",
      tags: ["Open Source", "Backend", "Documentation"],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
            <span className="text-gradient">Experience</span>
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="card-elegant p-6 hover-glow animate-fade-in-up transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex items-start space-x-3 mb-2 sm:mb-0">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.period}
                  </div>
                </div>
                
                <p className="text-foreground/80 mb-4">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
