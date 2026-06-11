"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
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
    <div style={{ paddingTop: "56px" }}>
      <style>{`
        .btn-primary { transition: all 0.2s; }
        .btn-primary:hover { background: var(--white) !important; color: var(--black) !important; }
        .btn-secondary { transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--white) !important; color: var(--white) !important; }
        .link-subtle { transition: color 0.2s, border-color 0.2s; }
        .link-subtle:hover { color: var(--white) !important; border-color: var(--white) !important; }
        .link-muted { transition: color 0.2s; }
        .link-muted:hover { color: var(--white) !important; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { min-height: 220px; border-right: none !important; border-top: 1px solid #1a1a1a !important; }
          .hero-left { padding: 4rem 1.5rem !important; border-right: none !important; }
          .manifesto-grid { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; }
          .manifesto-label { display: none; }
          .books-grid { grid-template-columns: 1fr !important; }
          .books-grid > div { border-right: none !important; border-top: 1px solid #1a1a1a; padding: 2.5rem 1.5rem !important; }
          .bio-section { padding: 4rem 1.5rem !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-grid" style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="hero-left" style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "6rem 3rem 6rem 4rem",
          borderRight: "1px solid #1a1a1a",
          position: "relative",
          zIndex: 2,
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "2rem" }}>
            BERKAYDOGAN.CO — 2026
          </p>
          <h1 ref={titleRef} style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3.5rem, 9vw, 8rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--white)", marginBottom: "3rem" }}>
            TAS<br />FİYE<span style={{ color: "var(--grey-mid)" }}>.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.8, color: "var(--grey-subtle)", maxWidth: "420px", marginBottom: "3rem" }}>
            Yıkmak, kurmanın tek yoludur.<br />161 sayfalık bir varoluş infazına<br />hoş geldiniz.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/tasfiye" className="btn-primary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--white)", color: "var(--white)", display: "inline-block" }}>
              KİTABI GÖR →
            </Link>
            <Link href="/yazar" className="btn-secondary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--grey-mid)", color: "var(--grey-muted)", display: "inline-block" }}>
              YAZAR →
            </Link>
          </div>
        </div>

        <div className="hero-right" style={{ position: "relative", overflow: "hidden", background: "var(--grey-dim)", display: "flex", alignItems: "flex-end", justifyContent: "flex-start", padding: "3rem" }}>
          {/* Noir fotoğraf */}
          <img
            src="/images/metro-tunel.jpg"
            alt="Metro tüneli"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.15) brightness(0.55)",
              zIndex: 0,
            }}
          />
          {/* Karartma katmanı */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.55) 100%)", zIndex: 1 }} />
          <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "var(--font-grotesk)", fontSize: "clamp(8rem, 20vw, 18rem)", fontWeight: 700, color: "rgba(255,255,255,0.12)", lineHeight: 1, userSelect: "none", whiteSpace: "nowrap", zIndex: 2, mixBlendMode: "overlay" }}>161</span>
          <div style={{ position: "relative", zIndex: 3 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--off-white)", marginBottom: "0.4rem" }}>DENEME KİTABI</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--grey-subtle)" }}>ARALIK 2026</p>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto-grid" style={{ padding: "8rem 4rem", borderTop: "1px solid #1a1a1a", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
        <div className="manifesto-label">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--grey-muted)", writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}>
            MANIFESTO — 2026
          </p>
        </div>
        <div>
          <blockquote style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", lineHeight: 1.7, color: "var(--off-white)", fontStyle: "italic", borderLeft: "1px solid var(--grey-mid)", paddingLeft: "2rem", marginBottom: "2rem" }}>
            "Gerçek, yağlarından arındığında ortaya çıkan kemiktir."
          </blockquote>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--grey-muted)" }}>
            — BERKAY DOĞAN, TASFİYE MANİFESTOSU
          </p>
        </div>
      </section>

      {/* KİTAPLAR GRID */}
      <section className="books-grid" style={{ borderTop: "1px solid #1a1a1a", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "4rem", borderRight: "1px solid #1a1a1a", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "400px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "1.5rem" }}>ARALIK 2026 — DENEME</p>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--white)", lineHeight: 0.95, marginBottom: "1.5rem" }}>TASFİYE</h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.8, color: "var(--grey-subtle)", maxWidth: "340px" }}>
              Tasfiye, görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isimdir.
            </p>
          </div>
          <Link href="/tasfiye" className="link-subtle" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--grey-muted)", borderBottom: "1px solid var(--grey-mid)", paddingBottom: "0.25rem", alignSelf: "flex-start" }}>
            DAHA FAZLA →
          </Link>
        </div>
        <div style={{ padding: "4rem", background: "var(--grey-dim)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "400px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "1.5rem" }}>ARALIK 2025 — ŞİİR</p>
            <h2 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--accent)", lineHeight: 1.1, marginBottom: "1.5rem" }}>MÜREKKEP<br />VE KÖZ</h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", lineHeight: 1.8, color: "var(--grey-subtle)", maxWidth: "320px" }}>Bir Şairin Hesabı. İskenderiye Yayınları. Trendyol Şiir #1.</p>
          </div>
          <a href="https://berkaydoganpoetry.com" target="_blank" rel="noopener noreferrer" className="link-muted" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--grey-muted)", borderBottom: "1px solid var(--grey-mid)", paddingBottom: "0.25rem", alignSelf: "flex-start" }}>
            SİTEYE GİT ↗
          </a>
        </div>
      </section>

      {/* BIO */}
      <section className="bio-section" style={{ padding: "6rem 4rem", borderTop: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ maxWidth: "560px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "1.5rem" }}>YAZAR</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: 1.9, color: "var(--grey-subtle)" }}>
            Berkay Doğan, İstanbul'da yaşayan şair ve yazardır. Mürekkep ve Köz (2025) ve Tasfiye (2026) kitaplarının yazarıdır.
          </p>
        </div>
        <Link href="/yazar" className="btn-secondary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--grey-mid)", color: "var(--grey-muted)", flexShrink: 0 }}>
          BİYOGRAFİ →
        </Link>
      </section>
    </div>
  );
}
