import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Building2 } from 'lucide-react';
import { experience } from '../../data/portfolioData';
import GlassCard from '../ui/GlassCard';
import SectionContainer from '../ui/SectionContainer';

export default function Experience() {
  return (
    <SectionContainer
      id="experience"
      title="Experience"
      subtitle="My professional journey and work history"
    >
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <GlassCard className="p-8" gradient="cyan" glow>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Header */}
                <div className="lg:w-1/3">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 mb-4"
                  >
                    <Briefcase className="w-8 h-8" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-cyan-400 font-medium mb-3">{exp.company}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="lg:w-2/3">
                  <p className="text-slate-300 mb-6">{exp.description}</p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {exp.responsibilities.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl border border-white/5 hover:border-cyan-500/20 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Currently seeking opportunities card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <GlassCard className="p-6 text-center border-cyan-500/20">
          <div className="flex items-center justify-center gap-3 text-cyan-400">
            <Building2 className="w-5 h-5" />
            <span className="font-medium">Open to new opportunities</span>
          </div>
          <p className="text-slate-400 mt-2 text-sm">
            Looking for challenging roles in Full Stack Development
          </p>
        </GlassCard>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
    </SectionContainer>
  );
}
