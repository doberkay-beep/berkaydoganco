"use client";

import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";

export function BasindaContent({ lang }: { lang: Lang }) {
  const t = content[lang].basinda;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .pub-link {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          border-bottom: 1px solid var(--dim);
          padding-bottom: 0.4rem;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .pub-link:hover { color: var(--cream); border-color: var(--cream); }
        .milestone-row { transition: padding-left 0.3s ease, background 0.3s ease; }
        .milestone-row:hover { padding-left: 3.5rem !important; background: var(--bg2); }
        @media (max-width: 768px) {
          .basinda-hero { padding: 4rem 1.5rem !important; }
          .basinda-sec { padding: 3.5rem 1.5rem !important; }
          .pub-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .echo-quote { font-size: clamp(1.6rem, 7vw, 2.2rem) !important; }
          .milestone-row { padding: 2rem 1.5rem !important; }
          .milestone-row:hover { padding-left: 1.5rem !important; }
          .milestone-value { font-size: 3rem !important; min-width: auto !important; }
          .milestone-inner { gap: 1.5rem !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="basinda-hero" style={{ minHeight: "42vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
        <p className="eyebrow" style={{ marginBottom: "2rem" }}>{t.kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.035em", color: "var(--cream)", marginBottom: "1.25rem" }}>{t.title}</h1>
        <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.25rem", color: "var(--gray)", maxWidth: "440px", lineHeight: 1.6 }}>{t.desc}</p>
      </section>

      {/* BLOK 1: YAYINLAR */}
      <section className="basinda-sec" style={{ padding: "5rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
        <p className="eyebrow" style={{ marginBottom: "3rem" }}>{t.pubKicker}</p>
        {t.publications.map((p, i) => (
          <Reveal key={i} className="pub-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr 1fr", gap: "2rem", alignItems: "end", paddingBottom: "2.5rem", marginBottom: "2.5rem", borderBottom: i < t.publications.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div>
              <p className="sec-meta" style={{ marginBottom: "1rem" }}>{p.outlet} — {p.detail}</p>
              <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--cream)" }}>{p.work}</h2>
            </div>
            <div />
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="pub-link">
              {p.linkLabel} ↗
            </a>
          </Reveal>
        ))}
      </section>

      {/* BLOK 2: YANKILAR — devasa alıntı */}
      <section className="basinda-sec" style={{ padding: "7rem 2.75rem", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
        <p className="eyebrow" style={{ marginBottom: "3rem" }}>{t.echoKicker}</p>
        <Reveal>
          <blockquote className="echo-quote" style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2rem, 5.5vw, 4.2rem)", lineHeight: 1.3, letterSpacing: "-0.025em", color: "var(--cream)", maxWidth: "1100px", marginBottom: "2.5rem" }}>
            &ldquo;{t.echo}&rdquo;
          </blockquote>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)" }}>— {t.echoSource}</p>
        </Reveal>
      </section>

      {/* BLOK 3: KİLOMETRE TAŞLARI */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="basinda-sec" style={{ padding: "5rem 2.75rem 2rem" }}>
          <p className="eyebrow">{t.milestonesKicker}</p>
        </div>
        {t.milestones.map((m, i) => {
          const inner = (
            <div className="milestone-inner" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
              <span className="milestone-value" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--bordo)", minWidth: "200px" }}>{m.value}</span>
              <div>
                <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", color: "var(--cream)", marginBottom: "0.5rem" }}>{m.label}</p>
                <p className="sec-meta">{m.detail}{m.url ? "  ↗" : ""}</p>
              </div>
            </div>
          );
          return m.url ? (
            <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="milestone-row basinda-sec" style={{ display: "block", padding: "3rem 2.75rem", borderTop: "1px solid var(--border)" }}>{inner}</a>
          ) : (
            <div key={i} className="milestone-row basinda-sec" style={{ padding: "3rem 2.75rem", borderTop: "1px solid var(--border)" }}>{inner}</div>
          );
        })}
      </section>
    </div>
  );
}
