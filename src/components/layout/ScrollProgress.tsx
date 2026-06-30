import { motion } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export default function ScrollProgress() {
  const { progress } = useScrollPosition();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 z-[100] origin-left"
      style={{ scaleX: progress }}
    />
  );
}
