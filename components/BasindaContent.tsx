"use client";

import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";

export function BasindaContent({ lang }: { lang: Lang }) {
  const t = content[lang].basinda;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .pub-link {
          font-family: var(--font-grotesk);
          font-weight: 700;
          color: var(--text);
          text-decoration: underline;
          text-decoration-thickness: 2px;
          text-underline-offset: 6px;
          text-decoration-color: var(--accent);
          transition: text-decoration-color 0.25s, color 0.25s;
        }
        .pub-link:hover { text-decoration-color: var(--text); }
        .milestone-row { transition: padding-left 0.3s, background 0.3s; }
        .milestone-row:hover { padding-left: 4.75rem !important; background: var(--bg-panel); }
        @media (max-width: 768px) {
          .basinda-hero { padding: 4rem 1.5rem !important; }
          .basinda-sec { padding: 3.5rem 1.5rem !important; }
          .pub-grid { grid-template-columns: 1fr !important; }
          .echo-quote { font-size: clamp(1.6rem, 7vw, 2.2rem) !important; }
          .milestone-row { padding: 2rem 1.5rem !important; }
          .milestone-row:hover { padding-left: 1.5rem !important; }
          .milestone-value { font-size: 3rem !important; min-width: auto !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="basinda-hero" style={{ minHeight: "42vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--accent)", marginBottom: "2rem" }}>{t.kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 700, lineHeight: 0.86, letterSpacing: "-0.01em", textTransform: "uppercase", color: "var(--text)", marginBottom: "1.5rem" }}>{t.title}</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "440px", lineHeight: 1.8 }}>{t.desc}</p>
      </section>

      {/* BLOK 1: YAYINLAR — asimetrik grid */}
      <section className="basinda-sec" style={{ padding: "5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "3rem" }}>{t.pubKicker}</p>
        {t.publications.map((p, i) => (
          <Reveal key={i} className="pub-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr 1fr", gap: "2rem", alignItems: "end", paddingBottom: "2.5rem", marginBottom: "2.5rem", borderBottom: i < t.publications.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)", marginBottom: "1rem" }}>{p.outlet} — {p.detail}</p>
              <h2 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1 }}>{p.work}</h2>
            </div>
            <div />
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="pub-link" style={{ fontSize: "1rem", letterSpacing: "0.02em", paddingBottom: "0.5rem" }}>
              {p.linkLabel} ↗
            </a>
          </Reveal>
        ))}
      </section>

      {/* BLOK 2: YANKILAR — duvara kazınmış devasa alıntı */}
      <section className="basinda-sec" style={{ padding: "7rem 4rem", borderBottom: "1px solid var(--border)", background: "var(--bg-panel)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "3rem" }}>{t.echoKicker}</p>
        <Reveal>
          <blockquote className="echo-quote" style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(2rem, 5.5vw, 4.2rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", maxWidth: "1100px", marginBottom: "2.5rem" }}>
            &ldquo;{t.echo}&rdquo;
          </blockquote>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--accent)" }}>— {t.echoSource}</p>
        </Reveal>
      </section>

      {/* BLOK 3: KİLOMETRE TAŞLARI — soğuk liste */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="basinda-sec" style={{ padding: "5rem 4rem 2rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)" }}>{t.milestonesKicker}</p>
        </div>
        {t.milestones.map((m, i) => {
          const inner = (
            <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
              <span className="milestone-value" style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.03em", lineHeight: 1, minWidth: "200px" }}>{m.value}</span>
              <div>
                <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>{m.label}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-dim)" }}>{m.detail}{m.url ? "  ↗" : ""}</p>
              </div>
            </div>
          );
          return m.url ? (
            <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="milestone-row basinda-sec" style={{ display: "block", padding: "3rem 4rem", borderTop: "1px solid var(--border)" }}>{inner}</a>
          ) : (
            <div key={i} className="milestone-row basinda-sec" style={{ padding: "3rem 4rem", borderTop: "1px solid var(--border)" }}>{inner}</div>
          );
        })}
      </section>
    </div>
  );
}
