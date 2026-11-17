import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FooterSignatureProps {
  initials: string;
  brideName: string;
  groomName: string;
  imageSrc: string;
  onReplay: () => void;
}

export function FooterSignature({
  initials,
  brideName,
  groomName,
  imageSrc,
  onReplay,
}: FooterSignatureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Slow camera pan and zoom across the photo
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const imgX = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

  return (
    <section
      ref={sectionRef}
      id="scene-ending"
      aria-label="Our Story — The Beginning"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--dark-film)',
      }}
    >
      {/* Background with slow cinematic camera move */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-8%',
          x: imgX,
          y: imgY,
          scale: imgScale,
          willChange: 'transform',
        }}
      >
        <img
          src={imageSrc}
          alt={`${brideName} and ${groomName} beginning their shared journey`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'sepia(18%) saturate(80%) brightness(46%) contrast(105%)',
          }}
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(26,20,16,0.6) 0%, rgba(26,20,16,0.2) 40%, rgba(26,20,16,0.85) 100%)',
        }}
        aria-hidden
      />
      <div className="grain-overlay" aria-hidden />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem)',
          maxWidth: '640px',
          width: '100%',
        }}
      >
        {/* Core Ending Line */}
        <motion.h2
          className="font-serif"
          style={{
            fontSize: 'clamp(1.8rem, 4.8vw, 3.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(247,242,233,0.95)',
            lineHeight: 1.35,
            marginBottom: '1.2rem',
            letterSpacing: '0.01em',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          The best part of our story starts now.
        </motion.h2>

        {/* Supporting blessing / closing note */}
        <motion.p
          className="font-sans"
          style={{
            fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '2.5rem',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          With love and family blessings
        </motion.p>

        {/* Gold Divider */}
        <motion.div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(182,154,112,0.6), transparent)',
            marginBottom: '2.5rem',
            maxWidth: '280px',
            margin: '0 auto 2.5rem',
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          aria-hidden
        />

        {/* Couple Initials */}
        <motion.p
          className="font-serif"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 300,
            letterSpacing: '0.16em',
            color: 'rgba(247,242,233,0.85)',
            marginBottom: '2.5rem',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
          aria-label={`${brideName} and ${groomName}`}
        >
          {initials}
        </motion.p>

        {/* Replay */}
        <motion.button
          onClick={onReplay}
          className="font-sans"
          style={{
            background: 'transparent',
            border: '1px solid rgba(182,154,112,0.4)',
            color: 'rgba(212,184,150,0.85)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '0.65rem 1.6rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          whileHover={{ borderColor: 'rgba(182,154,112,0.8)', color: 'rgb(212,184,150)' }}
          id="btn-replay-story"
          aria-label="Replay our story from the beginning"
        >
          ↑ Replay our story
        </motion.button>
      </div>
    </section>
  );
}
