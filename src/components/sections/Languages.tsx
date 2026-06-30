import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { languages } from '../../data/portfolioData';
import GlassCard from '../ui/GlassCard';
import SectionContainer from '../ui/SectionContainer';

const levelColors: Record<string, string> = {
  Native: 'from-green-500 to-emerald-600',
  Fluent: 'from-blue-500 to-cyan-600',
  Professional: 'from-cyan-500 to-blue-600',
  Conversational: 'from-slate-400 to-slate-500',
};

export default function Languages() {
  return (
    <SectionContainer
      id="languages"
      title="Languages"
      subtitle="Languages I can communicate in"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6 text-center" hover glow>
              <motion.div
                whileHover={{ y: -5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30"
              >
                <Globe className="w-8 h-8" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">{lang.name}</h3>

              <span className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${levelColors[lang.level]}`}>
                {lang.level}
              </span>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
    </SectionContainer>
  );
}
