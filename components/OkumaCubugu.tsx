"use client";

import { useEffect, useState } from "react";

/* Okuma ilerleme çubuğu — sayfanın en üstünde ince bir accent çizgisi,
   yazı boyunca kaydıkça dolar. */

export function OkumaCubugu() {
  const [oran, setOran] = useState(0);

  useEffect(() => {
    const hesapla = () => {
      const d = document.documentElement;
      const toplam = d.scrollHeight - d.clientHeight;
      setOran(toplam > 0 ? Math.min(1, d.scrollTop / toplam) : 0);
    };
    hesapla();
    window.addEventListener("scroll", hesapla, { passive: true });
    window.addEventListener("resize", hesapla);
    return () => {
      window.removeEventListener("scroll", hesapla);
      window.removeEventListener("resize", hesapla);
    };
  }, []);

  return (
    <div aria-hidden style={{ position: "fixed", top: 0, left: 0, right: 0, height: "3px", zIndex: 90, pointerEvents: "none" }}>
      <div
        style={{
          height: "100%",
          width: `${oran * 100}%`,
          background: "var(--accent)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
