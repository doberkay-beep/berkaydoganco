"use client";

import type { Lang } from "@/lib/site";
import { site } from "@/lib/site";

const NECALIYOR_URL = "https://www.necaliyor.co";

/* Projeler — kitap dışı işler. Şimdilik tek proje: ŞİMDİ (necaliyor.co).
   Radyo/şiir bağını anlatan bir hikâye kartı; büyümeye açık grid. */
export function Projeler({ lang }: { lang: Lang }) {
  const p = site[lang].projects;
  return (
    <section id="projects" className="cg-section">
      <style>{`
        .prj-wrap { max-width: 1100px; margin: 0 auto; }
        .prj-card { position: relative; overflow: hidden; margin-top: clamp(2.5rem, 6vh, 4rem);
          display: grid; grid-template-columns: 1fr 1.2fr; gap: clamp(1.5rem, 4vw, 3.5rem);
          padding: clamp(1.75rem, 4vw, 3rem); border-radius: 20px;
          background: radial-gradient(120% 100% at 100% 0%, rgba(229,64,42,0.12), transparent 55%), var(--glass-bg);
          border: 1px solid var(--glass-border);
          -webkit-backdrop-filter: blur(18px) saturate(150%); backdrop-filter: blur(18px) saturate(150%); }
        @media (max-width: 760px) { .prj-card { grid-template-columns: 1fr; } }
        .prj-left { display: flex; flex-direction: column; justify-content: center; gap: 1rem; }
        .prj-name { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.03em;
          font-size: clamp(2.6rem, 7vw, 4.4rem); line-height: 0.9; }
        .prj-live { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--font-grotesk);
          font-size: 0.66rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
        .prj-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); position: relative; }
        .prj-dot::after { content: ""; position: absolute; inset: -4px; border-radius: 50%;
          border: 1px solid var(--accent); animation: prjPulse 1.8s ease-out infinite; }
        @keyframes prjPulse { 0% { transform: scale(0.7); opacity: 0.9; } 100% { transform: scale(1.9); opacity: 0; } }
        .prj-eq { display: flex; align-items: flex-end; gap: 4px; height: 34px; margin-top: 0.4rem; }
        .prj-eq span { width: 5px; border-radius: 3px; background: var(--accent); opacity: 0.85; animation: prjEq 1.1s ease-in-out infinite; }
        .prj-eq span:nth-child(2) { animation-delay: 0.15s; } .prj-eq span:nth-child(3) { animation-delay: 0.3s; }
        .prj-eq span:nth-child(4) { animation-delay: 0.45s; } .prj-eq span:nth-child(5) { animation-delay: 0.6s; }
        .prj-eq span:nth-child(6) { animation-delay: 0.75s; } .prj-eq span:nth-child(7) { animation-delay: 0.9s; }
        @keyframes prjEq { 0%, 100% { height: 8px; } 50% { height: 34px; } }
        .prj-right { display: flex; flex-direction: column; justify-content: center; gap: 1.1rem; }
        .prj-story { font-size: 1.02rem; line-height: 1.75; color: var(--muted); }
        .prj-story:first-of-type { font-family: var(--font-serif); font-size: clamp(1.15rem, 2vw, 1.4rem); font-style: italic; color: var(--ink); line-height: 1.5; }
        @media (prefers-reduced-motion: reduce) { .prj-dot::after, .prj-eq span { animation: none; } }
      `}</style>
      <div className="prj-wrap">
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{p.label}
        </span>
        <h2 className="cg-huge" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginTop: "1.1rem", maxWidth: "16ch" }}>{p.heading}</h2>
        <p style={{ marginTop: "0.9rem", fontSize: "1rem", color: "var(--muted)", maxWidth: "46ch" }}>{p.sub}</p>

        <div className="prj-card">
          <div className="prj-left">
            <span className="prj-live"><span className="prj-dot" aria-hidden="true" />{p.simdiTag}</span>
            <span className="prj-name">{p.simdiName}</span>
            <div className="prj-eq" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => <span key={i} />)}
            </div>
          </div>
          <div className="prj-right">
            {p.story.map((s, i) => (
              <p key={i} className="prj-story">{s}</p>
            ))}
            <a href={NECALIYOR_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill" style={{ alignSelf: "flex-start", marginTop: "0.4rem" }}>
              {p.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
