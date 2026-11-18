import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { BotanicalPalmFrond, FacetedStar, FloralDivider } from './FamilySection';

interface FooterSectionProps {
  brideName: string;
  groomName: string;
  initials: string;
  hashtag: string;
}

/** "With Gratitude" — thank-you section in the same design language as "Our Families" */
export const FooterSection: React.FC<FooterSectionProps> = ({ brideName, groomName, hashtag }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      id="thank-you"
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-[#221410] pt-16 sm:pt-20 pb-12 px-4 sm:px-6 select-none border-t border-[#EADBBD]"
    >
      {/* Palm frond, mirrored to the top-right corner */}
      <div className="absolute top-0 right-0 pointer-events-none z-0 translate-x-[38%] -translate-y-[30%] opacity-80 sm:translate-x-0 sm:translate-y-0 sm:opacity-100">
        <div style={{ transform: 'scaleX(-1)' }}>
          <BotanicalPalmFrond />
        </div>
      </div>

      {/* Mandala rings behind the header */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full border border-[#D4AF37]/12 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[260px] h-[260px] rounded-full border border-[#D4AF37]/12 flex items-center justify-center">
          <div className="w-[180px] h-[180px] rounded-full border border-[#D4AF37]/12" />
        </div>
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 max-w-md mx-auto text-center mb-8 sm:mb-9">
        <p className="font-cinzel text-[12px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-[#A27B3D] mb-2 sm:mb-2.5">
          With Gratitude
        </p>
        <h2 className="font-serif font-bold text-[34px] sm:text-[38px] tracking-[0.03em] uppercase leading-[1.12] text-[#58181E]">
          <span className="block">Thank You</span>
          <span className="block">For Your Love</span>
        </h2>
        <FloralDivider widthClass="w-52 sm:w-60" />
        <p className="font-serif italic text-[17px] sm:text-[19px] text-[#5C4D41] tracking-wide mt-1.5">
          Your blessings complete our day
        </p>
      </div>

      {/* ── Gratitude card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-[390px] sm:max-w-[420px] mx-auto bg-white rounded-[26px] sm:rounded-[28px] border border-[#EADBBD] shadow-[0_8px_32px_rgba(180,140,80,0.06)] pt-8 sm:pt-9 pb-8 sm:pb-9 px-6 sm:px-8 text-center"
      >
        <p className="font-serif italic text-[16px] sm:text-[17px] leading-relaxed text-[#5C4D41]">
          Your presence, prayers and warm wishes mean the world to us as we begin this new chapter together.
        </p>

        {/* Star with "With love," in front, as on the family cards */}
        <div className="relative flex flex-col items-center justify-center py-4 my-2">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <FacetedStar className="w-[100px] h-[100px] sm:w-[108px] sm:h-[108px] opacity-95" />
          </div>
          <p className="relative z-10 font-serif italic text-[16.5px] sm:text-[17.5px] text-[#6E5A4C]">With love,</p>
        </div>

        <div className="mt-2.5 mb-2 space-y-0.5">
          <h3 className="font-serif font-bold text-[24px] sm:text-[26px] text-[#58181E] tracking-[0.03em] leading-snug uppercase">
            {brideName}
          </h3>
          <p className="font-serif italic text-[18px] text-[#A27B3D] leading-none">&amp;</p>
          <h3 className="font-serif font-bold text-[24px] sm:text-[26px] text-[#58181E] tracking-[0.03em] leading-snug uppercase">
            {groomName}
          </h3>
        </div>

        <FloralDivider widthClass="w-44 sm:w-48" />

        <p className="font-cinzel text-[11px] sm:text-[12px] tracking-[0.22em] uppercase text-[#A27B3D]">{hashtag}</p>
      </motion.div>

      {/* ── Back to top & signature ── */}
      <div className="relative z-10 mt-10 flex flex-col items-center text-center">
        <motion.button
          type="button"
          onClick={scrollToTop}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#58181E]/40 text-[#58181E] font-cinzel text-[11px] tracking-[0.22em] uppercase hover:bg-[#58181E] hover:text-[#FAF7F2] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          Back to Top
        </motion.button>

        <p className="mt-8 font-sans text-[11px] text-[#6E5A4C]/70 tracking-wide">
          Made with love for the wedding of {brideName} &amp; {groomName} · November 2026
        </p>
      </div>
    </footer>
  );
};
