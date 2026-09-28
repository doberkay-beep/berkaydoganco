"use client";

import { useEffect, useState } from "react";
import { satinAlTikla } from "@/lib/olcum";

/* Yapışkan satın al — kitap sayfasında, mobilde altta hep görünen zarif çubuk.
   Sayfa biraz kaydırılınca belirir; masaüstünde hiç görünmez. */

export function YapiskanSatinAl({ ad, fiyat, git }: { ad: string; fiyat: string | null; git: string }) {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    const bak = () => setGorunur(window.scrollY > 420);
    bak();
    window.addEventListener("scroll", bak, { passive: true });
    return () => window.removeEventListener("scroll", bak);
  }, []);

  return (
    <div
      className="ks-yapiskan"
      style={{
        position: "fixed", insetInline: 0, bottom: 0, zIndex: 60,
        transform: gorunur ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        padding: "0.7rem 1rem calc(0.7rem + env(safe-area-inset-bottom))",
        background: "color-mix(in srgb, var(--bg) 82%, transparent)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid var(--line)",
        display: "flex", alignItems: "center", gap: "0.9rem", justifyContent: "space-between",
      }}
    >
      <style>{`@media (min-width: 768px) { .ks-yapiskan { display: none !important; } }`}</style>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.98rem", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ad}</p>
        {fiyat && <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted)" }}>{fiyat} TL</p>}
      </div>
      <a
        href={`/git/${git}/`}
        rel="noopener"
        onClick={() => satinAlTikla(git, "yapiskan-cubuk")}
        style={{ flexShrink: 0, fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", padding: "0.75rem 1.4rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}
      >
        Satın al →
      </a>
    </div>
  );
}
