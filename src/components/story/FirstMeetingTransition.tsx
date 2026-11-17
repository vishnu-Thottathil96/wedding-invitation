import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FirstMeetingTransitionProps {
  familyImage: string;
  meetingImage: string;
  headline: string;
  subline: string;
}

export function FirstMeetingTransition({
  familyImage,
  meetingImage,
  headline,
  subline,
}: FirstMeetingTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Layered parallax with depth separation
  const backY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const frontY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const frontRotateY = useTransform(scrollYProgress, [0.1, 0.5], [-5, 2]);
  const frontRotateX = useTransform(scrollYProgress, [0.1, 0.5], [6, -2]);

  return (
    <section
      ref={containerRef}
      id="scene-first-meeting"
      aria-label="The First Meeting"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem)',
        background: 'var(--cream)',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Scene Chapter Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
          <motion.span
            className="chapter-label"
            style={{ display: 'block', marginBottom: '0.8rem' }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Scene III — The First Meeting
          </motion.span>
          <motion.h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--espresso)',
              lineHeight: 1.3,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="font-sans"
            style={{
              fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: '0.9rem',
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subline}
          </motion.p>
        </div>

        {/* ── Layered 3D Depth Composition ── */}
        <div
          style={{
            position: 'relative',
            minHeight: 'clamp(360px, 60vw, 520px)',
            margin: '0 auto',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Background Layer: Families / Two worlds meeting */}
          <motion.div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '75%',
              aspectRatio: '4/3',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(26,20,16,0.12)',
              border: '1px solid rgba(182,154,112,0.25)',
              y: backY,
              filter: 'brightness(92%) saturate(90%)',
              zIndex: 1,
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.3 }}
          >
            <img
              src={familyImage}
              alt="Families gathering with warmth and blessings"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                left: '1rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(247,242,233,0.9)',
                textShadow: '0 2px 6px rgba(0,0,0,0.6)',
              }}
            >
              Two families
            </div>
          </motion.div>

          {/* Foreground Layer: The First Meeting (Floats forward in 3D with tilt) */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '68%',
              aspectRatio: '3/4',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(26,20,16,0.25)',
              border: '2px solid rgba(212,184,150,0.6)',
              y: frontY,
              rotateY: frontRotateY,
              rotateX: frontRotateX,
              transformStyle: 'preserve-3d',
              zIndex: 2,
            }}
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={meetingImage}
              alt="The first meeting between Priya and Arjun"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'sepia(8%) contrast(104%)',
              }}
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26,20,16,0.6) 0%, transparent 40%)',
              }}
              aria-hidden
            />
            <span
              className="font-script"
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1.2rem',
                fontSize: '1.15rem',
                color: 'var(--gold-light)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              the first smile
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
