import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Check, AlertCircle, Bookmark } from 'lucide-react';
import { weddingData } from '../../data/wedding';
import { GoldenDivider, DiyaIcon } from '../ui/OrnateFlourish';

export const DressCodeSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true); // Open by default or toggled
  const { dressCode } = weddingData;

  const toggleBook = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 bg-[#1A0C09] text-[#FAF5EB] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(107,23,38,0.22)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <GoldenDivider
          subtitle="A Note to Guests"
          title="Dress Code & Wardrobe"
          className="mb-14 sm:mb-20"
        />

        <p className="max-w-xl mx-auto text-center font-serif italic text-base sm:text-lg text-[#F3E9D7]/85 mb-12 -mt-8 font-light">
          {dressCode.intro}
        </p>

        {/* ── Interactive Book Container ── */}
        <div className="flex flex-col items-center justify-center">
          {/* Toggle Button */}
          <div className="mb-8">
            <button
              onClick={toggleBook}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#221410] font-cinzel text-xs sm:text-sm font-semibold tracking-widest uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isOpen ? 'Close Wardrobe Book' : 'Open Wardrobe Book'}</span>
            </button>
          </div>

          {/* 3D Book Presentation */}
          <div className="w-full max-w-4xl perspective-[1600px]">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                /* ── Closed Book Cover View ── */
                <motion.div
                  key="closed-book"
                  initial={{ opacity: 0, scale: 0.95, rotateY: 25 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: -25 }}
                  transition={{ duration: 0.6 }}
                  onClick={toggleBook}
                  className="mx-auto max-w-md w-full aspect-[3/4] rounded-2xl p-8 bg-gradient-to-br from-[#4A0E17] via-[#35080E] to-[#1E0508] border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.2)] cursor-pointer group flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Embossed Gold Ornaments on Cover */}
                  <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-xl pointer-events-none" />
                  <div className="absolute inset-5 border border-[#D4AF37]/20 rounded-lg pointer-events-none" />

                  {/* Corner Ornaments */}
                  <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]" />
                  <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]" />
                  <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]" />
                  <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]" />

                  {/* Hanging Bookmark Ribbon */}
                  <div className="absolute top-0 right-10 w-7 h-20 bg-gradient-to-b from-[#D4AF37] to-[#8A6C15] rounded-b-sm shadow-md flex items-end justify-center pb-2">
                    <Bookmark className="w-3.5 h-3.5 text-[#221410]" />
                  </div>

                  <div className="text-center mt-6">
                    <DiyaIcon className="w-8 h-8 mx-auto text-[#E6CA65] mb-2" />
                    <span className="font-cinzel text-xs tracking-[0.25em] text-[#D4AF37] uppercase block">
                      South Indian Wedding Etiquette
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF5EB] font-light tracking-wide mb-2">
                      The Wedding Wardrobe
                    </h3>
                    <p className="font-script text-2xl text-[#E6CA65]">
                      &amp; Palette Guide
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#54111D]/80 border border-[#D4AF37]/50 text-xs font-sans text-[#F6E29F] group-hover:bg-[#6B1726] transition-colors">
                      <Sparkles className="w-3.5 h-3.5 text-[#E6CA65] animate-spin" />
                      <span>Tap to Open Book</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ── Open Book Spread (Left & Right Pages) ── */
                <motion.div
                  key="open-book"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.7 }}
                  className="relative rounded-3xl p-6 sm:p-10 bg-[#FAF5EB] text-[#221410] shadow-[0_30px_70px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.25)] border-4 border-[#3E0B13] overflow-hidden"
                >
                  {/* Subtle Spine dividing line */}
                  <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                    {/* ── LEFT PAGE: Recommended Palettes ── */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[#8A6C15] mb-2">
                          <Check className="w-4 h-4 text-emerald-700" />
                          <span className="font-cinzel text-xs tracking-[0.2em] uppercase font-semibold text-[#8A6C15]">
                            Page I • Recommended Hues
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#29060B] mb-2">
                          Traditional Silk Palettes
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-[#4A3B32] font-light leading-relaxed mb-6">
                          {dressCode.recommendedNote}
                        </p>

                        {/* Color Swatches Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {dressCode.recommendedColors.map((color, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl border border-[#E7D8C0] bg-white shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow"
                            >
                              {/* Swatch circle */}
                              <div
                                style={{ backgroundColor: color.hex }}
                                className="w-10 h-10 rounded-full border-2 border-white shadow-md mb-2 group-hover:scale-110 transition-transform flex items-center justify-center"
                              >
                                <span className="w-2 h-2 rounded-full bg-white/40" />
                              </div>
                              <span className="font-serif font-semibold text-xs text-[#221410] leading-tight block">
                                {color.name}
                              </span>
                              <span className="font-sans text-[10px] text-[#8A6C15] italic block">
                                {color.tamilName}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E7D8C0] text-center">
                        <span className="font-serif italic text-xs text-[#6B1726]">
                          Rich zari borders, Kanjeevarams &amp; festive silks warmly celebrated!
                        </span>
                      </div>
                    </div>

                    {/* ── RIGHT PAGE: Shades to Avoid & Sacred Customs ── */}
                    <div className="flex flex-col justify-between border-t lg:border-t-0 pt-8 lg:pt-0 border-[#E7D8C0]">
                      <div>
                        <div className="flex items-center gap-2 text-[#832030] mb-2">
                          <AlertCircle className="w-4 h-4 text-[#832030]" />
                          <span className="font-cinzel text-xs tracking-[0.2em] uppercase font-semibold text-[#832030]">
                            Page II • Shades to Avoid
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#29060B] mb-2">
                          Traditional Etiquette
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-[#4A3B32] font-light leading-relaxed mb-6">
                          {dressCode.avoidNote}
                        </p>

                        {/* Avoid Swatches */}
                        <div className="space-y-3 mb-6">
                          {dressCode.avoidColors.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[#FAF0F0] border border-[#F0D5D5] flex items-center gap-3.5"
                            >
                              <div
                                style={{ backgroundColor: item.hex }}
                                className="w-8 h-8 rounded-full border border-gray-400 flex-shrink-0 shadow-inner"
                              />
                              <div>
                                <span className="font-serif font-bold text-xs text-[#832030] block">
                                  {item.name}
                                </span>
                                <span className="font-sans text-[11px] text-[#553333] leading-snug block">
                                  {item.reason}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Cultural Etiquette Tips */}
                        <div className="p-4 rounded-xl bg-[#FFF9EE] border border-[#F3E5AB]">
                          <span className="font-cinzel text-[11px] font-bold text-[#8A6C15] uppercase tracking-wider block mb-2">
                            Good to Know:
                          </span>
                          <ul className="space-y-2 text-xs font-sans text-[#4A3B32]">
                            {dressCode.etiquetteTips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#D4AF37] font-bold">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E7D8C0] text-center">
                        <button
                          onClick={toggleBook}
                          className="font-cinzel text-xs text-[#8A6C15] hover:text-[#29060B] uppercase tracking-widest underline underline-offset-4 cursor-pointer"
                        >
                          Close Wardrobe Book
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
