"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { VERSES } from "@/lib/site";

/* Canlı Şiir — sinematik şiir sahnesi.
   Bir dize kelime kelime tutuşarak belirir; nefes payıyla akar; sekans
   bitince sahne kararır ve sıradaki dize başlar. Oynat/duraklat + ilerleme. */

const LABELS = {
  tr: { title: "Canlı Şiir", play: "Başlat", pause: "Duraklat", next: "Sıradaki", back: "← berkaydogan.co", hint: "Ses yok — sadece kelimeler ve zaman" },
  en: { title: "Living Poem", play: "Play", pause: "Pause", next: "Next", back: "← berkaydogan.co", hint: "No sound — only words and time" },
  fr: { title: "Poème Vivant", play: "Lancer", pause: "Pause", next: "Suivant", back: "← berkaydogan.co", hint: "Pas de son — seulement les mots et le temps" },
};

const WORD_MS = 620;     // kelimeler arası
const HOLD_MS = 3400;    // dize tamamlanınca bekleme
const FADE_MS = 900;     // kararma

type Phase = "typing" | "hold" | "fade";

export default function CanliSiir() {
  const [lang, setLang] = useState<"tr" | "en" | "fr">("tr");
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(0);          // görünen kelime sayısı
  const [phase, setPhase] = useState<Phase>("typing");
  const [playing, setPlaying] = useState(true);
  const timer = useRef<number>(0);

  useEffect(() => {
    try {
      const s = localStorage.getItem("bd-lang");
      if (s === "tr" || s === "en" || s === "fr") setLang(s);
      else {
        const n = (navigator.language || "").toLowerCase();
        setLang(n.startsWith("tr") ? "tr" : n.startsWith("fr") ? "fr" : "en");
      }
    } catch { /* yoksay */ }
  }, []);

  const verse = VERSES[idx];
  const wordsArr = verse.split(" ");

  const advance = useCallback(() => {
    setIdx((p) => (p + 1) % VERSES.length);
    setShown(0);
    setPhase("typing");
  }, []);

  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(wordsArr.length); setPhase("hold"); return; }

    if (phase === "typing") {
      if (shown < wordsArr.length) {
        timer.current = window.setTimeout(() => setShown((s) => s + 1), shown === 0 ? 350 : WORD_MS);
      } else {
        setPhase("hold");
      }
    } else if (phase === "hold") {
      timer.current = window.setTimeout(() => setPhase("fade"), HOLD_MS);
    } else {
      timer.current = window.setTimeout(advance, FADE_MS);
    }
    return () => window.clearTimeout(timer.current);
  }, [playing, phase, shown, wordsArr.length, advance]);

  const L = LABELS[lang];

  return (
    <div className="cs-root">
      <style>{`
        .cs-root { position: fixed; inset: 0; overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: radial-gradient(120% 85% at 50% 30%, #1b1410 0%, #0a0806 55%, #050403 100%); }
        .cs-root::after { content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(110% 85% at 50% 45%, transparent 55%, rgba(0,0,0,0.6) 100%); }
        .cs-top { position: absolute; top: 0; left: 0; right: 0; z-index: 3; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); }
        .cs-title { font-family: var(--font-grotesk, sans-serif); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; color: #F1EDE4; }
        .cs-back { font-family: var(--font-grotesk, sans-serif); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #9a948a;
          border-bottom: 1px solid #E5402A; padding-bottom: 2px; }
        .cs-stage { position: relative; z-index: 2; max-width: 900px; padding: 2rem; text-align: center;
          transition: opacity ${FADE_MS}ms ease; }
        .cs-stage[data-fade="1"] { opacity: 0; }
        .cs-verse { font-family: var(--font-serif, Georgia, serif); font-style: italic; font-weight: 300;
          font-size: clamp(2rem, 7vw, 4.6rem); line-height: 1.35; color: #F5EFE6; }
        .cs-word { display: inline-block; margin-right: 0.32em; opacity: 0; transform: translateY(14px);
          filter: blur(6px); animation: csWord 0.9s cubic-bezier(0.22,1,0.36,1) forwards; text-shadow: 0 0 34px rgba(229,64,42,0.3); }
        @keyframes csWord { to { opacity: 1; transform: none; filter: blur(0); } }
        .cs-sign { display: block; margin-top: 2.2rem; font-family: var(--font-grotesk, sans-serif); font-size: 0.7rem;
          letter-spacing: 0.24em; text-transform: uppercase; color: #E5402A; opacity: 0; animation: csSign 1s ease 0.4s forwards; }
        @keyframes csSign { to { opacity: 1; } }
        .cs-bar { position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; display: flex; align-items: center; justify-content: center;
          gap: 1.25rem; padding: 1.4rem clamp(1.25rem, 4vw, 3rem) calc(1.4rem + env(safe-area-inset-bottom, 0px)); }
        .cs-btn { font-family: var(--font-grotesk, sans-serif); font-size: 0.74rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 0.7rem 1.4rem; border-radius: 100px; border: 1px solid rgba(241,237,228,0.25);
          background: rgba(20,16,13,0.5); color: #F1EDE4; cursor: pointer; transition: border-color 0.25s ease, transform 0.25s ease;
          -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
        .cs-btn:hover { border-color: #F1EDE4; transform: translateY(-2px); }
        .cs-dots { display: flex; gap: 0.45rem; }
        .cs-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(241,237,228,0.22); transition: background 0.3s ease, transform 0.3s ease; }
        .cs-dot[data-on="1"] { background: #E5402A; transform: scale(1.35); }
        .cs-hint { position: absolute; left: 0; right: 0; bottom: calc(4.6rem + env(safe-area-inset-bottom, 0px)); text-align: center;
          font-family: var(--font-grotesk, sans-serif); font-size: 0.6rem; letter-spacing: 0.22em; text-transform: uppercase; color: #57534b; pointer-events: none; }
        @media (prefers-reduced-motion: reduce) { .cs-word { animation-duration: 0.01ms; } .cs-sign { animation-duration: 0.01ms; } }
      `}</style>

      <div className="cs-top">
        <span className="cs-title">{L.title}</span>
        <Link href="/" className="cs-back">{L.back}</Link>
      </div>

      <div className="cs-stage" data-fade={phase === "fade" ? "1" : "0"}>
        <p className="cs-verse" aria-live="polite">
          {wordsArr.slice(0, shown).map((w, i) => (
            <span key={`${idx}-${i}`} className="cs-word">{w}</span>
          ))}
        </p>
        {phase !== "typing" && <span className="cs-sign">— Berkay Doğan</span>}
      </div>

      <div className="cs-hint">{L.hint}</div>

      <div className="cs-bar">
        <button className="cs-btn" onClick={() => setPlaying((p) => !p)}>{playing ? L.pause : L.play}</button>
        <div className="cs-dots" aria-hidden="true">
          {VERSES.map((_, i) => <span key={i} className="cs-dot" data-on={i === idx ? "1" : "0"} />)}
        </div>
        <button className="cs-btn" onClick={() => { window.clearTimeout(timer.current); advance(); }}>{L.next} →</button>
      </div>
    </div>
  );
}
