"use client";

import Link from "next/link";
import { content, type Lang } from "@/lib/content";
import { Reveal, CountUp, Parallax } from "./Motion";
import { Countdown } from "./Countdown";

export function TasfiyeContent({ lang }: { lang: Lang }) {
  const t = content[lang].tasfiye;
  const base = lang === "en" ? "/en" : "";

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .excerpt-link { transition: color 0.25s ease, border-color 0.25s ease; }
        .excerpt-link:hover { color: var(--cream) !important; border-color: var(--cream) !important; }
        .tasfiye-bolum { transition: background 0.28s ease; }
        .tasfiye-bolum:hover { background: var(--bg2); }
        @media (max-width: 768px) {
          .tasfiye-meta { grid-template-columns: repeat(2, 1fr) !important; }
          .tasfiye-meta > * { padding: 2rem 1.5rem !important; }
          .tasfiye-launch { padding: 4rem 1.5rem !important; }
          .tasfiye-excerpt { padding: 4rem 1.5rem !important; }
          .tasfiye-about { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 1.5rem !important; }
          .tasfiye-contents-head { padding: 2rem 1.5rem !important; }
          .tasfiye-bolum { padding: 2rem 1.5rem !important; }
          .tasfiye-cta { padding: 4rem 1.5rem !important; }
          .banner-title { font-size: clamp(3rem, 16vw, 6rem) !important; }
        }
      `}</style>

      {/* ÜST FOTO BANNER + TASFİYE başlık */}
      <section style={{ position: "relative", height: "62vh", minHeight: "440px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
        <Parallax src="/images/bogaz-kopru.jpg" filter="grayscale(100%) contrast(1.2) brightness(0.4)" strength={0.12} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,5,6,0.7), rgba(11,5,6,0.45) 50%, rgba(11,5,6,0.92))", zIndex: 1 }} />
        <Reveal style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gray)", marginBottom: "1.5rem" }}>{t.kicker}</p>
          <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--cream)", padding: "0.45rem 1rem", border: "1px solid var(--dim)", borderRadius: "2px", marginBottom: "1.75rem", background: "rgba(240,236,228,0.05)", backdropFilter: "blur(4px)" }}>{t.badge}</span>
          <h1 className="banner-title" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(4rem, 14vw, 11rem)", lineHeight: 0.95, letterSpacing: "-0.035em", color: "var(--cream)" }}>TASFİYE</h1>
          <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", lineHeight: 1.5, color: "var(--gray)", maxWidth: "560px", margin: "1.8rem auto 0" }}>{t.heroDesc}</p>
        </Reveal>
      </section>

      {/* META — 4'lü grid */}
      <section className="card-grid tasfiye-meta" style={{ gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid var(--border)" }}>
        {t.meta.map((item, i) => (
          <Reveal key={i} delay={i * 0.08} className="stat" style={{ background: "var(--bg)", padding: "2.25rem 2.75rem" }}>
            <span className="stat-label">{item.label}</span>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.4rem", color: "var(--cream)" }}>
              {item.value === "161" ? <CountUp end={161} /> : item.value}
            </span>
          </Reveal>
        ))}
      </section>

      {/* LANSMAN — GERİ SAYIM + HABER VER */}
      <section className="tasfiye-launch" style={{ padding: "5rem 2.75rem", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "2.5rem" }}>{t.launchKicker}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "3rem", flexWrap: "wrap" }}>
            <Countdown labels={t.countdownLabels} intervalMs={1000} />
            <div style={{ maxWidth: "340px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.85, color: "var(--text-muted)", marginBottom: "1.5rem" }}>{t.launchNote}</p>
              <a href={t.notifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-fill">{t.notifyBtn}</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* KİTAPTAN KESİT */}
      <section className="tasfiye-excerpt" style={{ padding: "6rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
        <Reveal>
          <p className="sec-meta" style={{ marginBottom: "2.5rem" }}>{t.excerptKicker}</p>
          <blockquote style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.5rem, 4vw, 2.6rem)", lineHeight: 1.45, letterSpacing: "-0.01em", color: "var(--cream)", maxWidth: "900px", marginBottom: "2.5rem" }}>
            &ldquo;{t.excerptText}&rdquo;
          </blockquote>
          <Link href={`${base}/yazilar/${t.excerptSlug}`} className="excerpt-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", borderBottom: "1px solid var(--dim)", paddingBottom: "0.35rem" }}>
            {t.excerptLinkLabel}
          </Link>
        </Reveal>
      </section>

      {/* HAKKINDA */}
      <section className="tasfiye-about" style={{ padding: "6rem 2.75rem", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem" }}>
        <p className="eyebrow" style={{ alignSelf: "start", paddingTop: "0.4rem" }}>{t.aboutKicker}</p>
        <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "1.2rem", lineHeight: 1.9, color: "var(--gray)" }}>{t.aboutText}</p>
      </section>

      {/* BÖLÜMLER */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="tasfiye-contents-head" style={{ padding: "2.5rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
          <p className="eyebrow">{t.contentsKicker}</p>
        </div>
        {t.bolumler.map((bl, i) => (
          <Reveal key={i} delay={i * 0.1} className="tasfiye-bolum" style={{ padding: "2.5rem 2.75rem", borderBottom: i < t.bolumler.length - 1 ? "1px solid var(--border)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "0.95rem", letterSpacing: "0.15em", color: "var(--bordo)" }}>{bl.no}</span>
              <div>
                <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: "var(--cream)", marginBottom: "0.35rem" }}>{bl.baslik}</p>
                <p className="sec-meta">{bl.alt}</p>
              </div>
            </div>
            <p className="sec-meta" style={{ whiteSpace: "nowrap" }}>{bl.count}</p>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="tasfiye-cta" style={{ padding: "6rem 2.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>{t.ctaKicker}</p>
          <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", color: "var(--cream)" }}>{t.ctaTitle}</p>
        </div>
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
          <a href={t.notifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-fill">{t.notifyBtn}</a>
          <Link href={`${base}/iletisim`} className="btn btn-ghost">{lang === "en" ? "GET IN TOUCH →" : "İLETİŞİME GEÇ →"}</Link>
        </div>
      </section>
    </div>
  );
}
