"use client";

import { useState } from "react";

type Copy = { label: string; heading: string; placeholder: string; button: string; again: string; share: string; copied: string; note: string };

function pick(input: string, verses: string[], salt = 0) {
  let h = salt;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return verses[h % verses.length];
}

async function shareVerse(verse: string, done: () => void) {
  const full = `“${verse}”\n— Berkay Doğan · berkaydogan.co`;
  if (typeof navigator !== "undefined" && navigator.share) {
    try { await navigator.share({ text: full }); return; } catch { /* iptal */ }
  }
  try { await navigator.clipboard.writeText(full); done(); } catch { /* yoksay */ }
}

export function Kahin({ t, verses }: { t: Copy; verses: string[] }) {
  const [value, setValue] = useState("");
  const [verse, setVerse] = useState<string | null>(null);
  const [salt, setSalt] = useState(0);
  const [copied, setCopied] = useState(false);

  const summon = (nextSalt = 0) => {
    const key = value.trim();
    if (!key) return;
    setSalt(nextSalt);
    setVerse(pick(key, verses, nextSalt));
  };
  const reset = () => { setVerse(null); setCopied(false); };

  return (
    <section id="kahin" className="cg-section kahin" style={{ background: "var(--bg-2)", textAlign: "center" }}>
      <style>{`
        .kahin-inner { max-width: 720px; margin: 0 auto; }
        .kahin-field { display: flex; gap: 0.75rem; max-width: 460px; margin: 2.5rem auto 0; }
        .kahin-input { flex: 1; background: transparent; border: none; border-bottom: 1px solid var(--line);
          color: var(--ink); font-family: var(--font-serif); font-style: italic; font-size: 1.25rem;
          text-align: center; padding: 0.6rem 0.4rem; outline: none; transition: border-color 0.3s ease; }
        .kahin-input::placeholder { color: var(--muted); opacity: 0.6; }
        .kahin-input:focus { border-color: var(--accent); }
        .kahin-card { animation: kahinIn 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes kahinIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .kahin-verse { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.8rem, 5vw, 3.4rem); line-height: 1.3; color: var(--ink); max-width: 18ch; margin: 2.75rem auto 1.5rem; }
        .kahin-note { font-family: var(--font-grotesk); font-size: 0.66rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--accent); }
        .kahin-actions { display: flex; gap: 0.75rem; justify-content: center; margin-top: 2.5rem; flex-wrap: wrap; }
      `}</style>
      <div className="kahin-inner">
        <Eyebrow>{t.label}</Eyebrow>
        <h2 className="cg-huge" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)", marginTop: "1.25rem", maxWidth: "18ch", marginInline: "auto" }}>{t.heading}</h2>

        {!verse ? (
          <div className="kahin-field">
            <input
              className="kahin-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") summon(0); }}
              placeholder={t.placeholder}
              maxLength={40}
              aria-label={t.heading}
            />
            <button className="cg-btn cg-btn-fill" onClick={() => summon(0)} disabled={!value.trim()}>{t.button}</button>
          </div>
        ) : (
          <div className="kahin-card">
            <p className="kahin-verse">&ldquo;{verse}&rdquo;</p>
            <span className="kahin-note">{t.note}</span>
            <div className="kahin-actions">
              <button className="cg-btn cg-btn-fill" onClick={() => shareVerse(verse, () => { setCopied(true); window.setTimeout(() => setCopied(false), 1600); })}>{copied ? t.copied : t.share} ↗</button>
              <button className="cg-btn cg-btn-ghost" onClick={() => summon(salt + 1)}>{t.again}</button>
              <button className="cg-btn cg-btn-ghost" onClick={reset} aria-label={t.label}>↺</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" }}>
      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{children}
    </span>
  );
}
