import type { ReactNode } from 'react';

interface StorySectionProps {
  id: string;
  label: string;
  dark?: boolean;
  style?: React.CSSProperties;
  children: ReactNode;
}

export function StorySection({ id, label, dark = false, style, children }: StorySectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`story-section ${dark ? 'dark-scene' : ''}`}
      style={{
        padding: 'clamp(4rem, 10vw, 7rem) clamp(1.5rem, 6vw, 4rem)',
        ...style,
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}
