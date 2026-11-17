import React, { useEffect, useRef } from 'react';

interface LightParticlesProps {
  count?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  targetOpacity: number;
  glowRadius: number;
  hue: number;
}

export const LightParticles: React.FC<LightParticlesProps> = ({
  count = 42,
  className = 'absolute inset-0 pointer-events-none',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles with warm golden tones (gold, amber, champagne)
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 1,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        targetOpacity: Math.random() * 0.7 + 0.2,
        glowRadius: Math.random() * 12 + 6,
        hue: Math.random() * 20 + 38, // Warm gold & amber range (38 to 58)
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Subtle twinkling opacity
        p.opacity += (p.targetOpacity - p.opacity) * 0.02;
        if (Math.abs(p.targetOpacity - p.opacity) < 0.05) {
          p.targetOpacity = Math.random() * 0.65 + 0.15;
        }

        // Wrap around bottom/top
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Draw soft golden glowing halo
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.glowRadius
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${p.opacity})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 85%, 55%, ${p.opacity * 0.4})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core bright point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${Math.min(1, p.opacity + 0.2)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return <canvas ref={canvasRef} className={className} />;
};
