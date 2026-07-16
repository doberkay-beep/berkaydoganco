"use client";

import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";

export function MurekkepContent({ lang }: { lang: Lang }) {
  const t = content[lang].murekkep;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        @media (max-width: 768px) {
          .mk-meta { grid-template-columns: repeat(2, 1fr) !important; }
          .mk-meta > * { padding: 2rem 1.5rem !important; }
          .mk-about { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 1.5rem !important; }
          .mk-buy-head { padding: 2rem 1.5rem !important; }
          .mk-buy-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .mk-buy-grid > * { padding: 2rem 1.5rem !important; }
          .mk-review { padding: 4rem 1.5rem !important; }
          .banner-title-mk { font-size: clamp(2rem, 11vw, 5rem) !important; }
        }
      `}</style>

      {/* ÜST FOTO BANNER */}
      <section style={{ position: "relative", height: "62vh", minHeight: "440px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
        <img src="/images/galata-balikci.jpg" alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 45%", filter: "grayscale(100%) contrast(1.15) brightness(0.45)", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,5,6,0.65), rgba(11,5,6,0.45) 50%, rgba(11,5,6,0.92))", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gray)", marginBottom: "1.5rem" }}>{t.kicker}</p>
          <h1 className="banner-title-mk" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(2.5rem, 9vw, 7rem)", lineHeight: 1, letterSpacing: "-0.035em", color: "var(--cream)" }}>{t.title}</h1>
          <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", color: "var(--gray)", marginTop: "0.75rem" }}>{t.subtitle}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.85, color: "var(--text-muted)", maxWidth: "560px", margin: "1.75rem auto 0" }}>{t.heroDesc}</p>
        </div>
      </section>

      {/* META — 4'lü grid */}
      <section className="card-grid mk-meta" style={{ gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid var(--border)" }}>
        {t.meta.map((item, i) => (
          <Reveal key={i} delay={i * 0.08} className="stat" style={{ background: "var(--bg)", padding: "2.25rem 2.75rem" }}>
            <span className="stat-label">{item.label}</span>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.4rem", color: "var(--cream)" }}>{item.value}</span>
          </Reveal>
        ))}
      </section>

      {/* HAKKINDA */}
      <section className="mk-about" style={{ padding: "6rem 2.75rem", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem" }}>
        <p className="eyebrow" style={{ alignSelf: "start", paddingTop: "0.4rem" }}>{t.aboutKicker}</p>
        <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "1.2rem", lineHeight: 1.9, color: "var(--gray)" }}>{t.aboutText}</p>
      </section>

      {/* NEREDEN ALINIR — 8'li grid */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="mk-buy-head" style={{ padding: "2.5rem 2.75rem 1.75rem" }}>
          <p className="eyebrow">{t.buyKicker}</p>
        </div>
        <div className="card-grid mk-buy-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {t.buyLinks.map((b) => (
            <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className="buy-cell" style={{ background: "var(--bg)", padding: "2.25rem 2.75rem" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.2rem", color: "var(--cream)" }}>{b.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* KİTAPTAN — şiirler */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "5rem 2.75rem 3rem", textAlign: "center" }}>
          <p className="sec-meta" style={{ marginBottom: "1rem" }}>{t.poemsKicker}</p>
          <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.25rem", color: "var(--gray)" }}>{t.poemsIntro}</p>
        </div>
        {t.poems.map((poem, i) => (
          <Reveal key={i} as="div" className="poem-block" style={{ borderTop: "1px solid var(--border)", padding: "4.5rem 2.75rem", maxWidth: "780px", margin: "0 auto", width: "100%" }}>
            <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.01em", color: "var(--cream)", marginBottom: "2rem" }}>{poem.title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {poem.lines.map((line, j) => (
                <p key={j} style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.2rem", lineHeight: 1.85, color: "var(--text-soft)" }}>{line}</p>
              ))}
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid var(--border)", padding: "2.5rem 2.75rem", textAlign: "center" }}>
          <p className="sec-meta">
            {lang === "en" ? "— and 200 more poems in the book" : "— ve kitapta 200'den fazla şiir daha"}
          </p>
        </div>
      </section>

      {/* OKURLARDAN */}
      <section className="mk-review" style={{ padding: "6rem 2.75rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="sec-meta" style={{ marginBottom: "1rem" }}>{t.reviewKicker}</p>
          <p aria-hidden="true" style={{ fontSize: "1rem", letterSpacing: "0.2em", color: "var(--accent)" }}>★★★★★</p>
        </div>
        <div className="review-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          {t.reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1} className="glass review-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem", borderRadius: "2px" }}>
              <blockquote style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem", lineHeight: 1.75, color: "var(--text-soft)" }}>&ldquo;{r.text}&rdquo;</blockquote>
              <p className="sec-meta">{r.source}</p>
            </Reveal>
          ))}
        </div>
        <style>{`
          @media (max-width: 900px) { .review-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px) { .review-grid { grid-template-columns: 1fr !important; } .poem-block { padding: 3rem 1.5rem !important; } }
        `}</style>
      </section>
    </div>
  );
}
