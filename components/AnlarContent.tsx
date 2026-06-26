"use client";

import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";

export function AnlarContent({ lang }: { lang: Lang }) {
  const t = content[lang].anlar;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .anlar-grid {
          column-count: 3;
          column-gap: 1.25rem;
          padding: 4rem;
        }
        .anlar-item {
          break-inside: avoid;
          margin-bottom: 1.25rem;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .anlar-item img {
          width: 100%;
          display: block;
          filter: var(--photo-filter) grayscale(100%);
          transition: filter 0.5s, transform 0.6s;
        }
        .anlar-item:hover img {
          filter: var(--photo-filter) grayscale(0%);
          transform: scale(1.04);
        }
        .anlar-cap {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 1.25rem 1rem 0.9rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.92);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s, transform 0.4s;
        }
        .anlar-item:hover .anlar-cap { opacity: 1; transform: translateY(0); }
        @media (max-width: 1100px) { .anlar-grid { column-count: 2; padding: 3rem 1.5rem; } }
        @media (max-width: 640px) { .anlar-grid { column-count: 1; padding: 2.5rem 1.5rem; } }
        @media (max-width: 768px) {
          .anlar-hero { padding: 4rem 1.5rem !important; }
          .anlar-soon { padding: 4rem 1.5rem !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="anlar-hero" style={{ minHeight: "38vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "2rem" }}>{t.kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "1.5rem" }}>{t.title}</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "440px", lineHeight: 1.8 }}>{t.desc}</p>
      </section>

      {/* GALERİ */}
      <section className="anlar-grid">
        {t.items.map((item, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08} className="anlar-item">
            <img src={item.src} alt={item.caption} loading="lazy" />
            <span className="anlar-cap">{item.caption}</span>
          </Reveal>
        ))}
      </section>

      {/* YAKINDA */}
      <section className="anlar-soon" style={{ padding: "5rem 4rem", borderTop: "1px solid var(--border)", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.3em", color: "var(--accent)", marginBottom: "1.25rem" }}>{t.soonKicker}</p>
        <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1.1rem, 3vw, 1.8rem)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>{t.soonText}</p>
      </section>
    </div>
  );
}
