"use client";

import { useEffect, type RefObject } from "react";

// Bölümün kaydırma ilerlemesini yavaşça izler; duruyorsa çizim yapmaz.
export function useIlerleme(ref: RefObject<HTMLElement | null>, cb: (p: number) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const az = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let y = -1;
    const adim = () => {
      const r = el.getBoundingClientRect();
      const yol = r.height - window.innerHeight;
      const h = yol > 0 ? Math.max(0, Math.min(1, -r.top / yol)) : 0;
      if (y < 0 || az) y = h;
      else y += (h - y) * 0.055;
      cb(y);
      raf = Math.abs(h - y) > 0.0004 ? requestAnimationFrame(adim) : 0;
    };
    const uyan = () => {
      if (!raf) raf = requestAnimationFrame(adim);
    };
    window.addEventListener("scroll", uyan, { passive: true });
    window.addEventListener("resize", uyan);
    uyan();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", uyan);
      window.removeEventListener("resize", uyan);
    };
  }, [ref, cb]);
}
