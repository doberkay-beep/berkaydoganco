"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Film — sitenin kendini oynatan 35 saniyelik sinematik tanıtımı.
   "Başlat"a basınca sahneler kendiliğinden akar (sesler WebAudio ile üretilir);
   Berkay ekran kaydı alıp reel/short olarak paylaşır. Dikey ve yatay kayda
   uygun merkez kompozisyon. Sonunda tekrar oynat. */

type Lang = "tr" | "en" | "fr";

const COPY: Record<Lang, { title: string; back: string; start: string; replay: string; hint: string }> = {
  tr: { title: "Film", back: "← berkaydogan.co", start: "Filmi başlat", replay: "Tekrar oynat", hint: "Ekran kaydını aç, sonra başlat — 35 saniye" },
  en: { title: "The Film", back: "← berkaydogan.co", start: "Start the film", replay: "Play again", hint: "Start your screen recording, then press play — 35 seconds" },
  fr: { title: "Le Film", back: "← berkaydogan.co", start: "Lancer le film", replay: "Rejouer", hint: "Lance l'enregistrement d'écran, puis appuie — 35 secondes" },
};

const DAKTILO_METIN = "Yazmak, varoluşun en sessiz itirafıdır.";
const UCUSAN = ["Yıkılamadım, yıktım.", "geleceğime âşığım", "Ben artık sadece kendimim.", "bir köz", "ve ben yeniden doğdum"];

/* sahne süreleri (ms) — toplam ~35 sn */
const SURELER = [2800, 3600, 5200, 4200, 4600, 3800, 4200, 4200, 2600];

export default function Film() {
  const [lang, setLang] = useState<Lang>("tr");
  const [sahne, setSahne] = useState(-1); // -1 = başlangıç ekranı, 0..8 sahneler, 9 = bitti
  const [yazi, setYazi] = useState("");
  const audioRef = useRef<AudioContext | null>(null);
  const dustRef = useRef<HTMLCanvasElement | null>(null);
  const burstRef = useRef<HTMLCanvasElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem("bd-lang");
      if (s === "tr" || s === "en" || s === "fr") setLang(s);
      else {
        const n = (navigator.language || "").toLowerCase();
        setLang(n.startsWith("tr") ? "tr" : n.startsWith("fr") ? "fr" : "en");
      }
    } catch { /* yoksay */ }
    return () => { timers.current.forEach(clearTimeout); };
  }, []);

  /* --- sesler --- */
  const ctx = () => {
    if (!audioRef.current) { try { audioRef.current = new AudioContext(); } catch { /* yoksay */ } }
    return audioRef.current;
  };
  const klik = (gain = 0.12) => {
    const c = ctx(); if (!c) return;
    const len = Math.floor(c.sampleRate * 0.015);
    const b = c.createBuffer(1, len, c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.3));
    const s = c.createBufferSource(); s.buffer = b;
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2300 + Math.random() * 1200;
    const g = c.createGain(); g.gain.value = gain;
    s.connect(bp); bp.connect(g); g.connect(c.destination); s.start();
  };
  const vurus = () => {
    const c = ctx(); if (!c) return;
    const o = c.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(120, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(46, c.currentTime + 0.22);
    const g = c.createGain(); g.gain.setValueAtTime(0.5, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.34);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.36);
  };
  const hisirti = () => {
    const c = ctx(); if (!c) return;
    const len = Math.floor(c.sampleRate * 0.3);
    const b = c.createBuffer(1, len, c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.4)) * (0.5 + 0.5 * Math.sin(i / 80));
    const s = c.createBufferSource(); s.buffer = b;
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1000;
    const g = c.createGain(); g.gain.value = 0.2;
    s.connect(bp); bp.connect(g); g.connect(c.destination); s.start();
  };
  const zil = () => {
    const c = ctx(); if (!c) return;
    const o = c.createOscillator(); o.type = "sine"; o.frequency.value = 1245;
    const g = c.createGain(); g.gain.setValueAtTime(0.07, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.6);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.6);
  };
  const son = () => {
    const c = ctx(); if (!c) return;
    const o = c.createOscillator(); o.type = "sine"; o.frequency.value = 220;
    const o2 = c.createOscillator(); o2.type = "sine"; o2.frequency.value = 331;
    const g = c.createGain(); g.gain.setValueAtTime(0.001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.12, c.currentTime + 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 2.4);
    o.connect(g); o2.connect(g); g.connect(c.destination);
    o.start(); o2.start(); o.stop(c.currentTime + 2.5); o2.stop(c.currentTime + 2.5);
  };

  /* --- toz zerreleri (film boyunca) --- */
  useEffect(() => {
    const canvas = dustRef.current; if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cx2 = canvas.getContext("2d"); if (!cx2) return;
    let W = 0, H = 0, raf = 0;
    type P = { x: number; y: number; vy: number; r: number; ph: number };
    const ps: P[] = [];
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      cx2.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!ps.length) for (let i = 0; i < 40; i++) ps.push({ x: Math.random() * W, y: Math.random() * H, vy: -(0.08 + Math.random() * 0.25), r: 0.6 + Math.random() * 1.5, ph: Math.random() * Math.PI * 2 });
    };
    const step = () => {
      cx2.clearRect(0, 0, W, H);
      const t = performance.now() / 1000;
      for (const p of ps) {
        p.y += p.vy; p.x += Math.sin(t + p.ph) * 0.07;
        if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
        const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 1.4 + p.ph));
        cx2.beginPath(); cx2.fillStyle = `rgba(229, 105, 60, ${0.18 * tw})`;
        cx2.arc(p.x, p.y, p.r, 0, Math.PI * 2); cx2.fill();
      }
      raf = requestAnimationFrame(step);
    };
    resize(); step();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  /* --- köz patlaması (buruşma sahnesi) --- */
  const patla = () => {
    const canvas = burstRef.current; if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cx2 = canvas.getContext("2d"); if (!cx2) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = window.innerWidth, H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    cx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };
    const ps: P[] = [];
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * Math.PI * 2, s = 0.8 + Math.random() * 3.4;
      ps.push({ x: W / 2 + (Math.random() - 0.5) * 160, y: H / 2 + (Math.random() - 0.5) * 120, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.6, life: 0, max: 800 + Math.random() * 700, r: 1 + Math.random() * 2.4 });
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
        cx2.fillStyle = `rgba(229, ${Math.floor(90 + 80 * k)}, 50, ${(0.55 * k).toFixed(3)})`;
        cx2.arc(p.x, p.y, p.r * (0.5 + 0.5 * k), 0, Math.PI * 2); cx2.fill();
      }
      if (alive > 0) requestAnimationFrame(step); else cx2.clearRect(0, 0, W, H);
    };
    requestAnimationFrame(step);
  };

  /* --- zaman akışı --- */
  const basla = () => {
    ctx(); // ses izni jestle
    timers.current.forEach(clearTimeout); timers.current = [];
    setYazi("");
    setSahne(0);
    let t = 0;
    SURELER.forEach((dur, i) => {
      t += dur;
      timers.current.push(window.setTimeout(() => setSahne(i + 1 <= 8 ? i + 1 : 9), t));
    });
    // sahne 2: daktilo yazımı (sahne başlangıcı = SURELER[0]+SURELER[1])
    const s2 = SURELER[0] + SURELER[1];
    DAKTILO_METIN.split("").forEach((ch, i) => {
      timers.current.push(window.setTimeout(() => {
        setYazi(DAKTILO_METIN.slice(0, i + 1));
        if (ch !== " ") klik();
      }, s2 + 400 + i * 95));
    });
    timers.current.push(window.setTimeout(zil, s2 + 400 + DAKTILO_METIN.length * 95 + 250));
    // sahne 4: damga vuruşu
    timers.current.push(window.setTimeout(vurus, SURELER.slice(0, 4).reduce((a, b) => a + b, 0) + 1500));
    // sahne 6: buruşma + patlama
    const s6 = SURELER.slice(0, 6).reduce((a, b) => a + b, 0);
    timers.current.push(window.setTimeout(hisirti, s6 + 900));
    timers.current.push(window.setTimeout(patla, s6 + 1250));
    // sahne 7: kapak — final akoru
    timers.current.push(window.setTimeout(son, SURELER.slice(0, 7).reduce((a, b) => a + b, 0) + 400));
  };

  const L = COPY[lang];

  return (
    <div className="fl-root">
      <style>{`
        .fl-root { position: fixed; inset: 0; overflow: hidden; color: #F1EDE4;
          background: radial-gradient(120% 80% at 50% -10%, #221912 0%, #0b0a09 50%, #050403 100%); }
        .fl-root::after { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background: radial-gradient(120% 95% at 50% 42%, transparent 52%, rgba(0,0,0,0.72) 100%); }
        .fl-dust, .fl-burst { position: absolute; inset: 0; pointer-events: none; }
        .fl-dust { z-index: 1; } .fl-burst { z-index: 6; }
        .fl-top { position: absolute; top: 0; left: 0; right: 0; z-index: 8; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); transition: opacity 0.5s ease; }
        .fl-top[data-gizli="1"] { opacity: 0; pointer-events: none; }
        .fl-title { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; }
        .fl-back { font-family: var(--font-grotesk); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #9a948a; border-bottom: 1px solid #E5402A; padding-bottom: 2px; }

        .fl-sahne { position: absolute; inset: 0; z-index: 4; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center; padding: 2rem clamp(1.25rem, 6vw, 3rem); }
        .fl-serif { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.6rem, 5.2vw, 3rem); line-height: 1.4; max-width: 24ch; }
        .fl-belir { animation: flBelir 1.1s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes flBelir { from { opacity: 0; transform: translateY(24px); filter: blur(10px); } to { opacity: 1; transform: none; filter: blur(0); } }
        .fl-son-git { animation: flGit 0.7s ease both; animation-delay: var(--gec, 2s); }
        @keyframes flGit { to { opacity: 0; filter: blur(8px); } }

        /* mühür çizimi */
        .fl-muhur circle.cember { stroke-dasharray: 176; stroke-dashoffset: 176; animation: flCiz 1.6s ease forwards 0.2s; }
        .fl-muhur path { stroke-dasharray: 120; stroke-dashoffset: 120; animation: flCiz 1.2s ease forwards 1s; }
        .fl-muhur circle.koz { opacity: 0; animation: flKoz 0.5s ease forwards 2.2s; }
        @keyframes flCiz { to { stroke-dashoffset: 0; } }
        @keyframes flKoz { to { opacity: 1; } }

        /* daktilo kâğıdı */
        .fl-kagit { width: min(520px, 86vw); min-height: 150px; background: linear-gradient(180deg, #F5F0E6, #EDE6D8);
          border-radius: 4px; padding: 1.6rem 1.8rem; box-shadow: 0 34px 80px rgba(0,0,0,0.65); transform: rotate(-0.6deg);
          text-align: left; animation: flBelir 0.8s ease both; }
        .fl-kagit .yz { font-family: "Courier New", Courier, monospace; font-size: clamp(15px, 2.6vw, 19px); line-height: 1.8; color: #24201a; }
        .fl-imlec { display: inline-block; width: 9px; height: 1.1em; background: #24201a; vertical-align: text-bottom; margin-left: 1px;
          animation: flImlec 0.9s steps(1) infinite; }
        @keyframes flImlec { 0%,55% { opacity: 1; } 56%,100% { opacity: 0; } }

        /* uçuşan dizeler */
        .fl-ucus { position: absolute; font-family: var(--font-serif); font-style: italic; font-weight: 300;
          color: rgba(241,237,228,0.85); white-space: nowrap; animation: flUc 4.4s ease-in-out both; text-shadow: 0 0 22px rgba(229,64,42,0.3); }
        @keyframes flUc { 0% { opacity: 0; transform: translateY(30px) scale(0.96); } 22% { opacity: 1; transform: none; }
          78% { opacity: 1; } 100% { opacity: 0; transform: translateY(-36px); } }

        /* damga */
        .fl-damga { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(2rem, 7vw, 3.6rem);
          letter-spacing: 0.3em; text-transform: uppercase; color: #E5402A; border: 5px solid #E5402A; border-radius: 12px;
          padding: 0.6em 0.9em 0.6em 1.1em; transform: rotate(-8deg);
          animation: flDamga 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) both 1.2s; opacity: 0; }
        @keyframes flDamga { 0% { opacity: 0; transform: rotate(-8deg) scale(2.6); } 100% { opacity: 0.95; transform: rotate(-8deg) scale(1); } }

        /* leke kartı */
        .fl-leke { width: min(360px, 74vw); background: linear-gradient(180deg, #F5F0E6, #EDE6D8); border-radius: 8px;
          padding: 1.6rem; box-shadow: 0 40px 90px rgba(0,0,0,0.6); animation: flLeke 1s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes flLeke { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: none; } }
        .fl-leke svg { width: 100%; height: auto; }
        .fl-leke g { animation: flLekeBuyu 2.6s ease both 0.4s; transform-origin: center; }
        @keyframes flLekeBuyu { from { transform: scale(0.65); opacity: 0.4; } to { transform: scale(1); opacity: 1; } }

        /* buruşan kâğıt */
        .fl-burus { animation: flBurus 1.15s cubic-bezier(0.5,0,0.7,0.4) both 0.9s !important; }
        @keyframes flBurus {
          0% { transform: rotate(-0.6deg) scale(1); opacity: 1; }
          40% { transform: rotate(6deg) scale(0.55, 0.48); }
          70% { transform: rotate(-14deg) scale(0.24, 0.2) translateY(60px); }
          100% { transform: rotate(-30deg) scale(0.05) translateY(140px); opacity: 0; }
        }

        /* kapak */
        .fl-kapak { width: clamp(210px, 46vmin, 330px); border-radius: 4px;
          box-shadow: 0 50px 110px rgba(0,0,0,0.8), 0 0 0 1px rgba(241,237,228,0.07);
          animation: flKapak 1.6s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes flKapak { from { opacity: 0; transform: translateY(46px) scale(0.94); } to { opacity: 1; transform: none; } }
        .fl-cikti { font-family: var(--font-grotesk); font-size: 0.82rem; letter-spacing: 0.32em; text-transform: uppercase;
          color: #E5402A; margin-top: 1.6rem; animation: flBelir 0.8s ease both 0.9s; }

        /* final */
        .fl-url { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(1.5rem, 5.4vw, 2.8rem);
          letter-spacing: -0.02em; animation: flBelir 1s ease both 0.5s; }
        .fl-final-alt { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1rem, 2.6vw, 1.3rem); color: #c9c2b6; margin-top: 0.8rem; animation: flBelir 1s ease both 1s; }

        .fl-btn { display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer;
          font-family: var(--font-grotesk); font-size: 0.82rem; font-weight: 500; letter-spacing: 0.1em;
          padding: 1rem 2rem; border-radius: 100px; border: 1px solid transparent; background: #E5402A; color: #0b0a09;
          transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .fl-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(229,64,42,0.35); }
        .fl-hint { font-family: var(--font-grotesk); font-size: 0.64rem; letter-spacing: 0.22em; text-transform: uppercase; color: #6f6a61; }
        @media (prefers-reduced-motion: reduce) { .fl-root * { animation-duration: 0.01ms !important; } }
      `}</style>

      <canvas ref={dustRef} className="fl-dust" aria-hidden="true" />
      <canvas ref={burstRef} className="fl-burst" aria-hidden="true" />

      <div className="fl-top" data-gizli={sahne >= 0 && sahne < 9 ? "1" : "0"}>
        <span className="fl-title">{L.title}</span>
        <Link href="/" className="fl-back">{L.back}</Link>
      </div>

      {/* Başlangıç / bitiş ekranı */}
      {(sahne === -1 || sahne === 9) && (
        <div className="fl-sahne" style={{ gap: "1.4rem" }}>
          {sahne === 9 ? (
            <>
              <span className="fl-url">berkaydogan.co</span>
              <span className="fl-final-alt">4 deneyim seni bekliyor.</span>
              <button className="fl-btn" style={{ marginTop: "1.6rem" }} onClick={basla}>{L.replay}</button>
            </>
          ) : (
            <>
              <p className="fl-serif">Işıklar sönmek üzere.</p>
              <button className="fl-btn" onClick={basla}>▶ {L.start}</button>
              <span className="fl-hint">{L.hint}</span>
            </>
          )}
        </div>
      )}

      {/* 0 — karanlık */}
      {sahne === 0 && (
        <div className="fl-sahne"><p className="fl-serif fl-belir fl-son-git" style={{ "--gec": "1.9s" } as React.CSSProperties}>Işıklar söner.</p></div>
      )}

      {/* 1 — mühür kendini çizer */}
      {sahne === 1 && (
        <div className="fl-sahne">
          <svg className="fl-muhur" width="150" height="150" viewBox="0 0 64 64" fill="none">
            <circle className="cember" cx="32" cy="32" r="28" stroke="#F1EDE4" strokeWidth="2.5" opacity="0.9" />
            <path d="M21 22 V42 M21 22 H26.5 Q31 22 31 27 Q31 31.4 26.5 32 H21 M26.5 32 Q32 32.6 32 37 Q32 42 26.5 42 H21" stroke="#F1EDE4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 22 V42 M38 22 H41 Q48 22 48 32 Q48 42 41 42 H38" stroke="#F1EDE4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle className="koz" cx="32" cy="4" r="3.4" fill="#E5402A" />
          </svg>
        </div>
      )}

      {/* 2 — daktilo yazar */}
      {sahne === 2 && (
        <div className="fl-sahne">
          <div className="fl-kagit">
            <span className="yz">{yazi}<span className="fl-imlec" /></span>
          </div>
        </div>
      )}

      {/* 3 — dizeler uçuşur */}
      {sahne === 3 && (
        <div className="fl-sahne">
          {UCUSAN.map((v, i) => (
            <span key={i} className="fl-ucus" style={{
              left: `${[12, 55, 22, 60, 34][i]}%`, top: `${[22, 32, 52, 64, 78][i]}%`,
              fontSize: `clamp(${[1.1, 0.95, 1.3, 0.9, 1.05][i]}rem, ${[3, 2.4, 3.6, 2.2, 2.8][i]}vw, ${[1.8, 1.5, 2.2, 1.4, 1.7][i]}rem)`,
              animationDelay: `${i * 0.35}s`,
            }}>{v}</span>
          ))}
        </div>
      )}

      {/* 4 — mahkeme + damga */}
      {sahne === 4 && (
        <div className="fl-sahne" style={{ gap: "2rem" }}>
          <p className="fl-serif fl-belir">Sanık koltuğuna oturur musun?</p>
          <span className="fl-damga">Hüküm</span>
        </div>
      )}

      {/* 5 — leke */}
      {sahne === 5 && (
        <div className="fl-sahne" style={{ gap: "1.6rem" }}>
          <div className="fl-leke">
            <svg viewBox="-60 0 120 100">
              <g fill="#14110d">
                <path d="M0,20 C-14,8 -30,14 -36,30 C-42,46 -30,52 -34,66 C-38,80 -24,88 -14,82 C-4,76 -10,64 0,60 Z M-8,26 C-16,20 -22,26 -20,32 C-18,38 -8,36 -8,26 Z" />
                <path d="M0,20 C-14,8 -30,14 -36,30 C-42,46 -30,52 -34,66 C-38,80 -24,88 -14,82 C-4,76 -10,64 0,60 Z M-8,26 C-16,20 -22,26 -20,32 C-18,38 -8,36 -8,26 Z" transform="scale(-1,1)" />
              </g>
            </svg>
          </div>
          <p className="fl-serif fl-belir" style={{ fontSize: "clamp(1.2rem, 3.4vw, 1.8rem)", animationDelay: "0.7s" }}>Bu lekede ne görüyorsun?</p>
        </div>
      )}

      {/* 6 — kâğıt buruşur */}
      {sahne === 6 && (
        <div className="fl-sahne">
          <div className="fl-kagit fl-burus">
            <span className="yz" style={{ fontStyle: "italic", opacity: 0.7 }}>içinde ne varsa…</span>
          </div>
        </div>
      )}

      {/* 7 — kapak */}
      {sahne === 7 && (
        <div className="fl-sahne">
          <img className="fl-kapak" src="/tasfiye-on-kapak.jpg" alt="Tasfiye — kapak" />
          <span className="fl-cikti">Çıktı · Tasfiye</span>
        </div>
      )}

      {/* 8 — kapanış cümlesi */}
      {sahne === 8 && (
        <div className="fl-sahne"><p className="fl-serif fl-belir">Yıkmak değil; temizlemek.</p></div>
      )}
    </div>
  );
}
