import React from 'react';
import { motion } from 'framer-motion';

interface FamilyDetails {
  father?: string;
  mother?: string;
  grandparents?: string;
  lineage?: string;
  blessing?: string;
  image?: string;
  sibling?: string;
}

interface FamilySectionProps {
  groomFamily?: FamilyDetails;
  brideFamily?: FamilyDetails;
  groomName?: string;
  brideName?: string;
}

// ── 8-Pointed Faceted Golden Compass Star (Scaled to Match Screenshot) ──
export const FacetedStar: React.FC<{ className?: string }> = ({ className = 'w-[110px] h-[110px]' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} pointer-events-none select-none`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Light facet gradient */}
      <linearGradient id="starFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FAF4E8" />
        <stop offset="60%" stopColor="#EFE3CB" />
        <stop offset="100%" stopColor="#DFCEAA" />
      </linearGradient>

      {/* Shaded facet gradient */}
      <linearGradient id="starFacetDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFCEAA" />
        <stop offset="60%" stopColor="#CEB78A" />
        <stop offset="100%" stopColor="#BA9D6B" />
      </linearGradient>

      {/* Core gleam */}
      <radialGradient id="starCenterGleam" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#F5EDDB" />
        <stop offset="100%" stopColor="#D9C298" />
      </radialGradient>
    </defs>

    {/* ── 8 Faceted Rays (Center: 50,50) ── */}
    {/* North Ray (Tip: 50, 4) - primary tall */}
    <polygon points="50,50 50,4 46.8,44" fill="url(#starFacetDark)" opacity="0.88" />
    <polygon points="50,50 50,4 53.2,44" fill="url(#starFacetLight)" opacity="0.95" />

    {/* South Ray (Tip: 50, 96) - primary tall */}
    <polygon points="50,50 50,96 53.2,56" fill="url(#starFacetDark)" opacity="0.88" />
    <polygon points="50,50 50,96 46.8,56" fill="url(#starFacetLight)" opacity="0.95" />

    {/* East Ray (Tip: 96, 50) - primary wide */}
    <polygon points="50,50 96,50 56,46.8" fill="url(#starFacetDark)" opacity="0.88" />
    <polygon points="50,50 96,50 56,53.2" fill="url(#starFacetLight)" opacity="0.95" />

    {/* West Ray (Tip: 4, 50) - primary wide */}
    <polygon points="50,50 4,50 44,53.2" fill="url(#starFacetDark)" opacity="0.88" />
    <polygon points="50,50 4,50 44,46.8" fill="url(#starFacetLight)" opacity="0.95" />

    {/* North-East Ray (Tip: 72, 28) */}
    <polygon points="50,50 72,28 53.2,44" fill="url(#starFacetDark)" opacity="0.82" />
    <polygon points="50,50 72,28 56,46.8" fill="url(#starFacetLight)" opacity="0.9" />

    {/* North-West Ray (Tip: 28, 28) */}
    <polygon points="50,50 28,28 44,46.8" fill="url(#starFacetDark)" opacity="0.82" />
    <polygon points="50,50 28,28 46.8,44" fill="url(#starFacetLight)" opacity="0.9" />

    {/* South-East Ray (Tip: 72, 72) */}
    <polygon points="50,50 72,72 56,53.2" fill="url(#starFacetDark)" opacity="0.82" />
    <polygon points="50,50 72,72 53.2,56" fill="url(#starFacetLight)" opacity="0.9" />

    {/* South-West Ray (Tip: 28, 72) */}
    <polygon points="50,50 28,72 46.8,56" fill="url(#starFacetDark)" opacity="0.82" />
    <polygon points="50,50 28,72 44,53.2" fill="url(#starFacetLight)" opacity="0.9" />

    {/* Center Faceted Diamond Core */}
    <circle cx="50" cy="50" r="3.2" fill="url(#starCenterGleam)" />
    <circle cx="50" cy="50" r="3.2" stroke="#C5A059" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

// ── 8-Petal Golden Flower Asterisk ──
const GoldenAsterisk: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={`${className} fill-current text-[#C5A059] flex-shrink-0`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="2.2" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <ellipse
        key={i}
        cx="12"
        cy="5.2"
        rx="1.4"
        ry="3.4"
        transform={`rotate(${angle} 12 12)`}
      />
    ))}
  </svg>
);

// ── Golden Divider with Center Asterisk ──
export const FloralDivider: React.FC<{ widthClass?: string }> = ({ widthClass = 'w-52 sm:w-60' }) => (
  <div className={`flex items-center justify-center ${widthClass} mx-auto my-3 sm:my-3.5`}>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/80 to-[#C5A059]" />
    <div className="mx-2.5">
      <GoldenAsterisk className="w-4 h-4" />
    </div>
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C5A059]/80 to-[#C5A059]" />
  </div>
);

// ── Top-Left Botanical Palm Frond (Matching Screenshot Layout) ──
export const BotanicalPalmFrond: React.FC = () => (
  <svg
    viewBox="0 0 190 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-36 sm:w-48 h-auto pointer-events-none select-none opacity-85"
  >
    <defs>
      <linearGradient id="palmStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#697A5E" />
        <stop offset="100%" stopColor="#85967B" />
      </linearGradient>
      <linearGradient id="leafGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#78896C" />
        <stop offset="60%" stopColor="#8A9B7D" />
        <stop offset="100%" stopColor="#6C7D60" />
      </linearGradient>
    </defs>

    {/* Central rachis/stem entering from top-left, curving gently down */}
    <path
      d="M -10 -10 C 8 55, 30 145, 85 295"
      stroke="url(#palmStemGrad)"
      strokeWidth="3.8"
      strokeLinecap="round"
    />

    {/* Pinnate leaflets extending out (slender, organic rounded tips) */}
    {/* Left-side leaflets */}
    <path d="M -6 18 C -14 36, -6 52, 10 42 Z" fill="url(#leafGradMain)" />
    <path d="M 0 42 C -12 66, 2 82, 18 68 Z" fill="url(#leafGradMain)" />
    <path d="M 5 70 C -6 96, 8 114, 28 98 Z" fill="url(#leafGradMain)" />
    <path d="M 12 102 C 2 132, 18 150, 40 130 Z" fill="url(#leafGradMain)" />
    <path d="M 20 136 C 12 168, 30 186, 52 165 Z" fill="url(#leafGradMain)" />
    <path d="M 30 172 C 24 204, 42 222, 64 200 Z" fill="url(#leafGradMain)" />
    <path d="M 42 210 C 40 240, 58 255, 75 235 Z" fill="url(#leafGradMain)" />
    <path d="M 56 246 C 58 272, 72 284, 84 268 Z" fill="url(#leafGradMain)" />

    {/* Right-side leaflets (extending diagonally downwards-right across margin) */}
    <path d="M -2 12 C 34 22, 68 40, 72 58 C 60 58, 32 44, 2 26 Z" fill="url(#leafGradMain)" />
    <path d="M 2 34 C 42 48, 86 68, 94 90 C 78 90, 44 70, 6 48 Z" fill="url(#leafGradMain)" />
    <path d="M 7 58 C 52 76, 104 104, 114 128 C 96 128, 56 102, 12 76 Z" fill="url(#leafGradMain)" />
    <path d="M 13 86 C 62 108, 118 140, 128 166 C 110 166, 68 136, 22 106 Z" fill="url(#leafGradMain)" />
    <path d="M 20 118 C 72 142, 126 178, 136 206 C 118 205, 78 172, 32 140 Z" fill="url(#leafGradMain)" />
    <path d="M 30 152 C 80 178, 130 216, 138 242 C 122 240, 86 208, 44 174 Z" fill="url(#leafGradMain)" />
    <path d="M 42 188 C 88 215, 128 252, 134 274 C 120 272, 92 244, 56 212 Z" fill="url(#leafGradMain)" />
    <path d="M 56 226 C 94 250, 122 280, 126 298 C 114 296, 94 274, 70 248 Z" fill="url(#leafGradMain)" />
    <path d="M 70 260 C 98 280, 116 302, 118 314 C 108 312, 94 296, 82 278 Z" fill="url(#leafGradMain)" />
  </svg>
);

// ── Traditional South Indian Temple Gopuram / Vimana Silhouette (Upper Right) ──
const TempleGopuramSilhouette: React.FC = () => (
  <svg
    viewBox="0 0 170 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-32 sm:w-40 h-auto pointer-events-none select-none opacity-22"
  >
    <defs>
      <linearGradient id="gopuramGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#C9AC70" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#BA9655" stopOpacity="0.45" />
      </linearGradient>
    </defs>

    {/* Central Kalasam & side pinnacles */}
    <circle cx="85" cy="14" r="3.5" fill="url(#gopuramGrad)" />
    <path d="M 83 17 L 87 17 L 86 24 L 84 24 Z" fill="url(#gopuramGrad)" />
    <circle cx="73" cy="18" r="2.8" fill="url(#gopuramGrad)" />
    <path d="M 71 21 L 75 21 L 74 27 L 72 27 Z" fill="url(#gopuramGrad)" />
    <circle cx="97" cy="18" r="2.8" fill="url(#gopuramGrad)" />
    <path d="M 95 21 L 99 21 L 98 27 L 96 27 Z" fill="url(#gopuramGrad)" />

    {/* Rounded Shikhara Top Dome */}
    <path
      d="M 64 34 C 68 25, 102 25, 106 34 L 110 44 L 60 44 Z"
      fill="url(#gopuramGrad)"
    />

    {/* Tier 1 */}
    <rect x="54" y="47" width="62" height="13" rx="2" fill="url(#gopuramGrad)" />
    <circle cx="74" cy="53.5" r="2.5" fill="#FAF5ED" opacity="0.65" />
    <circle cx="85" cy="53.5" r="2.5" fill="#FAF5ED" opacity="0.65" />
    <circle cx="96" cy="53.5" r="2.5" fill="#FAF5ED" opacity="0.65" />

    {/* Tier 2 */}
    <rect x="47" y="64" width="76" height="16" rx="2" fill="url(#gopuramGrad)" />
    <rect x="58" y="67" width="9" height="10" rx="1.5" fill="#FAF5ED" opacity="0.6" />
    <rect x="80" y="67" width="10" height="10" rx="1.5" fill="#FAF5ED" opacity="0.6" />
    <rect x="103" y="67" width="9" height="10" rx="1.5" fill="#FAF5ED" opacity="0.6" />

    {/* Tier 3 */}
    <rect x="40" y="84" width="90" height="20" rx="2" fill="url(#gopuramGrad)" />
    <rect x="52" y="88" width="11" height="12" rx="2" fill="#FAF5ED" opacity="0.55" />
    <rect x="79" y="88" width="12" height="12" rx="2" fill="#FAF5ED" opacity="0.55" />
    <rect x="107" y="88" width="11" height="12" rx="2" fill="#FAF5ED" opacity="0.55" />

    {/* Tier 4 */}
    <rect x="33" y="108" width="104" height="24" rx="2.5" fill="url(#gopuramGrad)" />
    <rect x="46" y="113" width="12" height="14" rx="2" fill="#FAF5ED" opacity="0.55" />
    <rect x="78" y="113" width="14" height="14" rx="2" fill="#FAF5ED" opacity="0.55" />
    <rect x="112" y="113" width="12" height="14" rx="2" fill="#FAF5ED" opacity="0.55" />

    {/* Base Portal Structure */}
    <path
      d="M 26 136 L 144 136 L 148 185 L 22 185 Z"
      fill="url(#gopuramGrad)"
    />
    <path
      d="M 70 185 L 70 154 C 70 146, 100 146, 100 154 L 100 185 Z"
      fill="#FAF5ED"
      opacity="0.65"
    />
  </svg>
);

export const FamilySection: React.FC<FamilySectionProps> = ({
  groomFamily,
  brideFamily,
}) => {
  // Exact names and sibling details matching screenshot
  const brideData = {
    title: "B R I D E ' S   F A M I L Y",
    relation: 'Daughter of',
    father: (brideFamily?.father || '').toUpperCase(),
    mother: (brideFamily?.mother || '').toUpperCase(),
    sibling: brideFamily?.sibling || '',
  };

  const groomData = {
    title: "G R O O M ' S   F A M I L Y",
    relation: 'Son of',
    father: (groomFamily?.father || '').toUpperCase(),
    mother: (groomFamily?.mother || '').toUpperCase(),
    sibling: groomFamily?.sibling || '',
  };

  return (
    <section
      id="our-families"
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-[#221410] pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-6 select-none font-sans"
    >
      {/* ── Top-Left Botanical Palm Leaf Frond ── */}
      <div className="absolute top-0 left-0 pointer-events-none z-10">
        <BotanicalPalmFrond />
      </div>

      {/* ── Temple Gopuram Watermark (Upper Right) ── */}
      <div className="absolute top-36 sm:top-32 right-1 sm:right-6 md:right-14 pointer-events-none z-0">
        <TempleGopuramSilhouette />
      </div>

      {/* ── Subtle Center Mandala Watermark Behind Header ── */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full border border-[#D4AF37]/12 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[260px] h-[260px] rounded-full border border-[#D4AF37]/12 flex items-center justify-center">
          <div className="w-[180px] h-[180px] rounded-full border border-[#D4AF37]/12" />
        </div>
      </div>

      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-md mx-auto text-center mt-2 mb-8 sm:mb-9">
        {/* "OUR FAMILIES" */}
        <p className="font-cinzel text-[12px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-[#A27B3D] mb-2 sm:mb-2.5">
          OUR FAMILIES
        </p>

        {/* "WITH BLESSINGS FROM" (2 Lines, Deep Burgundy) */}
        <h2 className="font-serif font-bold text-[34px] sm:text-[38px] tracking-[0.03em] uppercase leading-[1.12] text-[#58181E]">
          <span className="block">WITH BLESSINGS</span>
          <span className="block">FROM</span>
        </h2>

        {/* Golden Ornamental Divider */}
        <FloralDivider widthClass="w-52 sm:w-60" />

        {/* Subtitle: "The hearts that guide us" */}
        <p className="font-serif italic text-[17px] sm:text-[19px] text-[#5C4D41] tracking-wide mt-1.5">
          The hearts that guide us
        </p>
      </div>

      {/* ── Two Family Cards Stack ── */}
      <div className="relative z-10 w-full max-w-[390px] sm:max-w-[420px] mx-auto space-y-6 sm:space-y-7">
        {/* ── 1. Bride's Family Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white rounded-[26px] sm:rounded-[28px] border border-[#EADBBD] shadow-[0_8px_32px_rgba(180,140,80,0.06)] pt-8 sm:pt-9 pb-8 sm:pb-9 px-6 sm:px-8 text-center"
        >
          {/* Card Label: "B R I D E ' S   F A M I L Y" */}
          <h3 className="font-cinzel text-[11.5px] sm:text-[12px] tracking-[0.32em] uppercase font-semibold text-[#A27B3D] mb-2">
            {brideData.title}
          </h3>

          {/* Star & Relationship: "Daughter of" */}
          <div className="relative flex flex-col items-center justify-center py-4 my-1">
            {/* Golden Faceted Star in background (prominent & scaled) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <FacetedStar className="w-[100px] h-[100px] sm:w-[108px] sm:h-[108px] opacity-95" />
            </div>

            {/* "Daughter of" text overlaid directly in front of star */}
            <p className="relative z-10 font-serif italic text-[16.5px] sm:text-[17.5px] text-[#6E5A4C]">
              {brideData.relation}
            </p>
          </div>

          {/* Parents' Names */}
          <div className="mt-2.5 mb-2 space-y-1">
            <h4 className="font-serif font-bold text-[22px] sm:text-[24px] text-[#58181E] tracking-[0.03em] leading-snug uppercase">
              {brideData.father}
            </h4>
            <h4 className="font-serif font-bold text-[22px] sm:text-[24px] text-[#58181E] tracking-[0.03em] leading-snug uppercase">
              {brideData.mother}
            </h4>
          </div>

          {/* Sibling line (only when given) */}
          {brideData.sibling && (
            <>
              <FloralDivider widthClass="w-44 sm:w-48" />
              <p className="font-serif italic text-[15px] sm:text-[16px] text-[#5C4D41] tracking-wide mt-1">
                {brideData.sibling}
              </p>
            </>
          )}
        </motion.div>

        {/* ── 2. Groom's Family Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative bg-white rounded-[26px] sm:rounded-[28px] border border-[#EADBBD] shadow-[0_8px_32px_rgba(180,140,80,0.06)] pt-8 sm:pt-9 pb-8 sm:pb-9 px-6 sm:px-8 text-center"
        >
          {/* Card Label: "G R O O M ' S   F A M I L Y" */}
          <h3 className="font-cinzel text-[11.5px] sm:text-[12px] tracking-[0.32em] uppercase font-semibold text-[#A27B3D] mb-2">
            {groomData.title}
          </h3>

          {/* Star & Relationship: "Son of" */}
          <div className="relative flex flex-col items-center justify-center py-4 my-1">
            {/* Golden Faceted Star in background (prominent & scaled) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <FacetedStar className="w-[100px] h-[100px] sm:w-[108px] sm:h-[108px] opacity-95" />
            </div>

            {/* "Son of" text overlaid directly in front of star */}
            <p className="relative z-10 font-serif italic text-[16.5px] sm:text-[17.5px] text-[#6E5A4C]">
              {groomData.relation}
            </p>
          </div>

          {/* Parents' Names */}
          <div className="mt-2.5 mb-2 space-y-1">
            <h4 className="font-serif font-bold text-[22px] sm:text-[24px] text-[#58181E] tracking-[0.03em] leading-snug uppercase">
              {groomData.father}
            </h4>
            <h4 className="font-serif font-bold text-[22px] sm:text-[24px] text-[#58181E] tracking-[0.03em] leading-snug uppercase">
              {groomData.mother}
            </h4>
          </div>

          {/* Sibling line (only when given) */}
          {groomData.sibling && (
            <>
              <FloralDivider widthClass="w-44 sm:w-48" />
              <p className="font-serif italic text-[15px] sm:text-[16px] text-[#5C4D41] tracking-wide mt-1">
                {groomData.sibling}
              </p>
            </>
          )}
        </motion.div>
      </div>

      {/* ── Soft Warm Bottom Bokeh Glow Orbs (Amber/Gold Light Orbs) ── */}
      <div className="absolute -bottom-10 left-1/4 w-48 h-32 rounded-full bg-[#FCE3A1]/35 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 right-1/4 w-40 h-28 rounded-full bg-[#FAD27E]/25 blur-2xl pointer-events-none" />
    </section>
  );
};
