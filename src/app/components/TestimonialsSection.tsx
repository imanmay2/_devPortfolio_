import { motion, AnimatePresence } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at Tech Innovations',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    content: 'Manmay is an exceptional developer who consistently delivers high-quality work. His expertise in backend development and Next.js has been invaluable to our team.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager at Digital Solutions',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    content: 'Working with Manmay has been a pleasure. He has a deep understanding of full-stack development and always finds elegant solutions to complex problems.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Engineering Lead at Startup Hub',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    content: 'Manmay\'s ability to architect scalable backend systems is outstanding. He\'s a true professional who brings both technical expertise and leadership to the team.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Founder at Code Academy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    content: 'An incredible talent with a passion for clean code and best practices. Manmay has been instrumental in building our platform from the ground up.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { ref, isInView } = useInView();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={ref} className="py-40 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/20 rounded-full mb-8"
            animate={isInView ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Quote className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold">TESTIMONIALS</span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl mb-6 font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Client Feedback
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            What <span className="text-purple-400 font-semibold">people say</span> about working with me
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, rotateY: 45 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -45 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 md:p-16 relative shadow-2xl">
                  <Quote className="absolute top-8 left-8 w-16 h-16 text-blue-500/10" />
                  
                  <div className="flex flex-col items-center text-center relative z-10">
                    <motion.div
                      className="relative mb-8"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-lg opacity-50"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <ImageWithFallback
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="relative w-28 h-28 rounded-full object-cover border-4 border-background shadow-xl"
                      />
                      
                      {/* Verified badge */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <Star className="w-5 h-5 text-white fill-white" />
                      </motion.div>
                    </motion.div>

                    {/* Star Rating */}
                    <motion.div
                      className="flex gap-2 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                        >
                          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.p
                      className="text-xl md:text-2xl leading-relaxed mb-10 max-w-3xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      "{testimonials[currentIndex].content}"
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-2xl font-bold mb-2">{testimonials[currentIndex].name}</p>
                      <p className="text-lg text-muted-foreground">{testimonials[currentIndex].role}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={goToPrev}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 p-4 bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-xl rounded-full shadow-xl hover:shadow-2xl transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 p-4 bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-xl rounded-full shadow-xl hover:shadow-2xl transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-12 bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
