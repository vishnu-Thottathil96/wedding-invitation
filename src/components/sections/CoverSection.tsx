import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Floral Corner SVG ──────────────────────────────────────────────────────
// A refined botanical sprig with petals, leaves, berries and fine stems.
// Designed to sit at a corner and extend inward — mirrors via CSS transform.
function FloralCorner() {
  return (
    <svg
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* ── Main diagonal stem ── */}
      <path
        d="M6 104 C18 82, 38 58, 62 32"
        stroke="#B89560"
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      {/* ── Secondary stem branch ── */}
      <path
        d="M30 76 C24 62, 30 50, 40 44"
        stroke="#B89560"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      {/* ── Tertiary stem ── */}
      <path
        d="M50 56 C56 48, 60 40, 66 34"
        stroke="#B89560"
        strokeWidth="0.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />

      {/* ── Large leaf pair — lower ── */}
      <path
        d="M16 90 C6 80, 4 68, 14 66 C22 64, 26 78, 20 88Z"
        fill="#65745A"
        opacity="0.52"
      />
      <path
        d="M20 88 C30 84, 36 72, 28 68 C22 66, 18 78, 20 88Z"
        fill="#65745A"
        opacity="0.38"
      />

      {/* ── Medium leaf pair — mid ── */}
      <path
        d="M36 64 C26 54, 26 44, 36 42 C44 40, 46 56, 38 64Z"
        fill="#65745A"
        opacity="0.5"
      />
      <path
        d="M38 64 C48 58, 52 46, 44 42 C38 40, 36 56, 38 64Z"
        fill="#65745A"
        opacity="0.36"
      />

      {/* ── Small leaf pair — upper ── */}
      <path
        d="M54 46 C46 38, 46 30, 54 28 C60 26, 62 38, 56 46Z"
        fill="#65745A"
        opacity="0.48"
      />
      <path
        d="M56 46 C64 40, 66 30, 60 28 C54 26, 52 38, 56 46Z"
        fill="#65745A"
        opacity="0.34"
      />

      {/* ── Bloom cluster at tip — 5 petals ── */}
      <circle cx="66" cy="28" r="5.5" fill="#EDE5D3" opacity="0.9" />
      <ellipse cx="66" cy="21" rx="3" ry="5" fill="#D4B07A" opacity="0.55" transform="rotate(-10 66 21)" />
      <ellipse cx="72" cy="25" rx="3" ry="5" fill="#D4B07A" opacity="0.55" transform="rotate(35 72 25)" />
      <ellipse cx="71" cy="32" rx="3" ry="5" fill="#D4B07A" opacity="0.5" transform="rotate(80 71 32)" />
      <ellipse cx="62" cy="34" rx="3" ry="5" fill="#D4B07A" opacity="0.5" transform="rotate(130 62 34)" />
      <ellipse cx="59" cy="26" rx="3" ry="5" fill="#D4B07A" opacity="0.5" transform="rotate(200 59 26)" />
      {/* Bloom centre */}
      <circle cx="66" cy="28" r="2.8" fill="#B89560" opacity="0.8" />
      <circle cx="66" cy="28" r="1.4" fill="#D4B07A" opacity="1" />

      {/* ── Small bud at branch tip ── */}
      <ellipse cx="40" cy="42" rx="2.2" ry="3.5" fill="#D4B07A" opacity="0.55" transform="rotate(-20 40 42)" />
      <circle cx="40" cy="40" r="1.5" fill="#B89560" opacity="0.65" />

      {/* ── Berries along stem ── */}
      <circle cx="24" cy="80" r="2"   fill="#B89560" opacity="0.55" />
      <circle cx="22" cy="83" r="1.5" fill="#B89560" opacity="0.4" />
      <circle cx="42" cy="58" r="1.8" fill="#B89560" opacity="0.5" />
      <circle cx="58" cy="42" r="1.5" fill="#B89560" opacity="0.45" />

      {/* ── Fine vein lines on large leaves ── */}
      <path
        d="M16 90 C18 82, 20 76, 24 72"
        stroke="#B89560"
        strokeWidth="0.4"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M36 64 C40 58, 42 52, 42 46"
        stroke="#B89560"
        strokeWidth="0.4"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* ── Corner bracket lines ── */}
      <path
        d="M2 18 L2 2 L18 2"
        stroke="#B89560"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

// ── Circular portrait ──────────────────────────────────────────────────────
function CircularPortrait({
  src,
  alt,
  name,
  label,
  delay,
}: {
  src: string;
  alt: string;
  name: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.0, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        flex: '0 0 auto',
      }}
    >
      {/* Outer decorative ring */}
      <div style={{ position: 'relative' }}>
        {/* Outer faint ring */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-7px',
            borderRadius: '50%',
            border: '1px solid rgba(184, 149, 96, 0.22)',
          }}
        />
        {/* Gold border ring */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-3px',
            borderRadius: '50%',
            border: '1.5px solid rgba(184, 149, 96, 0.65)',
          }}
        />
        {/* Photo circle */}
        <div
          style={{
            width: 'clamp(100px, 28vw, 148px)',
            height: 'clamp(100px, 28vw, 148px)',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'var(--ivory-deep)',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'sepia(6%) saturate(88%) brightness(1.03) contrast(103%)',
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Small diamond accent at bottom of circle */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '6px',
            height: '6px',
            background: 'var(--gold)',
            borderRadius: '1px',
            rotate: '45deg',
          }}
        />
      </div>

      {/* Label above name */}
      <div style={{ textAlign: 'center', marginTop: '6px' }}>
        <p
          style={{
            fontFamily: 'var(--font-sc)',
            fontSize: 'clamp(0.52rem, 1.3vw, 0.62rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.2rem',
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 4vw, 1.6rem)',
            fontWeight: 300,
            color: 'var(--brown)',
            letterSpacing: '0.03em',
            lineHeight: 1.1,
          }}
        >
          {name}
        </p>
      </div>
    </motion.div>
  );
}

// ── Cover Section ──────────────────────────────────────────────────────────
interface CoverSectionProps {
  coverSrc?: string;
  brideSrc: string;
  groomSrc: string;
  brideName: string;
  groomName: string;
  date: string;
  muhoortham: string;
  muhoorthamLabel: string;
  onReveal: () => void;
}

export function CoverSection({
  coverSrc,
  brideSrc,
  groomSrc,
  brideName,
  groomName,
  date,
  muhoortham,
  muhoorthamLabel,
  onReveal,
}: CoverSectionProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
    // Let exit animation play then fire parent callback
    setTimeout(onReveal, 650);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleReveal();
    }
  };

  return (
    <AnimatePresence>
      {!revealed && (
        coverSrc ? (
          <motion.section
            id="cover"
            aria-label="Wedding invitation cover"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={handleReveal}
            style={{
              position: 'relative',
              minHeight: '100svh',
              height: '100svh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              overflow: 'hidden',
              paddingBottom: 'clamp(2.5rem, 7vh, 4.5rem)',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              cursor: 'pointer',
              backgroundColor: '#000',
            }}
          >
            {/* Full-screen background image — no borders, frames, or floral corners */}
            <img
              src={coverSrc}
              alt="Wedding Invitation Cover"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                zIndex: 0,
                userSelect: 'none',
              }}
              loading="eager"
            />

            {/* Only the button on it */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleReveal();
                }}
                onKeyDown={handleKeyDown}
                aria-label="View the wedding invitation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: 'clamp(0.75rem, 2vw, 0.95rem) clamp(1.8rem, 5vw, 2.6rem)',
                  background: 'var(--sage)',
                  border: '1px solid rgba(212, 176, 122, 0.7)',
                  borderRadius: '2px',
                  color: 'var(--ivory)',
                  fontFamily: 'var(--font-sc)',
                  fontSize: 'clamp(0.68rem, 1.8vw, 0.8rem)',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                  backdropFilter: 'blur(6px)',
                  transition: 'background 0.35s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.35s, transform 0.35s',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--sage-dark)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.45)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--sage)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.35)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
                onFocus={e => {
                  (e.currentTarget as HTMLButtonElement).style.outline = '2px solid var(--gold)';
                  (e.currentTarget as HTMLButtonElement).style.outlineOffset = '3px';
                }}
                onBlur={e => {
                  (e.currentTarget as HTMLButtonElement).style.outline = 'none';
                }}
              >
                View Invitation
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </motion.div>
          </motion.section>
        ) : (
          <motion.section
            id="cover"
            aria-label="Wedding invitation cover"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'relative',
              minHeight: '100svh',
              background: 'var(--ivory)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 2.5rem)',
            }}
          >
            {/* ── Outer decorative frame ── */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 'clamp(0.75rem, 2.5vw, 1.25rem)',
                border: '1px solid rgba(184, 149, 96, 0.38)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            {/* Inner frame — offset for layered effect */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 'clamp(1.25rem, 3.5vw, 1.9rem)',
                border: '1px solid rgba(184, 149, 96, 0.18)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* ── Floral corners ── */}
            {([
              { corner: 'tl', style: { top: 0, left: 0 } },
              { corner: 'tr', style: { top: 0, right: 0, transform: 'scaleX(-1)' } },
              { corner: 'bl', style: { bottom: 0, left: 0, transform: 'scaleY(-1)' } },
              { corner: 'br', style: { bottom: 0, right: 0, transform: 'scale(-1)' } },
            ] as const).map(({ corner, style }) => (
              <div
                key={corner}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  width: 'clamp(72px, 18vw, 120px)',
                  height: 'clamp(72px, 18vw, 120px)',
                  pointerEvents: 'none',
                  zIndex: 2,
                  ...style,
                }}
              >
                <FloralCorner />
              </div>
            ))}

            {/* ── Content ── */}
            <div
              style={{
                position: 'relative',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
                width: '100%',
                maxWidth: '480px',
              }}
            >
              {/* Small top label */}
              <motion.p
                aria-label="Wedding Invitation"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                style={{
                  fontFamily: 'var(--font-sc)',
                  fontSize: 'clamp(0.55rem, 1.4vw, 0.65rem)',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                }}
              >
                Wedding Invitation
              </motion.p>

              {/* ── Portrait pair ── */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  gap: 'clamp(1.5rem, 6vw, 3rem)',
                  width: '100%',
                }}
              >
                <CircularPortrait
                  src={brideSrc}
                  alt={`Portrait of ${brideName}, the bride`}
                  name={brideName}
                  label="The Bride"
                  delay={0.5}
                />

                {/* Centre ornament between portraits */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  aria-hidden="true"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    paddingTop: 'clamp(28px, 7vw, 42px)',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ width: '1px', height: '18px', background: 'rgba(184,149,96,0.35)' }} />
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                      fontWeight: 300,
                      color: 'rgba(184,149,96,0.7)',
                      lineHeight: 1,
                      letterSpacing: '0.05em',
                    }}
                  >
                    &amp;
                  </p>
                  <div style={{ width: '1px', height: '18px', background: 'rgba(184,149,96,0.35)' }} />
                </motion.div>

                <CircularPortrait
                  src={groomSrc}
                  alt={`Portrait of ${groomName}, the groom`}
                  name={groomName}
                  label="The Groom"
                  delay={0.6}
                />
              </div>

              {/* ── Ornamental rule ── */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                aria-hidden="true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginTop: 'clamp(1.75rem, 4.5vw, 2.75rem)',
                  width: '100%',
                  maxWidth: '280px',
                  transformOrigin: 'center',
                }}
              >
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(184,149,96,0.45))' }} />
                <div style={{ width: '5px', height: '5px', background: 'var(--gold)', transform: 'rotate(45deg)', opacity: 0.7, flexShrink: 0 }} />
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(184,149,96,0.45))' }} />
              </motion.div>

              {/* ── Date line ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15 }}
                style={{
                  textAlign: 'center',
                  marginTop: 'clamp(1rem, 2.8vw, 1.5rem)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(0.9rem, 2.4vw, 1.1rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: 'var(--brown-light)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.5,
                  }}
                >
                  {date}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sc)',
                    fontSize: 'clamp(0.52rem, 1.3vw, 0.62rem)',
                    letterSpacing: '0.22em',
                    color: 'var(--gold)',
                    marginTop: '0.3rem',
                  }}
                >
                  {muhoorthamLabel} · {muhoortham}
                </p>
              </motion.div>

              {/* ── View Invitation button ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.4 }}
                style={{ marginTop: 'clamp(1.75rem, 4.5vw, 2.5rem)' }}
              >
                <button
                  onClick={handleReveal}
                  onKeyDown={handleKeyDown}
                  aria-label="View the wedding invitation"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: 'clamp(0.7rem, 2vw, 0.9rem) clamp(1.6rem, 4vw, 2.4rem)',
                    background: 'var(--sage)',
                    border: 'none',
                    color: 'var(--ivory)',
                    fontFamily: 'var(--font-sc)',
                    fontSize: 'clamp(0.6rem, 1.6vw, 0.72rem)',
                    fontWeight: 400,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background 0.35s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.35s',
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--sage-dark)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(101,116,90,0.25)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--sage)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                  onFocus={e => {
                    (e.currentTarget as HTMLButtonElement).style.outline = '2px solid var(--gold)';
                    (e.currentTarget as HTMLButtonElement).style.outlineOffset = '3px';
                  }}
                  onBlur={e => {
                    (e.currentTarget as HTMLButtonElement).style.outline = 'none';
                  }}
                >
                  View Invitation
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.section>
        )
      )}
    </AnimatePresence>
  );
}
