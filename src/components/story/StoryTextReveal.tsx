import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StoryTextRevealProps {
  lines: string[];
  dark?: boolean;
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  delayBase?: number;
}

const sizeMap = {
  sm: 'clamp(0.95rem, 2.2vw, 1.1rem)',
  md: 'clamp(1.1rem, 2.5vw, 1.3rem)',
  lg: 'clamp(1.25rem, 3.5vw, 1.6rem)',
};

export function StoryTextReveal({
  lines,
  dark = false,
  centered = false,
  size = 'md',
  delayBase = 0,
}: StoryTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      style={{
        textAlign: centered ? 'center' : 'left',
      }}
    >
      {lines.map((line, i) => {
        const isBlank = line.trim() === '';
        if (isBlank) {
          return <div key={i} style={{ height: '1em' }} aria-hidden />;
        }
        return (
          <div key={i} className="reveal-mask">
            <motion.p
              className="font-serif"
              style={{
                fontSize: sizeMap[size],
                fontWeight: 300,
                lineHeight: 1.9,
                color: dark ? 'rgba(247,242,233,0.9)' : 'var(--espresso)',
                marginBottom: '0.1em',
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: delayBase + i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {line}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
