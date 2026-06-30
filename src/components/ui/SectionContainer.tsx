import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
import { cn } from '../../utils/helpers';
import { fadeInUp, staggerContainer } from '../../animations/variants';

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectionContainer({
  children,
  id,
  className,
  title,
  subtitle,
}: SectionContainerProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={cn(
        'relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto',
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      {title && (
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16 md:mb-20 relative z-10"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-6 rounded-full"
          />
        </motion.div>
      )}

      {children}
    </motion.section>
  );
}
