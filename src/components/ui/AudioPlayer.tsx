import { forwardRef, useState, useEffect, useImperativeHandle, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  artist?: string;
}

export interface AudioPlayerHandle {
  /** Start the song at full volume. Call it from a tap/click so browsers allow sound. */
  start: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(({
  src,
  title = 'Kalyana Vasantham',
  artist = 'Carnatic Tanpura & Temple Bells',
}, ref) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  // Audio elements
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gainNodes: GainNode[];
    masterGain: GainNode | null;
    intervalId: number | null;
  }>({
    oscillators: [],
    gainNodes: [],
    masterGain: null,
    intervalId: null,
  });

  // Synthesize an authentic meditative Indian Tanpura & Temple Bell drone via Web Audio API
  const startSynthDrone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 2.5);
      master.connect(ctx.destination);
      synthNodesRef.current.masterGain = master;

      // Authentic Indian Tanpura frequencies (Sa = 138.59Hz C#3, Pa = 207.65Hz G#3, Sa octave = 277.18Hz C#4)
      const freqs = [
        { freq: 138.59, type: 'triangle' as OscillatorType, vol: 0.35, detune: 0 },
        { freq: 138.59 * 2, type: 'sine' as OscillatorType, vol: 0.18, detune: 2 },
        { freq: 207.65, type: 'sine' as OscillatorType, vol: 0.28, detune: -1.5 },
        { freq: 277.18, type: 'sine' as OscillatorType, vol: 0.2, detune: 3 },
        { freq: 69.3, type: 'sine' as OscillatorType, vol: 0.3, detune: 0 }, // Sub-bass root
      ];

      const oscs: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      freqs.forEach((item, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = item.type;
        osc.frequency.setValueAtTime(item.freq, ctx.currentTime);
        osc.detune.setValueAtTime(item.detune, ctx.currentTime);

        // Gentle breathing pulsation
        gain.gain.setValueAtTime(item.vol * 0.7, ctx.currentTime);

        osc.connect(gain);
        gain.connect(master);
        osc.start();

        oscs.push(osc);
        gains.push(gain);

        // Slow subtle LFO modulation for warm organic strings
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.08, ctx.currentTime);
        lfoGain.gain.setValueAtTime(item.vol * 0.25, ctx.currentTime);
        lfo.connect(gain.gain);
        lfo.start();
      });

      // Occasional gentle temple chime chime (every 12 seconds)
      const ringTempleChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = ctx.currentTime;
        const bell = ctx.createOscillator();
        const bellGain = ctx.createGain();

        // 830Hz / 1660Hz warm temple bell harmonic
        bell.type = 'sine';
        bell.frequency.setValueAtTime(830.6, now);

        bellGain.gain.setValueAtTime(0.001, now);
        bellGain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        bell.connect(bellGain);
        bellGain.connect(master);

        bell.start(now);
        bell.stop(now + 4.6);
      };

      // Play one initial chime softly
      setTimeout(ringTempleChime, 1200);
      const intervalId = window.setInterval(ringTempleChime, 14000);

      synthNodesRef.current.oscillators = oscs;
      synthNodesRef.current.gainNodes = gains;
      synthNodesRef.current.intervalId = intervalId;
    } catch {
      // Audio fallback
    }
  };

  const stopSynthDrone = () => {
    if (synthNodesRef.current.intervalId) {
      clearInterval(synthNodesRef.current.intervalId);
      synthNodesRef.current.intervalId = null;
    }
    if (synthNodesRef.current.masterGain && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        synthNodesRef.current.masterGain.gain.setValueAtTime(
          synthNodesRef.current.masterGain.gain.value,
          ctx.currentTime
        );
        synthNodesRef.current.masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          synthNodesRef.current.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          synthNodesRef.current.oscillators = [];
          synthNodesRef.current.gainNodes = [];
        }, 900);
      } catch {}
    }
  };

  // Started by the envelope tap on the intro screen: song plays loud from the start
  const start = () => {
    setHasInteracted(true);
    setShowTooltip(false);
    if (isPlaying) return;

    if (src && audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 1;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          startSynthDrone();
          setIsPlaying(true);
        });
      return;
    }
    startSynthDrone();
    setIsPlaying(true);
  };

  useImperativeHandle(ref, () => ({ start }));

  const togglePlay = () => {
    setHasInteracted(true);
    setShowTooltip(false);

    if (src && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If mp3 fails, fallback to synthesizer
            startSynthDrone();
            setIsPlaying(true);
          });
      }
      return;
    }

    // Use built-in Carnatic synthesizer
    if (isPlaying) {
      stopSynthDrone();
      setIsPlaying(false);
    } else {
      startSynthDrone();
      setIsPlaying(true);
    }
  };

  // Don't compete with the first screen: start fetching the song only after the page
  // has loaded (a tap before then still streams it immediately).
  useEffect(() => {
    if (!src) return;
    let timer = 0;
    const warmUp = () => {
      timer = window.setTimeout(() => {
        const audio = audioRef.current;
        if (audio && audio.paused && audio.preload !== 'auto') {
          audio.preload = 'auto';
          audio.load();
        }
      }, 1200);
    };
    if (document.readyState === 'complete') warmUp();
    else window.addEventListener('load', warmUp, { once: true });
    return () => {
      window.removeEventListener('load', warmUp);
      clearTimeout(timer);
    };
  }, [src]);

  // Dismiss tooltip after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSynthDrone();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try { audioCtxRef.current.close(); } catch {}
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3">
      {/* Audio element for custom file if provided */}
      {src && (
        <audio
          ref={audioRef}
          src={src}
          loop
          preload="none"
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Tooltip */}
      <AnimatePresence>
        {showTooltip && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FAF5EC]/95 text-[#59131A] text-xs font-sans tracking-wide border border-[#D1B892] shadow-xl backdrop-blur-md absolute right-16 bottom-2"
          >
            <Music className="w-3.5 h-3.5 text-[#DFAB43] animate-pulse" />
            <span>Play: {title} ({artist})</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Toggle Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FAF5EC] text-[#59131A] border border-[#DFD0BC] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)] hover:bg-[#F6EFE2] transition-all cursor-pointer flex items-center justify-center relative"
        aria-label={isPlaying ? `Mute ${title}` : `Play ${title}`}
        title={isPlaying ? `Mute: ${title}` : `Play: ${title}`}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#59131A]" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#59131A]" />
        )}
      </motion.button>
    </div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';
