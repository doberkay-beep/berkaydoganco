"use client";

import { useEffect, useState } from "react";

type Copy = { label: string; share: string; copied: string; universe: string };

async function shareVerse(verse: string, done: () => void) {
  const full = `“${verse}”\n— Berkay Doğan · berkaydogan.co`;
  if (typeof navigator !== "undefined" && navigator.share) {
    try { await navigator.share({ text: full }); return; } catch { /* iptal */ }
  }
  try { await navigator.clipboard.writeText(full); done(); } catch { /* yoksay */ }
}

export function GununKozu({ t, verses }: { t: Copy; verses: string[] }) {
  const [verse, setVerse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const day = Math.floor((now.getTime() - start.getTime()) / 86400000);
      setVerse(verses[day % verses.length]);
    }, 0);
    return () => window.clearTimeout(id);
  }, [verses]);

  return (
    <section className="kozu-band" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
      <style>{`
        .kozu-band { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem 2.5rem;
          padding: 1.5rem clamp(1.25rem, 4vw, 3.25rem); flex-wrap: wrap; }
        .kozu-label { display: inline-flex; align-items: center; gap: 0.6rem; flex-shrink: 0;
          font-family: var(--font-grotesk); font-size: 0.66rem; font-weight: 500; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--muted); }
        .kozu-label::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
        .kozu-verse { flex: 1; min-width: 220px; font-family: var(--font-serif); font-style: italic; font-weight: 400;
          font-size: clamp(1.1rem, 2.4vw, 1.6rem); line-height: 1.4; color: var(--ink); }
        .kozu-share { flex-shrink: 0; background: none; border: none; cursor: pointer; font-family: var(--font-grotesk);
          font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted);
          border-bottom: 1px solid var(--accent); padding-bottom: 2px; transition: color 0.25s ease; }
        .kozu-share:hover { color: var(--accent); }
        @media (max-width: 640px) { .kozu-band { justify-content: flex-start; } }
      `}</style>
      <span className="kozu-label">{t.label}</span>
      <p className="kozu-verse" suppressHydrationWarning>{verse ? `“${verse}”` : " "}</p>
      {verse && (
        <button className="kozu-share" onClick={() => shareVerse(verse, () => { setCopied(true); window.setTimeout(() => setCopied(false), 1600); })}>
          {copied ? t.copied : t.share} ↗
        </button>
      )}
      <a className="kozu-share" href="/evren" style={{ textDecoration: "none" }}>{t.universe} ✦</a>
    </section>
  );
}
