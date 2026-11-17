import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface WeddingRevealProps {
  imageSrc: string;
  brideName: string;
  groomName: string;
  date: string;
}

export function WeddingReveal({ imageSrc, brideName, groomName, date }: WeddingRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const rotateX = useTransform(scrollYProgress, [0.1, 0.45], [12, 0]);
  const namesY = useTransform(scrollYProgress, [0.1, 0.5], ['30px', '0px']);

  return (
    <section
      ref={ref}
      id="scene-wedding-reveal"
      aria-label="The Wedding Reveal"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--dark-film)',
        perspective: '1200px',
      }}
    >
      {/* Background Portrait with slow cinematic scale */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-5%',
          scale: imgScale,
          willChange: 'transform',
        }}
      >
        <img
          src={imageSrc}
          alt={`${brideName} and ${groomName} — Wedding Portrait`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            filter: 'sepia(12%) saturate(85%) brightness(52%) contrast(105%)',
          }}
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Cinematic Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,20,16,0.65) 0%, rgba(26,20,16,0.3) 40%, rgba(26,20,16,0.85) 100%)',
        }}
        aria-hidden
      />
      <div className="grain-overlay" aria-hidden />

      {/* 3D Perspective Card Container */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem)',
          maxWidth: '680px',
          width: '100%',
          rotateX,
          y: namesY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle lead-in line */}
        <motion.p
          className="font-serif"
          style={{
            fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(212,184,150,0.85)',
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          And then, there was us.
        </motion.p>

        {/* Gold Ornament Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(182,154,112,0.8), transparent)',
            marginBottom: '2rem',
          }}
          aria-hidden
        />

        {/* Couple Names with 3D emergence */}
        <motion.h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 5.5rem)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: 'var(--soft-white)',
            lineHeight: 1.12,
            marginBottom: '1.5rem',
            textShadow: '0 8px 30px rgba(0,0,0,0.6)',
          }}
          initial={{ opacity: 0, scale: 0.94, z: -50 }}
          animate={inView ? { opacity: 1, scale: 1, z: 0 } : {}}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {brideName}
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-handwritten)',
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              color: 'var(--gold)',
              margin: '0.2rem 0',
              fontStyle: 'normal',
              letterSpacing: '0.08em',
            }}
          >
            &amp;
          </span>
          {groomName}
        </motion.h1>

        {/* Date & Blessing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
            aria-hidden
          >
            <div
              style={{
                height: '1px',
                width: '36px',
                background: 'var(--gold)',
                opacity: 0.6,
              }}
            />
            <span
              className="font-sans"
              style={{
                fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}
            >
              {date}
            </span>
            <div
              style={{
                height: '1px',
                width: '36px',
                background: 'var(--gold)',
                opacity: 0.6,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
