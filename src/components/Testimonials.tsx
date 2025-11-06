import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Senior Backend Engineer, Tech Corp",
      content: "Manmay's expertise in backend architecture and his ability to optimize complex systems is remarkable. His work on our API infrastructure reduced response times by 40%.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      name: "Priya Menon",
      role: "CTO, StartupHub",
      content: "Working with Manmay was a game-changer for our project. His deep understanding of GoLang and microservices helped us scale seamlessly from 1K to 100K users.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      name: "David Chen",
      role: "ML Lead, AI Solutions",
      content: "Manmay's work on PharmaMind showcases his incredible talent in integrating AI with robust backend systems. His code quality and documentation are top-notch.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      name: "Anjali Verma",
      role: "Project Manager, Cestrum Tech",
      content: "Manmay is not just technically brilliant but also a great team player. His contributions to our backend systems have been invaluable and his problem-solving skills are exceptional.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            <span className="text-gradient">Testimonials</span>
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 1 : -1,
                }}
                className="card-elegant p-6 hover-glow relative"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-4 right-4 text-primary/20"
                >
                  <Quote className="h-12 w-12" />
                </motion.div>

                <div className="flex items-center mb-4">
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-primary/50"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gradient">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <p className="text-foreground/90 leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
