import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
    </div>
  );
}

// Optional ambient music player — only renders if src is provided
export function MusicToggle({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    if (!src) return;
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;
    return () => {
      audioRef.current?.pause();
    };
  }, [src]);

  if (!src) return null;

  const toggle = () => {
    if (!audioRef.current) return;
    if (playingRef.current) {
      audioRef.current.pause();
      playingRef.current = false;
    } else {
      audioRef.current.play().catch(() => {});
      playingRef.current = true;
    }
  };

  return (
    <button
      className="music-toggle"
      onClick={toggle}
      aria-label={`Toggle ${label}`}
      title={label}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </button>
  );
}
