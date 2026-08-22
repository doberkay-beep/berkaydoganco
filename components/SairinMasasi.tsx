"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* Şairin Masası — keşfedilebilir sahne (SVG).
   Masadaki her nesne bir kapı: daktilo→/yazilar, kitaplar→/kitap/*,
   radyo→necaliyor.co, lamba→tema değiştir, kâğıtlar→/evren, fincan→#media.
   Hover'da nesne aydınlanır + etiket belirir. */

const LABELS = {
  tr: { title: "Şairin Masası", hint: "Masadaki nesnelere dokun", back: "← berkaydogan.co", typewriter: "Yazılar", books: "Kitaplar", radio: "ŞİMDİ — canlı radyo", lamp: "Işığı değiştir", papers: "Köz Evreni", cup: "Medya & podcast" },
  en: { title: "The Poet's Desk", hint: "Touch the objects on the desk", back: "← berkaydogan.co", typewriter: "Writing", books: "Books", radio: "ŞİMDİ — live radio", lamp: "Switch the light", papers: "Ember Universe", cup: "Media & podcast" },
  fr: { title: "Le Bureau du Poète", hint: "Touche les objets du bureau", back: "← berkaydogan.co", typewriter: "Écrits", books: "Livres", radio: "ŞİMDİ — radio en direct", lamp: "Changer la lumière", papers: "Univers de Braise", cup: "Médias & podcast" },
};

export default function SairinMasasi() {
  const [lang, setLang] = useState<"tr" | "en" | "fr">("tr");
  const [hover, setHover] = useState<string | null>(null);

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

  const toggleTheme = () => {
    const cur = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", cur);
    try { localStorage.setItem("bd-theme", cur); } catch { /* yoksay */ }
  };

  const L = LABELS[lang];
  const H = (k: string) => ({ onPointerEnter: () => setHover(k), onPointerLeave: () => setHover((h) => (h === k ? null : h)) });
  const lit = (k: string) => (hover === k ? 1 : 0);

  return (
    <div className="sm-root">
      <style>{`
        .sm-root { position: fixed; inset: 0; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: radial-gradient(130% 90% at 50% 15%, #241a12 0%, #0c0906 52%, #060504 100%); }
        .sm-top { position: absolute; top: 0; left: 0; right: 0; z-index: 3; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); }
        .sm-title { font-family: var(--font-grotesk, sans-serif); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; color: #F1EDE4; }
        .sm-back { font-family: var(--font-grotesk, sans-serif); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #9a948a;
          border-bottom: 1px solid #E5402A; padding-bottom: 2px; }
        .sm-svg { width: min(1100px, 96vw); height: auto; display: block; }
        .sm-obj { cursor: pointer; transition: filter 0.3s ease; }
        .sm-obj:hover { filter: brightness(1.35) drop-shadow(0 0 18px rgba(229,64,42,0.35)); }
        .sm-label { position: absolute; left: 50%; transform: translateX(-50%); bottom: clamp(1.6rem, 6vh, 3.5rem); z-index: 3;
          font-family: var(--font-grotesk, sans-serif); font-size: 0.78rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #F1EDE4; background: rgba(15,12,10,0.72); border: 1px solid rgba(241,237,228,0.16); border-radius: 100px;
          padding: 0.65rem 1.4rem; -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); pointer-events: none;
          transition: opacity 0.25s ease; white-space: nowrap; }
        .sm-hintline { animation: smHint 3.5s ease-in-out infinite; }
        @keyframes smHint { 0%,100% { opacity: 0.45; } 50% { opacity: 0.95; } }
        @media (prefers-reduced-motion: reduce) { .sm-hintline { animation: none; } }
      `}</style>

      <div className="sm-top">
        <span className="sm-title">{L.title}</span>
        <Link href="/" className="sm-back">{L.back}</Link>
      </div>

      <svg className="sm-svg" viewBox="0 0 1100 640" role="img" aria-label={L.title}>
        {/* Duvar dokusu + lamba ışığı */}
        <defs>
          <radialGradient id="smLampGlow" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#E5402A" stopOpacity="0.34" />
            <stop offset="45%" stopColor="#E5402A" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#E5402A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="smDesk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2b1e" />
            <stop offset="100%" stopColor="#241a12" />
          </linearGradient>
        </defs>

        {/* Lamba ışık konisi */}
        <ellipse cx="550" cy="120" rx="480" ry="330" fill="url(#smLampGlow)" />

        {/* Masa */}
        <rect x="40" y="430" width="1020" height="34" rx="6" fill="url(#smDesk)" />
        <rect x="80" y="464" width="26" height="150" fill="#1c140d" />
        <rect x="994" y="464" width="26" height="150" fill="#1c140d" />

        {/* LAMBA (tema) */}
        <g className="sm-obj" {...H("lamp")} onClick={toggleTheme} role="button" aria-label={L.lamp}>
          <rect x="152" y="270" width="10" height="160" rx="4" fill="#4a3a2a" />
          <path d="M108 276 L206 276 L184 218 L130 218 Z" fill={lit("lamp") ? "#E5402A" : "#8a4432"} />
          <ellipse cx="157" cy="284" rx="52" ry="9" fill="#2a1e14" />
          <ellipse cx="157" cy="435" rx="42" ry="9" fill="#1c140d" />
          <ellipse cx="157" cy="330" rx="60" ry="42" fill="#E5402A" opacity={lit("lamp") ? 0.22 : 0.1} />
        </g>

        {/* KİTAPLAR (kitap sayfaları) */}
        <Link href="/kitap/murekkep">
          <g className="sm-obj" {...H("books")} aria-label={L.books}>
            <rect x="262" y="352" width="120" height="20" rx="3" fill="#5a3327" transform="rotate(-3 322 362)" />
            <rect x="270" y="374" width="118" height="20" rx="3" fill="#7a4433" />
            <rect x="258" y="396" width="128" height="22" rx="3" fill="#3f2b20" />
            <rect x="264" y="418" width="120" height="14" rx="3" fill="#2c1e15" />
            <text x="322" y="411" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontStyle="italic" fill="#E8DECC">M&K</text>
          </g>
        </Link>

        {/* DAKTİLO (yazılar) */}
        <Link href="/yazilar">
          <g className="sm-obj" {...H("typewriter")} aria-label={L.typewriter}>
            <rect x="470" y="300" width="180" height="14" rx="3" fill="#EFE7D8" />
            <rect x="492" y="252" width="136" height="52" rx="4" fill="#F5EFE2" />
            <rect x="470" y="352" width="196" height="52" rx="8" fill="#171310" />
            <rect x="478" y="342" width="180" height="18" rx="4" fill="#241d17" />
            {Array.from({ length: 3 }).map((_, r) =>
              Array.from({ length: 9 }).map((__, c) => (
                <circle key={`${r}${c}`} cx={492 + c * 19} cy={366 + r * 13} r="4.6" fill={lit("typewriter") ? "#c9beac" : "#8f8574"} />
              ))
            )}
            <rect x="470" y="404" width="196" height="26" rx="6" fill="#0f0c0a" />
          </g>
        </Link>

        {/* KÂĞITLAR (evren) */}
        <Link href="/evren">
          <g className="sm-obj" {...H("papers")} aria-label={L.papers}>
            <rect x="712" y="380" width="86" height="52" rx="3" fill="#EFE7D6" transform="rotate(7 755 406)" />
            <rect x="700" y="392" width="86" height="46" rx="3" fill="#E4DAC6" transform="rotate(-6 743 415)" />
            <circle cx="758" cy="404" r="4" fill="#E5402A" opacity={0.5 + 0.5 * lit("papers")} />
            <line x1="716" y1="398" x2="778" y2="404" stroke="#a89a82" strokeWidth="2" />
            <line x1="714" y1="410" x2="770" y2="415" stroke="#a89a82" strokeWidth="2" />
          </g>
        </Link>

        {/* RADYO (necaliyor) */}
        <a href="https://www.necaliyor.co" target="_blank" rel="noopener noreferrer">
          <g className="sm-obj" {...H("radio")} aria-label={L.radio}>
            <rect x="856" y="342" width="150" height="90" rx="12" fill="#33261b" />
            <rect x="868" y="356" width="70" height="60" rx="6" fill="#1c140d" />
            {Array.from({ length: 5 }).map((_, i) => (
              <rect key={i} x={876 + i * 12} y={382 - (lit("radio") ? [8, 16, 24, 14, 6][i] : [4, 9, 14, 8, 3][i])} width="6" rx="2"
                height={lit("radio") ? [16, 28, 40, 24, 12][i] : [8, 16, 24, 14, 6][i]} fill="#E5402A" />
            ))}
            <circle cx="962" cy="370" r="11" fill="#4a3a2a" />
            <circle cx="962" cy="402" r="11" fill="#4a3a2a" />
            <line x1="990" y1="342" x2="1014" y2="292" stroke="#4a3a2a" strokeWidth="4" strokeLinecap="round" />
            <circle cx="1014" cy="290" r="4" fill={lit("radio") ? "#E5402A" : "#4a3a2a"} />
          </g>
        </a>

        {/* FİNCAN (medya) */}
        <Link href="/#media">
          <g className="sm-obj" {...H("cup")} aria-label={L.cup}>
            <path d="M402 400 q0 32 30 32 q30 0 30 -32 Z" fill="#5f4938" />
            <path d="M462 404 q18 2 14 16 q-4 12 -18 8" fill="none" stroke="#5f4938" strokeWidth="5" />
            <path d="M414 384 q4 -12 0 -20 M430 384 q4 -12 0 -20" stroke="#c9beac" strokeWidth="3" fill="none" opacity={0.4 + 0.6 * lit("cup")} strokeLinecap="round" />
          </g>
        </Link>
      </svg>

      <span className="sm-label" style={{ opacity: hover ? 1 : 0 }}>
        {hover === "typewriter" ? L.typewriter : hover === "books" ? L.books : hover === "radio" ? L.radio : hover === "lamp" ? L.lamp : hover === "papers" ? L.papers : hover === "cup" ? L.cup : ""}
      </span>
      {!hover && <span className="sm-label sm-hintline" style={{ opacity: 1 }}>{L.hint}</span>}
    </div>
  );
}
