import React from 'react';

export const DiyaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Flame glow */}
    <ellipse cx="24" cy="14" rx="5" ry="9" fill="url(#flameGlow)" opacity="0.4" />
    {/* Inner bright flame */}
    <path
      d="M24 7C22.5 11 20 13.5 20 17C20 19.5 21.8 21.5 24 21.5C26.2 21.5 28 19.5 28 17C28 13.5 25.5 11 24 7Z"
      fill="url(#innerFlame)"
    />
    <circle cx="24" cy="18" r="2.2" fill="#FFF9D6" />
    {/* Diya Brass Bowl */}
    <path
      d="M10 24C10 24 12 34 24 34C36 34 38 24 38 24C38 24 33 26.5 24 26.5C15 26.5 10 24 10 24Z"
      fill="url(#brassGradient)"
      stroke="#D4AF37"
      strokeWidth="1"
    />
    {/* Base stand */}
    <path
      d="M21 34L19 39H29L27 34H21Z"
      fill="url(#brassGradient)"
    />
    <path
      d="M16 39C16 39 19 41 24 41C29 41 32 39 32 39V40C32 41 28 42 24 42C20 42 16 41 16 40V39Z"
      fill="#B38F24"
    />
    <defs>
      <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE066" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="innerFlame" x1="24" y1="7" x2="24" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF4CC" />
        <stop offset="0.4" stopColor="#FFC83B" />
        <stop offset="1" stopColor="#FF7700" />
      </linearGradient>
      <linearGradient id="brassGradient" x1="10" y1="24" x2="38" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F6E29F" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#8A6C15" />
      </linearGradient>
    </defs>
  </svg>
);

export const KolamMotif: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Center flower */}
    <circle cx="50" cy="50" r="4" fill="#D4AF37" />
    <circle cx="50" cy="50" r="10" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 3" />
    {/* 8 Lotus petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 50 50)`}>
        <path
          d="M50 36C46 42 46 46 50 48C54 46 54 42 50 36Z"
          fill="none"
          stroke="#F6E29F"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="30" r="2" fill="#D4AF37" />
        <path
          d="M50 24C44 16 38 28 50 20C62 28 56 16 50 24Z"
          fill="none"
          stroke="#E6CA65"
          strokeWidth="0.8"
          opacity="0.75"
        />
      </g>
    ))}
  </svg>
);

export const GoldenDivider: React.FC<{ title?: string; subtitle?: string; className?: string }> = ({
  title,
  subtitle,
  className = 'my-8',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {subtitle && (
        <span className="text-[#D4AF37] font-cinzel text-xs tracking-[0.28em] uppercase mb-1.5 font-medium">
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF5EB] tracking-wide mb-3">
          {title}
        </h2>
      )}
      <div className="flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-md mx-auto">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
        <div className="flex items-center gap-1.5 text-[#D4AF37]">
          <span className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37] bg-[#54111D]" />
          <DiyaIcon className="w-5 h-5 text-[#E6CA65]" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37] bg-[#54111D]" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      </div>
    </div>
  );
};
