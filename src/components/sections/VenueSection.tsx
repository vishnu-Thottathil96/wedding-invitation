import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { FloralDivider } from './FamilySection';

interface VenueSectionProps {
  name: string; //       e.g. "Bride's Residence"
  address?: string; //   e.g. "The home of Mr. Bhaskaran & Mrs. Sajini"
  mapUrl: string; //     Google Maps link opened on tap
  dateDisplay?: string; // e.g. "Saturday, 21st November 2026"
  muhoortham?: string; //  e.g. "12:25 – 1:00 PM"
}

/** Hand-drawn style village map with a pin — an illustration, the real map opens on tap */
const MapIllustration: React.FC = () => (
  <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
    <defs>
      <pattern id="paddy" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#C9D7B4" strokeWidth="1.2" />
      </pattern>
      <radialGradient id="mapGlow" cx="50%" cy="46%" r="60%">
        <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFFDF7" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Land */}
    <rect width="400" height="240" fill="#F3ECDD" />
    {/* Paddy fields */}
    <path d="M0 150 L120 130 L150 240 L0 240 Z" fill="#E4EBD3" />
    <path d="M0 150 L120 130 L150 240 L0 240 Z" fill="url(#paddy)" opacity="0.7" />
    <path d="M290 0 L400 0 L400 90 L310 70 Z" fill="#E4EBD3" />
    <path d="M290 0 L400 0 L400 90 L310 70 Z" fill="url(#paddy)" opacity="0.7" />
    {/* Plots */}
    <rect x="160" y="20" width="90" height="60" rx="6" fill="#EDE3CF" />
    <rect x="40" y="25" width="80" height="70" rx="6" fill="#EDE3CF" />
    <rect x="250" y="150" width="110" height="70" rx="6" fill="#EDE3CF" />

    {/* Backwater */}
    <path
      d="M-10 205 C 60 185, 110 215, 170 200 S 280 170, 330 190 S 390 215, 420 200"
      fill="none"
      stroke="#BFD8D2"
      strokeWidth="18"
      strokeLinecap="round"
    />
    <path
      d="M-10 205 C 60 185, 110 215, 170 200 S 280 170, 330 190 S 390 215, 420 200"
      fill="none"
      stroke="#D7E8E3"
      strokeWidth="6"
      strokeLinecap="round"
      strokeDasharray="2 14"
    />

    {/* Roads */}
    {[
      'M-10 118 C 90 112, 150 120, 200 112 S 330 96, 410 104',
      'M205 -10 C 200 50, 210 80, 200 112 S 190 180, 214 250',
    ].map((d) => (
      <g key={d}>
        <path d={d} fill="none" stroke="#E0D2B6" strokeWidth="13" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#FFFDF8" strokeWidth="9" strokeLinecap="round" />
      </g>
    ))}
    <path d="M60 -10 C 70 40, 90 80, 110 116" fill="none" stroke="#FFFDF8" strokeWidth="5" strokeLinecap="round" />
    <path d="M300 104 C 310 130, 330 150, 345 250" fill="none" stroke="#FFFDF8" strokeWidth="5" strokeLinecap="round" />

    {/* Coconut palms */}
    {[
      [30, 120], [140, 150], [96, 176], [262, 130], [370, 128], [330, 60], [140, 60], [250, 220], [20, 60],
    ].map(([x, y]) => (
      <g key={`${x}-${y}`}>
        <circle cx={x} cy={y} r="6" fill="#A9C29A" />
        <circle cx={x + 5} cy={y - 3} r="4" fill="#94B286" />
      </g>
    ))}

    {/* Dotted route to the house */}
    <path
      d="M30 230 C 60 190, 120 170, 160 150 S 196 128, 200 112"
      fill="none"
      stroke="#8E2A35"
      strokeWidth="2.2"
      strokeDasharray="1 7"
      strokeLinecap="round"
      opacity="0.75"
    />

    <rect width="400" height="240" fill="url(#mapGlow)" />
  </svg>
);

export const VenueSection: React.FC<VenueSectionProps> = ({
  name,
  address,
  mapUrl,
  dateDisplay,
  muhoortham,
}) => {
  return (
    <section
      id="venue"
      className="relative w-full overflow-hidden bg-[#FAF7F2] text-[#221410] pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-6 select-none"
    >
      {/* ── Section Header (same language as "Our Families") ── */}
      <div className="relative z-10 max-w-md mx-auto text-center mb-8 sm:mb-9">
        <p className="font-cinzel text-[12px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-[#A27B3D] mb-2 sm:mb-2.5">
          The Wedding Venue
        </p>
        <h2 className="font-serif font-bold text-[34px] sm:text-[38px] tracking-[0.03em] uppercase leading-[1.12] text-[#58181E]">
          <span className="block">Join Us At</span>
          <span className="block">Home</span>
        </h2>
        <FloralDivider widthClass="w-52 sm:w-60" />
        <p className="font-serif italic text-[17px] sm:text-[19px] text-[#5C4D41] tracking-wide mt-1.5">
          Where our forever begins
        </p>
      </div>

      {/* ── Clickable venue card → Google Maps ── */}
      <motion.a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${name} in Google Maps`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.985 }}
        className="group relative z-10 block w-full max-w-[390px] sm:max-w-[420px] mx-auto bg-white rounded-[26px] sm:rounded-[28px] border border-[#EADBBD] shadow-[0_8px_32px_rgba(180,140,80,0.08)] hover:shadow-[0_14px_40px_rgba(140,60,40,0.14)] transition-shadow duration-500 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#A27B3D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]"
      >
        {/* Map illustration with a dropping pin */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]">
            <MapIllustration />
          </div>

          <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-full flex flex-col items-center">
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 320, damping: 14, delay: 0.35 }}
              className="relative"
            >
              <svg viewBox="0 0 48 62" className="w-11 h-14 sm:w-12 sm:h-[60px] drop-shadow-[0_6px_6px_rgba(88,24,30,0.35)]">
                <path
                  d="M24 0C10.7 0 0 10.6 0 23.7 0 41.5 24 62 24 62s24-20.5 24-38.3C48 10.6 37.3 0 24 0z"
                  fill="#7A1E2B"
                />
                <circle cx="24" cy="23" r="13" fill="#FAF7F2" />
                {/* small house */}
                <path d="M17 24.5 L24 18 L31 24.5" fill="none" stroke="#7A1E2B" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M19 23.5 V30 H29 V23.5" fill="none" stroke="#7A1E2B" strokeWidth="2" strokeLinejoin="round" />
                <path d="M23 30 V26.5 H25 V30" fill="#7A1E2B" />
              </svg>
            </motion.div>
          </div>
          {/* Pulse on the ground under the pin */}
          <span className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-5 h-2 rounded-[50%] bg-[#7A1E2B]/35" />
          <span className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-10 h-4 rounded-[50%] border border-[#7A1E2B]/40 animate-ping" />

          {/* Little label on the map */}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-cinzel tracking-[0.2em] uppercase text-[#58181E] border border-[#EADBBD] shadow-sm">
            <MapPin className="w-3 h-3" /> Location
          </span>
        </div>

        {/* Thin gold rule, like the edge of a kasavu */}
        <div className="h-[3px] bg-gradient-to-r from-[#E9D9B3] via-[#C5A059] to-[#E9D9B3]" />

        {/* Details */}
        <div className="px-6 sm:px-8 pt-6 pb-7 text-center">
          <h3 className="font-serif font-bold text-[24px] sm:text-[26px] text-[#58181E] tracking-[0.03em] uppercase leading-snug">
            {name}
          </h3>
          {address && (
            <p className="mt-1 font-serif italic text-[16px] sm:text-[17px] text-[#6E5A4C]">{address}</p>
          )}

          <FloralDivider widthClass="w-40 sm:w-44" />

          {(dateDisplay || muhoortham) && (
            <p className="font-cinzel text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-[#A27B3D] leading-relaxed">
              {dateDisplay}
              {dateDisplay && muhoortham && <br />}
              {muhoortham && <>Muhurtham · {muhoortham}</>}
            </p>
          )}

          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#58181E] px-6 py-2.5 font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#FAF7F2] shadow-[0_6px_16px_rgba(88,24,30,0.25)] transition-colors duration-300 group-hover:bg-[#6E1F27]">
            Open in Google Maps
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </motion.a>
    </section>
  );
};
