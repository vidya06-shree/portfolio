import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/helpers';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  gradient?: 'cyan' | 'purple' | 'blue' | 'none';
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, hover = true, glow = false, gradient = 'none', className, ...props }, ref) => {
    const gradients = {
      cyan: 'from-cyan-500/20 via-transparent to-blue-500/20',
      purple: 'from-purple-500/20 via-transparent to-pink-500/20',
      blue: 'from-blue-500/20 via-transparent to-indigo-500/20',
      none: '',
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
        className={cn(
          'relative overflow-hidden rounded-2xl',
          'bg-gradient-to-br from-slate-900/80 to-slate-800/50',
          'backdrop-blur-xl border border-white/10',
          'shadow-2xl shadow-black/20',
          gradients[gradient] && `bg-gradient-to-br ${gradients[gradient]}`,
          className
        )}
        {...props}
      >
        {/* Glow effect */}
        {glow && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl -z-10" />
        )}

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
