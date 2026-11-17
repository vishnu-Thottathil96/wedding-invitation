import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fireflies } from '../ui/Fireflies';

const BULB_COUNT = 18;
const BULB_ON_STEP_MS = 85; // gap between each bulb lighting up
const BULB_OFF_STEP_MS = 30;
// The portrait brightens once most of the string is lit
const PHOTO_REVEAL_DELAY_MS = Math.round(BULB_COUNT * BULB_ON_STEP_MS * 0.6);

export const StorySection: React.FC = () => {
  // Lighting state: false = dim starlight, true = lit up golden glow
  const [isLightOn, setIsLightOn] = useState<boolean>(false);
  const [isPulling, setIsPulling] = useState<boolean>(false);

  // Play soft chime sound on pull via Web Audio API
  const playChimeSound = (lightingUp: boolean) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (lightingUp) {
        // Melodic warm temple harp chime
        const freqs = [523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + idx * 0.08);

          gain.gain.setValueAtTime(0.001, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.08 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 1.3);
        });
      } else {
        // Soft click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Audio context fallback
    }
  };

  // Toggle cord pull handler
  const handleToggleLight = () => {
    setIsPulling(true);
    const nextState = !isLightOn;

    playChimeSound(nextState);

    setTimeout(() => {
      setIsLightOn(nextState);
    }, 180);

    setTimeout(() => {
      setIsPulling(false);
    }, 450);
  };

  // 18 bulbs along catenary wire
  const bulbs = Array.from({ length: BULB_COUNT }, (_, i) => {
    const t = (i + 1) / (BULB_COUNT + 1);
    const x = 1000 * t;
    const y = (1 - t) * (1 - t) * 16 + 2 * (1 - t) * t * 118 + t * t * 16;
    return { id: i, x, y };
  });

  // Bulbs light up one after another (left → right), and switch off in reverse, faster
  const bulbDelay = (i: number) =>
    isLightOn ? i * BULB_ON_STEP_MS : (BULB_COUNT - 1 - i) * BULB_OFF_STEP_MS;


  return (
    <section
      id="our-story"
      className={`relative min-h-screen w-full transition-colors duration-1000 overflow-hidden select-none flex flex-col items-center justify-between pb-14 pt-2 sm:pt-4 ${
        isLightOn
          ? 'bg-gradient-to-b from-[#2B170B] via-[#201007] to-[#120803]'
          : 'bg-gradient-to-b from-[#0B0F15] via-[#0E131A] to-[#0A0D12]'
      }`}
    >
      {/* ── Ambient Illumination Glow Overlay ── */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isLightOn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top string light radial spill */}
        <div
          className="absolute top-0 left-0 right-0 h-[480px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 95% 75% at 50% 0%, rgba(255, 208, 105, 0.48) 0%, rgba(220, 145, 45, 0.28) 45%, transparent 100%)',
          }}
        />
        {/* Center portrait warm glow aura */}
        <div
          className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 195, 80, 0.16) 0%, rgba(180, 100, 30, 0.08) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* ── Smooth Flying Fireflies ── */}
      <Fireflies count={22} isLightOn={isLightOn} speedMultiplier={0.8} />

      {/* ── Top Hanging String Lights & Interactive Pull Knob ── */}
      <div className="relative w-full z-30">
        <svg
          viewBox="0 0 1000 150"
          className="w-full h-[85px] sm:h-[110px] overflow-visible pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Lit bulb gradient */}
            <radialGradient id="litBulb" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFDF0" />
              <stop offset="30%" stopColor="#FFE075" />
              <stop offset="70%" stopColor="#FFA625" />
              <stop offset="100%" stopColor="#D96E06" />
            </radialGradient>

            {/* Soft glow around a lit bulb (replaces expensive blur/drop-shadow filters) */}
            <radialGradient id="bulbHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE9A0" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#FFC24A" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#FF9F2E" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FF9F2E" stopOpacity="0" />
            </radialGradient>

            {/* Unlit bulb gradient */}
            <radialGradient id="unlitBulb" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#4A3D32" />
              <stop offset="50%" stopColor="#2E241C" />
              <stop offset="100%" stopColor="#1B140F" />
            </radialGradient>
          </defs>

          {/* Wire catenary curve */}
          <path
            d="M -10, 16 Q 500, 118 1010, 16"
            fill="none"
            stroke="#16100A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Hanging string of bulbs */}
          {bulbs.map((b) => {
            const fade = {
              transition: 'opacity 380ms ease-out',
              transitionDelay: `${bulbDelay(b.id)}ms`,
            };
            return (
              <g key={b.id}>
                {/* Fixture cap */}
                <rect
                  x={b.x - 3.5}
                  y={b.y}
                  width="7"
                  height="6"
                  rx="1"
                  fill="#241B13"
                  stroke="#120D08"
                  strokeWidth="1"
                />

                {/* Lit glow halo behind bulb */}
                <circle
                  cx={b.x}
                  cy={b.y + 15}
                  r="30"
                  fill="url(#bulbHalo)"
                  style={{ ...fade, opacity: isLightOn ? 1 : 0 }}
                />

                {/* Soft contact shadow + unlit glass orb (always underneath) */}
                <circle cx={b.x} cy={b.y + 17} r="10.5" fill="rgba(0,0,0,0.35)" />
                <circle
                  cx={b.x}
                  cy={b.y + 15}
                  r="10.5"
                  fill="url(#unlitBulb)"
                  stroke="#45382B"
                  strokeWidth="0.8"
                />

                {/* Lit glass orb, fades in on top */}
                <circle
                  cx={b.x}
                  cy={b.y + 15}
                  r="10.5"
                  fill="url(#litBulb)"
                  stroke="#FFE48A"
                  strokeWidth="0.8"
                  style={{ ...fade, opacity: isLightOn ? 1 : 0 }}
                />

                {/* Glass reflection highlight */}
                <ellipse
                  cx={b.x - 3}
                  cy={b.y + 11.5}
                  rx="2.8"
                  ry="4"
                  fill="#FFFFFF"
                  style={{ ...fade, opacity: isLightOn ? 0.65 : 0.12 }}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Interactive Pull Cord: hangs in the top-right corner, clear of the title ── */}
        <button
          type="button"
          onClick={handleToggleLight}
          aria-label={isLightOn ? 'Dim the lights' : 'Pull the cord to light up our story'}
          aria-pressed={isLightOn}
          className="absolute top-0 right-[4%] sm:right-[8%] lg:right-[12%] z-40 flex flex-col items-center px-3 pb-2 cursor-pointer select-none group outline-none focus-visible:ring-2 focus-visible:ring-[#F6CA65]/70 rounded-b-2xl"
        >
          {/* Braided golden cord */}
          <motion.div
            animate={{ height: isPulling ? 78 : 56 }}
            transition={{ type: 'spring', stiffness: 420, damping: 13 }}
            className="w-[2px] sm:w-[2.5px] origin-top"
            style={{
              background:
                'repeating-linear-gradient(to bottom, #E9C46A 0px, #E9C46A 3px, #9C7524 3px, #9C7524 5px)',
            }}
          />

          {/* Brass drop pull */}
          <motion.div
            animate={
              isPulling
                ? { y: 6, rotate: 0 }
                : !isLightOn
                ? { y: 0, rotate: [-5, 5, -5] }
                : { y: 0, rotate: 0 }
            }
            transition={
              isPulling
                ? { type: 'spring', stiffness: 420, damping: 13 }
                : !isLightOn
                ? { repeat: Infinity, duration: 2.6, ease: 'easeInOut' }
                : { duration: 0.4 }
            }
            style={{ originY: 0 }}
            className="relative flex flex-col items-center -mt-px transition-transform group-hover:scale-110"
          >
            {/* Ribbed cap */}
            <div className="w-3.5 h-2 rounded-t-[3px] rounded-b-[1px] bg-gradient-to-b from-[#F3D78A] to-[#9C7524] border-b border-[#6E4F14]" />
            <div className="w-2.5 h-[3px] bg-[#C99B3C]" />

            {/* Teardrop body */}
            <div
              className={`relative w-[22px] h-[30px] sm:w-[26px] sm:h-[34px] transition-shadow duration-700 ${
                !isLightOn
                  ? 'shadow-[0_0_18px_rgba(246,202,101,0.75),0_0_36px_rgba(246,202,101,0.35)]'
                  : 'shadow-[0_4px_10px_rgba(0,0,0,0.45)]'
              }`}
              style={{
                borderRadius: '50% 50% 50% 50% / 38% 38% 62% 62%',
                background:
                  'radial-gradient(circle at 35% 30%, #FFF6D4 0%, #F4CF72 28%, #C9962F 62%, #7E5A16 100%)',
              }}
            >
              <span className="absolute left-[28%] top-[18%] w-[5px] h-[8px] rounded-full bg-white/70 blur-[0.5px]" />
            </div>

            {/* Tiny tassel tip */}
            <div className="w-[3px] h-[6px] rounded-b-full bg-[#9C7524]" />
          </motion.div>

          {/* Small hint under the pull */}
          <span
            className={`mt-1 font-serif italic text-[12px] sm:text-[13px] tracking-wide transition-colors duration-500 ${
              isLightOn ? 'text-[#E5C582]/70' : 'text-[#F6CA65] animate-pulse'
            }`}
          >
            {isLightOn ? 'dim' : 'pull'}
          </span>
        </button>
      </div>

      {/* ── Central Narrative Content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-lg mx-auto w-full mt-1 sm:mt-2">
        {/* Subtitle: "Our Story" */}
        <p className="font-serif italic text-base sm:text-lg text-[#C8A452] tracking-wide mb-1">
          Our Story
        </p>

        {/* Section Tag: "OUR JOURNEY" */}
        <p
          className={`font-sans text-[11px] sm:text-xs tracking-[0.35em] uppercase font-medium transition-colors duration-700 mb-2 ${
            isLightOn ? 'text-[#E5C582]' : 'text-[#8E7D63]'
          }`}
        >
          OUR JOURNEY
        </p>

        {/* Main Title: "A LOVE WRITTEN IN THE STARS" (strictly 2 lines matching screenshot) */}
        <h2
          className={`font-serif font-bold text-[25px] sm:text-[32px] md:text-4xl tracking-[0.05em] uppercase leading-[1.15] mx-auto transition-colors duration-700 ${
            isLightOn
              ? 'text-[#FFFDF8] drop-shadow-[0_2px_12px_rgba(255,220,120,0.4)]'
              : 'text-[#414E5E] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
          }`}
        >
          <span className="block whitespace-nowrap">A LOVE WRITTEN IN</span>
          <span className="block whitespace-nowrap">THE STARS</span>
        </h2>

        {/* 8-Petal Golden Flower Divider */}
        <div className="flex items-center justify-center w-full max-w-[260px] sm:max-w-[300px] my-3 sm:my-3.5">
          <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#DFAB43]/70 to-[#DFAB43]" />
          <div className="mx-3 flex items-center justify-center text-[#DFAB43]">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="2.2" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <ellipse
                  key={i}
                  cx="12"
                  cy="5.8"
                  rx="1.5"
                  ry="3.2"
                  transform={`rotate(${angle} 12 12)`}
                />
              ))}
            </svg>
          </div>
          <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#DFAB43]/70 to-[#DFAB43]" />
        </div>

        {/* Interactive Text Indicator below divider */}
        <div className="min-h-[28px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isLightOn ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={handleToggleLight}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[#C8A452] font-serif italic text-[15px] sm:text-lg tracking-wide cursor-pointer hover:text-[#F6E29F] transition-colors"
              >
                <span>Pull the cord to light our story</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className="not-italic text-sm"
                >
                  ↗
                </motion.span>
              </motion.div>
            ) : (
              <motion.p
                key="glowing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="font-serif italic text-base sm:text-lg text-[#F5E6CC] tracking-wide"
              >
                The lights are on — our story is glowing
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ── Main Couple Portrait Card ── */}
        <div className="mt-5 sm:mt-6 w-[88%] max-w-[360px] sm:max-w-[400px] aspect-[9/13.5] rounded-[22px] sm:rounded-[26px] overflow-hidden relative shadow-[0_16px_50px_rgba(0,0,0,0.65)] border border-[#D4AF37]/25 transition-all duration-700">
          <img
            src="/images/story_couple.webp"
            alt="Ashil & Anaswara"
            loading="lazy"
            decoding="async"
            style={{ transitionDelay: isLightOn ? `${PHOTO_REVEAL_DELAY_MS}ms` : '0ms' }}
            className={`w-full h-full object-cover transition-all duration-1000 ${
              isLightOn
                ? 'filter brightness-[1.0] contrast-[1.02] saturate-[1.02] blur-0'
                : 'filter brightness-[0.32] contrast-[0.9] saturate-[0.8] blur-[2px]'
            }`}
          />

          {/* Dim state dark starlight overlay */}
          <div
            className={`absolute inset-0 bg-[#0B0F14]/25 transition-opacity duration-1000 pointer-events-none ${
              isLightOn ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Warm lit state subtle golden vignette */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-1000 pointer-events-none ${
              isLightOn ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

    </section>
  );
};
