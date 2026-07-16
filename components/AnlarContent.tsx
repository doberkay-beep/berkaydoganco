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
          padding: 4rem 2.75rem;
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
          background: linear-gradient(to top, rgba(11,5,6,0.85), rgba(11,5,6,0));
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--cream);
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
      <section className="anlar-hero" style={{ minHeight: "38vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
        <p className="eyebrow" style={{ marginBottom: "2rem" }}>{t.kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.035em", color: "var(--cream)", marginBottom: "1.25rem" }}>{t.title}</h1>
        <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.25rem", color: "var(--gray)", maxWidth: "440px", lineHeight: 1.6 }}>{t.desc}</p>
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
      <section className="anlar-soon" style={{ padding: "5rem 2.75rem", borderTop: "1px solid var(--border)", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--bordo)", marginBottom: "1.25rem" }}>{t.soonKicker}</p>
        <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", color: "var(--cream)" }}>{t.soonText}</p>
      </section>
    </div>
  );
}
