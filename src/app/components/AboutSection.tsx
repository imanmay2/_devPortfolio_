import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Code2, Database, Globe, Sparkles, Zap, Server, Cloud } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  const { ref, isInView } = useInView();

  const features = [
    { icon: Code2, title: 'Clean Code', desc: 'Maintainable & scalable', color: 'from-blue-500 to-cyan-500' },
    { icon: Database, title: 'Databases', desc: 'SQL & NoSQL expert', color: 'from-purple-500 to-pink-500' },
    { icon: Globe, title: 'API Design', desc: 'RESTful & GraphQL', color: 'from-pink-500 to-orange-500' },
    { icon: Sparkles, title: 'Performance', desc: 'Optimized solutions', color: 'from-cyan-500 to-blue-500' },
    { icon: Server, title: 'Backend', desc: 'Scalable architecture', color: 'from-green-500 to-emerald-500' },
    { icon: Cloud, title: 'Cloud', desc: 'AWS & deployment', color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <section id="about" ref={ref} className="py-40 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-6"
            animate={isInView ? {
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Sparkles className="w-16 h-16 text-blue-500 mx-auto" />
          </motion.div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl mb-6 font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about building <span className="text-blue-400 font-semibold">robust backend systems</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
                  alt="Profile"
                  className="rounded-3xl w-full aspect-square object-cover border-4 border-white/10 shadow-2xl"
                />
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-1">5+</p>
                  <p className="text-sm text-white/80">Years Experience</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative z-10">
                <p className="text-xl leading-relaxed mb-6">
                  I'm a <span className="text-blue-400 font-bold">Full Stack Developer</span> with a strong focus on{' '}
                  <span className="text-purple-400 font-bold">backend development</span>.
                  With expertise in Next.js and modern web technologies, I build scalable
                  applications that deliver exceptional user experiences.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My passion lies in architecting robust APIs, optimizing database performance,
                  and creating seamless integrations that power modern web applications.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-4xl font-bold text-blue-400 mb-2">150+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-4xl font-bold text-purple-400 mb-2">50+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
              />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <motion.div
                  className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
