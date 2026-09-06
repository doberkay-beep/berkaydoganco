"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Film v2 — sitenin kendini oynatan ~40 saniyelik sinematik tanıtımı.
   v2 rejisi: sinemaskop çubukları, sahne başına kamera hareketi (zoom/pan),
   volumetrik spot konisi, dokulu daktilo kâğıdı + vuruş sarsıntısı, HÜKÜM
   anında ekran sarsıntısı + kızıl flaş, buruşmada kenar koru, sahneler arası
   karanlık nefes. Sesler WebAudio ile üretilir; Berkay ekran kaydı alıp
   reel/short olarak paylaşır. Dikey ve yatay kayda uygun merkez kompozisyon. */

type Lang = "tr" | "en" | "fr";

const COPY: Record<Lang, { title: string; back: string; start: string; replay: string; hint: string }> = {
  tr: { title: "Film", back: "← berkaydogan.co", start: "Filmi başlat", replay: "Tekrar oynat", hint: "Ekran kaydını aç, sonra başlat — 40 saniye" },
  en: { title: "The Film", back: "← berkaydogan.co", start: "Start the film", replay: "Play again", hint: "Start your screen recording, then press play — 40 seconds" },
  fr: { title: "Le Film", back: "← berkaydogan.co", start: "Lancer le film", replay: "Rejouer", hint: "Lance l'enregistrement d'écran, puis appuie — 40 secondes" },
};

const DAKTILO_METIN = "Yazmak, varoluşun en sessiz itirafıdır.";
const UCUSAN = ["Yıkılamadım, yıktım.", "geleceğime âşığım", "Ben artık sadece kendimim.", "bir köz", "ve ben yeniden doğdum"];

/* sahne süreleri (ms) — toplam ~40 sn */
const SURELER = [3000, 3800, 5600, 4400, 5000, 4000, 4400, 4800, 3000];

/* sahne → kamera dili */
const KAMERA: Record<number, string> = {
  0: "", 1: "kam-in", 2: "kam-in-yavas", 3: "kam-pan", 4: "kam-out",
  5: "kam-in", 6: "kam-in", 7: "kam-in-yavas", 8: "kam-out",
};

export default function Film() {
  const [lang, setLang] = useState<Lang>("tr");
  const [sahne, setSahne] = useState(-1); // -1 = başlangıç, 0..8 sahneler, 9 = bitti
  const [yazi, setYazi] = useState("");
  const [jolt, setJolt] = useState(0); // daktilo vuruş sarsıntısı
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

  /* --- toz zerreleri: iki katman (ön hızlı, arka yavaş) → paralaks --- */
  useEffect(() => {
    const canvas = dustRef.current; if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cx2 = canvas.getContext("2d"); if (!cx2) return;
    let W = 0, H = 0, raf = 0;
    type P = { x: number; y: number; vy: number; r: number; ph: number; on: boolean };
    const ps: P[] = [];
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      cx2.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!ps.length) for (let i = 0; i < 56; i++) {
        const on = i % 3 === 0; // ön katman
        ps.push({ x: Math.random() * W, y: Math.random() * H, vy: -(on ? 0.28 : 0.08) * (0.7 + Math.random()), r: (on ? 1.2 : 0.5) + Math.random() * (on ? 1.8 : 1.1), ph: Math.random() * Math.PI * 2, on });
      }
    };
    const step = () => {
      cx2.clearRect(0, 0, W, H);
      const t = performance.now() / 1000;
      for (const p of ps) {
        p.y += p.vy; p.x += Math.sin(t + p.ph) * (p.on ? 0.16 : 0.06);
        if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
        const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 1.4 + p.ph));
        cx2.beginPath(); cx2.fillStyle = `rgba(229, 105, 60, ${(p.on ? 0.26 : 0.13) * tw})`;
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
    for (let i = 0; i < 110; i++) {
      const a = Math.random() * Math.PI * 2, s = 0.8 + Math.random() * 4.2;
      ps.push({ x: W / 2 + (Math.random() - 0.5) * 160, y: H / 2 + (Math.random() - 0.5) * 120, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2.1, life: 0, max: 900 + Math.random() * 900, r: 1 + Math.random() * 2.8 });
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
        cx2.fillStyle = `rgba(229, ${Math.floor(90 + 80 * k)}, 50, ${(0.6 * k).toFixed(3)})`;
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
    // sahne 2: daktilo yazımı
    const s2 = SURELER[0] + SURELER[1];
    DAKTILO_METIN.split("").forEach((ch, i) => {
      timers.current.push(window.setTimeout(() => {
        setYazi(DAKTILO_METIN.slice(0, i + 1));
        if (ch !== " ") { klik(); setJolt((j) => j + 1); }
      }, s2 + 500 + i * 100));
    });
    timers.current.push(window.setTimeout(zil, s2 + 500 + DAKTILO_METIN.length * 100 + 250));
    // sahne 4: damga vuruşu (CSS sarsıntı + flaş aynı gecikmeyle senkron)
    timers.current.push(window.setTimeout(vurus, SURELER.slice(0, 4).reduce((a, b) => a + b, 0) + 1500));
    // sahne 6: buruşma + patlama
    const s6 = SURELER.slice(0, 6).reduce((a, b) => a + b, 0);
    timers.current.push(window.setTimeout(hisirti, s6 + 900));
    timers.current.push(window.setTimeout(patla, s6 + 1250));
    // sahne 7: kapak — final akoru
    timers.current.push(window.setTimeout(son, SURELER.slice(0, 7).reduce((a, b) => a + b, 0) + 400));
  };

  const L = COPY[lang];
  const oynuyor = sahne >= 0 && sahne < 9;
  /* mürekkep tutarsızlığı — harf başına belirlenimci opaklık/ağırlık */
  const murekkep = (i: number) => 0.78 + (((i * 2654435761) >>> 8) % 100) / 430;

  return (
    <div className="fl-root">
      <style>{`
        .fl-root { position: fixed; inset: 0; overflow: hidden; color: #F1EDE4;
          background: radial-gradient(120% 80% at 50% -10%, #221912 0%, #0b0a09 50%, #040302 100%); }
        /* vinyet — v2'de daha koyu, sinema karanlığı */
        .fl-root::after { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background: radial-gradient(115% 90% at 50% 42%, transparent 46%, rgba(0,0,0,0.82) 100%); }
        .fl-dust, .fl-burst { position: absolute; inset: 0; pointer-events: none; }
        .fl-dust { z-index: 1; } .fl-burst { z-index: 6; }

        /* film greni — güçlü, canlı */
        .fl-grain { position: absolute; inset: -60px; pointer-events: none; z-index: 7; opacity: 0.085;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px; animation: flGrain 0.7s steps(4) infinite; }
        @keyframes flGrain { 0%{transform:translate(0,0)} 25%{transform:translate(-18px,12px)} 50%{transform:translate(14px,-16px)} 75%{transform:translate(-10px,-8px)} 100%{transform:translate(0,0)} }

        /* sinemaskop çubukları */
        .fl-bar { position: absolute; left: 0; right: 0; height: 0; background: #000; z-index: 9; transition: height 0.8s cubic-bezier(0.22,1,0.36,1); }
        .fl-bar.ust { top: 0; } .fl-bar.alt { bottom: 0; }
        .fl-bar[data-acik="1"] { height: clamp(34px, 7vh, 76px); }

        /* kamera — sahne başına hareket */
        .fl-kamera { position: absolute; inset: 0; z-index: 4; will-change: transform; }
        .kam-in       { animation: kamIn       var(--sure, 5s) cubic-bezier(0.3,0,0.7,1) both; }
        .kam-in-yavas { animation: kamInYavas  var(--sure, 6s) linear both; }
        .kam-out      { animation: kamOut      var(--sure, 5s) cubic-bezier(0.3,0,0.7,1) both; }
        .kam-pan      { animation: kamPan      var(--sure, 5s) linear both; }
        @keyframes kamIn      { from { transform: scale(1); } to { transform: scale(1.09); } }
        @keyframes kamInYavas { from { transform: scale(1); } to { transform: scale(1.055); } }
        @keyframes kamOut     { from { transform: scale(1.08); } to { transform: scale(1); } }
        @keyframes kamPan     { from { transform: scale(1.06) translateX(1.6%); } to { transform: scale(1.06) translateX(-1.6%); } }
        /* HÜKÜM sarsıntısı — damga anıyla senkron */
        .fl-kamera.sarsil { animation: kamOut var(--sure, 5s) cubic-bezier(0.3,0,0.7,1) both, flSars 0.5s linear 1.2s; }
        @keyframes flSars { 0%,100%{translate:0 0} 12%{translate:-14px 8px} 28%{translate:11px -7px} 44%{translate:-8px -5px} 62%{translate:6px 4px} 80%{translate:-3px 2px} }

        /* kızıl flaş (damga) + kor kenarlar (buruşma) */
        .fl-flash { position: absolute; inset: 0; z-index: 5; pointer-events: none; opacity: 0;
          background: radial-gradient(70% 60% at 50% 50%, rgba(229,64,42,0.5), rgba(229,64,42,0.12) 55%, transparent 75%);
          animation: flFlash 0.7s ease-out 1.22s; }
        @keyframes flFlash { 0%{opacity:0} 12%{opacity:1} 100%{opacity:0} }
        .fl-isi { position: absolute; inset: 0; z-index: 5; pointer-events: none; opacity: 0;
          box-shadow: inset 0 0 24vmin 4vmin rgba(229, 84, 32, 0.36); animation: flIsi 2.8s ease 1.1s both; }
        @keyframes flIsi { 0%{opacity:0} 35%{opacity:1} 100%{opacity:0.25} }

        /* volumetrik spot konisi */
        .fl-spot { position: absolute; top: -6%; left: 50%; width: min(72vmin, 560px); height: 82vh;
          transform: translateX(-50%); pointer-events: none; z-index: 2; filter: blur(16px);
          background: linear-gradient(180deg, rgba(241,237,228,0.30), rgba(241,237,228,0.10) 46%, transparent 78%);
          clip-path: polygon(42% 0, 58% 0, 96% 100%, 4% 100%); transform-origin: top center;
          animation: flSpotAc 1s ease both, flTitre 3.4s ease-in-out 1s infinite; }
        .fl-spot.kisik { opacity: 0.55; }
        @keyframes flSpotAc { from { opacity: 0; transform: translateX(-50%) scaleY(0.2); } to { opacity: 1; transform: translateX(-50%) scaleY(1); } }
        @keyframes flTitre { 0%,100% { opacity: 1; } 48% { opacity: 0.86; } 55% { opacity: 0.95; } 70% { opacity: 0.88; } }

        /* sahneler arası karanlık nefes */
        .fl-nefes { position: absolute; inset: 0; z-index: 8; pointer-events: none; background: #000;
          animation: flNefes 0.55s ease-out both; }
        @keyframes flNefes { from { opacity: 1; } to { opacity: 0; } }

        .fl-top { position: absolute; top: 0; left: 0; right: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); transition: opacity 0.5s ease; }
        .fl-top[data-gizli="1"] { opacity: 0; pointer-events: none; }
        .fl-title { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; }
        .fl-back { font-family: var(--font-grotesk); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #9a948a; border-bottom: 1px solid #E5402A; padding-bottom: 2px; }

        .fl-sahne { position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center; padding: 2rem clamp(1.25rem, 6vw, 3rem); }
        .fl-serif { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(2rem, 7vw, 4.2rem); line-height: 1.3; max-width: 22ch; }
        .fl-belir { animation: flBelir 1.1s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes flBelir { from { opacity: 0; transform: translateY(24px); filter: blur(10px); } to { opacity: 1; transform: none; filter: blur(0); } }
        .fl-son-git { animation: flGit 0.7s ease both; animation-delay: var(--gec, 2s); }
        @keyframes flGit { to { opacity: 0; filter: blur(8px); } }
        /* kelime kelime közden tutuşma */
        .fl-tutus { display: inline-block; opacity: 0; transform: translateY(0.3em); filter: blur(8px); color: #E5402A;
          animation: flTutus 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        @keyframes flTutus { 55% { color: #E5402A; } 100% { opacity: 1; transform: none; filter: blur(0); color: #F1EDE4; } }

        /* açılışta yanan tek köz */
        .fl-tekkoz { width: 10px; height: 10px; border-radius: 50%; background: #E5402A; margin-top: 2.2rem;
          box-shadow: 0 0 18px 4px rgba(229,64,42,0.65), 0 0 60px 16px rgba(229,64,42,0.25);
          animation: flKor 1.8s ease-in-out infinite; }
        @keyframes flKor { 0%,100% { transform: scale(1); opacity: 0.95; } 50% { transform: scale(1.35); opacity: 0.7; } }

        /* mühür çizimi */
        .fl-muhur { filter: drop-shadow(0 0 26px rgba(241,237,228,0.18)); }
        .fl-muhur circle.cember { stroke-dasharray: 176; stroke-dashoffset: 176; animation: flCiz 1.6s ease forwards 0.2s; }
        .fl-muhur path { stroke-dasharray: 120; stroke-dashoffset: 120; animation: flCiz 1.2s ease forwards 1s; }
        .fl-muhur circle.koz { opacity: 0; animation: flKoz 0.5s ease forwards 2.2s; }
        @keyframes flCiz { to { stroke-dashoffset: 0; } }
        @keyframes flKoz { to { opacity: 1; } }

        /* daktilo kâğıdı — dokulu, merdane gölgeli */
        .fl-kagit { position: relative; width: min(560px, 88vw); min-height: 170px;
          background:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)' opacity='0.05'/%3E%3C/svg%3E"),
            linear-gradient(180deg, #F5F0E6, #EDE6D8);
          border-radius: 4px; padding: 2rem 2rem 1.6rem; box-shadow: 0 34px 80px rgba(0,0,0,0.7);
          text-align: left; animation: flBelir 0.8s ease both; transition: translate 70ms ease; }
        .fl-kagit::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 26px; border-radius: 4px 4px 0 0;
          background: linear-gradient(180deg, rgba(20,16,12,0.18), transparent); } /* merdane gölgesi */
        .fl-kagit[data-j="1"] { translate: 0 -1.6px; }
        .fl-kagit .yz { font-family: "Courier New", Courier, monospace; font-size: clamp(16px, 2.8vw, 21px); line-height: 1.85; color: #24201a; }
        .fl-imlec { display: inline-block; width: 10px; height: 1.1em; background: #24201a; vertical-align: text-bottom; margin-left: 1px;
          animation: flImlec 0.9s steps(1) infinite; }
        @keyframes flImlec { 0%,55% { opacity: 1; } 56%,100% { opacity: 0; } }

        /* uçuşan dizeler — v2: daha büyük, közlü gölge */
        .fl-ucus { position: absolute; font-family: var(--font-serif); font-style: italic; font-weight: 300;
          color: rgba(241,237,228,0.92); white-space: nowrap; animation: flUc 4.6s ease-in-out both;
          text-shadow: 0 0 30px rgba(229,64,42,0.45), 0 0 8px rgba(229,64,42,0.25); }
        @keyframes flUc { 0% { opacity: 0; transform: translateY(38px) scale(0.94); } 20% { opacity: 1; transform: none; }
          78% { opacity: 1; } 100% { opacity: 0; transform: translateY(-44px); } }

        /* damga */
        .fl-damga { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(2.6rem, 9vw, 4.6rem);
          letter-spacing: 0.3em; text-transform: uppercase; color: #E5402A; border: 6px solid #E5402A; border-radius: 14px;
          padding: 0.5em 0.8em 0.5em 1.05em; transform: rotate(-8deg);
          box-shadow: 0 0 40px rgba(229,64,42,0.35), inset 0 0 26px rgba(229,64,42,0.18);
          animation: flDamga 0.42s cubic-bezier(0.34, 1.2, 0.64, 1) both 1.2s; opacity: 0; }
        @keyframes flDamga { 0% { opacity: 0; transform: rotate(-8deg) scale(3); filter: blur(6px); } 100% { opacity: 0.96; transform: rotate(-8deg) scale(1); filter: blur(0); } }

        /* leke kartı */
        .fl-leke { width: min(380px, 76vw); background: linear-gradient(180deg, #F5F0E6, #EDE6D8); border-radius: 8px;
          padding: 1.6rem; box-shadow: 0 40px 90px rgba(0,0,0,0.65); animation: flLeke 1s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes flLeke { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: none; } }
        .fl-leke svg { width: 100%; height: auto; }
        .fl-leke g { animation: flLekeBuyu 2.6s ease both 0.4s; transform-origin: center; }
        @keyframes flLekeBuyu { from { transform: scale(0.65); opacity: 0.4; } to { transform: scale(1); opacity: 1; } }

        /* buruşan kâğıt */
        .fl-burus { animation: flBurus 1.15s cubic-bezier(0.5,0,0.7,0.4) both 0.9s !important; }
        @keyframes flBurus {
          0% { transform: rotate(0deg) scale(1); opacity: 1; }
          40% { transform: rotate(6deg) scale(0.55, 0.48); }
          70% { transform: rotate(-14deg) scale(0.24, 0.2) translateY(60px); }
          100% { transform: rotate(-30deg) scale(0.05) translateY(140px); opacity: 0; }
        }

        /* kapak — spot altında */
        .fl-kapak { width: clamp(230px, 52vmin, 360px); border-radius: 4px;
          box-shadow: 0 60px 130px rgba(0,0,0,0.85), 0 0 90px rgba(229,64,42,0.14), 0 0 0 1px rgba(241,237,228,0.07);
          animation: flKapak 1.8s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes flKapak { from { opacity: 0; transform: translateY(52px) scale(0.92); filter: brightness(0.3); } to { opacity: 1; transform: none; filter: brightness(1); } }
        .fl-cikti { font-family: var(--font-grotesk); font-size: 0.86rem; letter-spacing: 0.32em; text-transform: uppercase;
          color: #E5402A; margin-top: 1.7rem; animation: flBelir 0.8s ease both 1s; }

        /* final */
        .fl-url { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(1.6rem, 5.8vw, 3rem);
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
      <div className="fl-grain" aria-hidden="true" />

      {/* sinemaskop çubukları */}
      <div className="fl-bar ust" data-acik={oynuyor ? "1" : "0"} aria-hidden="true" />
      <div className="fl-bar alt" data-acik={oynuyor ? "1" : "0"} aria-hidden="true" />

      <div className="fl-top" data-gizli={oynuyor ? "1" : "0"}>
        <span className="fl-title">{L.title}</span>
        <Link href="/" className="fl-back">{L.back}</Link>
      </div>

      {/* ışık rejisi: spot konisi (mühür kısık · daktilo tam · kapak tam) */}
      {(sahne === 1 || sahne === 2 || sahne === 7) && <div className={`fl-spot${sahne === 1 ? " kisik" : ""}`} aria-hidden="true" />}
      {/* HÜKÜM flaşı ve buruşma koru */}
      {sahne === 4 && <div className="fl-flash" aria-hidden="true" />}
      {sahne === 6 && <div className="fl-isi" aria-hidden="true" />}
      {/* sahneler arası karanlık nefes */}
      {oynuyor && <div key={`nefes-${sahne}`} className="fl-nefes" aria-hidden="true" />}

      {/* KAMERA — tüm sahneler bu gövdenin içinde hareket eder */}
      <div
        key={`kam-${sahne}`}
        className={`fl-kamera ${KAMERA[sahne] ?? ""}${sahne === 4 ? " sarsil" : ""}`}
        style={{ "--sure": `${(SURELER[sahne] ?? 4000) + 400}ms` } as React.CSSProperties}
      >
        {/* Başlangıç / bitiş ekranı */}
        {(sahne === -1 || sahne === 9) && (
          <div className="fl-sahne" style={{ gap: "1.4rem" }}>
            {sahne === 9 ? (
              <>
                <span className="fl-url">berkaydogan.co</span>
                <span className="fl-final-alt">12 deneyim seni bekliyor.</span>
                <button className="fl-btn" style={{ marginTop: "1.6rem" }} onClick={basla}>{L.replay}</button>
              </>
            ) : (
              <>
                <p className="fl-serif" style={{ fontSize: "clamp(1.6rem, 5.2vw, 3rem)" }}>Işıklar sönmek üzere.</p>
                <button className="fl-btn" onClick={basla}>▶ {L.start}</button>
                <span className="fl-hint">{L.hint}</span>
              </>
            )}
          </div>
        )}

        {/* 0 — karanlıkta tek köz yanar */}
        {sahne === 0 && (
          <div className="fl-sahne">
            <p className="fl-serif fl-belir fl-son-git" style={{ "--gec": "2.1s" } as React.CSSProperties}>Işıklar söner.</p>
            <div className="fl-tekkoz" aria-hidden="true" />
          </div>
        )}

        {/* 1 — mühür kendini çizer (kısık spot altında) */}
        {sahne === 1 && (
          <div className="fl-sahne">
            <svg className="fl-muhur" width="170" height="170" viewBox="0 0 64 64" fill="none">
              <circle className="cember" cx="32" cy="32" r="28" stroke="#F1EDE4" strokeWidth="2.5" opacity="0.9" />
              <path d="M21 22 V42 M21 22 H26.5 Q31 22 31 27 Q31 31.4 26.5 32 H21 M26.5 32 Q32 32.6 32 37 Q32 42 26.5 42 H21" stroke="#F1EDE4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M38 22 V42 M38 22 H41 Q48 22 48 32 Q48 42 41 42 H38" stroke="#F1EDE4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle className="koz" cx="32" cy="4" r="3.4" fill="#E5402A" />
            </svg>
          </div>
        )}

        {/* 2 — daktilo yazar (spot konisi + dokulu kâğıt + vuruş sarsıntısı) */}
        {sahne === 2 && (
          <div className="fl-sahne">
            <div className="fl-kagit" data-j={jolt % 2 === 1 ? "1" : "0"}>
              <span className="yz">
                {yazi.split("").map((ch, i) => (
                  <span key={i} style={{ opacity: murekkep(i) }}>{ch}</span>
                ))}
                <span className="fl-imlec" />
              </span>
            </div>
          </div>
        )}

        {/* 3 — dizeler uçuşur (pan kamera) */}
        {sahne === 3 && (
          <div className="fl-sahne">
            {UCUSAN.map((v, i) => (
              <span key={i} className="fl-ucus" style={{
                left: `${[10, 54, 18, 58, 30][i]}%`, top: `${[20, 32, 52, 64, 78][i]}%`,
                fontSize: `clamp(${[1.4, 1.15, 1.7, 1.1, 1.3][i]}rem, ${[4.2, 3.2, 5, 3, 3.8][i]}vw, ${[2.6, 2, 3.2, 1.9, 2.4][i]}rem)`,
                animationDelay: `${i * 0.35}s`,
              }}>{v}</span>
            ))}
          </div>
        )}

        {/* 4 — mahkeme: soru tutuşarak gelir, HÜKÜM sarsarak düşer */}
        {sahne === 4 && (
          <div className="fl-sahne" style={{ gap: "2.2rem" }}>
            <p className="fl-serif" style={{ fontSize: "clamp(1.7rem, 5.6vw, 3.4rem)" }} aria-label="Sanık koltuğuna oturur musun?">
              {"Sanık koltuğuna oturur musun?".split(" ").map((k, i) => (
                <span key={i} className="fl-tutus" style={{ animationDelay: `${0.1 + i * 0.16}s`, marginRight: "0.28em" }}>{k}</span>
              ))}
            </p>
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

        {/* 6 — kâğıt buruşur, kenarlar kor gibi ısınır */}
        {sahne === 6 && (
          <div className="fl-sahne">
            <div className="fl-kagit fl-burus">
              <span className="yz" style={{ fontStyle: "italic", opacity: 0.7 }}>içinde ne varsa…</span>
            </div>
          </div>
        )}

        {/* 7 — kapak spotla karanlıktan doğar */}
        {sahne === 7 && (
          <div className="fl-sahne">
            <img className="fl-kapak" src="/tasfiye-on-kapak.jpg" alt="Tasfiye — kapak" />
            <span className="fl-cikti">Çıktı · Tasfiye</span>
          </div>
        )}

        {/* 8 — kapanış cümlesi kelime kelime tutuşur */}
        {sahne === 8 && (
          <div className="fl-sahne">
            <p className="fl-serif" aria-label="Yıkmak değil; temizlemek.">
              {"Yıkmak değil; temizlemek.".split(" ").map((k, i) => (
                <span key={i} className="fl-tutus" style={{ animationDelay: `${0.15 + i * 0.3}s`, marginRight: "0.28em" }}>{k}</span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
