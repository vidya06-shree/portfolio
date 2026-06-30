import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5, delay: isLoading ? 0 : 0.5 }}
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30"
        >
          <Code2 className="w-8 h-8 text-white" />
        </motion.div>

        <div className="flex items-center gap-1">
          {['V', 'i', 'd', 'y', 'a', 'd', 'h', 'r', 'e', 'e'].map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.3,
              }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
          className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full max-w-xs"
        />
      </div>
    </motion.div>
  );
}
