"use client";

import { content, type Lang } from "@/lib/content";
import { Reveal } from "./Motion";

export function ContactContent({ lang }: { lang: Lang }) {
  const t = content[lang].contact;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .contact-link { transition: color 0.2s; color: var(--text-muted); }
        .contact-link:hover { color: var(--text) !important; }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-grid > div { border-right: none !important; border-bottom: 1px solid var(--border); padding: 2.5rem 1.5rem !important; }
          .contact-hero { padding: 3rem 1.5rem !important; }
        }
      `}</style>

      <section className="contact-hero" style={{ minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "2rem" }}>{t.kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "2rem" }}>
          {t.title[0]}<br /><span style={{ color: "var(--border-bright)" }}>{t.title[1]}</span>
        </h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: "440px", lineHeight: 1.8 }}>{t.desc}</p>
      </section>

      <section className="contact-grid" style={{ borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "3rem 4rem", borderRight: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "1rem" }}>{t.emailLabel}</p>
          <a href="mailto:do.berkay@icloud.com" className="contact-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>do.berkay@icloud.com</a>
        </div>
        <div style={{ padding: "3rem 4rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "1rem" }}>{t.instaLabel}</p>
          <a href="https://instagram.com/berkaydgn__" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>@berkaydgn__</a>
        </div>
      </section>
    </div>
  );
}
