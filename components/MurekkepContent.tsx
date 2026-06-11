"use client";

import { content, type Lang } from "@/lib/content";

export function MurekkepContent({ lang }: { lang: Lang }) {
  const t = content[lang].murekkep;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .buy-row { transition: background 0.2s, padding-left 0.2s; }
        .buy-row:hover { background: var(--bg-panel); padding-left: 4.5rem !important; }
        @media (max-width: 768px) {
          .mk-meta { grid-template-columns: 1fr 1fr !important; }
          .mk-meta > div { border-bottom: 1px solid var(--border); }
          .mk-about { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 1.5rem !important; }
          .mk-buy { padding: 2rem 1.5rem !important; }
          .mk-review { padding: 4rem 1.5rem !important; }
          .banner-title-mk { font-size: clamp(2rem, 11vw, 5rem) !important; }
        }
      `}</style>

      {/* ÜST FOTO BANNER */}
      <section style={{ position: "relative", height: "62vh", minHeight: "440px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
        <img src="/images/halic-vapur.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(1.15) brightness(0.45)", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85))", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>{t.kicker}</p>
          <h1 className="banner-title-mk" style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(2.5rem, 9vw, 7rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#fff", textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}>{t.title}</h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginTop: "1rem" }}>{t.subtitle}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", maxWidth: "560px", margin: "1.5rem auto 0" }}>{t.heroDesc}</p>
        </div>
      </section>

      {/* META */}
      <section className="mk-meta" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid var(--border)" }}>
        {t.meta.map((item, i) => (
          <div key={i} style={{ padding: "2rem", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "0.75rem" }}>{item.label}</p>
            <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--text)" }}>{item.value}</p>
          </div>
        ))}
      </section>

      {/* HAKKINDA */}
      <section className="mk-about" style={{ padding: "6rem 4rem", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)", paddingTop: "0.4rem" }}>{t.aboutKicker}</div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", lineHeight: 1.9, color: "var(--text-muted)" }}>{t.aboutText}</p>
      </section>

      {/* NEREDEN ALINIR */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "2rem 4rem", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)" }}>{t.buyKicker}</p>
        </div>
        {t.buyLinks.map((b, i) => (
          <a key={i} href={b.url} target="_blank" rel="noopener noreferrer" className="buy-row mk-buy" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.75rem 4rem", borderBottom: i < t.buyLinks.length - 1 ? "1px solid var(--border)" : "none" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--text-soft)" }}>{b.name}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--text-dim)" }}>→</span>
          </a>
        ))}
      </section>

      {/* OKURLARDAN */}
      <section className="mk-review" style={{ padding: "6rem 4rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)" }}>{t.reviewKicker}</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: "0.1em", color: "var(--text-dim)" }}>★★★★★</p>
        <blockquote style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1rem, 2.2vw, 1.35rem)", fontStyle: "italic", lineHeight: 1.7, color: "var(--text-soft)", maxWidth: "640px" }}>{t.review}</blockquote>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)" }}>{t.reviewSource}</p>
      </section>
    </div>
  );
}
