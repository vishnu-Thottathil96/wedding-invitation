import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Botanical Crest SVG ──────────────────────────────────────────────────────
// A delicate botanical laurel sprig with sage leaves and antique gold florets
function BotanicalCrest() {
  return (
    <svg
      viewBox="0 0 120 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', width: '90px', height: '33px', margin: '0 auto' }}
    >
      {/* Central diamond */}
      <polygon points="60,18 64,22 60,26 56,22" fill="#B89560" opacity="0.9" />
      <circle cx="60" cy="22" r="1.2" fill="#F6F0E5" />

      {/* Left stem */}
      <path
        d="M54 22 C42 22, 28 17, 10 24"
        stroke="#B89560"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Left leaves */}
      <path
        d="M44 21 C41 15, 34 16, 36 21 C37 23, 42 22, 44 21Z"
        fill="#65745A"
        opacity="0.65"
      />
      <path
        d="M32 20 C28 14, 21 16, 24 22 C26 24, 30 22, 32 20Z"
        fill="#65745A"
        opacity="0.55"
      />
      <path
        d="M20 22 C16 18, 10 21, 13 25 C15 27, 19 24, 20 22Z"
        fill="#65745A"
        opacity="0.5"
      />
      {/* Left gold berries */}
      <circle cx="48" cy="25" r="1.3" fill="#B89560" opacity="0.75" />
      <circle cx="27" cy="25" r="1.2" fill="#B89560" opacity="0.65" />

      {/* Right stem */}
      <path
        d="M66 22 C78 22, 92 17, 110 24"
        stroke="#B89560"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Right leaves */}
      <path
        d="M76 21 C79 15, 86 16, 84 21 C83 23, 78 22, 76 21Z"
        fill="#65745A"
        opacity="0.65"
      />
      <path
        d="M88 20 C92 14, 99 16, 96 22 C94 24, 90 22, 88 20Z"
        fill="#65745A"
        opacity="0.55"
      />
      <path
        d="M100 22 C104 18, 110 21, 107 25 C105 27, 101 24, 100 22Z"
        fill="#65745A"
        opacity="0.5"
      />
      {/* Right gold berries */}
      <circle cx="72" cy="25" r="1.3" fill="#B89560" opacity="0.75" />
      <circle cx="93" cy="25" r="1.2" fill="#B89560" opacity="0.65" />
    </svg>
  );
}

// ── Corner Botanical Flourish ────────────────────────────────────────────────
export function CornerFlourish({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const isTop = position.startsWith('t');
  const isLeft = position.endsWith('l');

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: isTop ? '6px' : 'auto',
        bottom: isTop ? 'auto' : '6px',
        left: isLeft ? '6px' : 'auto',
        right: isLeft ? 'auto' : '6px',
        width: '34px',
        height: '34px',
        transform: `scale(${isLeft ? 1 : -1}, ${isTop ? 1 : -1})`,
        pointerEvents: 'none',
        opacity: 0.65,
      }}
    >
      <path
        d="M3 45 C7 28, 18 16, 45 3"
        stroke="#B89560"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M14 34 C8 28, 6 20, 14 18 C19 17, 21 27, 16 32Z"
        fill="#65745A"
        opacity="0.55"
      />
      <path
        d="M28 20 C22 14, 21 7, 28 6 C33 6, 34 15, 30 19Z"
        fill="#65745A"
        opacity="0.45"
      />
      <circle cx="38" cy="8" r="1.4" fill="#B89560" opacity="0.7" />
    </svg>
  );
}

// ── Types & Helpers ──────────────────────────────────────────────────────────
export interface CountdownSectionProps {
  dateISO: string;             // ISO 8601 string, e.g. "2026-11-22T10:47:00+05:30"
  quote?: string;              // Short meaningful quotation
  quoteAttribution?: string;   // Optional source/author
  timezone?: string;           // Optional venue timezone, e.g. "Asia/Kolkata"
  timezoneLabel?: string;      // e.g. "IST (UTC+05:30)"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

/**
 * Calculates time remaining until target ISO datetime.
 * Handles both offset-aware ISO strings and local strings with fallback venue offset.
 */
function calculateTimeLeft(targetISO: string, fallbackOffset = '+05:30'): TimeLeft {
  let normalizedISO = targetISO.trim();

  // If no timezone offset (+/-HH:MM or Z) is present, append the venue timezone offset
  const hasTimezone = /[Z+-]\d{2}(:?\d{2})?$/.test(normalizedISO) || normalizedISO.endsWith('Z');
  if (!hasTimezone) {
    normalizedISO = `${normalizedISO}${fallbackOffset}`;
  }

  const target = new Date(normalizedISO).getTime();
  const now = Date.now();
  const diff = target - now;

  if (isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

// ── Component ────────────────────────────────────────────────────────────────
export function CountdownSection({
  dateISO,
  quote = 'Two souls, two families — bound together by love, faith, and the grace of a new beginning.',
  quoteAttribution,
  timezoneLabel,
}: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(dateISO));
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-40px' });

  // Update timer every second and ensure cleanup on unmount
  useEffect(() => {
    // Initial check
    setTimeLeft(calculateTimeLeft(dateISO));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(dateISO));
    }, 1000);

    return () => clearInterval(interval);
  }, [dateISO]);

  const units = [
    { label: 'Days',    value: timeLeft.days,    pad: false },
    { label: 'Hours',   value: timeLeft.hours,   pad: true  },
    { label: 'Minutes', value: timeLeft.minutes, pad: true  },
    { label: 'Seconds', value: timeLeft.seconds, pad: true  },
  ];

  return (
    <section
      ref={sectionRef}
      id="countdown"
      aria-label="Wedding countdown"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(2.5rem, 6vw, 4rem) var(--gutter, 1rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 'clamp(340px, 94vw, 640px)',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* ── Outer Stationery Frame with counter_frame.png Background ── */}
        <div
          style={{
            position: 'relative',
            backgroundImage: "url('/images/counter_frame.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: 'clamp(2.5rem, 6vw, 3.5rem) clamp(1.25rem, 5vw, 2.5rem)',
            borderRadius: '4px',
            boxShadow: '0 8px 32px -8px rgba(73, 56, 47, 0.12)',
            overflow: 'hidden',
          }}
        >

          {/* ── Header: Botanical Crest & Eyebrow ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ textAlign: 'center', marginBottom: '1.25rem' }}
          >
            <BotanicalCrest />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                marginTop: '0.5rem',
              }}
            >
              <span
                style={{
                  width: '24px',
                  height: '1px',
                  background: 'rgba(184, 149, 96, 0.45)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sc)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--gold, #B89560)',
                  fontWeight: 500,
                }}
              >
                {timeLeft.expired ? 'With Heartfelt Blessings' : 'Counting The Moments'}
              </span>
              <span
                style={{
                  width: '24px',
                  height: '1px',
                  background: 'rgba(184, 149, 96, 0.45)',
                  display: 'inline-block',
                }}
              />
            </div>
          </motion.div>

          {/* ── Main Content: Active Countdown OR Tasteful Completed Message ── */}
          {timeLeft.expired ? (
            /* Tasteful Completed-Wedding Celebration Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                textAlign: 'center',
                padding: '1.25rem 0.5rem 1.5rem',
              }}
            >
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.75rem, 5vw, 2.4rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--brown, #49382F)',
                  lineHeight: 1.2,
                  margin: '0 0 0.75rem 0',
                }}
              >
                Happily Ever After
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)',
                  color: 'var(--brown-light, #705B4F)',
                  lineHeight: 1.65,
                  maxWidth: '380px',
                  margin: '0 auto',
                  fontWeight: 400,
                }}
              >
                Two souls united in love, family, and tradition. Thank you for your warm presence, heartfelt prayers, and lasting blessings.
              </p>
            </motion.div>
          ) : (
            /* 4 Balanced Groups Countdown (Unboxed, Airy, Editorial) */
            <motion.div
              className="countdown-grid"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ margin: '1rem auto 1.5rem auto' }}
            >
              {units.map((unit) => (
                <div key={unit.label} className="countdown-unit">
                  <span className="countdown-number">
                    {unit.pad ? pad(unit.value) : unit.value}
                  </span>
                  <span className="countdown-label">{unit.label}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Optional Venue Timezone Badge (Subtle & Restrained) */}
          {!timeLeft.expired && timezoneLabel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                textAlign: 'center',
                marginTop: '-0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(101, 116, 90, 0.85)',
                  background: 'rgba(101, 116, 90, 0.08)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(101, 116, 90, 0.2)',
                }}
              >
                Venue Time · {timezoneLabel}
              </span>
            </motion.div>
          )}

          {/* ── Ornamental Divider ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              margin: '1.25rem 0 1.25rem 0',
              color: 'rgba(184, 149, 96, 0.55)',
            }}
            aria-hidden="true"
          >
            <div style={{ width: '45px', height: '1px', background: 'rgba(184, 149, 96, 0.35)' }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', color: 'var(--gold, #B89560)' }}>✦</span>
            <div style={{ width: '45px', height: '1px', background: 'rgba(184, 149, 96, 0.35)' }} />
          </motion.div>

          {/* ── Meaningful Quotation (1-2 lines on mobile) ── */}
          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.45 }}
            style={{
              margin: 0,
              padding: '0 clamp(0.5rem, 3vw, 1.5rem)',
              textAlign: 'center',
            }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.05rem, 2.9vw, 1.25rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'var(--brown, #49382F)',
                lineHeight: 1.65,
                margin: 0,
                letterSpacing: '0.01em',
              }}
            >
              "{quote}"
            </p>
            {quoteAttribution && (
              <cite
                style={{
                  fontFamily: 'var(--font-sc)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontStyle: 'normal',
                  display: 'block',
                  color: 'var(--gold, #B89560)',
                  marginTop: '0.6rem',
                }}
              >
                — {quoteAttribution}
              </cite>
            )}
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
