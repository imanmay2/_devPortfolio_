import { motion } from "framer-motion";
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const iconItem = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const categoryItem = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            <span className="text-gradient">Technical Skills</span>
          </motion.h2>

          {/* Icon Grid with Continuous Float Animation */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 mb-16"
          >
            {iconSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={iconItem}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
                className="flex flex-col items-center group"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                  className="p-4 card-elegant hover-glow transition-all duration-300 rounded-xl cursor-pointer"
                >
                  <skill.icon className="h-8 w-8 text-primary" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-xs mt-2 text-muted-foreground text-center"
                >
                  {skill.name}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Categories with Stagger Animation */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={categoryItem}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px hsl(var(--primary) / 0.5)",
                }}
                className="card-elegant p-6 hover-glow"
              >
                <h3 className="text-xl font-semibold mb-4 text-gradient">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: skillIndex * 0.05,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "hsl(var(--primary) / 0.3)",
                      }}
                      className="px-3 py-1 bg-primary/10 text-foreground/90 text-sm rounded-full cursor-pointer"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
