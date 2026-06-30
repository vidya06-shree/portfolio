import { motion } from 'framer-motion';
import { Trophy, Star, Target } from 'lucide-react';
import { achievements } from '../../data/portfolioData';
import GlassCard from '../ui/GlassCard';
import SectionContainer from '../ui/SectionContainer';

const achievementIcons = [
  <Star className="w-7 h-7" />,
  <Target className="w-7 h-7" />,
  <Trophy className="w-7 h-7" />,
];

export default function Achievements() {
  return (
    <SectionContainer
      id="achievements"
      title="Achievements"
      subtitle="Milestones and accomplishments I'm proud of"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <GlassCard className="p-8 h-full text-center" glow>
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30"
              >
                {achievementIcons[index % achievementIcons.length]}
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-3">{achievement.title}</h3>

              <p className="text-slate-400 text-sm leading-relaxed">{achievement.description}</p>

              {/* Decorative badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/30"
              >
                {index + 1}
              </motion.div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
    </SectionContainer>
  );
}
