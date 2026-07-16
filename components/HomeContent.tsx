"use client";

import Link from "next/link";
import { content, TRENDYOL_URL, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";
import { Countdown } from "./Countdown";
import { BookCover3D } from "./BookCover3D";
import { Newsletter } from "./Newsletter";

export function HomeContent({ lang }: { lang: Lang }) {
  const t = content[lang].home;
  const b = t.book;
  const bc = t.backCover;
  const buyLinks = content[lang].murekkep.buyLinks;
  const base = lang === "en" ? "/en" : "";

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        /* OKUR SAYACI — nabız atan bordo nokta */
        .counter-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--bordo); flex-shrink: 0;
          animation: counterPulse 2.4s ease-in-out infinite;
        }
        @keyframes counterPulse {
          0%, 100% { opacity: 0.45; box-shadow: 0 0 0 0 rgba(139,26,26,0.5); }
          50% { opacity: 1; box-shadow: 0 0 0 5px rgba(139,26,26,0); }
        }

        /* BASINDA kartları */
        .press-outlet { font-family: var(--font-grotesk); font-weight: 400; font-size: 1.5rem; line-height: 1.2; color: var(--cream); margin-bottom: 0.5rem; }
        .press-text { font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.85; color: var(--text-muted); }
        .press-card { transition: background 0.28s ease; }
        .press-card:hover a .press-outlet { color: var(--accent); }


        /* HERO — bordo ambient ışık, 9s nefes */
        .hero-ambient {
          position: absolute; top: 42%; left: 32%;
          width: 60vw; height: 60vw; max-width: 900px; max-height: 900px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(139,26,26,0.22), transparent 62%);
          pointer-events: none; z-index: 0;
          animation: heroBreathe 9s ease-in-out infinite;
        }
        @keyframes heroBreathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.12); }
        }

        /* HERO — gizem kutusu */
        .hero-mystery {
          position: relative; width: 270px; height: 420px;
          border: 1px solid var(--bordo); border-radius: 2px;
          background:
            repeating-linear-gradient(45deg, rgba(139,26,26,0.10) 0, rgba(139,26,26,0.10) 1px, transparent 1px, transparent 11px),
            var(--bg2);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          overflow: hidden;
          animation: heroFloat 7s ease-in-out infinite;
        }
        .hero-mystery::after {
          content: ""; position: absolute; top: 0; left: -60%;
          width: 45%; height: 100%;
          background: linear-gradient(105deg, transparent, rgba(240,236,228,0.10), transparent);
          transform: skewX(-18deg);
          animation: heroShine 4.5s ease-in-out infinite;
        }
        @keyframes heroFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes heroShine { 0% { left: -60%; } 60%, 100% { left: 135%; } }
        .hero-mystery-q {
          font-family: var(--font-grotesk); font-weight: 300;
          font-size: 9rem; line-height: 1; color: var(--bordo);
          animation: heroPulse 3s ease-in-out infinite;
        }
        @keyframes heroPulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
        .hero-mystery-badge {
          position: absolute; top: 0.9rem; right: 0.9rem;
          font-family: var(--font-mono); font-size: 0.42rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gray);
          border: 1px solid var(--dim); border-radius: 2px; padding: 0.3rem 0.5rem;
        }
        .hero-mystery-meta {
          position: absolute; bottom: 1.7rem;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }

        @media (max-width: 768px) {
          .tasfiye-hero-grid { grid-template-columns: 1fr !important; padding: 4rem 1.5rem 3.5rem !important; gap: 2.5rem !important; }
          .hero-mystery { width: 240px; height: 380px; }
          .home-book { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 3.5rem !important; }
          .home-backcover { padding: 4.5rem 1.5rem !important; }
          .home-counter { gap: 1.25rem !important; padding: 1.25rem 1.5rem !important; }
          .home-4grid { grid-template-columns: repeat(2, 1fr) !important; }
          .home-3grid { grid-template-columns: 1fr !important; }
          .home-4grid > *, .home-3grid > * { padding: 2rem 1.5rem !important; }
          .home-3grid a { padding: 2rem 1.5rem !important; }
        }
      `}</style>

      {/* HERO — TASFİYE: sol metin + geri sayım / sağ gizem kutusu */}
      <section className="tasfiye-hero" style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
        {/* Bordo radial ambient ışık — 9s nefes alır */}
        <div className="hero-ambient" aria-hidden="true" />

        <div className="tasfiye-hero-grid" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: "3rem", alignItems: "center", padding: "5.5rem 2.75rem 5rem" }}>
          {/* SOL — metin + geri sayım */}
          <Reveal>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--bordo)", marginBottom: "1.75rem" }}>{t.heroKickerBrut}</p>
            <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(70px, 10vw, 150px)", lineHeight: 0.9, letterSpacing: "-0.035em", color: "var(--cream)", marginBottom: "1.5rem" }}>TASFİYE</h1>
            <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)", lineHeight: 1.4, color: "var(--gray)", maxWidth: "460px", marginBottom: "2.75rem" }}>{t.heroQuoteBrut}</p>

            <Countdown labels={t.heroCountdownLabels} />

            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", marginTop: "2rem" }}>{t.heroDate}</p>
          </Reveal>

          {/* SAĞ — gizem kutusu (kapak yakında) */}
          <div className="hero-mystery-wrap" style={{ display: "flex", justifyContent: "center" }}>
            <div className="hero-mystery">
              <span className="hero-mystery-badge">{t.heroBoxLabel}</span>
              <span className="hero-mystery-q" aria-hidden="true">?</span>
              <div className="hero-mystery-meta">
                <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.6rem", letterSpacing: "0.14em", color: "var(--cream)" }}>TASFİYE</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gray)", marginTop: "0.75rem", lineHeight: 1.9, maxWidth: "180px" }}>{t.heroBoxMeta}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÜREKKEP VE KÖZ — 3D kapak + satış bloğu */}
      <section className="home-book" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "4rem", padding: "6rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BookCover3D badge={b.badge} hintDefault={b.hint} hintFlipped={b.hintFlipped} frontAlt={b.altFront} backAlt={b.altBack} />
        </div>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "1.75rem" }}>{b.eyebrow}</p>
          <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(2.6rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--cream)", marginBottom: "0.5rem" }}>{b.title}</h2>
          <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 400, fontSize: "1.5rem", color: "var(--gray)", marginBottom: "1.75rem" }}>{b.subtitle}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", lineHeight: 1.8, color: "var(--text-muted)", maxWidth: "440px", marginBottom: "1.75rem" }}>{b.desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "2rem" }}>
            <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: "0.9rem", letterSpacing: "0.15em" }}>★★★★★</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)" }}>{b.rating}</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem" }}>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "2.6rem", letterSpacing: "-0.01em", color: "var(--cream)" }}>{b.price}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bordo)", border: "1px solid var(--bordo)", borderRadius: "2px", padding: "0.35rem 0.55rem" }}>{b.priceTag}</span>
          </div>
          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
            <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-fill">{b.buyBtn}</a>
            <Link href={`${base}/murekkep-ve-koz`} className="btn btn-ghost">{b.readBtn}</Link>
          </div>
        </Reveal>
      </section>

      {/* ARKA KAPAK METNİ — ortalanmış, geniş satır aralığı */}
      <section className="home-backcover" style={{ padding: "7rem 2.75rem", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
        <Reveal style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p className="sec-meta" style={{ marginBottom: "3rem" }}>{bc.kicker}</p>
          <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.5625rem", lineHeight: 1.6, color: "var(--cream)", marginBottom: "2.5rem" }}>{bc.lead}</p>
          {bc.paragraphs.map((p, i) => (
            <p key={i} style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "1.15rem", lineHeight: 1.95, color: "var(--gray)", marginBottom: "1.75rem" }}>{p}</p>
          ))}
          <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.25rem", lineHeight: 1.7, color: "var(--gray)", marginTop: "3rem" }}>{bc.finalA}</p>
          <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.875rem", lineHeight: 1.5, color: "var(--cream)", marginTop: "0.5rem" }}>{bc.finalB}</p>
        </Reveal>
      </section>

      {/* OKUR SAYACI — ince bant */}
      <section className="home-counter" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2.75rem", flexWrap: "wrap", padding: "1.4rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
        {t.counter.map((c, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--text-dim)" }}>
            {i === 0 && <span className="counter-dot" aria-hidden="true" />}
            {c.pre && `${c.pre} `}
            <b style={{ color: "var(--cream)", fontWeight: 400 }}>{c.num}</b>
            {c.post}
          </span>
        ))}
      </section>

      {/* SAYILAR — 4'lü grid */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "2.5rem 2.75rem 1.75rem" }}>
          <p className="eyebrow">{t.statsKicker}</p>
        </div>
        <div className="card-grid home-4grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {t.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="stat" style={{ background: "var(--bg)", padding: "3rem 2.75rem" }}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BASINDA — 3'lü kart */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "2.5rem 2.75rem 1.75rem" }}>
          <p className="eyebrow">{t.pressKicker}</p>
        </div>
        <div className="card-grid home-3grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {t.press.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className="press-card" style={{ background: "var(--bg)" }}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "3rem 2.75rem" }}>
                  <p className="press-outlet">{p.outlet}</p>
                  <p className="sec-meta" style={{ marginBottom: "1.5rem" }}>{p.detail}</p>
                  <p className="press-text">{p.text}</p>
                </a>
              ) : (
                <div style={{ padding: "3rem 2.75rem" }}>
                  <p className="press-outlet">{p.outlet}</p>
                  <p className="sec-meta" style={{ marginBottom: "1.5rem" }}>{p.detail}</p>
                  <p className="press-text">{p.text}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* KÜNYE — 8'li grid */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "2.5rem 2.75rem 1.75rem" }}>
          <p className="eyebrow">{t.colophonKicker}</p>
        </div>
        <div className="card-grid home-4grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {t.colophon.map((c) => (
            <div key={c.label} style={{ background: "var(--bg)", padding: "2rem 2.75rem" }}>
              <p className="sec-meta" style={{ marginBottom: "0.7rem" }}>{c.label}</p>
              <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.1rem", color: "var(--cream)" }}>{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SATIN AL — 8'li grid (kanallar murekkep içeriğinden) */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "2.5rem 2.75rem 1.75rem" }}>
          <p className="eyebrow">{t.buyGridKicker}</p>
        </div>
        <div className="card-grid home-4grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {buyLinks.map((l, i) => (
            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="buy-cell" style={{ background: "var(--bg)", padding: "2.25rem 2.75rem" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.2rem", color: "var(--cream)" }}>{l.name}</span>
              {i === 0 && <span className="sec-meta" style={{ color: "var(--bordo)", marginTop: "0.5rem" }}>{t.buyGridNote}</span>}
            </a>
          ))}
        </div>
      </section>

      {/* TAKİP / SUBSTACK */}
      <Newsletter lang={lang} />
    </div>
  );
}
