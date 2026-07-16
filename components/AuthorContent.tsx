"use client";

import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";

export function AuthorContent({ lang }: { lang: Lang }) {
  const t = content[lang].author;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .work-row { transition: background 0.28s ease; }
        .work-row:hover { background: var(--bg2); }
        @media (max-width: 900px) {
          .author-hero { grid-template-columns: 1fr !important; }
          .author-hero-img { min-height: 380px; border-left: none !important; border-top: 1px solid var(--border); }
          .author-hero-text { padding: 4rem 1.5rem !important; }
          .author-works-head { padding: 2rem 1.5rem !important; }
          .work-row { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; gap: 0.5rem !important; }
        }
      `}</style>

      {/* HERO: sol metin + sağ büyük portre */}
      <section className="author-hero" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", minHeight: "calc(100vh - 60px)", borderBottom: "1px solid var(--border)" }}>
        <div className="author-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 2.75rem" }}>
          <p className="eyebrow" style={{ marginBottom: "2rem" }}>{t.kicker}</p>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.035em", color: "var(--cream)", marginBottom: "2.5rem", whiteSpace: "pre-line" }}>{t.title}</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "480px" }}>
            {t.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.12} as="p" style={{ fontFamily: "var(--font-mono)", fontWeight: 300, fontSize: "0.85rem", lineHeight: 2, color: "var(--text-muted)" }}>{p}</Reveal>
            ))}
          </div>
        </div>
        <div className="author-hero-img photo-hover" style={{ position: "relative", overflow: "hidden", borderLeft: "1px solid var(--border)", background: "var(--bg2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/images/portre.jpg" alt="Berkay Doğan" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "var(--photo-filter)" }} />
        </div>
      </section>

      {/* ARA GÖRSEL */}
      <section style={{ position: "relative", height: "40vh", minHeight: "300px", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
        <img src="/images/havalimani.jpg" alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", filter: "var(--photo-filter)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,5,6,0.35), rgba(11,5,6,0.6))", pointerEvents: "none" }} />
      </section>

      {/* ESERLER */}
      <section className="author-works">
        <div className="author-works-head" style={{ padding: "2.5rem 2.75rem 1.75rem", borderBottom: "1px solid var(--border)" }}>
          <p className="eyebrow">{t.worksKicker}</p>
        </div>
        {t.works.map((item, i) => (
          <Reveal key={i} delay={i * 0.08} className="work-row" style={{ padding: "2.5rem 2.75rem", borderBottom: i < t.works.length - 1 ? "1px solid var(--border)" : "none", display: "grid", gridTemplateColumns: "100px 1fr auto", gap: "2rem", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.1rem", color: "var(--bordo)" }}>{item.yil}</p>
            <div>
              <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.3rem", color: "var(--cream)", marginBottom: "0.35rem" }}>{item.eser}</p>
              <p className="sec-meta">{item.yayin}</p>
            </div>
            <p className="sec-meta">{item.tur}</p>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
