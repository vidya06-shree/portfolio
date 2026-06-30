import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Award, Target, Zap } from 'lucide-react';
import { personalInfo, stats } from '../../data/portfolioData';
import AnimatedCounter from '../ui/AnimatedCounter';
import GlassCard from '../ui/GlassCard';
import SectionContainer from '../ui/SectionContainer';

const aboutCards = [
  {
    icon: <User className="w-6 h-6" />,
    title: 'Passionate Developer',
    description: 'Dedicated to crafting elegant solutions and continuously improving my skills.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Problem Solver',
    description: 'Approaching challenges with creativity and analytical thinking.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast Learner',
    description: 'Quickly adapting to new technologies and development methodologies.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Quality Focused',
    description: 'Committed to writing clean, maintainable, and efficient code.',
  },
];

export default function About() {
  return (
    <SectionContainer
      id="about"
      title="About Me"
      subtitle="Get to know more about my journey and what drives me"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image and Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <GlassCard className="p-8" gradient="cyan">
            <div className="flex flex-col items-center text-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden mb-6 border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
              >
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">{personalInfo.name}</h3>
              <p className="text-cyan-400 font-medium mb-4">{personalInfo.title}</p>

              <div className="flex flex-wrap justify-center gap-2">
                {['MERN Stack', 'React.js', 'Node.js', 'MongoDB'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <GlassCard className="p-6">
            <p className="text-slate-300 leading-relaxed text-lg">
              {personalInfo.about}
            </p>
          </GlassCard>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center hover:border-cyan-500/30" hover>
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* About Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {aboutCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-4" hover>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{card.title}</h4>
                      <p className="text-slate-400 text-sm">{card.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
    </SectionContainer>
  );
}
