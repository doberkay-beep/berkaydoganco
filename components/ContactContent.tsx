"use client";

import { content, type Lang } from "@/lib/content";

export function ContactContent({ lang }: { lang: Lang }) {
  const t = content[lang].contact;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .contact-link { transition: color 0.25s ease; }
        .contact-link:hover { color: var(--accent) !important; }
        .contact-cell { transition: background 0.28s ease; }
        .contact-cell:hover { background: var(--bg2); }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-grid > * { padding: 2.5rem 1.5rem !important; }
          .contact-hero { padding: 3rem 1.5rem !important; }
        }
      `}</style>

      <section className="contact-hero" style={{ minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
        <p className="eyebrow" style={{ marginBottom: "2rem" }}>{t.kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.035em", color: "var(--cream)", marginBottom: "1.75rem" }}>
          {t.title[0]}<br /><span style={{ color: "var(--bordo)" }}>{t.title[1]}</span>
        </h1>
        <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.25rem", color: "var(--gray)", maxWidth: "440px", lineHeight: 1.6 }}>{t.desc}</p>
      </section>

      <section className="card-grid contact-grid" style={{ gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--border)" }}>
        <div className="contact-cell" style={{ background: "var(--bg)", padding: "3rem 2.75rem" }}>
          <p className="sec-meta" style={{ marginBottom: "1rem" }}>{t.emailLabel}</p>
          <a href="mailto:do.berkay@icloud.com" className="contact-link" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.4rem", color: "var(--cream)" }}>do.berkay@icloud.com</a>
        </div>
        <div className="contact-cell" style={{ background: "var(--bg)", padding: "3rem 2.75rem" }}>
          <p className="sec-meta" style={{ marginBottom: "1rem" }}>{t.instaLabel}</p>
          <a href="https://instagram.com/berkaydgn__" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.4rem", color: "var(--cream)" }}>@berkaydgn__</a>
        </div>
      </section>
    </div>
  );
}
