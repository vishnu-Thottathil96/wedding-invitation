import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fireflies } from '../ui/Fireflies';

interface HeroSectionProps {
  brideName?: string;
  groomName?: string;
  dateDisplay?: string;
  dateISO?: string;
  muhoortham?: string;
  muhoorthamLagna?: string;
  onScrollToStory?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  brideName = 'Anaswara',
  groomName = 'Aashil',
  dateISO = '2026-11-21T10:30:00+05:30',
  muhoortham = '10:30 – 11:30 AM',
  onScrollToStory,
}) => {
  // Live countdown timer state
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(dateISO).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [dateISO]);

  const handleScrollClick = () => {
    if (onScrollToStory) {
      onScrollToStory();
    } else {
      const storyEl = document.getElementById('our-story');
      if (storyEl) {
        storyEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };


  return (
    <section className="relative min-h-screen w-full flex flex-col items-center lg:items-start overflow-hidden select-none">
      {/* ── Background Couple Photo ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#EDE5D3] lg:bg-[#1E2418]">
        {/* Phones: photo fills the screen, nudged down so faces clear the date card.
            Wide screens: softly blurred backdrop */}
        <img
          src="/images/hero_couple.jpg"
          alt="Aashil & Anaswara"
          className="w-full h-[calc(100%-6vh)] mt-[6vh] short-phone:h-[calc(100%-13vh)] short-phone:mt-[13vh] sm:h-[calc(100%-9vh)] sm:mt-[9vh] sm:object-[center_35%] lg:h-full lg:mt-0 object-cover object-[center_60%] [mask-image:linear-gradient(to_bottom,transparent,black_12%)] lg:[mask-image:none] lg:scale-110 lg:blur-2xl lg:brightness-75"
        />

        {/* Wide screens: the full portrait photo, anchored right with a soft left edge */}
        <img
          src="/images/hero_couple.jpg"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute right-0 top-0 h-full w-[54%] object-cover object-[center_55%]"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
          }}
        />

        {/* Phones: cream wash behind the text at the top, clear middle, soft shade at the bottom */}
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(250, 243, 228, 0.9) 0%, rgba(250, 243, 228, 0.72) 26%, rgba(250, 243, 228, 0.25) 40%, rgba(250, 243, 228, 0) 47%, rgba(0, 0, 0, 0) 76%, rgba(20, 16, 10, 0.5) 100%)',
          }}
        />

        {/* Wide screens: cream wash behind the text column on the left */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, rgba(250, 243, 228, 0.93) 0%, rgba(250, 243, 228, 0.85) 38%, rgba(250, 243, 228, 0.35) 50%, rgba(250, 243, 228, 0) 58%)',
          }}
        />
      </div>

      {/* ── Smooth Flying Fireflies ── */}
      <Fireflies count={22} speedMultiplier={0.8} />

      {/* ── Content column: full width on phones, left half on wide screens ── */}
      <div className="relative z-20 flex flex-col items-center text-center w-full min-h-screen px-4 lg:w-[48%] lg:justify-center lg:pl-[4vw] lg:pr-2">
        {/* ── Top group: header, names, divider, date card ── */}
        <div className="flex flex-col items-center w-full">
          {/* "Together with their families" & "◆ INVITE YOU ◆" */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col items-center pt-5 short-phone:pt-3 sm:pt-10 lg:pt-0"
          >
            <p className="font-serif italic text-lg sm:text-xl text-[#7A5424] tracking-wide">
              Together with their families
            </p>
            <div className="flex items-center justify-center gap-2.5 mt-1 sm:mt-1.5 text-[#7A5424]">
              <span className="text-[8px] sm:text-[9px]">&#9670;</span>
              <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase">
                INVITE YOU
              </span>
              <span className="text-[8px] sm:text-[9px]">&#9670;</span>
            </div>
          </motion.div>

          {/* Couple's Names: AASHIL & ANASWARA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col items-center justify-center mt-2 sm:mt-5"
          >
            <h1 className="flex flex-col items-center justify-center text-center">
              <span className="font-serif font-bold text-[2.3rem] short-phone:text-[2rem] sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-[#59131A] tracking-[0.15em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] uppercase leading-[1.08]">
                {groomName || 'AASHIL'}
              </span>
              <span className="font-serif italic text-2xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#C98F22] my-0.5 sm:my-1 select-none font-light">
                &
              </span>
              <span className="font-serif font-bold text-[2.3rem] short-phone:text-[2rem] sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-[#59131A] tracking-[0.15em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] uppercase leading-[1.08]">
                {brideName || 'ANASWARA'}
              </span>
            </h1>
          </motion.div>

          {/* 8-Petal Golden Flower Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center justify-center w-full max-w-[270px] sm:max-w-[320px] my-2 sm:my-3.5"
          >
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#C98F22]/75 to-[#C98F22]" />
            <div className="mx-3 flex items-center justify-center text-[#C98F22]">
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
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#C98F22]/75 to-[#C98F22]" />
          </motion.div>

          {/* Date card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="w-[88%] max-w-[340px] sm:max-w-[380px] rounded-[22px] px-4 py-3 short-phone:py-2 sm:px-8 sm:py-5 text-center backdrop-blur-md border border-[#E5D7C3]/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            style={{
              background: 'rgba(250, 243, 228, 0.55)',
            }}
          >
            <p className="font-serif italic text-[#4E3A2E] text-[15px] sm:text-[16.5px] leading-snug tracking-wide">
              request the honour of your presence
            </p>
            <h2 className="font-serif font-bold text-[#45141B] text-[17px] sm:text-[25px] tracking-[0.1em] sm:tracking-[0.22em] whitespace-nowrap my-1 sm:my-1.5 leading-tight">
              21 · NOVEMBER · 2026
            </h2>
            <p className="font-serif italic text-[#634E40] text-xs sm:text-sm tracking-wide">
              Muhurtham · {muhoortham || '10:30 – 11:30 AM'}
            </p>
          </motion.div>
        </div>

        {/* Phones: open space so the couple stays visible */}
        <div className="flex-1 lg:flex-none" aria-hidden="true" />

        {/* ── Bottom group: countdown & scroll button ── */}
        <div className="flex flex-col items-center w-full pb-5 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-[88%] max-w-[340px] sm:max-w-[380px] lg:mt-5"
          >
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINUTES', val: timeLeft.minutes },
              { label: 'SECONDS', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-2 sm:py-3.5 px-1 rounded-[16px] sm:rounded-[18px] bg-[#FAF5EC]/95 border-[1.5px] border-[#D1B892] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
              >
                <span className="font-playfair font-normal sm:font-medium text-[#59131A] text-2xl sm:text-3xl tracking-tight leading-none">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="font-sans font-medium text-[8.5px] sm:text-[9.5px] tracking-[0.2em] text-[#6E5A4E] mt-1.5 uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Scroll to Begin Pill Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            onClick={handleScrollClick}
            className="mt-3.5 sm:mt-6 rounded-full px-7 sm:px-8 py-2 sm:py-2.5 bg-gradient-to-r from-[#FDE7B8] via-[#FEF4DC] to-[#FDE7B8] border-[1.5px] border-[#D4A84B] shadow-[0_4px_16px_rgba(212,168,75,0.32)] hover:shadow-[0_4px_22px_rgba(212,168,75,0.45)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 group"
          >
            <span className="font-cinzel font-semibold text-[#4D1C22] text-[10.5px] sm:text-xs tracking-[0.24em] uppercase">
              SCROLL TO BEGIN
            </span>
            <span className="text-[#4D1C22] text-xs font-bold transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
