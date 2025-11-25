import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs,{ EmailJSResponseStatus } from '@emailjs/browser';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
  await emailjs.send(
    import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
    {...formData,email:"imanmay2@gmail.com"},
    {
      publicKey: import.meta.env.VITE_PUBLIC_KEY,
    },
  );
  console.log('SUCCESS!');
  setFormData({name:"",email:"",message:""});
} catch (err) {
  if (err instanceof EmailJSResponseStatus) {
    console.log('EMAILJS FAILED...', err);
    return;
  }

  console.log('ERROR', err);
}
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "imanmay2@gmail.com" },
    { icon: MapPin, label: "Location", value: "Chennai, India" },
    { icon: Phone, label: "Phone", value: "+91 8597927166" },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
            <span className="text-gradient">Get In Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Let's Connect</h3>
                <p className="text-foreground/80 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 card-elegant p-4 hover-glow transition-all"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-foreground font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-elegant p-6 bg-gradient-to-br from-primary/10 to-accent/10">
                <p className="text-foreground/90">
                  <span className="text-gradient font-semibold">Currently available</span> for freelance work and exciting collaborations!
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-card"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-card"
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-card resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full hover-glow animate-glow-pulse">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
