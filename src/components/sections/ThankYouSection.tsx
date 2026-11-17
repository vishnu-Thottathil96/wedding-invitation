import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BotanicalCorner, OrnamentDivider } from '../ui/Ornaments';

interface ThankYouSectionProps {
  brideName: string;
  groomName: string;
  initials: string;
  onScrollTop: () => void;
}

export function ThankYouSection({ brideName, groomName, initials, onScrollTop }: ThankYouSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.0, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  return (
    <section
      id="thank-you"
      aria-label="Closing message"
      style={{
        background: 'var(--ivory)',
        padding: 'var(--section-pad) var(--gutter)',
        paddingBottom: 'calc(var(--section-pad) * 1.5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
          border: 'var(--border-gold)',
        }}
      >
        {/* Botanical corners */}
        <div className="botanical-corners" aria-hidden="true">
          <BotanicalCorner />
          <BotanicalCorner />
          <BotanicalCorner />
          <BotanicalCorner />
        </div>

        {/* Inner frame */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '8px',
            border: '1px solid rgba(184,149,96,0.15)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Monogram */}
          <motion.div {...fade(0)} style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '72px',
                height: '72px',
                border: '1px solid rgba(184,149,96,0.45)',
                borderRadius: '50%',
                marginBottom: '0.5rem',
              }}
            >
              <span
                className="font-serif"
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 300,
                  color: 'var(--gold)',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                }}
              >
                {initials}
              </span>
            </div>
          </motion.div>

          {/* Thank you heading */}
          <motion.h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 7vw, 4rem)',
              fontWeight: 300,
              color: 'var(--brown)',
              lineHeight: 1.05,
              letterSpacing: '0.02em',
              marginBottom: '1.5rem',
            }}
            {...fade(0.1)}
          >
            With Gratitude
          </motion.h2>

          <OrnamentDivider />

          {/* Body text */}
          <motion.p
            className="font-serif"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--brown-light)',
              lineHeight: 1.9,
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              padding: '0 clamp(0.5rem, 3vw, 1.5rem)',
            }}
            {...fade(0.2)}
          >
            Your presence at our celebration is the greatest gift.
            We look forward to sharing this joyful day with you,
            surrounded by the warmth of family and the blessings of those we love.
          </motion.p>

          <OrnamentDivider />

          {/* Signature */}
          <motion.div {...fade(0.35)} style={{ marginTop: '1.75rem' }}>
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.8rem, 6vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--brown)',
                lineHeight: 1.1,
                letterSpacing: '0.02em',
              }}
            >
              {brideName} &amp; {groomName}
            </p>
            <p
              className="font-sc"
              style={{
                fontSize: 'clamp(0.55rem, 1.4vw, 0.65rem)',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                marginTop: '0.5rem',
              }}
            >
              Together with their families
            </p>
          </motion.div>

          {/* Scroll to top */}
          <motion.div {...fade(0.5)} style={{ marginTop: '3rem' }}>
            <button
              className="btn-invitation btn-invitation--dark"
              onClick={onScrollTop}
              aria-label="Return to the top of the invitation"
              style={{ fontSize: '0.62rem', padding: '0.75rem 1.75rem' }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              Back to the Beginning
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
