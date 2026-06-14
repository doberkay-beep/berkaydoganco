"use client";

import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";

export function AuthorContent({ lang }: { lang: Lang }) {
  const t = content[lang].author;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        @media (max-width: 900px) {
          .author-hero { grid-template-columns: 1fr !important; }
          .author-hero-img { min-height: 380px; border-left: none !important; border-top: 1px solid var(--border); }
          .author-hero-text { padding: 4rem 1.5rem !important; }
          .author-works > div { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; gap: 0.5rem !important; }
        }
      `}</style>

      {/* HERO: sol metin + sağ büyük portre */}
      <section className="author-hero" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", minHeight: "calc(100vh - 60px)", borderBottom: "1px solid var(--border)" }}>
        <div className="author-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "2rem" }}>{t.kicker}</p>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "2.5rem", whiteSpace: "pre-line" }}>{t.title}</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "480px" }}>
            {t.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.12} as="p" style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: 1.9, color: "var(--text-muted)" }}>{p}</Reveal>
            ))}
          </div>
        </div>
        <div className="author-hero-img" style={{ position: "relative", overflow: "hidden", borderLeft: "1px solid var(--border)", background: "var(--bg-panel)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/images/portre.jpg" alt="Berkay Doğan" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "var(--photo-filter)" }} />
        </div>
      </section>

      {/* ARA GÖRSEL */}
      <section style={{ position: "relative", height: "40vh", minHeight: "300px", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
        <img src="/images/havalimani.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", filter: "var(--photo-filter)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))", pointerEvents: "none" }} />
      </section>

      {/* ESERLER */}
      <section className="author-works">
        <div style={{ padding: "2rem 4rem", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)" }}>{t.worksKicker}</p>
        </div>
        {t.works.map((item, i) => (
          <div key={i} style={{ padding: "2.5rem 4rem", borderBottom: i < t.works.length - 1 ? "1px solid var(--border)" : "none", display: "grid", gridTemplateColumns: "100px 1fr auto", gap: "2rem", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--text-dim)" }}>{item.yil}</p>
            <div>
              <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>{item.eser}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--text-dim)" }}>{item.yayin}</p>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)" }}>{item.tur}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
