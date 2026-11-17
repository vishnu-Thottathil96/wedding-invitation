import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, MapPin, Phone } from 'lucide-react';
import { DiyaIcon, KolamMotif } from '../ui/OrnateFlourish';

interface FooterSectionProps {
  brideName: string;
  groomName: string;
  initials: string;
  hashtag: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  brideName,
  groomName,
  initials,
  hashtag,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-[#221410] via-[#1A0B08] to-[#120604] text-[#FAF5EB] overflow-hidden border-t border-[#D4AF37]/30">
      {/* Background Kolam elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
        <KolamMotif className="w-96 h-96 text-[#D4AF37]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
        {/* Monogram Crest in Golden Arch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] p-2 shadow-[0_0_30px_rgba(212,175,55,0.3)] bg-gradient-to-b from-[#3E0B13] to-[#29060B] flex items-center justify-center">
            <span className="font-serif text-3xl font-light text-[#F6E29F] tracking-widest">
              {initials}
            </span>
          </div>

          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#D4AF37] text-[#221410] font-cinzel text-[10px] font-bold tracking-widest uppercase">
            2026
          </div>
        </motion.div>

        {/* Section Heading */}
        <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#D4AF37] block mb-2">
          With Gratitude
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF5EB] tracking-wide mb-4">
          Thank You for Being Part of Our Story
        </h2>

        {/* Heartfelt Note */}
        <p className="max-w-xl font-serif italic text-base sm:text-lg text-[#F3E9D7]/85 mb-8 leading-relaxed font-light">
          “Your prayers, boundless love, and presence will be our greatest blessing as we take these seven sacred steps into our shared future.”
        </p>

        {/* Sacred Mangalyam Shloka */}
        <div className="p-6 rounded-2xl bg-[#3E0B13]/60 border border-[#D4AF37]/35 max-w-2xl mx-auto mb-10 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 text-[#E6CA65] mb-2">
            <DiyaIcon className="w-4 h-4" />
            <span className="font-serif text-sm sm:text-base text-[#F6E29F]">
              ॥ माङ्गल्यं तन्तुनानेन मम जीवन हेतुना ॥
            </span>
            <DiyaIcon className="w-4 h-4" />
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#FAF5EB]/80 italic">
            “माङ्गल्यं तन्तुनानेन मम जीवन हेतुना | कण्ठे बध्नामि शुभगे त्वं जीव शरदः शतम् ॥”
          </p>
          <p className="font-sans text-[11px] text-[#D4AF37] mt-2 font-light tracking-wide">
            (This sacred thread is the reason of my life. I tie it around your neck, O auspicious one; may you live with me for a hundred blessed autumns.)
          </p>
        </div>

        {/* Couple Signature & Hashtag */}
        <div className="mb-10">
          <h3 className="font-serif text-2xl text-[#FAF5EB]">
            {brideName} &amp; {groomName}
          </h3>
          <span className="font-sans text-xs tracking-[0.2em] text-[#D4AF37] uppercase block mt-1">
            {hashtag}
          </span>
        </div>

        {/* Contact info for assistance */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#FAF5EB]/70 font-sans mb-12">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Krishnankoil Heritage Mandapam, Tamil Nadu</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Guest Assistance: +91 98401 23456</span>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4AF37]/50 bg-[#3E0B13]/80 text-[#F6E29F] font-cinzel text-xs tracking-widest uppercase hover:bg-[#54111D] hover:border-[#D4AF37] shadow-lg transition-all cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </motion.button>

        {/* Small copyright */}
        <p className="font-sans text-[11px] text-[#FAF5EB]/40 mt-12 tracking-wide">
          Crafted with love for the wedding of {groomName} &amp; {brideName} • November 2026
        </p>
      </div>
    </footer>
  );
};
