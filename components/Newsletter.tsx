"use client";

import { useState } from "react";
import { content, type Lang } from "@/lib/content";

export function Newsletter({ lang }: { lang: Lang }) {
  const t = content[lang].newsletter;
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    // Substack abone akışına e-postayla yönlendir
    const url = `${t.action}?email=${encodeURIComponent(trimmed)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <section className="newsletter-sec" style={{ borderTop: "1px solid var(--border)", padding: "6rem 2.75rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <style>{`
        .nl-input::placeholder { color: var(--text-dim); }
        .nl-input:focus { border-color: var(--bordo); outline: none; }
        @media (max-width: 600px) {
          .newsletter-sec { padding: 4rem 1.5rem !important; }
          .nl-form { flex-direction: column !important; width: 100%; }
          .nl-input, .nl-btn { width: 100% !important; }
        }
      `}</style>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--bordo)", marginBottom: "1.5rem" }}>{t.kicker}</p>
      <h2 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--cream)", marginBottom: "1.5rem", maxWidth: "640px" }}>{t.title}</h2>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.9, color: "var(--text-muted)", maxWidth: "440px", marginBottom: "2.5rem" }}>{t.desc}</p>

      <div className="nl-form" style={{ display: "flex", gap: "0.75rem", width: "100%", maxWidth: "480px", marginBottom: "1.25rem" }}>
        <input
          type="email"
          className="nl-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKey}
          placeholder={t.placeholder}
          style={{
            flex: 1,
            background: "transparent",
            border: "1px solid var(--dim)",
            color: "var(--cream)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            padding: "0.9rem 1.1rem",
            borderRadius: "2px",
          }}
        />
        <button className="nl-btn btn btn-fill" onClick={handleSubmit} style={{ whiteSpace: "nowrap" }}>
          {t.button}
        </button>
      </div>

      <p className="sec-meta">{t.note}</p>
    </section>
  );
}
