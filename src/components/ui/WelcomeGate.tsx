import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type confetti from 'canvas-confetti';

// The rose effect library is only downloaded when it's needed
const loadConfetti = () => import('canvas-confetti').then((m) => m.default);

const ROSE_SCALAR = 3.4; // size of the rose emoji particles
const PETAL_COLORS = ['#B3122E', '#D7263D', '#E8435A', '#F25C78', '#FF8FA3', '#8E1728'];

// ── Opening choreography (ms) ──────────────────────────────────────────────
const T = {
  sealCrack: 0, //   seal splits in two
  flapOpen: 350, //  flap lifts (700ms)
  flapBehind: 700, // flap tucks behind the card once it passes upright
  cardOut: 1050, //  card slides out of the envelope (900ms)
  envelopeAway: 2100, // envelope drops away, card comes forward (800ms)
  roses: 2300,
  fade: 2900, //     whole intro fades to the first page (600ms)
  done: 3500,
};
const s = (ms: number) => ms / 1000;

// ── Paper & table textures (procedural noise, no images needed) ──────────────
const noise = (freq: number, alpha: number, tint = '0.36 0.29 0.21') =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${tint.split(' ')[0]}  0 0 0 0 ${tint.split(' ')[1]}  0 0 0 0 ${tint.split(' ')[2]}  0 0 0 ${alpha} 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

const PAPER_GRAIN = noise(0.85, 0.32);
const TABLE_GRAIN = noise(0.6, 0.55, '0.08 0.06 0.05');

const PAPER = '#F2EADC'; // cotton ivory
const PAPER_SHADE = '#E7DCC8';
const INK = '#5B2A22'; // letterpress maroon-brown

// Wax seal outline: a circle with small irregular "drips" so it reads as poured wax
const SEAL_PATH = (() => {
  const pts: string[] = [];
  const n = 46;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const wobble =
      Math.sin(a * 3 + 0.6) * 1.6 + Math.sin(a * 7 + 1.9) * 1.1 + Math.sin(a * 13 + 0.3) * 0.7;
    const r = 46 + wobble;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(' L')} Z`;
})();

const WaxSeal: React.FC<{ initials: string }> = ({ initials }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <defs>
      <radialGradient id="wax" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#A3283A" />
        <stop offset="45%" stopColor="#7E1626" />
        <stop offset="100%" stopColor="#4C0A14" />
      </radialGradient>
      <radialGradient id="waxInner" cx="60%" cy="65%" r="70%">
        <stop offset="0%" stopColor="#8E1C2E" />
        <stop offset="100%" stopColor="#5E0F1B" />
      </radialGradient>
    </defs>
    {/* Poured wax body with soft shadow on the paper */}
    <path d={SEAL_PATH} fill="rgba(40,10,10,0.35)" transform="translate(1.5 2.5)" style={{ filter: 'blur(1.5px)' }} />
    <path d={SEAL_PATH} fill="url(#wax)" />
    {/* Pressed inner disc */}
    <circle cx="50" cy="50" r="33" fill="url(#waxInner)" />
    <circle cx="50" cy="50" r="33" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
    <circle cx="50" cy="50" r="31.6" fill="none" stroke="rgba(255,190,190,0.18)" strokeWidth="0.8" />
    {/* Beaded rim pressed by the stamp */}
    {Array.from({ length: 28 }, (_, i) => {
      const a = (i / 28) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={50 + 28 * Math.cos(a)}
          cy={50 + 28 * Math.sin(a)}
          r="0.9"
          fill="rgba(0,0,0,0.32)"
        />
      );
    })}
    {/* Monogram, debossed */}
    <text
      x="50"
      y="55.5"
      textAnchor="middle"
      fontFamily="Cormorant Garamond, Georgia, serif"
      fontStyle="italic"
      fontWeight="600"
      fontSize="18"
      fill="rgba(30,4,8,0.72)"
    >
      {initials}
    </text>
    <text
      x="50"
      y="54.7"
      textAnchor="middle"
      fontFamily="Cormorant Garamond, Georgia, serif"
      fontStyle="italic"
      fontWeight="600"
      fontSize="18"
      fill="rgba(255,175,175,0.32)"
    >
      {initials}
    </text>
    {/* Glossy highlight */}
    <ellipse cx="34" cy="28" rx="11" ry="5" fill="rgba(255,255,255,0.16)" transform="rotate(-28 34 28)" />
  </svg>
);

interface WelcomeGateProps {
  onOpen: () => void;
  /** Called right on the tap (used to start the music while the browser still allows sound) */
  onTap?: () => void;
  brideName?: string;
  groomName?: string;
}

export const WelcomeGate: React.FC<WelcomeGateProps> = ({
  onOpen,
  onTap,
  brideName = 'Anaswara',
  groomName = 'Ashil',
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [flapBehind, setFlapBehind] = useState(false);
  const [cardFront, setCardFront] = useState(false); // card lifted clear of the envelope
  const reduced = Boolean(useReducedMotion());
  const initials = `${brideName.charAt(0)}&${groomName.charAt(0)}`;

  const triggerRoses = async () => {
    const confetti = await loadConfetti();
    const rose = confetti.shapeFromText({ text: '🌹', scalar: ROSE_SCALAR });
    const petal = confetti.shapeFromPath({ path: 'M6 0 C 11 3, 12 10, 6 16 C 0 10, 1 3, 6 0 Z' });
    const roses = (opts: confetti.Options) =>
      confetti({ shapes: [rose], scalar: ROSE_SCALAR, flat: false, disableForReducedMotion: true, ...opts });
    const petals = (opts: confetti.Options) =>
      confetti({ shapes: [petal], colors: PETAL_COLORS, scalar: 1.4, disableForReducedMotion: true, ...opts });

    roses({ particleCount: 22, spread: 110, origin: { y: 0.5 }, startVelocity: 38, gravity: 0.9, ticks: 260 });
    petals({ particleCount: 55, spread: 120, origin: { y: 0.5 }, startVelocity: 36, gravity: 0.7, ticks: 300 });
    setTimeout(() => {
      petals({ particleCount: 70, spread: 160, origin: { y: 0.1 }, startVelocity: 16, gravity: 0.45, drift: 0.4, ticks: 420 });
      roses({ particleCount: 8, spread: 140, origin: { y: 0.15 }, startVelocity: 14, gravity: 0.55, ticks: 380 });
    }, 300);
  };

  const handleOpen = () => {
    if (isOpening) return;
    onTap?.();
    void loadConfetti(); // start fetching the rose effect right away
    setIsOpening(true);
    if (reduced) {
      setTimeout(onOpen, 600);
      return;
    }
    setTimeout(() => setFlapBehind(true), T.flapBehind);
    setTimeout(() => setCardFront(true), T.envelopeAway);
    setTimeout(triggerRoses, T.roses);
    setTimeout(onOpen, T.done);
  };

  // Envelope pieces (not the card) drop away together at the end
  const envelopeAway = {
    initial: false as const,
    animate: isOpening ? { y: '70%', opacity: 0 } : { y: '0%', opacity: 1 },
    transition: { duration: s(800), delay: s(T.envelopeAway), ease: [0.55, 0, 0.75, 0.2] as const },
  };

  const flapShape = 'polygon(0 0, 100% 0, 50% 58%)';
  // Seen from behind after it flips up, the flap's inside is drawn mirrored
  const flapInsideShape = 'polygon(0 100%, 100% 100%, 50% 42%)';

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Open the wedding invitation"
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={
        isOpening
          ? { duration: reduced ? 0.6 : s(T.done - T.fade), delay: reduced ? 0 : s(T.fade) }
          : { duration: 0.6 }
      }
      className={`fixed inset-0 z-50 overflow-hidden select-none outline-none flex flex-col items-center justify-center ${
        isOpening ? 'pointer-events-none' : 'cursor-pointer'
      }`}
      style={{
        // A dark linen table under a soft overhead light
        backgroundColor: '#2C2420',
        backgroundImage: `radial-gradient(ellipse 70% 55% at 50% 42%, rgba(255,236,205,0.16) 0%, rgba(0,0,0,0) 70%), radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%), ${TABLE_GRAIN}`,
      }}
    >
      {/* ── Envelope ── */}
      <motion.div
        initial={{ opacity: 0, y: 14, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative"
        style={{ width: 'min(86vw, 460px, calc(52vh - 50px))', aspectRatio: '1.46', perspective: '1400px' }}
      >
        {/* Shadow on the table */}
        <motion.div
          {...envelopeAway}
          aria-hidden="true"
          className="absolute inset-0 rounded-[3px]"
          style={{ boxShadow: '0 2px 3px rgba(0,0,0,0.35), 0 18px 40px -8px rgba(0,0,0,0.65), 0 40px 70px -20px rgba(0,0,0,0.5)' }}
        />

        {/* 1. Inside of the envelope (seen once the flap lifts) */}
        <motion.div
          {...envelopeAway}
          aria-hidden="true"
          className="absolute inset-0 rounded-[3px] overflow-hidden"
          style={{ zIndex: 1, backgroundColor: PAPER_SHADE, backgroundImage: PAPER_GRAIN }}
        >
          {/* Printed liner inside the top of the envelope */}
          <div
            className="absolute inset-x-[3%] top-[3%] h-[55%]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background:
                'repeating-linear-gradient(135deg, #7A1A26 0 6px, #8A2431 6px 7px, #7A1A26 7px 13px), #7A1A26',
              opacity: 0.9,
            }}
          />
        </motion.div>

        {/* 2. Top flap — flips up on its top edge */}
        <motion.div
          {...envelopeAway}
          className="absolute inset-0"
          style={{ zIndex: flapBehind ? 2 : 5 }}
        >
          <motion.div
            initial={false}
            animate={{ rotateX: isOpening ? 180 : 0 }}
            transition={{ duration: s(700), delay: s(T.flapOpen), ease: [0.45, 0, 0.25, 1] }}
            className="absolute inset-0"
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
          >
            {/* Outside of the flap */}
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
              {/* soft shadow it casts on the envelope */}
              <div
                className="absolute inset-0"
                style={{ clipPath: flapShape, background: 'rgba(60,40,20,0.22)', transform: 'translateY(2px)', filter: 'blur(1.2px)' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  clipPath: flapShape,
                  backgroundColor: PAPER,
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%, rgba(120,90,50,0.10) 100%), ${PAPER_GRAIN}`,
                }}
              />
            </div>
            {/* Inside of the flap (liner) */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
            >
              <div
                className="absolute inset-0"
                style={{ clipPath: flapInsideShape, backgroundColor: PAPER, backgroundImage: PAPER_GRAIN }}
              />
              <div
                className="absolute inset-[3%]"
                style={{
                  clipPath: flapInsideShape,
                  background:
                    'repeating-linear-gradient(45deg, #7A1A26 0 6px, #8A2431 6px 7px, #7A1A26 7px 13px), #7A1A26',
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* 3. The invitation card */}
        <motion.div
          initial={false}
          animate={
            isOpening
              ? { y: ['0%', '0%', '-99%', '-99%', '-8%', '-8%'], scale: [1, 1, 1, 1, 1.12, 1.3], rotate: [0, 0, 0, 0, 2, 2] }
              : { y: '0%', scale: 1, rotate: 0 }
          }
          transition={{
            duration: s(T.done),
            times: [0, T.cardOut / T.done, (T.cardOut + 900) / T.done, T.envelopeAway / T.done, (T.envelopeAway + 800) / T.done, 1],
            ease: 'easeInOut',
          }}
          className="absolute left-[4.5%] right-[4.5%] top-[5%] h-[90%] rounded-[2px] flex flex-col items-center pt-[6%] px-[6%] text-center [container-type:inline-size]"
          style={{
            zIndex: cardFront ? 7 : 3,
            backgroundColor: '#FAF6EE',
            backgroundImage: noise(0.9, 0.18),
            boxShadow: '0 1px 2px rgba(0,0,0,0.18), 0 6px 18px rgba(0,0,0,0.18)',
            color: INK,
          }}
        >
          {/* Thin double rule border, as on a letterpress card */}
          <div className="absolute inset-[5px] border border-[#8A5A3C]/35 pointer-events-none" />
          <div className="absolute inset-[8px] border border-[#8A5A3C]/20 pointer-events-none" />

          <p className="mt-[2%] font-serif italic text-[3.8cqw] opacity-90">
            Together with their families
          </p>
          <h1 className="mt-[1%] font-script text-[10.4cqw] leading-none whitespace-nowrap" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.6)' }}>
            {brideName} &amp; {groomName}
          </h1>
          <p className="mt-[3%] font-cinzel text-[3cqw] tracking-[0.35em]">
            21 · XI · 2026
          </p>
          <p className="mt-[3%] font-serif italic text-[3.4cqw] opacity-80">
            request the pleasure of your company
          </p>
        </motion.div>

        {/* 4. Front pocket: side and bottom flaps, folded over the card */}
        <motion.div {...envelopeAway} aria-hidden="true" className="absolute inset-0" style={{ zIndex: 4 }}>
          <svg viewBox="0 0 146 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="sideL" x1="0" x2="1">
                <stop offset="0%" stopColor="#E9DFCC" />
                <stop offset="100%" stopColor="#EFE6D6" />
              </linearGradient>
              <linearGradient id="sideR" x1="1" x2="0">
                <stop offset="0%" stopColor="#E6DBC7" />
                <stop offset="100%" stopColor="#EDE3D2" />
              </linearGradient>
              <linearGradient id="bottom" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#EEE5D5" />
                <stop offset="100%" stopColor="#F5EEE2" />
              </linearGradient>
              <filter id="foldShadow" x="-5%" y="-10%" width="110%" height="120%">
                <feDropShadow dx="0" dy="-0.6" stdDeviation="0.7" floodColor="#5A4020" floodOpacity="0.22" />
              </filter>
            </defs>
            <polygon points="0,0 73,52 0,100" fill="url(#sideL)" />
            <polygon points="146,0 73,52 146,100" fill="url(#sideR)" />
            <polygon points="0,100 73,44 146,100" fill="url(#bottom)" filter="url(#foldShadow)" />
            {/* crisp fold edges */}
            <polyline points="0,0 73,52 0,100" fill="none" stroke="rgba(110,80,45,0.18)" strokeWidth="0.35" />
            <polyline points="146,0 73,52 146,100" fill="none" stroke="rgba(110,80,45,0.18)" strokeWidth="0.35" />
          </svg>
          {/* paper grain over the folds */}
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: PAPER_GRAIN }} />
          {/* Return line printed on the back flap */}
          <p
            className="absolute bottom-[9%] left-0 right-0 text-center font-cinzel text-[8px] sm:text-[10px] tracking-[0.35em]"
            style={{ color: INK, opacity: 0.55 }}
          >
            {brideName.toUpperCase()} · {groomName.toUpperCase()}
          </p>
        </motion.div>

        {/* 5. Wax seal at the tip of the flap — cracks in two when opened */}
        <motion.div
          {...envelopeAway}
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[23%] aspect-square"
          style={{ zIndex: 6 }}
        >
          {(['left', 'right'] as const).map((half) => (
            <motion.div
              key={half}
              initial={false}
              animate={
                isOpening
                  ? { x: half === 'left' ? -7 : 7, y: 3, rotate: half === 'left' ? -9 : 9, opacity: 0 }
                  : { x: 0, y: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.5, delay: s(T.sealCrack), ease: 'easeOut' }}
              className="absolute inset-0"
              style={{
                // jagged break line down the middle of the wax
                clipPath:
                  half === 'left'
                    ? 'polygon(0 0, 52% 0, 47% 18%, 54% 36%, 46% 55%, 53% 74%, 48% 100%, 0 100%)'
                    : 'polygon(52% 0, 100% 0, 100% 100%, 48% 100%, 53% 74%, 46% 55%, 54% 36%, 47% 18%)',
              }}
            >
              <WaxSeal initials={initials} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Quiet hint under the envelope ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0 : 0.75 }}
        transition={{ duration: isOpening ? 0.3 : 1.2, delay: isOpening ? 0 : 0.8 }}
        className="mt-10 sm:mt-12 font-serif italic text-[15px] sm:text-base tracking-wide text-[#E9DFCC]"
      >
        Tap the seal to open
      </motion.p>
    </motion.div>
  );
};
