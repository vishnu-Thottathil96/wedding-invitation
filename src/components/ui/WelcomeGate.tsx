import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lottie, { type AnimationItem } from 'lottie-web';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

const ROSE_SCALAR = 3.4; // size of the rose emoji particles
const PETAL_COLORS = ['#B3122E', '#D7263D', '#E8435A', '#F25C78', '#FF8FA3', '#8E1728'];

interface WelcomeGateProps {
  onOpen: () => void;
  brideName?: string;
  groomName?: string;
}

export const WelcomeGate: React.FC<WelcomeGateProps> = ({
  onOpen,
  brideName = 'Anaswara',
  groomName = 'Aashil',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/paper-plane.json',
    });

    return () => {
      animRef.current?.destroy();
    };
  }, []);

  const triggerRoses = () => {
    // Whole roses (emoji) and soft rose petals (custom teardrop shape)
    const rose = confetti.shapeFromText({ text: '🌹', scalar: ROSE_SCALAR });
    const petal = confetti.shapeFromPath({
      path: 'M6 0 C 11 3, 12 10, 6 16 C 0 10, 1 3, 6 0 Z',
    });

    const roses = (opts: confetti.Options) =>
      confetti({
        shapes: [rose],
        scalar: ROSE_SCALAR,
        flat: false,
        disableForReducedMotion: true,
        ...opts,
      });

    const petals = (opts: confetti.Options) =>
      confetti({
        shapes: [petal],
        colors: PETAL_COLORS,
        scalar: 1.4,
        disableForReducedMotion: true,
        ...opts,
      });

    // 1. Roses pop out from the centre
    roses({ particleCount: 26, spread: 110, origin: { y: 0.55 }, startVelocity: 40, gravity: 0.9, ticks: 260 });
    petals({ particleCount: 60, spread: 120, origin: { y: 0.55 }, startVelocity: 38, gravity: 0.7, ticks: 300 });

    // 2. Left and right rose cannons
    setTimeout(() => {
      roses({ particleCount: 12, angle: 60, spread: 60, origin: { x: 0.05, y: 0.75 }, startVelocity: 48 });
      roses({ particleCount: 12, angle: 120, spread: 60, origin: { x: 0.95, y: 0.75 }, startVelocity: 48 });
      petals({ particleCount: 35, angle: 60, spread: 70, origin: { x: 0.05, y: 0.75 } });
      petals({ particleCount: 35, angle: 120, spread: 70, origin: { x: 0.95, y: 0.75 } });
    }, 200);

    // 3. Petals drift down from above
    setTimeout(() => {
      petals({ particleCount: 70, spread: 160, origin: { y: 0.15 }, startVelocity: 18, gravity: 0.45, drift: 0.4, ticks: 420 });
      roses({ particleCount: 10, spread: 140, origin: { y: 0.2 }, startVelocity: 16, gravity: 0.55, ticks: 380 });
    }, 450);
  };

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Shower of popping roses and petals
    triggerRoses();

    // Trigger parent open after exit choreography begins
    setTimeout(() => {
      onOpen();
    }, 850);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div
          key="welcome-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(8px)',
            transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
          }}
          onClick={handleOpen}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 overflow-hidden cursor-pointer select-none bg-gradient-to-b from-[#1C0609] via-[#2A080F] to-[#120306] text-[#FAF5EB]"
        >
          {/* ── Background Subtle Golden Watermark Glow ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,rgba(142,23,40,0.12)_45%,transparent_70%)] pointer-events-none blur-2xl" />

          {/* Top Auspicious Invocation Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative z-10 flex flex-col items-center text-center mt-2"
          >
            <p className="font-serif text-xs sm:text-sm tracking-[0.3em] uppercase text-[#D4AF37]/90 mb-1">
              ॥ श्री महागणपतये नमः ॥
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF5EB] font-light tracking-wide">
              {groomName} &amp; {brideName}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <Heart className="w-3.5 h-3.5 text-[#E6CA65] fill-[#E6CA65]" />
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </motion.div>

          {/* ── Centerpiece: Lottie Paper Plane Heart Animation ── */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center my-auto"
          >
            {/* Pulsing golden halo ring */}
            <motion.div
              animate={{
                scale: [1, 1.14, 1],
                opacity: [0.4, 0.75, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-[#D4AF37]/30 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-[#FFDF73]/15 pointer-events-none -inset-3 m-auto"
            />

            {/* Lottie Animation Canvas Container */}
            <div
              ref={containerRef}
              className="w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center filter drop-shadow-[0_8px_24px_rgba(212,175,55,0.35)]"
            />
          </motion.div>

          {/* ── Bottom Interactive CTA: "Tap to Start the Celebrations" ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 flex flex-col items-center text-center mb-4 max-w-sm"
          >
            <p className="font-serif italic text-base sm:text-lg text-[#F6E29F] tracking-wide mb-3">
              An invitation written with love
            </p>

            {/* Pulsing Shimmer Pill Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(212,175,55,0.4)',
                  '0 0 35px rgba(212,175,55,0.75)',
                  '0 0 20px rgba(212,175,55,0.4)',
                ],
              }}
              transition={{
                boxShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#DFB347] via-[#FFF0B8] to-[#C89B2B] text-[#340A10] font-cinzel text-xs sm:text-sm font-bold tracking-[0.22em] uppercase flex items-center gap-2.5 shadow-xl transition-transform cursor-pointer border border-[#FFF6D4]"
            >
              <Sparkles className="w-4 h-4 text-[#340A10]" />
              <span>TAP TO START THE CELEBRATIONS</span>
              <Sparkles className="w-4 h-4 text-[#340A10]" />
            </motion.button>

            <span className="text-[11px] font-sans text-[#FAF5EB]/50 tracking-widest uppercase mt-3">
              Tap anywhere to open
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
