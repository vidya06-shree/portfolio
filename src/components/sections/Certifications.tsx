import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';
import { certifications } from '../../data/portfolioData';
import GlassCard from '../ui/GlassCard';
import SectionContainer from '../ui/SectionContainer';

export default function Certifications() {
  return (
    <SectionContainer
      id="certifications"
      title="Certifications"
      subtitle="Professional certifications and credentials"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6 h-full" hover glow>
              <div className="flex flex-col h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 mb-4"
                >
                  <Award className="w-7 h-7" />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>

                {/* Issuer */}
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                  <Building className="w-4 h-4" />
                  <span>{cert.issuer}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{cert.date}</span>
                </div>

                {/* Credential */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-white/5">
                    <span className="text-xs text-slate-500 font-mono">{cert.credential}</span>
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
    </SectionContainer>
  );
}
