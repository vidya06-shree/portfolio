import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Linkedin, Github, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import GlassCard from '../ui/GlassCard';
import SectionContainer from '../ui/SectionContainer';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    // Simulate form submission (replace with actual EmailJS integration)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In production, use EmailJS like this:
      // import emailjs from '@emailjs/browser';
      // await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current!, 'YOUR_PUBLIC_KEY');

      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setFormState('idle'), 5000);
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
    },
  ];

  return (
    <SectionContainer
      id="contact"
      title="Get In Touch"
      subtitle="Let's connect and discuss your next project"
    >
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6"
        >
          <GlassCard className="p-8" gradient="cyan" glow>
            <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>

            <p className="text-slate-400 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <Github className="w-5 h-5" />
              </motion.a>

              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>

              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <GlassCard className="p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 text-white rounded-xl border border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder-slate-600"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 text-white rounded-xl border border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder-slate-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 text-white rounded-xl border border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder-slate-600"
                  placeholder="How can I help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 text-white rounded-xl border border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder-slate-600 resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={formState === 'loading'}
                whileHover={{ scale: formState === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: formState === 'loading' ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                {formState === 'success' && <CheckCircle className="w-5 h-5" />}
                {formState === 'error' && <AlertCircle className="w-5 h-5" />}
                {formState === 'idle' && <Send className="w-5 h-5" />}
                <span>
                  {formState === 'loading' && 'Sending...'}
                  {formState === 'success' && 'Message Sent!'}
                  {formState === 'error' && 'Error! Try Again'}
                  {formState === 'idle' && 'Send Message'}
                </span>
              </motion.button>

              {/* Status Messages */}
              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-400 text-sm"
                >
                  Your message has been sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {formState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-400 text-sm"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </GlassCard>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
    </SectionContainer>
  );
}
