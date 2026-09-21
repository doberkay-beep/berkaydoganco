"use client";

import { useEffect } from "react";

// Glass-card'larda imleci takip eden yumuşak parıltı (--mx/--my). Olay
// delegasyonu ile tek dinleyici; reduced-motion'da devre dışı.
export default function GlassHover() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(".glass-card") as HTMLElement | null;
      if (!t || raf) return;
      raf = requestAnimationFrame(() => {
        const r = t.getBoundingClientRect();
        t.style.setProperty("--mx", `${Math.round(e.clientX - r.left)}px`);
        t.style.setProperty("--my", `${Math.round(e.clientY - r.top)}px`);
        raf = 0;
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
