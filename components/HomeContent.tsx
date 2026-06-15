"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { content, type Lang } from "@/lib/content";
import { Reveal, Parallax } from "./Motion";
import { Newsletter } from "./Newsletter";

export function HomeContent({ lang }: { lang: Lang }) {
  const t = content[lang].home;
  const base = lang === "en" ? "/en" : "";
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    setTimeout(() => {
      el.style.transition = "opacity 1.2s ease, transform 1.2s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .btn-primary { transition: all 0.2s; }
        .btn-primary:hover { background: var(--text) !important; color: var(--bg) !important; }
        .btn-secondary { transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--text) !important; color: var(--text) !important; }
        .link-subtle { transition: color 0.2s, border-color 0.2s; }
        .link-subtle:hover { color: var(--text) !important; border-color: var(--text) !important; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { min-height: 280px; border-right: none !important; border-top: 1px solid var(--border) !important; }
          .hero-left { padding: 4rem 1.5rem !important; border-right: none !important; }
          .manifesto-grid { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; }
          .manifesto-label { display: none; }
          .books-grid { grid-template-columns: 1fr !important; }
          .books-grid > div { border-right: none !important; border-top: 1px solid var(--border); padding: 2.5rem 1.5rem !important; }
          .bio-section { padding: 4rem 1.5rem !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-grid" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden" }}>
        <div className="hero-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 3rem 6rem 4rem", borderRight: "1px solid var(--border)", position: "relative", zIndex: 2 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "2rem" }}>{t.kicker}</p>
          <h1 ref={titleRef} style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3.5rem, 9vw, 8rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "3rem" }}>
            TAS<br />FİYE<span style={{ color: "var(--border-bright)" }}>.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.8, color: "var(--text-muted)", maxWidth: "420px", marginBottom: "3rem" }}>
            {t.heroSub.map((line, i) => (<span key={i}>{line}<br /></span>))}
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href={`${base}/tasfiye`} className="btn-primary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--text)", color: "var(--text)", display: "inline-block" }}>
              {t.ctaBook}
            </Link>
            <Link href={`${base}/yazar`} className="btn-secondary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--border-bright)", color: "var(--text-dim)", display: "inline-block" }}>
              {t.ctaAuthor}
            </Link>
          </div>
        </div>

        <div className="hero-right" style={{ position: "relative", overflow: "hidden", background: "var(--bg-panel)", display: "flex", alignItems: "flex-end", justifyContent: "flex-start", padding: "3rem" }}>
          <Parallax src="/images/metro-tunel.jpg" filter="grayscale(100%) contrast(1.15) brightness(0.55)" strength={0.1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.55) 100%)", zIndex: 1 }} />
          <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "var(--font-grotesk)", fontSize: "clamp(8rem, 20vw, 18rem)", fontWeight: 700, color: "rgba(255,255,255,0.12)", lineHeight: 1, userSelect: "none", whiteSpace: "nowrap", zIndex: 2, mixBlendMode: "overlay" }}>161</span>
          <div style={{ position: "relative", zIndex: 3 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-soft)", marginBottom: "0.4rem" }}>{t.heroPanelTop}</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#999" }}>{t.heroPanelBottom}</p>
          </div>
        </div>
      </section>

      {/* MANIFESTO - foto arka planlı */}
      <section style={{ position: "relative", borderTop: "1px solid var(--border)", overflow: "hidden", padding: "10rem 4rem", display: "flex", justifyContent: "center" }}>
        <Parallax src="/images/siir-zemin.jpg" filter="grayscale(100%) contrast(1.1) brightness(0.3)" strength={0.1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.55))", zIndex: 1 }} />
        <Reveal className="manifesto-inner" style={{ position: "relative", zIndex: 2, maxWidth: "780px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem" }}>{t.manifestoKicker}</p>
          <blockquote style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)", lineHeight: 1.6, color: "#fff", fontStyle: "italic", marginBottom: "2.5rem", textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>{t.manifestoQuote}</blockquote>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)" }}>{t.manifestoAuthor}</p>
        </Reveal>
        <style>{`@media (max-width: 768px) { section { padding: 6rem 1.5rem !important; } }`}</style>
      </section>

      {/* KİTAPLAR */}
      <section className="books-grid" style={{ borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "4rem", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "400px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "1.5rem" }}>{t.books.tasfiyeKicker}</p>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 0.95, marginBottom: "1.5rem" }}>{t.books.tasfiyeTitle}</h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.8, color: "var(--text-muted)", maxWidth: "340px" }}>{t.books.tasfiyeDesc}</p>
          </div>
          <Link href={`${base}/tasfiye`} className="link-subtle" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-dim)", borderBottom: "1px solid var(--border-bright)", paddingBottom: "0.25rem", alignSelf: "flex-start" }}>{t.books.tasfiyeLink}</Link>
        </div>
        <div style={{ padding: "4rem", background: "var(--bg-panel)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "400px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "1.5rem" }}>{t.books.murekkepKicker}</p>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--accent)", lineHeight: 1.1, marginBottom: "1.5rem", whiteSpace: "pre-line" }}>{t.books.murekkepTitle}</h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", lineHeight: 1.8, color: "var(--text-muted)", maxWidth: "320px" }}>{t.books.murekkepDesc}</p>
          </div>
          <Link href={`${base}/murekkep-ve-koz`} className="link-subtle" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-dim)", borderBottom: "1px solid var(--border-bright)", paddingBottom: "0.25rem", alignSelf: "flex-start" }}>{t.books.murekkepLink}</Link>
        </div>
      </section>

      {/* BIO */}
      <section className="bio-section" style={{ padding: "6rem 4rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ maxWidth: "560px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "1.5rem" }}>{t.bioKicker}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: 1.9, color: "var(--text-muted)" }}>{t.bioText}</p>
        </div>
        <Link href={`${base}/yazar`} className="btn-secondary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--border-bright)", color: "var(--text-dim)", flexShrink: 0 }}>{t.bioLink}</Link>
      </section>

      <Newsletter lang={lang} />
    </div>
  );
}
