import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { WeddingConfig } from '../../data/wedding';

interface InvitationSectionProps {
  config: WeddingConfig;
}

export function InvitationSection({ config }: InvitationSectionProps) {
  const frameSrc = config.images.invitationFrame || '/images/frame2.png';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section
      id="invitation"
      aria-label="Main wedding invitation"
      style={{
        background: '#FFFFFF',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: 'clamp(1rem, 3vw, 2.5rem) clamp(0.5rem, 2vw, 1.5rem) clamp(2.5rem, 6vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: '100%',
          maxWidth: 'clamp(340px, 96vw, 560px)',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px -12px rgba(73, 56, 47, 0.18)',
          border: '1px solid rgba(184, 149, 96, 0.2)',
          background: '#FFFFFF',
        }}
      >
        <img
          src={frameSrc}
          alt="Wedding Invitation — Daniel & Donna"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
          loading="eager"
          decoding="async"
        />

        {/* Soft bottom edge feathering to blend seamlessly into the page */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '24px',
            background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.04))',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Elegant transitional divider blending into the countdown section */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginTop: 'clamp(2rem, 5vw, 3rem)',
          width: '100%',
          maxWidth: '280px',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(184,149,96,0.35))' }} />
        <div style={{ width: '5px', height: '5px', background: 'var(--gold)', transform: 'rotate(45deg)', opacity: 0.7 }} />
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(184,149,96,0.35))' }} />
      </div>
    </section>
  );
}
