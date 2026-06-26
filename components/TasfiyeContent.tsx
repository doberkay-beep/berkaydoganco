"use client";

import Link from "next/link";
import { content, type Lang } from "@/lib/content";
import { Reveal, CountUp, Parallax } from "./Motion";

export function TasfiyeContent({ lang }: { lang: Lang }) {
  const t = content[lang].tasfiye;
  const base = lang === "en" ? "/en" : "";

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .btn-primary { transition: all 0.2s; }
        .btn-primary:hover { background: var(--text) !important; color: var(--bg) !important; }
        .noir-img { transition: filter 0.4s, transform 0.4s; }
        .noir-img:hover { filter: grayscale(100%) contrast(1.25) brightness(0.95) !important; transform: scale(1.03); }
        @media (max-width: 768px) {
          .tasfiye-meta { grid-template-columns: 1fr 1fr !important; }
          .tasfiye-meta > div { border-bottom: 1px solid var(--border); }
          .tasfiye-about { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 1.5rem !important; }
          .tasfiye-bolum { padding: 2rem 1.5rem !important; }
          .tasfiye-cta { padding: 4rem 1.5rem !important; }
          .banner-title { font-size: clamp(3rem, 16vw, 6rem) !important; }
        }
      `}</style>

      {/* ÜST FOTO BANNER + TASFİYE başlık */}
      <section style={{ position: "relative", height: "62vh", minHeight: "440px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
        <Parallax src="/images/bogaz-kopru.jpg" filter="grayscale(100%) contrast(1.2) brightness(0.4)" strength={0.12} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85))", zIndex: 1 }} />
        <Reveal style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>{t.kicker}</p>
          <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#fff", padding: "0.45rem 1rem", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "999px", marginBottom: "1.5rem", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)" }}>{t.badge}</span>
          <h1 className="banner-title" style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(4rem, 14vw, 11rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "#fff", textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}>TASFİYE</h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", maxWidth: "520px", margin: "1.8rem auto 0" }}>{t.heroDesc}</p>
        </Reveal>
      </section>

      {/* META */}
      <section className="tasfiye-meta" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid var(--border)" }}>
        {t.meta.map((item, i) => (
          <Reveal key={i} delay={i * 0.08} style={{ padding: "2rem", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "0.75rem" }}>{item.label}</p>
            <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--text)" }}>
              {item.value === "161" ? <CountUp end={161} /> : item.value}
            </p>
          </Reveal>
        ))}
      </section>

      {/* HAKKINDA */}
      <section className="tasfiye-about" style={{ padding: "6rem 4rem", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)", paddingTop: "0.4rem" }}>{t.aboutKicker}</div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", lineHeight: 1.9, color: "var(--text-muted)" }}>{t.aboutText}</p>
      </section>

      {/* BÖLÜMLER */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "2rem 4rem", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)" }}>{t.contentsKicker}</p>
        </div>
        {t.bolumler.map((b, i) => (
          <Reveal key={i} delay={i * 0.1} className="tasfiye-bolum" style={{ padding: "2.5rem 4rem", borderBottom: i < t.bolumler.length - 1 ? "1px solid var(--border)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.15em" }}>{b.no}</span>
              <div>
                <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>{b.baslik}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-dim)" }}>{b.alt}</p>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-dim)", whiteSpace: "nowrap" }}>{b.count}</p>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="tasfiye-cta" style={{ padding: "6rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "1rem" }}>{t.ctaKicker}</p>
          <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)" }}>{t.ctaTitle}</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href={t.notifyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--text)", color: "var(--bg)", background: "var(--text)", display: "inline-block" }}>
            {t.notifyBtn}
          </a>
          <Link href={`${base}/iletisim`} className="btn-primary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--text)", color: "var(--text)", display: "inline-block" }}>
            {lang === "en" ? "GET IN TOUCH →" : "İLETİŞİME GEÇ →"}
          </Link>
        </div>
      </section>
    </div>
  );
}
