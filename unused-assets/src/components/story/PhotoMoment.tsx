import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PhotoMomentProps {
  src: string;
  alt: string;
  caption?: string;
  /** Flip text/image arrangement on desktop */
  reverse?: boolean;
  children?: React.ReactNode;
}

export function PhotoMoment({ src, alt, caption, reverse = false, children }: PhotoMomentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.06, 1]);

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
        alignItems: 'center',
        marginBottom: '5rem',
      }}
      // On md+ screens, use 2 columns
      className={`md:grid md:grid-cols-2 md:gap-12 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '1px',
          aspectRatio: '3/4',
          maxHeight: '480px',
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            scale: imgScale,
            filter: 'sepia(8%) saturate(90%) contrast(103%)',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          loading="lazy"
          decoding="async"
        />
        {caption && (
          <motion.span
            className="font-script"
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1.25rem',
              right: '1.25rem',
              fontSize: '1.05rem',
              color: 'rgba(247,242,233,0.9)',
              textShadow: '0 1px 8px rgba(0,0,0,0.4)',
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {caption}
          </motion.span>
        )}
      </div>

      {/* Text */}
      {children && (
        <motion.div
          initial={{ opacity: 0, x: reverse ? -24 : 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          style={{ padding: '0 0.5rem' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
