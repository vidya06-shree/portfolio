import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Heart, Code2 } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      github: <Github className="w-5 h-5" />,
      linkedin: <Linkedin className="w-5 h-5" />,
      mail: <Mail className="w-5 h-5" />,
      phone: <Phone className="w-5 h-5" />,
    };
    return icons[iconName] || null;
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{personalInfo.name}</h3>
              <p className="text-sm text-slate-400">Full Stack Developer</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-blue-600/20 flex items-center justify-center text-slate-400 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                {getIcon(link.icon)}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500"
        >
          <p className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by {personalInfo.name}
          </p>
          <p>&copy; {currentYear} All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
