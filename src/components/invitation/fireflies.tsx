"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  s: number;
  p: number;
  a: number;
};

export function Fireflies({ count = 26 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.55 + Math.random() * 1.45,
      s: 0.12 + Math.random() * 0.4,
      p: Math.random() * Math.PI * 2,
      a: 0.18 + Math.random() * 0.55,
    }));

    const resize = () => {
      canvas.width = Math.max(1, canvas.clientWidth) * dpr;
      canvas.height = Math.max(1, canvas.clientHeight) * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.p += 0.0038 * p.s;
        p.x += Math.sin(p.p) * 0.00028 * p.s;
        p.y += Math.cos(p.p * 0.85) * 0.0002 * p.s;
        if (p.x < -0.04) p.x = 1.04;
        if (p.x > 1.04) p.x = -0.04;
        if (p.y < -0.04) p.y = 1.04;
        if (p.y > 1.04) p.y = -0.04;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.0028 + p.p));
        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 213, 168, ${p.a * twinkle})`;
        ctx.shadowColor = "rgba(201, 164, 108, 0.85)";
        ctx.shadowBlur = 8 * dpr;
        ctx.arc(p.x * w, p.y * h, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-20 size-full"
      aria-hidden
    />
  );
}
