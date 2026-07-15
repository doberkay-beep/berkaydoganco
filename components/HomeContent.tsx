"use client";

import Link from "next/link";
import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";
import { Countdown } from "./Countdown";
import { Newsletter } from "./Newsletter";

export function HomeContent({ lang }: { lang: Lang }) {
  const t = content[lang].home;
  const base = lang === "en" ? "/en" : "";

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .btn-fill { background: var(--accent); border: 1px solid var(--accent); color: var(--accent-ink); transition: background 0.2s, color 0.2s; }
        .btn-fill:hover { background: transparent; color: var(--accent); }
        .btn-line { border: 1px solid var(--border-bright); color: var(--text-dim); transition: color 0.2s, border-color 0.2s; }
        .btn-line:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
        .home-cta { display: inline-block; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.2em; padding: 0.9rem 1.7rem; text-transform: uppercase; }
        .yazi-brut { display: flex; justify-content: space-between; align-items: center; gap: 2rem; padding: 1.9rem 4rem; border-bottom: 1px solid var(--border); transition: background 0.15s, padding-left 0.2s; }
        .yazi-brut:hover { background: var(--bg-panel); padding-left: 4.75rem; }
        .yazi-brut:hover .yb-t { color: var(--accent); }
        .yb-t { font-family: var(--font-grotesk); font-size: clamp(1.3rem, 3vw, 1.9rem); font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; color: var(--text); transition: color 0.15s; }
        .yb-d { font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.12em; color: var(--text-dim); white-space: nowrap; }
        .link-subtle { transition: color 0.2s, border-color 0.2s; }
        .link-subtle:hover { color: var(--accent) !important; border-color: var(--accent) !important; }

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
          .home-grid { grid-template-columns: 1fr !important; }
          .home-grid > div { border-right: none !important; }
          .home-grid > div:first-child { border-bottom: 1px solid var(--border); }
          .home-grid .block { padding: 3rem 1.5rem !important; }
          .home-manifesto { padding: 4.5rem 1.5rem !important; }
          .yazi-brut { padding: 1.5rem 1.5rem !important; }
          .yazi-brut:hover { padding-left: 1.5rem !important; }
          .home-bio { padding: 4rem 1.5rem !important; }
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

      {/* ASİMETRİK GRID — Mürekkep + İSTATİSTİK */}
      <section className="home-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", borderBottom: "1px solid var(--border)" }}>
        <div className="block" style={{ padding: "3.5rem 4rem", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "380px", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--text-dim)", marginBottom: "1.5rem" }}>{t.ilkKitap}</p>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase", color: "var(--text)", marginBottom: "1.25rem", whiteSpace: "pre-line" }}>{t.books.murekkepTitle}</h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: "440px" }}>{t.books.murekkepDesc}</p>
          </div>
          <Link href={`${base}/murekkep-ve-koz`} className="home-cta btn-fill" style={{ alignSelf: "flex-start" }}>{t.buyLabel}</Link>
        </div>
        <div className="block" style={{ padding: "3.5rem 4rem", background: "var(--bg-panel)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(5rem, 11vw, 8rem)", fontWeight: 700, lineHeight: 0.85, letterSpacing: "-0.03em", color: "var(--text)" }}>{t.statValue}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-dim)", marginTop: "1rem", whiteSpace: "pre-line", lineHeight: 1.6 }}>{t.statLabel}</span>
        </div>
      </section>

      {/* MANİFESTO — tam genişlik, kırmızı vurgu */}
      <section className="home-manifesto" style={{ padding: "6.5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1.9rem, 4.2vw, 3.6rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em", color: "var(--text)", maxWidth: "900px" }}>
            {t.manifestoLead} <span style={{ color: "var(--accent)" }}>{t.manifestoHl}</span>
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--text-dim)", marginTop: "2rem" }}>{t.manifestoSig}</p>
        </Reveal>
      </section>

      {/* SON YAZILAR — brütal liste */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "2.5rem 4rem 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--accent)" }}>{t.recentKicker}</p>
        </div>
        {t.recent.map((y) => (
          <Link key={y.slug} href={`${base}/yazilar/${y.slug}`} className="yazi-brut">
            <span className="yb-t">{y.title}</span>
            <span className="yb-d">{y.meta}</span>
          </Link>
        ))}
      </section>

      {/* BIO */}
      <section className="home-bio" style={{ padding: "5.5rem 4rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ maxWidth: "560px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--accent)", marginBottom: "1.5rem" }}>{t.bioKicker}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: 1.85, color: "var(--text-muted)" }}>{t.bioText}</p>
        </div>
        <Link href={`${base}/yazar`} className="home-cta btn-line" style={{ flexShrink: 0 }}>{t.bioLink}</Link>
      </section>

      <Newsletter lang={lang} />
    </div>
  );
}
