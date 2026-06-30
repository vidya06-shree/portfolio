import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { education } from '../../data/portfolioData';
import GlassCard from '../ui/GlassCard';
import SectionContainer from '../ui/SectionContainer';

export default function Education() {
  return (
    <SectionContainer
      id="education"
      title="Education"
      subtitle="My academic journey and qualifications"
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-transparent hidden md:block" />

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full border-4 border-slate-950 z-10 hidden md:block"
              />

              {/* Content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <GlassCard className="p-6 relative overflow-visible" gradient="cyan" glow>
                  {/* Gradient accent */}
                  <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 rounded-r-full`} />

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                      <p className="text-cyan-400 font-medium mb-3">{edu.institution}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {edu.score}
                        </span>
                      </div>

                      <p className="text-slate-400 text-sm">{edu.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Empty space for timeline alignment */}
              <div className="hidden md:block w-2/12" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
    </SectionContainer>
  );
}
