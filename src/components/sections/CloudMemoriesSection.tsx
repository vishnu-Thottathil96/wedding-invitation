import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CloudMemory } from '../../data/wedding';

// Repeating rhythm of rectangular frame heights, so the columns stagger
const FRAME_PATTERN = ['aspect-[2/3]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[2/3]', 'aspect-[3/4]', 'aspect-[4/5]'];

// Gold double stripe, like the border of a Kerala kasavu saree
const KasavuBorder: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <div
    aria-hidden="true"
    className="absolute left-0 right-0 h-[18px] pointer-events-none"
    style={{
      [flip ? 'bottom' : 'top']: 0,
      background: `linear-gradient(${flip ? 'to top' : 'to bottom'},
        #B8892E 0px, #E3C06A 3px, #B8892E 7px,
        transparent 7px, transparent 11px,
        #C9A24A 11px, #C9A24A 13px,
        transparent 13px)`,
    } as React.CSSProperties}
  />
);

// Small gold ornament: line — diamond — line
const DiamondRule: React.FC = () => (
  <div aria-hidden="true" className="flex items-center justify-center gap-3 my-4">
    <span className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent to-[#B8892E]" />
    <span className="w-2 h-2 rotate-45 border border-[#B8892E]" />
    <span className="w-1.5 h-1.5 rotate-45 bg-[#B8892E]" />
    <span className="w-2 h-2 rotate-45 border border-[#B8892E]" />
    <span className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent to-[#B8892E]" />
  </div>
);

type Screen = 'phone' | 'tablet' | 'desktop';
type GalleryLayout = Record<Screen, string[][]>;

interface CloudMemoriesSectionProps {
  memories: CloudMemory[];
  layout?: GalleryLayout;
}

const COLUMN_COUNT: Record<Screen, number> = { phone: 2, tablet: 3, desktop: 5 };

const getScreen = (): Screen =>
  window.matchMedia('(min-width: 1024px)').matches
    ? 'desktop'
    : window.matchMedia('(min-width: 640px)').matches
    ? 'tablet'
    : 'phone';

/** Current screen size bucket, updated when the window crosses a breakpoint */
const useScreen = (): Screen => {
  const [screen, setScreen] = useState<Screen>(getScreen);
  useEffect(() => {
    const queries = ['(min-width: 1024px)', '(min-width: 640px)'].map((q) => window.matchMedia(q));
    const update = () => setScreen(getScreen());
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);
  return screen;
};

/** Build the columns for this screen: the planned layout first, then any unlisted photos */
const buildColumns = (memories: CloudMemory[], screen: Screen, layout?: GalleryLayout) => {
  const count = COLUMN_COUNT[screen];
  const byId = new Map(memories.map((m, i) => [m.id, i]));
  const used = new Set<number>();
  const columns: number[][] = Array.from({ length: count }, (_, c) =>
    (layout?.[screen]?.[c] ?? []).flatMap((id) => {
      const i = byId.get(id);
      if (i === undefined || used.has(i)) return [];
      used.add(i);
      return [i];
    }),
  );
  memories.forEach((_, i) => {
    if (used.has(i)) return;
    columns.reduce((a, b) => (b.length < a.length ? b : a)).push(i);
  });
  return columns;
};

export const CloudMemoriesSection: React.FC<CloudMemoriesSectionProps> = ({ memories, layout }) => {
  const screen = useScreen();
  const columns = useMemo(() => buildColumns(memories, screen, layout), [memories, screen, layout]);

  // Index of the photo open in the full-screen viewer (null = closed)
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const selectedMemory = openIndex !== null ? memories[openIndex] : null;
  const total = memories.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % total)),
    [total],
  );
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total],
  );

  // Keyboard: ← → to browse, Esc to close; lock page scroll while open
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') showNext();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, showNext, showPrev, close]);


  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden text-[#2A1410]"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(227, 192, 106, 0.16) 0%, transparent 70%), linear-gradient(to bottom, #F8F2E4, #F3EAD6)',
      }}
    >
      <KasavuBorder />
      <KasavuBorder flip />

      {/* Faint handloom texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(184,137,46,0.05) 0px, rgba(184,137,46,0.05) 1px, transparent 1px, transparent 4px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.4em] uppercase font-semibold text-[#A27B3D]">
            Our Gallery
          </p>
          <h2 className="mt-3 font-serif text-[34px] sm:text-5xl leading-tight text-[#58181E]">
            Frames of <span className="italic font-light text-[#9A6B1F]">Forever</span>
          </h2>
          <DiamondRule />
          <p className="max-w-md mx-auto font-serif italic text-base sm:text-lg text-[#5C4D41]">
            Quiet steps, old stone and evergreen light — moments we will carry into forever.
          </p>
        </motion.header>

        {/* ── Gallery columns: 2 on phones, 3 on tablets, 5 on large screens, planned per screen ── */}
        <div className="flex items-start gap-3 sm:gap-5">
          {columns.map((indexes, col) => (
            <div key={col} className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-5">
              {indexes.map((index, row) => {
                const item = memories[index];
                const aspect = FRAME_PATTERN[(col * 2 + row) % FRAME_PATTERN.length];
                const hasNote = Boolean(item.title || item.caption || item.location || item.date);
                return (
                  <motion.figure
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.7, delay: col * 0.08 }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      aria-label={`Open photo ${index + 1} of ${total}`}
                      className={`group relative block w-full overflow-hidden rounded-md ${aspect} bg-[#E9DDC4] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#B8892E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F2E4] shadow-[0_10px_28px_rgba(88,24,30,0.14)] transition-shadow duration-500 hover:shadow-[0_16px_40px_rgba(88,24,30,0.24)]`}
                    >
                      <img
                        src={item.thumb || item.image}
                        alt={item.title || `Anaswara & Ashil — photo ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover object-[center_60%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Thin gold inner frame (passe-partout) */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-[7px] sm:inset-[9px] border border-[#F3D78A]/70 rounded-[3px] pointer-events-none transition-colors duration-500 group-hover:border-[#F3D78A]`}
                      />

                    </button>

                    {/* Optional note under the photo */}
                    {hasNote && (
                      <figcaption className="mt-2 px-1 text-center">
                        {(item.location || item.date) && (
                          <span className="block text-[9px] font-sans uppercase tracking-[0.2em] text-[#A27B3D] font-semibold">
                            {[item.location, item.date].filter(Boolean).join(' • ')}
                          </span>
                        )}
                        {item.title && <span className="block font-serif text-sm sm:text-base text-[#58181E]">{item.title}</span>}
                        {item.caption && <span className="block font-serif italic text-xs sm:text-sm text-[#5C4D41]">{item.caption}</span>}
                      </figcaption>
                    )}
                  </motion.figure>
                );
              })}
            </div>
          ))}
        </div>

        <p className="mt-10 sm:mt-12 text-center font-cinzel text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#A27B3D]/80">
          Tap any photo to view it full size
        </p>
      </div>

      {/* ── Full-screen viewer: swipe or use arrows to browse ── */}
      <AnimatePresence>
        {selectedMemory && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-3 py-14 bg-[#0D0605]/92 backdrop-blur-md"
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2.5 rounded-full bg-[#FAF7F2]/10 border border-[#E6CA65]/30 text-[#FAF5EB] hover:bg-[#FAF7F2]/20 transition-colors cursor-pointer"
              aria-label="Close photo viewer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <p className="absolute top-5 left-1/2 -translate-x-1/2 font-cinzel text-xs tracking-[0.3em] text-[#E6CA65]/85">
              {openIndex + 1} / {total}
            </p>

            {/* Photo (whole photo, no cropping) — drag sideways to browse */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={selectedMemory.id}
                src={selectedMemory.image}
                alt={selectedMemory.title || `Anaswara & Ashil — photo ${openIndex + 1}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) showNext();
                  else if (info.offset.x > 60) showPrev();
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-[#E6CA65]/25 cursor-grab active:cursor-grabbing select-none touch-pan-y"
                draggable={false}
              />
            </AnimatePresence>

            {/* Optional caption */}
            {(selectedMemory.title || selectedMemory.caption || selectedMemory.location || selectedMemory.date) && (
              <div className="mt-3 text-center text-[#FAF5EB]" onClick={(e) => e.stopPropagation()}>
                {(selectedMemory.location || selectedMemory.date) && (
                  <div className="flex items-center justify-center gap-3 text-[11px] text-[#E6CA65] font-sans uppercase tracking-widest">
                    {selectedMemory.location && (
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selectedMemory.location}</span>
                    )}
                    {selectedMemory.date && (
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedMemory.date}</span>
                    )}
                  </div>
                )}
                {selectedMemory.title && <h3 className="font-serif text-xl mt-1">{selectedMemory.title}</h3>}
                {selectedMemory.caption && <p className="font-script text-lg text-[#F6E29F]">"{selectedMemory.caption}"</p>}
              </div>
            )}

            {/* Previous / Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#FAF7F2]/10 border border-[#E6CA65]/30 text-[#FAF5EB] hover:bg-[#FAF7F2]/20 transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#FAF7F2]/10 border border-[#E6CA65]/30 text-[#FAF5EB] hover:bg-[#FAF7F2]/20 transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
