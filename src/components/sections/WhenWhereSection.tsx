import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BotanicalCorner, SectionLabel } from '../ui/Ornaments';

interface WhenWhereSectionProps {
  date: string;
  muhoortham: string;
  muhoorthamLabel: string;
  receptionTime: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  mapUrl: string;
}

export function WhenWhereSection({
  date,
  muhoortham,
  muhoorthamLabel,
  receptionTime,
  venueName,
  venueAddress,
  venueCity,
  mapUrl,
}: WhenWhereSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const fadeProps = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  return (
    <section
      id="when-where"
      aria-label="When and where"
      style={{
        background: 'var(--brown)',
        padding: 'var(--section-pad) var(--gutter)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          border: '1px solid rgba(184,149,96,0.12)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          border: '1px solid rgba(184,149,96,0.1)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div {...fadeProps(0)}>
          <SectionLabel>
            <span style={{ color: 'rgba(212,176,122,0.7)' }}>When &amp; Where</span>
          </SectionLabel>
        </motion.div>

        {/* The card */}
        <motion.div
          {...fadeProps(0.15)}
          style={{
            border: '1px solid rgba(184,149,96,0.3)',
            padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
            position: 'relative',
          }}
        >
          {/* Botanical corners */}
          <div className="botanical-corners" aria-hidden="true">
            <BotanicalCorner />
            <BotanicalCorner />
            <BotanicalCorner />
            <BotanicalCorner />
          </div>

          {/* Date */}
          <motion.div {...fadeProps(0.25)} style={{ marginBottom: '2rem' }}>
            <p
              className="font-sc"
              style={{
                fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                letterSpacing: '0.18em',
                color: 'rgba(212,176,122,0.65)',
                marginBottom: '0.75rem',
              }}
            >
              {date}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              {/* Calendar icon */}
              <div style={{ color: 'rgba(184,149,96,0.5)', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <p
                  className="label-sm"
                  style={{ color: 'rgba(184,149,96,0.7)', marginBottom: '0.2rem' }}
                >
                  {muhoorthamLabel}
                </p>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    fontWeight: 300,
                    color: 'rgba(246,240,229,0.95)',
                    letterSpacing: '0.06em',
                    lineHeight: 1,
                  }}
                >
                  {muhoortham}
                </p>
              </div>
            </div>
            <p
              className="font-sans"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'rgba(196,175,166,0.65)',
                marginTop: '0.5rem',
              }}
            >
              {receptionTime}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            {...fadeProps(0.35)}
            aria-hidden="true"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}
          >
            <div style={{ flex: 1, height: '1px', background: 'rgba(184,149,96,0.2)' }} />
            <span style={{ color: 'rgba(184,149,96,0.45)', fontFamily: 'var(--font-serif)', fontSize: '0.7rem' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(184,149,96,0.2)' }} />
          </motion.div>

          {/* Venue */}
          <motion.div {...fadeProps(0.4)}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ color: 'rgba(184,149,96,0.5)', marginTop: '3px', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p className="label-sm" style={{ color: 'rgba(184,149,96,0.7)', marginBottom: '0.3rem' }}>Venue</p>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                    fontWeight: 500,
                    color: 'rgba(246,240,229,0.9)',
                    lineHeight: 1.3,
                    marginBottom: '0.35rem',
                  }}
                >
                  {venueName}
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(196,175,166,0.7)',
                    lineHeight: 1.6,
                    letterSpacing: '0.04em',
                  }}
                >
                  {venueAddress}<br />{venueCity}
                </p>
              </div>
            </div>

            {/* Map link */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-invitation"
              style={{ marginTop: '0.5rem' }}
              aria-label={`Open map for ${venueName}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
