"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type Lang } from "@/lib/site";
import { olcumla } from "@/lib/olcum";

/* İlk ziyaret turu — siteye ilk kez gelene hero altında üç adımlık zarif tanışma.
   İkinci ziyarette (ya da kapatınca) kendiliğinden kaybolur. Pop-up değildir. */

const COPY: Record<Lang, { etiket: string; adimlar: { href: string; ad: string; alt: string }[] }> = {
  tr: {
    etiket: "İlk kez mi buradasın? Üç adımlık tanışma",
    adimlar: [
      { href: "/sozler", ad: "Bir söz oku", alt: "30 saniye" },
      { href: "/film", ad: "Filmi izle", alt: "8 dakika" },
      { href: "/kitaplar/tasfiye", ad: "Kitaba bak", alt: "Tasfiye" },
    ],
  },
  en: {
    etiket: "First time here? A three-step introduction",
    adimlar: [
      { href: "/sozler", ad: "Read a line", alt: "30 seconds" },
      { href: "/film", ad: "Watch the film", alt: "8 minutes" },
      { href: "/kitaplar/tasfiye", ad: "See the book", alt: "Tasfiye" },
    ],
  },
  fr: {
    etiket: "Première visite ? Trois pas pour faire connaissance",
    adimlar: [
      { href: "/sozler", ad: "Lire un vers", alt: "30 secondes" },
      { href: "/film", ad: "Voir le film", alt: "8 minutes" },
      { href: "/kitaplar/tasfiye", ad: "Voir le livre", alt: "Tasfiye" },
    ],
  },
};

export function IlkZiyaret({ lang }: { lang: Lang }) {
  const [goster, setGoster] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("bd-ziyaret")) {
        setGoster(true);
        localStorage.setItem("bd-ziyaret", String(Date.now()));
      }
    } catch { /* yoksay */ }
  }, []);

  if (!goster) return null;
  const c = COPY[lang];

  return (
    <div
      style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 clamp(1.25rem, 4vw, 3.25rem)",
      }}
    >
      <div
        style={{
          display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap",
          padding: "0.9rem 1.2rem", border: "1px solid var(--line)", borderRadius: "14px",
          background: "var(--glass-bg, var(--bg-2))",
        }}
      >
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--muted)" }}>
          {c.etiket}:
        </span>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", flex: 1 }}>
          {c.adimlar.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              onClick={() => olcumla("ilk-ziyaret", { adim: String(i + 1) })}
              style={{
                display: "inline-flex", alignItems: "baseline", gap: "0.45rem",
                fontFamily: "var(--font-grotesk)", fontSize: "0.8rem", fontWeight: 500,
                padding: "0.55rem 1rem", borderRadius: "100px", border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            >
              <span style={{ color: "var(--accent-2, var(--accent))" }}>{i + 1}.</span> {a.ad}
              <span style={{ fontSize: "0.66rem", color: "var(--muted)" }}>{a.alt}</span>
            </Link>
          ))}
        </div>
        <button
          onClick={() => setGoster(false)}
          aria-label="kapat"
          style={{ background: "none", border: 0, cursor: "pointer", color: "var(--muted)", fontSize: "1rem", lineHeight: 1 }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
