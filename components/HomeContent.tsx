"use client";

import Link from "next/link";
import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";
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
        @media (max-width: 768px) {
          .home-hero { padding: 4rem 1.5rem 3.5rem !important; }
          .home-hero h1 { font-size: clamp(4rem, 26vw, 9rem) !important; }
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

      {/* HERO — dev tipografi + kırmızı strike */}
      <section className="home-hero" style={{ padding: "5rem 4rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--accent)", marginBottom: "2rem" }}>{t.heroKickerBrut}</p>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(5rem, 18vw, 19rem)", fontWeight: 700, lineHeight: 0.82, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "2.5rem" }}>
            <span className="brut-strike">TASFİYE</span>
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", lineHeight: 1.6, color: "var(--text-soft)", maxWidth: "400px" }}>{t.heroQuoteBrut}</p>
            <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", letterSpacing: "-0.02em", color: "var(--accent)", textTransform: "uppercase" }}>{t.heroPanelBottom}</span>
          </div>
          <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
            <Link href={`${base}/tasfiye`} className="home-cta btn-fill">{t.ctaBook}</Link>
            <Link href={`${base}/yazar`} className="home-cta btn-line">{t.ctaAuthor}</Link>
          </div>
        </Reveal>
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
