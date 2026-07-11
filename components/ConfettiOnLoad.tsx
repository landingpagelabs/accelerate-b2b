'use client';

import { useEffect, useRef } from 'react';

// Colors from the designer's reference (Confetti Pop On Page Load.png)
const COLORS = ['#ff3ea5', '#ff5b8a', '#29c5f6', '#ffe24b', '#ff5353', '#e91e8c'];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  color: string;
  shape: 'rect' | 'circle';
  life: number;
};

export default function ConfettiOnLoad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect the "reduced motion" setting
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];

    // Everything scales relative to the viewport width (1440 = reference), so the
    // look is the same on a MacBook and on a TV — "confetti covering half the
    // screen" in the same proportion. Speed, gravity, and size grow together,
    // so trajectories stay geometrically similar on any screen.
    const scale = width / 1440;

    // Two "cannons" at the bottom firing upward toward the center — the arc from the reference
    const spawnBurst = (originX: number, angleDeg: number) => {
      const count = 120;
      for (let i = 0; i < count; i++) {
        const spread = 55; // spread in degrees
        const angle = ((angleDeg + (Math.random() - 0.5) * spread) * Math.PI) / 180;
        const speed = (11 + Math.random() * 13) * scale;
        particles.push({
          x: originX,
          y: height + 10,
          vx: Math.cos(angle) * speed,
          vy: -Math.sin(angle) * speed,
          size: (8 + Math.random() * 9) * scale,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.3,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          shape: Math.random() > 0.4 ? 'rect' : 'circle',
          life: 0,
        });
      }
    };

    // Symmetric around the screen center → always centered at any width
    const centerX = width / 2;
    const spawnOffset = width * 0.15;
    spawnBurst(centerX - spawnOffset, 72); // left of center → up-and-right
    spawnBurst(centerX + spawnOffset, 108); // right of center → up-and-left

    const gravity = 0.2 * scale;
    const drag = 0.992;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = now - start;

      for (const p of particles) {
        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        p.life += 1;

        // Fade out after the particle starts falling
        const fade = elapsed > 2600 ? Math.max(0, 1 - (elapsed - 2600) / 1400) : 1;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (elapsed < 4200) {
        raf = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />;
}
