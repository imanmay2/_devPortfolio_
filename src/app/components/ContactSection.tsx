import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';

export function ContactSection() {
  const { ref, isInView } = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'imanmay2@gmail.com',
      color: 'from-blue-500 to-cyan-500',
      link: 'mailto:imanmay2@gmail.com'
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: '+91 8597927166',
      color: 'from-purple-500 to-pink-500',
      link: 'tel:+918597927166'
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'India',
      color: 'from-orange-500 to-red-500',
      link: '#'
    },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/imanmay2', color: 'from-gray-600 to-gray-900', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/imanmay2/', color: 'from-blue-600 to-blue-800', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/imanmay2', color: 'from-sky-500 to-blue-600', label: 'Twitter' },
  ];

  return (
    <section id="contact" ref={ref} className="portfolio-section py-28 md:py-36">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_82%_66%,rgba(168,85,247,0.12),transparent_34%),linear-gradient(180deg,transparent,rgba(7,9,19,0.84))]" />
      
      <div className="portfolio-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="section-kicker mb-8">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span>Get In Touch</span>
          </div>

          <h2 className="section-title mb-6 lg:text-7xl">
            <span className="section-title-gradient">
              Let's Work Together
            </span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl md:text-xl">
            Have a project in mind? Let's create something{' '}
            <span className="text-purple-400 font-semibold">amazing together</span>
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="premium-focus premium-surface group relative flex min-w-0 items-center gap-4 overflow-hidden p-4 transition-colors hover:border-white/20 sm:p-5"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <motion.div
                    className={`relative z-10 rounded-xl bg-gradient-to-r ${info.color} p-3`}
                    whileHover={{ y: -2 }}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="relative z-10 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    <p className="break-words font-semibold text-white">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="premium-surface bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 sm:p-7"
            >
              <h3 className="text-xl font-bold mb-4">Follow Me</h3>
              <div className="flex gap-4 mb-6">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${social.label}`}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`premium-focus rounded-xl bg-gradient-to-br ${social.color} p-4 shadow-lg`}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </motion.a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="relative group">
              <motion.div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-32" />
              
              <form
                action="https://formsubmit.co/imanmay2@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="premium-surface relative space-y-6 p-5 sm:p-7 lg:p-8"
              >
                <input type="hidden" name="_subject" value="New portfolio message" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white/80">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="premium-focus w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-base text-white backdrop-blur-sm transition-all placeholder:text-white/28 focus:border-cyan-300/55"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white/80">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="premium-focus w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-base text-white backdrop-blur-sm transition-all placeholder:text-white/28 focus:border-cyan-300/55"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white/80">
                    Your Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="premium-focus w-full resize-none rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-base text-white backdrop-blur-sm transition-all placeholder:text-white/28 focus:border-cyan-300/55"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="premium-focus group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
