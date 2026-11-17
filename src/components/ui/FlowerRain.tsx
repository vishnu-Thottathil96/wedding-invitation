import { useEffect, useRef } from 'react';

interface FlowerRainProps {
  active: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  sway: number;
  swaySpeed: number;
  opacity: number;
  type: 'rose' | 'blush' | 'gold' | 'jasmine';
}

export function FlowerRain({ active }: FlowerRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color definitions
    const petalColors: Record<Petal['type'], { main: string; shade: string; edge: string }> = {
      rose: { main: '#E87A90', shade: '#C85A70', edge: '#FAD4DC' },
      blush: { main: '#F4A9B8', shade: '#D88A9A', edge: '#FFF0F4' },
      gold: { main: '#F4BD44', shade: '#D89C25', edge: '#FFF4D0' },
      jasmine: { main: '#FFFFFF', shade: '#EFE6D8', edge: '#FAF5EE' },
    };

    const types: Petal['type'][] = ['rose', 'blush', 'blush', 'gold', 'jasmine'];

    // Generate initial petals scattered above and in top half of screen
    const totalPetals = 48;
    const petals: Petal[] = [];

    for (let i = 0; i < totalPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * -height * 0.9 + (i < 20 ? (Math.random() * height * 0.5) : 0),
        size: Math.random() * 9 + 11, // 11px to 20px
        speedY: Math.random() * 1.6 + 1.5,
        speedX: Math.random() * 1.2 - 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.8,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.035 + 0.02,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.025 + 0.015,
        opacity: Math.random() * 0.35 + 0.65,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    let startTime = performance.now();

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      // 3D perspective fluttering
      const flipScale = Math.sin(p.flip);
      ctx.scale(1, flipScale);

      const colors = petalColors[p.type];
      ctx.globalAlpha = p.opacity;

      const w = p.size;
      const h = p.size * 1.35;

      // Draw curved flower petal
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.5);
      ctx.bezierCurveTo(w * 0.55, -h * 0.45, w * 0.65, h * 0.2, 0, h * 0.55);
      ctx.bezierCurveTo(-w * 0.65, h * 0.2, -w * 0.55, -h * 0.45, 0, -h * 0.5);
      ctx.closePath();

      // Petal radial gradient
      const grad = ctx.createRadialGradient(0, -h * 0.1, 1, 0, 0, h * 0.6);
      grad.addColorStop(0, colors.edge);
      grad.addColorStop(0.55, colors.main);
      grad.addColorStop(1, colors.shade);

      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate central petal vein
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.4);
      ctx.quadraticCurveTo(w * 0.08, 0, 0, h * 0.35);
      ctx.strokeStyle = colors.shade;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = p.opacity * 0.45;
      ctx.stroke();

      ctx.restore();
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Global fade out after 12 seconds
      const elapsed = (time - startTime) / 1000;
      let globalFade = 1;
      if (elapsed > 9) {
        globalFade = Math.max(0, 1 - (elapsed - 9) / 3);
      }

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Update positions with organic sway
        p.sway += p.swaySpeed;
        p.flip += p.flipSpeed;
        p.rotation += p.rotationSpeed;

        p.x += p.speedX + Math.sin(p.sway) * 1.1;
        p.y += p.speedY;

        // Apply global fade
        const oldOpacity = p.opacity;
        p.opacity = oldOpacity * globalFade;

        drawPetal(p);
        p.opacity = oldOpacity;

        // Recycle petals that fall off bottom if still active
        if (p.y > height + 40 && globalFade > 0.05) {
          p.y = -30 - Math.random() * 60;
          p.x = Math.random() * width;
        }
      }

      if (globalFade > 0.02) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100svh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
