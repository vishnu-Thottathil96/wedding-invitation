import { useEffect, useRef, useState, useCallback } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicToggleProps {
  src: string;
  label: string;
}

export function MusicToggle({ src, label }: MusicToggleProps) {
  const audioRef          = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying]           = useState(false);
  const [loaded, setLoaded]             = useState(false);
  const [blocked, setBlocked]           = useState(false);   // autoplay was blocked
  const [promptDismissed, setPromptDismissed] = useState(false);

  // ── Create audio instance ────────────────────────────────────────────────
  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop   = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const onCanPlay = () => setLoaded(true);
    const onError   = () => setLoaded(false);
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);

    // Attempt autoplay
    audio.play()
      .then(() => {
        setPlaying(true);
        setBlocked(false);
      })
      .catch(() => {
        // Browser blocked autoplay — show soft prompt
        setBlocked(true);
      });

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.src = '';
    };
  }, [src]);

  // ── Toggle handler ───────────────────────────────────────────────────────
  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setPlaying(true);
          setBlocked(false);
          setPromptDismissed(true);
        })
        .catch(() => setBlocked(true));
    }
  }, [playing]);

  // No audio configured
  if (!src) return null;

  return (
    <>
      {/* ── "Enter with music" soft prompt ───────────────────────────────── */}
      <AnimatePresence>
        {blocked && !promptDismissed && (
          <motion.button
            onClick={toggle}
            aria-label="Turn on background music"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            style={{
              position: 'fixed',
              bottom: '5rem',
              right: '1.5rem',
              zIndex: 99,
              background: 'rgba(26,20,16,0.82)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(182,154,112,0.35)',
              color: 'rgba(212,184,150,0.92)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.6rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              maxWidth: '180px',
            }}
          >
            <Music size={13} strokeWidth={1.5} aria-hidden />
            Turn on music
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Persistent toggle pill ────────────────────────────────────────── */}
      <button
        onClick={toggle}
        className="music-toggle"
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        title={playing ? `Pause: ${label}` : `Play: ${label}`}
      >
        {playing ? (
          <span className="flex items-end gap-0.5" aria-hidden>
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
          </span>
        ) : loaded || blocked ? (
          <Music size={16} strokeWidth={1.5} aria-hidden />
        ) : (
          <VolumeX size={16} strokeWidth={1.5} aria-hidden />
        )}
      </button>
    </>
  );
}
