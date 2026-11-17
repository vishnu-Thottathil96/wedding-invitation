import React, { useEffect, useRef } from 'react';

interface FirefliesProps {
  count?: number;
  className?: string;
  isLightOn?: boolean;
  speedMultiplier?: number;
}

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wobbleSpeedX: number;
  wobbleSpeedY: number;
  wobbleOffsetX: number;
  wobbleOffsetY: number;
  wobbleAmpX: number;
  wobbleAmpY: number;
  radius: number;
  glowRadius: number;
  blinkSpeed: number;
  blinkPhase: number;
  hue: number;
  maxOpacity: number;
}

export const Fireflies: React.FC<FirefliesProps> = ({
  count = 22,
  className = 'absolute inset-0 pointer-events-none z-10',
  isLightOn = true,
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize fireflies with gentle, whole-screen linear drifts
    const fireflies: Firefly[] = Array.from({ length: count }, () => {
      // Tiny delicate core radius (1.1px to 1.7px)
      const radius = Math.random() * 0.6 + 1.1;
      // Gentle drift angles across the screen
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirY = Math.random() > 0.35 ? -1 : 1; // gentle preference to float upwards

      return {
        x: Math.random() * (width || 400),
        y: Math.random() * (height || 800),
        // Gentle, slow, peaceful continuous drift across whole screen
        vx: (Math.random() * 0.28 + 0.12) * dirX * speedMultiplier,
        vy: (Math.random() * 0.22 + 0.08) * dirY * speedMultiplier,
        // Very slow organic flight wobbles (fluttering in air currents)
        wobbleSpeedX: Math.random() * 0.012 + 0.008,
        wobbleSpeedY: Math.random() * 0.012 + 0.008,
        wobbleOffsetX: Math.random() * Math.PI * 2,
        wobbleOffsetY: Math.random() * Math.PI * 2,
        wobbleAmpX: Math.random() * 0.4 + 0.2,
        wobbleAmpY: Math.random() * 0.35 + 0.2,
        radius,
        // Soft, subtle glow (5px - 9px), NOT giant street lamps
        glowRadius: radius * (Math.random() * 2 + 4.5),
        // Slow, lazy blinking (takes 5-10 seconds per pulse cycle)
        blinkSpeed: Math.random() * 0.01 + 0.006,
        blinkPhase: Math.random() * Math.PI * 2,
        // Natural firefly bioluminescence hue: warm golden amber/yellow (46 - 52)
        hue: Math.random() * 6 + 46,
        // Subtle, elegant opacity (never harsh 1.0 headlight)
        maxOpacity: Math.random() * 0.25 + 0.55,
      };
    });

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const lightMultiplier = isLightOn ? 1.0 : 0.8;

      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];

        // ── 1. Smooth Continuous Whole-Screen Flight ──
        // Base linear glide + gentle sinusoidal breeze wobble
        const flutterX =
          Math.sin(frame * f.wobbleSpeedX + f.wobbleOffsetX) * f.wobbleAmpX;
        const flutterY =
          Math.cos(frame * f.wobbleSpeedY + f.wobbleOffsetY) * f.wobbleAmpY;

        f.x += f.vx + flutterX;
        f.y += f.vy + flutterY;

        // Wrap around borders gracefully so they traverse the WHOLE screen
        if (f.x < -25) {
          f.x = width + 20;
          f.y = Math.random() * height;
        } else if (f.x > width + 25) {
          f.x = -20;
          f.y = Math.random() * height;
        }

        if (f.y < -25) {
          f.y = height + 20;
          f.x = Math.random() * width;
        } else if (f.y > height + 25) {
          f.y = -20;
          f.x = Math.random() * width;
        }

        // ── 2. Slow, Dreamy Bioluminescent Breathing ──
        // Smooth sine wave pulse: long gentle fade-in, calm glow, gentle fade-out
        const pulseCycle = Math.sin(frame * f.blinkSpeed + f.blinkPhase);
        // Minimum resting glow of 0.1, pulsing up smoothly to maxOpacity
        const normalizedGlow = Math.max(0, pulseCycle);
        const opacity =
          (0.12 + Math.pow(normalizedGlow, 1.8) * (f.maxOpacity - 0.12)) *
          lightMultiplier;

        // ── 3. Render Tiny, Realistic Firefly Light ──
        // Soft delicate outer aura
        const glow = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          f.glowRadius
        );
        glow.addColorStop(0, `hsla(${f.hue}, 95%, 65%, ${opacity * 0.75})`);
        glow.addColorStop(
          0.45,
          `hsla(${f.hue - 4}, 90%, 55%, ${opacity * 0.22})`
        );
        glow.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Tiny central golden spark core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(50, 100%, 88%, ${Math.min(1, opacity + 0.2)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, isLightOn, speedMultiplier]);

  return <canvas ref={canvasRef} className={className} />;
};
