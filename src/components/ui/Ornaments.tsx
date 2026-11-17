// Botanical corner SVG ornament — reused across all sections
// The SVG is a hand-drawn style botanical sprig with leaves and a small bloom

export function BotanicalCorner() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M4 76 C12 60, 24 40, 44 20"
        stroke="#B89560"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaf 1 */}
      <path
        d="M44 20 C38 14, 28 16, 30 24 C32 28, 40 22, 44 20Z"
        fill="#65745A"
        opacity="0.65"
      />
      {/* Leaf 2 */}
      <path
        d="M30 38 C22 32, 14 36, 18 44 C20 48, 28 42, 30 38Z"
        fill="#65745A"
        opacity="0.55"
      />
      {/* Leaf 3 */}
      <path
        d="M18 56 C10 52, 4 58, 8 64 C10 68, 18 60, 18 56Z"
        fill="#65745A"
        opacity="0.45"
      />
      {/* Small bloom at tip */}
      <circle cx="44" cy="18" r="2.5" fill="#B89560" opacity="0.7" />
      <circle cx="44" cy="18" r="1.2" fill="#D4B07A" opacity="0.9" />
      {/* Tiny berries */}
      <circle cx="24" cy="30" r="1.5" fill="#B89560" opacity="0.5" />
      <circle cx="12" cy="50" r="1.2" fill="#B89560" opacity="0.45" />
      {/* Fine detail lines */}
      <path
        d="M30 38 C28 30, 32 24, 36 22"
        stroke="#B89560"
        strokeWidth="0.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

// Lightweight diamond row ornament
export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`ornament-line ${className}`} aria-hidden="true">
      <div className="ornament-diamond" />
    </div>
  );
}

// Ornamental label with horizontal rules
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(184,149,96,0.3)' }} />
      <span className="label-sm">{children}</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(184,149,96,0.3)' }} />
    </div>
  );
}
