import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { OrnamentDivider, SectionLabel } from '../ui/Ornaments';

interface CoupleProfilesProps {
  brideName: string;
  brideFullName: string;
  brideSrc: string;
  brideTagline: string;
  groomName: string;
  groomFullName: string;
  groomSrc: string;
  groomTagline: string;
}

function ProfileCard({
  name,
  fullName,
  src,
  tagline,
  delay,
  reverse,
}: {
  name: string;
  fullName: string;
  src: string;
  tagline: string;
  delay: number;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      {/* Portrait frame */}
      <div
        style={{
          position: 'relative',
          width: 'min(260px, 70vw)',
          flexShrink: 0,
        }}
      >
        {/* Offset gold border */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: reverse ? '10px -10px -10px 10px' : '10px 10px -10px -10px',
            border: '1px solid rgba(184,149,96,0.4)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <img
          src={src}
          alt={`Portrait of ${name}`}
          className="photo-portrait"
          style={{ position: 'relative', zIndex: 1, display: 'block' }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center' }}>
        <p className="label-sm" style={{ marginBottom: '0.4rem' }}>
          {name === fullName.split(' ')[0] ? 'The Bride' : 'The Groom'}
        </p>
        <h3
          className="font-serif"
          style={{
            fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
            fontWeight: 300,
            color: 'var(--brown)',
            lineHeight: 1.1,
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
          }}
        >
          {fullName}
        </h3>
        <p
          className="font-serif"
          style={{
            fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
            fontStyle: 'italic',
            color: 'var(--brown-light)',
            lineHeight: 1.6,
          }}
        >
          {tagline}
        </p>
      </div>
    </motion.div>
  );
}

export function CoupleProfiles({
  brideName,
  brideFullName,
  brideSrc,
  brideTagline,
  groomName,
  groomFullName,
  groomSrc,
  groomTagline,
}: CoupleProfilesProps) {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section
      id="couple"
      aria-label="The Happy Couple"
      style={{
        background: 'var(--ivory)',
        padding: 'var(--section-pad) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        {/* Heading */}
        <motion.div
          ref={headRef}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <SectionLabel>The Happy Couple</SectionLabel>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--brown)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}
          >
            {brideName} &amp; {groomName}
          </h2>
        </motion.div>

        {/* Bride profile */}
        <ProfileCard
          name={brideName}
          fullName={brideFullName}
          src={brideSrc}
          tagline={brideTagline}
          delay={0}
          reverse={false}
        />

        {/* Separator */}
        <div style={{ padding: 'clamp(2.5rem, 7vw, 4rem) 0', textAlign: 'center' }}>
          <OrnamentDivider />
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1.6rem, 4.5vw, 2.5rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(184,149,96,0.6)',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            &amp;
          </p>
          <OrnamentDivider />
        </div>

        {/* Groom profile */}
        <ProfileCard
          name={groomName}
          fullName={groomFullName}
          src={groomSrc}
          tagline={groomTagline}
          delay={0.1}
          reverse={true}
        />

      </div>
    </section>
  );
}
