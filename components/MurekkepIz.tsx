"use client";

import { useEffect, useRef } from "react";

/* Mürekkep izi — imlecin ardında sönümlenen köz zerreleri.
   Yalnız hassas imleçli cihazlarda (masaüstü) ve reduced-motion kapalıyken.
   pointer-events yok; grenin hemen altında, her sayfada. */

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };

export function MurekkepIz() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0, last = 0;
    const ps: P[] = [];

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number, n: number, spread: number) => {
      for (let i = 0; i < n && ps.length < 140; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * spread;
        ps.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 0.15, life: 0, max: 500 + Math.random() * 400, r: 0.8 + Math.random() * 1.6 });
      }
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 26) return; // seyrelt
      last = now;
      spawn(e.clientX, e.clientY, 1, 0.35);
    };
    const onDown = (e: PointerEvent) => spawn(e.clientX, e.clientY, 9, 1.6);

    let prev = performance.now();
    const step = () => {
      const now = performance.now();
      const dt = Math.min(50, now - prev); prev = now;
      ctx.clearRect(0, 0, W, H);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life += dt;
        if (p.life >= p.max) { ps.splice(i, 1); continue; }
        p.x += p.vx; p.y += p.vy; p.vx *= 0.985; p.vy *= 0.985;
        const k = 1 - p.life / p.max;
        ctx.beginPath();
        ctx.fillStyle = `rgba(229, 64, 42, ${(0.38 * k).toFixed(3)})`;
        ctx.arc(p.x, p.y, p.r * (0.6 + 0.4 * k), 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    resize(); step();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 2147483000, pointerEvents: "none" }}
    />
  );
}
