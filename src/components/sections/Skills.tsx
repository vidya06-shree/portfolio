import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Brain, Palette, Clipboard, LucideIcon } from 'lucide-react';
import { technicalSkills, softSkills } from '../../data/portfolioData';
import GlassCard from '../ui/GlassCard';
import SectionContainer from '../ui/SectionContainer';

const skillCategories = ['all', 'frontend', 'backend', 'database', 'language', 'tools'] as const;
const categoryLabels: Record<string, string> = {
  all: 'All Skills',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  language: 'Languages',
  tools: 'Tools',
};

const softSkillIcons: Record<string, LucideIcon> = {
  crown: Crown,
  users: Users,
  brain: Brain,
  palette: Palette,
  clipboard: Clipboard,
};

function SkillCard({ skill, index }: { skill: typeof technicalSkills[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard className="p-4" hover>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-medium">{skill.name}</h4>
          <span className="text-cyan-400 text-sm font-semibold">{skill.level}%</span>
        </div>

        <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : '0%' }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full origin-left"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.05 }}
            className="h-full bg-gradient-to-r from-cyan-500/50 to-blue-600/50 rounded-full -mt-2"
          />
        </div>

        <span className="text-xs text-slate-500 mt-2 inline-block capitalize">{skill.category}</span>
      </GlassCard>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = activeCategory === 'all'
    ? technicalSkills
    : technicalSkills.filter(skill => skill.category === activeCategory);

  return (
    <SectionContainer
      id="skills"
      title="Skills"
      subtitle="Technologies and tools I work with"
    >
      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {skillCategories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-white border border-white/5 hover:border-cyan-500/30'
            }`}
          >
            {categoryLabels[category]}
          </motion.button>
        ))}
      </motion.div>

      {/* Technical Skills Grid */}
      <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </motion.div>

      {/* Soft Skills */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <h3 className="text-2xl font-bold text-white text-center mb-8">Soft Skills</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {softSkills.map((skill, index) => {
            const Icon = softSkillIcons[skill.icon] || Brain;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center" hover glow>
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  <h4 className="text-white font-medium">{skill.name}</h4>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
    </SectionContainer>
  );
}
