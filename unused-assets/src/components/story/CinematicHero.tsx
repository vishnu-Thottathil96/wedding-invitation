import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface CinematicHeroProps {
  imageSrc: string;
  imageAlt: string;
  headline: string;
  subline?: string;
}

export function CinematicHero({ imageSrc, imageAlt, headline, subline }: CinematicHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const inView = useInView(textRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: image drifts up as user scrolls
  const imageY    = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  // Slow pan: subtle horizontal drift for a "camera move" feel
  const imageX    = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="scene-opening"
      aria-label="Opening"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* ── Cinematic image with 3D entry + parallax ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-5%',
          x: imageX,
          y: imageY,
          willChange: 'transform',
        }}
        initial={{ scale: 1.12, rotateX: 4, opacity: 0 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="cinematic-img"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* ── Cinematic overlays ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26,20,16,0.88) 0%, rgba(26,20,16,0.35) 55%, rgba(26,20,16,0.1) 100%)',
        }}
        aria-hidden
      />
      <div className="grain-overlay" aria-hidden />

      {/* ── Text block — minimal, centered ── */}
      <motion.div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 clamp(1.5rem, 6vw, 4rem)',
          maxWidth: '600px',
          y: textY,
          opacity: textOpacity,
        }}
      >
        <motion.h1
          className="font-serif"
          style={{
            fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(247,242,233,0.95)',
            lineHeight: 1.35,
            letterSpacing: '0.01em',
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {headline}
        </motion.h1>

        {subline && (
          <motion.p
            className="font-sans"
            style={{
              fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(182,154,112,0.8)',
              marginTop: '1.5rem',
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 1.6 }}
          >
            {subline}
          </motion.p>
        )}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          color: 'rgba(247,242,233,0.45)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2.6, duration: 1 }}
        aria-hidden
      >
        <ChevronDown size={18} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
