import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ChapterHeadingProps {
  chapter: string;
  title: string;
  dark?: boolean;
}

export function ChapterHeading({ chapter, title, dark = false }: ChapterHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="text-center mb-10 md:mb-14">
      <motion.span
        className="chapter-label"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ color: dark ? 'rgba(182,154,112,0.9)' : undefined }}
      >
        {chapter}
      </motion.span>

      <div className="gold-divider my-4">
        <motion.span
          className="ornament"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          aria-hidden
        >
          ✦
        </motion.span>
      </div>

      <motion.h2
        className="font-serif"
        style={{
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: dark ? '#EDE3D4' : 'var(--espresso)',
          lineHeight: 1.3,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
