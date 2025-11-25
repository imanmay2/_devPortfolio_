import { useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import projectPharmamind from "@/assets/project-pharmamind.png";
import projectWanderlust from "@/assets/project-wanderlust.png";
// import projectQnex from "@/assets/project-qnex.png";
// import projectTwitinbook from "@/assets/project-twitinbook.png";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "PharmaMind",
      description: "AI System for Drug Repurposing Research 💊",
      fullDescription: "Multi-agent AI system automating biomedical data collection and analysis. PharmaMind uses advanced AI models to process research papers, identify drug candidates, and visualize complex pharmaceutical data.",
      image: projectPharmamind,
      tags: ["FastAPI", "LangChain", "GPT-4", "React", "Tailwind"],
      github: "https://github.com/imanmay2/PharmaMind",
      live: "#",
    },
    {
      title: "WanderLust",
      description: "Airbnb Clone 🏡",
      fullDescription: "Full-featured backend-focused Airbnb clone with authentication, property listings, booking system, and user management. Built with modern backend technologies and RESTful API design.",
      image: projectWanderlust,
      tags: ["Node.js", "Express.js", "MongoDB", "EJS"],
      github: "https://github.com/imanmay2/wander_lust",
      live: "#",
    },
    {
      title: "QNeX",
      description: "AI-Powered Quiz Application 🤖",
      fullDescription: "Intelligent MCQ platform generating personalized quizzes based on user preferences. Features adaptive difficulty, real-time scoring, and comprehensive analytics dashboard.",
      image: projectQnex,
      tags: ["React.js", "MongoDB", "Node.js", "Express.js"],
      github: "https://github.com/imanmay2/QNeX",
      live: "#",
    },
    {
      title: "TwitInBook",
      description: "Personal Social Platform 🗨️",
      fullDescription: "Secure, minimal social application for expressing ideas anywhere. Features include real-time posts, user authentication, and a clean, intuitive interface focused on content.",
      image: projectTwitinbook,
      tags: ["Node.js", "Express.js", "MySQL", "MongoDB"],
      github: "https://github.com/imanmay2/TwitInBook",
      live: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
            <span className="text-gradient">Featured Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="card-elegant group cursor-pointer animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProject(index)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gradient group-hover:glow-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-foreground/80 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-glow"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, "_blank");
                      }}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      className="hover-glow"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.live, "_blank");
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Modal */}
          <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              {selectedProject !== null && (
                <div className="space-y-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={projects[selectedProject].image}
                      alt={projects[selectedProject].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-gradient">
                      {projects[selectedProject].title}
                    </h3>
                    <p className="text-foreground/80 text-lg mb-6">
                      {projects[selectedProject].fullDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[selectedProject].tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        className="hover-glow"
                        onClick={() => window.open(projects[selectedProject].github, "_blank")}
                      >
                        <Github className="mr-2 h-5 w-5" />
                        View on GitHub
                      </Button>
                      <Button
                        variant="outline"
                        className="hover-glow"
                        onClick={() => window.open(projects[selectedProject].live, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Projects;
