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
  size: number; // drawn sprite size in CSS px
  blinkSpeed: number;
  blinkPhase: number;
  maxOpacity: number;
}

// One soft golden glow, drawn once and reused for every firefly (much cheaper than
// building a radial gradient per firefly per frame).
let glowSprite: HTMLCanvasElement | null = null;
const getGlowSprite = () => {
  if (glowSprite) return glowSprite;
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d')!;
  const r = s / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, 'hsla(50, 100%, 92%, 1)');
  grad.addColorStop(0.12, 'hsla(49, 100%, 80%, 0.95)');
  grad.addColorStop(0.3, 'hsla(48, 95%, 62%, 0.45)');
  grad.addColorStop(0.6, 'hsla(45, 90%, 55%, 0.12)');
  grad.addColorStop(1, 'hsla(45, 90%, 55%, 0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  glowSprite = c;
  return c;
};

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

    // Respect "reduce motion" settings: no fireflies at all
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const sprite = getGlowSprite();
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // 1.5x is plenty for soft dots and keeps the canvas light on high-DPI phones
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Fewer fireflies on small screens
    const n = width < 640 ? Math.ceil(count * 0.6) : count;
    const fireflies: Firefly[] = Array.from({ length: n }, () => {
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirY = Math.random() > 0.35 ? -1 : 1; // gentle preference to float upwards
      const radius = Math.random() * 0.6 + 1.1;
      return {
        x: Math.random() * (width || 400),
        y: Math.random() * (height || 800),
        vx: (Math.random() * 0.28 + 0.12) * dirX * speedMultiplier,
        vy: (Math.random() * 0.22 + 0.08) * dirY * speedMultiplier,
        wobbleSpeedX: Math.random() * 0.012 + 0.008,
        wobbleSpeedY: Math.random() * 0.012 + 0.008,
        wobbleOffsetX: Math.random() * Math.PI * 2,
        wobbleOffsetY: Math.random() * Math.PI * 2,
        wobbleAmpX: Math.random() * 0.4 + 0.2,
        wobbleAmpY: Math.random() * 0.35 + 0.2,
        size: radius * (Math.random() * 2 + 4.5) * 2,
        blinkSpeed: Math.random() * 0.01 + 0.006,
        blinkPhase: Math.random() * Math.PI * 2,
        maxOpacity: Math.random() * 0.25 + 0.55,
      };
    });

    const lightMultiplier = isLightOn ? 1.0 : 0.8;
    let frame = 0;
    let rafId = 0;
    let running = false;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        f.x += f.vx + Math.sin(frame * f.wobbleSpeedX + f.wobbleOffsetX) * f.wobbleAmpX;
        f.y += f.vy + Math.cos(frame * f.wobbleSpeedY + f.wobbleOffsetY) * f.wobbleAmpY;

        if (f.x < -25) { f.x = width + 20; f.y = Math.random() * height; }
        else if (f.x > width + 25) { f.x = -20; f.y = Math.random() * height; }
        if (f.y < -25) { f.y = height + 20; f.x = Math.random() * width; }
        else if (f.y > height + 25) { f.y = -20; f.x = Math.random() * width; }

        const pulse = Math.max(0, Math.sin(frame * f.blinkSpeed + f.blinkPhase));
        ctx.globalAlpha = (0.12 + Math.pow(pulse, 1.8) * (f.maxOpacity - 0.12)) * lightMultiplier;
        const half = f.size / 2;
        ctx.drawImage(sprite, f.x - half, f.y - half, f.size, f.size);
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(render);
    };

    // Only animate while the canvas is on screen and the tab is visible
    let onScreen = false;
    const update = () => {
      const shouldRun = onScreen && document.visibilityState === 'visible';
      if (shouldRun && !running) {
        running = true;
        rafId = requestAnimationFrame(render);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', update);

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
    };
  }, [count, isLightOn, speedMultiplier]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
