import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-[#29060B]/40 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF4CC] to-[#E6CA65] shadow-[0_0_12px_#D4AF37] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};
