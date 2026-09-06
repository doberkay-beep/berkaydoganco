"use client";

import { useEffect, useState } from "react";
import { SOZLER, KITAP_ADI } from "@/lib/sozler";

/* Gömülü "Günün Közü" kartı — başka sitelerin iframe ile gösterdiği
   kompakt kart. Takvimle aynı gün→söz eşlemesi. Linkler üst pencereye açılır. */

function gunIndeksi(d: Date): number {
  const yilBasi = new Date(d.getFullYear(), 0, 0);
  const gun = Math.floor((d.getTime() - yilBasi.getTime()) / 86400000);
  return ((gun % SOZLER.length) + SOZLER.length) % SOZLER.length;
}

export default function GomluSoz() {
  const [idx, setIdx] = useState<number | null>(null);
  useEffect(() => { setIdx(gunIndeksi(new Date())); }, []);
  const soz = SOZLER[idx ?? 0];

  return (
    <div style={{
      minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center",
      background: "radial-gradient(130% 110% at 50% -20%, #241a13 0%, #0b0a09 60%, #060504 100%)",
      color: "#F1EDE4", padding: "1.4rem 1.5rem", boxSizing: "border-box",
    }}>
      <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E5402A" }}>
        Günün Közü
      </span>
      <blockquote style={{
        margin: "0.75rem 0 0", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300,
        fontSize: soz.s.length > 80 ? "0.98rem" : soz.s.length > 45 ? "1.15rem" : "1.35rem",
        lineHeight: 1.45, opacity: idx === null ? 0 : 1, transition: "opacity 0.5s ease",
      }}>
        &ldquo;{soz.s}&rdquo;
      </blockquote>
      <div style={{ marginTop: "0.9rem", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#9a948a" }}>
          — Berkay Doğan · {KITAP_ADI[soz.k]}
        </span>
        <a href="https://www.berkaydogan.co/sozler/" target="_top" rel="noopener"
          style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E5402A", textDecoration: "none", borderBottom: "1px solid #E5402A", paddingBottom: "1px" }}>
          berkaydogan.co
        </a>
      </div>
    </div>
  );
}
