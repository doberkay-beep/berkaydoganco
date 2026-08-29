"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Yaşayan Kapak — Tasfiye kapağının içine gir.
   Spot ışığı altında daktilo: ziyaretçi gerçekten yazar (tuş sesleri
   WebAudio ile üretilir), sonra kâğıdı buruşturup bırakır — kâğıt
   közlere savrulur, masadaki buruşuk kâğıtlara katılır. Sayaç yerelde
   tutulur. "Tasfiye, yıkmak değil; temizlemektir." */

type Lang = "tr" | "en" | "fr";

const COPY: Record<Lang, {
  title: string; back: string; hint: string; placeholder: string;
  crumple: string; counter: (n: number) => string; motto: string; buy: string;
}> = {
  tr: {
    title: "Yaşayan Kapak",
    back: "← berkaydogan.co",
    hint: "Kâğıda dokun, yaz — sonra buruştur, bırak gitsin",
    placeholder: "içinde ne varsa…",
    crumple: "Buruştur ve bırak",
    counter: (n) => `közlere savrulan ${n} kâğıt`,
    motto: "Tasfiye, yıkmak değil; temizlemektir.",
    buy: "Kitabı al",
  },
  en: {
    title: "The Living Cover",
    back: "← berkaydogan.co",
    hint: "Touch the paper, type — then crumple it and let it go",
    placeholder: "whatever is inside…",
    crumple: "Crumple and release",
    counter: (n) => `${n} pages given to the embers`,
    motto: "Tasfiye is not to destroy; it is to cleanse.",
    buy: "Get the book",
  },
  fr: {
    title: "La Couverture Vivante",
    back: "← berkaydogan.co",
    hint: "Touche le papier, écris — puis froisse-le et laisse-le partir",
    placeholder: "ce qu'il y a en toi…",
    crumple: "Froisser et lâcher",
    counter: (n) => `${n} feuilles données aux braises`,
    motto: "Tasfiye n'est pas détruire ; c'est purifier.",
    buy: "Acheter le livre",
  },
};

export default function YasayanKapak() {
  const [lang, setLang] = useState<Lang>("tr");
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"idle" | "crumple">("idle");
  const [count, setCount] = useState(0);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);
  const burstRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("bd-lang");
      if (s === "tr" || s === "en" || s === "fr") setLang(s);
      else {
        const n = (navigator.language || "").toLowerCase();
        setLang(n.startsWith("tr") ? "tr" : n.startsWith("fr") ? "fr" : "en");
      }
      const c = parseInt(localStorage.getItem("bd-kapak-sayac") || "0", 10);
      if (!isNaN(c)) setCount(c);
    } catch { /* yoksay */ }
  }, []);

  /* --- sesler: dosyasız, WebAudio --- */
  const ctx = () => {
    if (!audioRef.current) { try { audioRef.current = new AudioContext(); } catch { /* yoksay */ } }
    return audioRef.current;
  };
  const klik = () => {
    const c = ctx(); if (!c) return;
    const len = Math.floor(c.sampleRate * 0.016);
    const b = c.createBuffer(1, len, c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.3));
    const s = c.createBufferSource(); s.buffer = b;
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2200 + Math.random() * 1400;
    const g = c.createGain(); g.gain.value = 0.1 + Math.random() * 0.08;
    s.connect(bp); bp.connect(g); g.connect(c.destination); s.start();
  };
  const zil = () => {
    const c = ctx(); if (!c) return;
    const o = c.createOscillator(); o.type = "sine"; o.frequency.value = 1245;
    const g = c.createGain(); g.gain.setValueAtTime(0.08, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.5);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.5);
  };
  const hisirti = () => {
    const c = ctx(); if (!c) return;
    const len = Math.floor(c.sampleRate * 0.28);
    const b = c.createBuffer(1, len, c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.4)) * (0.5 + 0.5 * Math.sin(i / 90));
    const s = c.createBufferSource(); s.buffer = b;
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1100;
    const g = c.createGain(); g.gain.value = 0.16;
    s.connect(bp); bp.connect(g); g.connect(c.destination); s.start();
  };

  /* --- köz patlaması --- */
  const burst = () => {
    const canvas = burstRef.current; const paper = paperRef.current;
    if (!canvas || !paper) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cx2 = canvas.getContext("2d"); if (!cx2) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = window.innerWidth, H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    cx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    const r = paper.getBoundingClientRect();
    const ox = r.left + r.width / 2, oy = r.top + r.height / 2;
    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };
    const ps: P[] = [];
    for (let i = 0; i < 60; i++) {
      const a = Math.random() * Math.PI * 2, s = 0.6 + Math.random() * 3;
      ps.push({ x: ox + (Math.random() - 0.5) * r.width * 0.6, y: oy + (Math.random() - 0.5) * r.height * 0.5, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.4, life: 0, max: 700 + Math.random() * 600, r: 1 + Math.random() * 2.2 });
    }
    let prev = performance.now();
    const step = () => {
      const now = performance.now(); const dt = Math.min(50, now - prev); prev = now;
      cx2.clearRect(0, 0, W, H);
      let alive = 0;
      for (const p of ps) {
        p.life += dt; if (p.life >= p.max) continue;
        alive++;
        p.x += p.vx; p.y += p.vy; p.vy -= 0.012; p.vx *= 0.99;
        const k = 1 - p.life / p.max;
        cx2.beginPath();
        cx2.fillStyle = `rgba(${229}, ${Math.floor(90 + 80 * k)}, ${50}, ${(0.55 * k).toFixed(3)})`;
        cx2.arc(p.x, p.y, p.r * (0.5 + 0.5 * k), 0, Math.PI * 2);
        cx2.fill();
      }
      if (alive > 0) requestAnimationFrame(step); else cx2.clearRect(0, 0, W, H);
    };
    requestAnimationFrame(step);
  };

  const birak = () => {
    if (phase !== "idle" || text.trim().length === 0) return;
    setPhase("crumple");
    hisirti();
    window.setTimeout(() => burst(), 420);
    window.setTimeout(() => {
      setText("");
      setPhase("idle");
      setCount((n) => {
        const yeni = n + 1;
        try { localStorage.setItem("bd-kapak-sayac", String(yeni)); } catch { /* yoksay */ }
        return yeni;
      });
      taRef.current?.focus();
    }, 950);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "Enter") { zil(); return; }
    if (e.key.length === 1 || e.key === "Backspace") klik();
  };

  const L = COPY[lang];
  const pile = Math.min(count, 6);

  return (
    <div className="yk-root" onClick={() => taRef.current?.focus()}>
      <style>{`
        .yk-root { position: fixed; inset: 0; overflow: hidden; color: #F1EDE4;
          background: radial-gradient(120% 85% at 50% -14%, #2a1e14 0%, #0b0a09 52%, #050403 100%); }
        .yk-root::after { content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(120% 95% at 50% 40%, transparent 52%, rgba(0,0,0,0.7) 100%); }
        .yk-spot { position: absolute; top: -16%; left: 50%; width: 84vmin; height: 84vmin; transform: translateX(-50%);
          background: radial-gradient(closest-side, rgba(241,230,210,0.10), rgba(229,64,42,0.06) 50%, transparent 72%);
          filter: blur(6px); pointer-events: none; }
        .yk-burst { position: absolute; inset: 0; pointer-events: none; z-index: 6; }
        .yk-top { position: absolute; top: 0; left: 0; right: 0; z-index: 7; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); }
        .yk-title { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; }
        .yk-back { font-family: var(--font-grotesk); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #9a948a; border-bottom: 1px solid #E5402A; padding-bottom: 2px; }

        .yk-stage { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0; padding: 4.5rem 1rem 2rem; }
        .yk-marka { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(1.6rem, 5vw, 2.6rem);
          letter-spacing: 0.42em; text-transform: uppercase; color: #F1EDE4; text-shadow: 0 0 34px rgba(229,64,42,0.25);
          margin-bottom: clamp(0.5rem, 2vh, 1.4rem); }

        .yk-paper-wrap { position: relative; z-index: 3; }
        .yk-paper { width: min(430px, 84vw); min-height: 190px; background: linear-gradient(180deg, #F5F0E6 0%, #EDE6D8 100%);
          border-radius: 3px; padding: 1.3rem 1.5rem 2.6rem; transform: rotate(-0.6deg);
          box-shadow: 0 30px 70px rgba(0,0,0,0.65), inset 0 0 40px rgba(30,22,14,0.05); cursor: text; }
        .yk-paper[data-phase="crumple"] { animation: ykCrumple 0.95s cubic-bezier(0.5,0,0.7,0.4) both; }
        @keyframes ykCrumple {
          0%   { transform: rotate(-0.6deg) scale(1); filter: none; opacity: 1; }
          35%  { transform: rotate(5deg) scale(0.6, 0.52); filter: brightness(0.92); }
          60%  { transform: rotate(-12deg) scale(0.3, 0.26) translateY(60px); filter: brightness(0.8); }
          100% { transform: rotate(-30deg) scale(0.08) translate(-70vw, 46vh); opacity: 0; }
        }
        .yk-text { font-family: "Courier New", Courier, monospace; font-size: 15.5px; line-height: 1.7;
          color: #24201a; white-space: pre-wrap; word-break: break-word; min-height: 100px; }
        .yk-caret { display: inline-block; width: 9px; height: 1.1em; background: #24201a; vertical-align: text-bottom;
          animation: ykCaret 1s steps(1) infinite; margin-left: 1px; }
        @keyframes ykCaret { 0%, 60% { opacity: 1; } 61%, 100% { opacity: 0; } }
        .yk-ph { color: rgba(36,32,26,0.35); font-style: italic; }
        .yk-ta { position: absolute; opacity: 0; pointer-events: none; width: 1px; height: 1px; }

        .yk-daktilo { margin-top: -34px; position: relative; z-index: 4; width: min(460px, 88vw); }
        .yk-daktilo svg { width: 100%; height: auto; display: block; filter: drop-shadow(0 30px 50px rgba(0,0,0,0.6)); }

        .yk-alt { position: relative; z-index: 5; display: flex; flex-direction: column; align-items: center; gap: 0.9rem;
          margin-top: clamp(0.8rem, 3vh, 1.8rem); text-align: center; }
        .yk-hint { font-family: var(--font-grotesk); font-size: 0.66rem; letter-spacing: 0.24em; text-transform: uppercase; color: #6f6a61; }
        .yk-btns { display: flex; gap: 0.7rem; flex-wrap: wrap; justify-content: center; }
        .yk-btn { display: inline-flex; align-items: center; gap: 0.55rem; cursor: pointer; text-decoration: none;
          font-family: var(--font-grotesk); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em;
          padding: 0.85rem 1.6rem; border-radius: 100px; border: 1px solid transparent;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease; }
        .yk-fill { background: #E5402A; color: #0b0a09; }
        .yk-fill:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(229,64,42,0.35); }
        .yk-fill[data-off="1"] { opacity: 0.35; pointer-events: none; }
        .yk-ghost { border-color: rgba(241,237,228,0.28); color: #F1EDE4; background: transparent; }
        .yk-ghost:hover { border-color: #F1EDE4; transform: translateY(-2px); }
        .yk-sayac { font-family: var(--font-grotesk); font-size: 0.64rem; letter-spacing: 0.22em; text-transform: uppercase; color: #E5402A; }
        .yk-motto { font-family: var(--font-serif); font-style: italic; font-weight: 300; font-size: clamp(0.95rem, 2.2vw, 1.15rem); color: #c9c2b6; }

        .yk-pile { position: absolute; bottom: 3vh; left: 4vw; display: flex; gap: 6px; align-items: flex-end; z-index: 2; }
        .yk-top-pile { position: absolute; bottom: 3vh; right: 4vw; z-index: 2; }
        @media (max-height: 700px) { .yk-marka { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .yk-paper[data-phase="crumple"] { animation: none; opacity: 0; }
          .yk-caret { animation: none; }
        }
      `}</style>

      <div className="yk-spot" aria-hidden="true" />
      <canvas ref={burstRef} className="yk-burst" aria-hidden="true" />

      <div className="yk-top">
        <span className="yk-title">{L.title}</span>
        <Link href="/" className="yk-back" onClick={(e) => e.stopPropagation()}>{L.back}</Link>
      </div>

      <div className="yk-stage">
        <div className="yk-marka" aria-hidden="true">Tasfiye</div>

        {/* Kâğıt */}
        <div className="yk-paper-wrap" ref={paperRef}>
          <div className="yk-paper" data-phase={phase} aria-hidden="true">
            <div className="yk-text">
              {text.length === 0 && phase === "idle" ? <span className="yk-ph">{L.placeholder}</span> : text}
              {phase === "idle" && <span className="yk-caret" />}
            </div>
          </div>
          <textarea
            ref={taRef}
            className="yk-ta"
            value={text}
            maxLength={240}
            autoFocus
            aria-label={L.placeholder}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey}
            onBlur={() => window.setTimeout(() => taRef.current?.focus(), 50)}
          />
        </div>

        {/* Daktilo */}
        <div className="yk-daktilo" aria-hidden="true">
          <svg viewBox="0 0 460 210">
            {/* şaryo + merdane */}
            <rect x="70" y="18" width="320" height="16" rx="8" fill="#171310" />
            <rect x="52" y="22" width="24" height="9" rx="4" fill="#2a221b" />
            <rect x="384" y="22" width="24" height="9" rx="4" fill="#2a221b" />
            <rect x="90" y="34" width="280" height="20" rx="6" fill="#221b15" />
            {/* gövde */}
            <path d="M60 60 Q60 46 80 46 L380 46 Q400 46 400 60 L412 150 Q414 166 396 166 L64 166 Q46 166 48 150 Z" fill="#14100d" />
            <path d="M60 60 Q60 46 80 46 L380 46 Q400 46 400 60 L404 92 L56 92 Z" fill="#1b1511" />
            {/* tuş yuvası */}
            <rect x="84" y="96" width="292" height="58" rx="10" fill="#0e0b09" />
            {/* tuşlar */}
            {Array.from({ length: 3 }).map((_, r) =>
              Array.from({ length: 10 - r }).map((__, c) => (
                <circle key={`${r}-${c}`} cx={108 + r * 13 + c * 26} cy={108 + r * 17} r="7.4"
                  fill="#26201a" stroke="#3d332a" strokeWidth="1.4" />
              ))
            )}
            {/* boşluk çubuğu */}
            <rect x="150" y="154" width="160" height="9" rx="4.5" fill="#26201a" stroke="#3d332a" strokeWidth="1" />
            {/* taban */}
            <rect x="40" y="166" width="380" height="18" rx="8" fill="#0a0806" />
            <ellipse cx="230" cy="196" rx="200" ry="10" fill="rgba(0,0,0,0.5)" />
          </svg>
        </div>

        {/* Alt şerit */}
        <div className="yk-alt" onClick={(e) => e.stopPropagation()}>
          <span className="yk-hint">{L.hint}</span>
          <div className="yk-btns">
            <button className="yk-btn yk-fill" data-off={text.trim().length === 0 || phase !== "idle" ? "1" : "0"} onClick={birak}>{L.crumple}</button>
            <a href="/git/trendyol/" rel="noopener" className="yk-btn yk-ghost">{L.buy} →</a>
          </div>
          {count > 0 && <span className="yk-sayac">{L.counter(count)}</span>}
          <span className="yk-motto">&ldquo;{L.motto}&rdquo;</span>
        </div>
      </div>

      {/* Buruşuk kâğıt yığını */}
      <div className="yk-pile" aria-hidden="true">
        {Array.from({ length: Math.ceil(pile / 2) }).map((_, i) => (
          <svg key={i} width={30 + (i % 3) * 8} height={26 + (i % 2) * 6} viewBox="0 0 40 34">
            <path d="M20 2 L30 6 L38 14 L34 24 L26 32 L14 30 L4 24 L2 12 L10 4 Z" fill="#D8D0C0" opacity="0.85" />
            <path d="M20 2 L24 12 L34 24 M14 30 L18 16 L2 12" stroke="#B8AE9C" strokeWidth="1.4" fill="none" />
          </svg>
        ))}
      </div>
      <div className="yk-top-pile" aria-hidden="true">
        {pile > 1 && Array.from({ length: Math.floor(pile / 2) }).map((_, i) => (
          <svg key={i} width={26 + (i % 2) * 10} height={24} viewBox="0 0 40 34" style={{ marginLeft: 4 }}>
            <path d="M20 2 L32 8 L38 18 L32 26 L20 32 L8 28 L2 16 L8 6 Z" fill="#D8D0C0" opacity="0.8" />
            <path d="M8 6 L20 14 L32 8 M20 14 L20 32" stroke="#B8AE9C" strokeWidth="1.4" fill="none" />
          </svg>
        ))}
      </div>
    </div>
  );
}
