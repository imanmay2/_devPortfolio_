import { SiReact, SiNodedotjs, SiMongodb, SiPython, SiGo, SiTypescript, SiDocker, SiPostgresql } from "react-icons/si";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming",
      skills: ["C", "C++", "Java", "Python", "GoLang", "TypeScript", "JavaScript"],
    },
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "FastAPI", "Gin"],
    },
    {
      title: "Databases",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Supabase"],
    },
    {
      title: "Dev Tools",
      skills: ["Git", "GitHub", "Docker", "Kubernetes", "Postman", "VS Code"],
    },
  ];

  const iconSkills = [
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { icon: SiPython, name: "Python", color: "#3776AB" },
    { icon: SiGo, name: "GoLang", color: "#00ADD8" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiDocker, name: "Docker", color: "#2496ED" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
            <span className="text-gradient">Technical Skills</span>
          </h2>

          {/* Icon Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 mb-16">
            {iconSkills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-4 card-elegant hover-glow transition-all duration-300 rounded-xl group-hover:scale-110">
                  <skill.icon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs mt-2 text-muted-foreground text-center">{skill.name}</p>
              </div>
            ))}
          </div>

          {/* Skill Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="card-elegant p-6 hover-glow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gradient">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary/10 text-foreground/90 text-sm rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {skill}
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

export default Skills;
