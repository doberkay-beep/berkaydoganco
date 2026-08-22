"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { VERSES } from "@/lib/site";

/* Köz Evreni — tam ekran interaktif şiir evreni.
   Dizeler köz gibi süzülür; imleç yaklaşınca tutuşur; tıklayınca ortada açılır;
   ortak kelimeli dizeler ışıktan çizgilerle takımyıldız kurar. Saf canvas 2D. */

const LABELS = {
  tr: { title: "Köz Evreni", hint: "Bir köze dokun — dize açılsın", back: "← berkaydogan.co", close: "kapat" },
  en: { title: "Ember Universe", hint: "Touch an ember — let a verse open", back: "← berkaydogan.co", close: "close" },
  fr: { title: "Univers de Braise", hint: "Touche une braise — qu'un vers s'ouvre", back: "← berkaydogan.co", close: "fermer" },
};

const STOP = new Set(["bir", "bu", "şu", "çok", "daha", "için", "gibi", "ile", "ama", "her", "artık", "sadece", "yeni", "olan", "değil", "kadar", "ben", "sen", "biz"]);

function words(v: string): string[] {
  return v.toLocaleLowerCase("tr")
    .replace(/[.,;:!?"'“”‘’()]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !STOP.has(w));
}

// Ortak anlamlı kelimeye sahip dize çiftleri
function buildLinks(): [number, number][] {
  const sets = VERSES.map((v) => new Set(words(v)));
  const pairs: [number, number][] = [];
  for (let i = 0; i < VERSES.length; i++) {
    for (let j = i + 1; j < VERSES.length; j++) {
      for (const w of sets[i]) { if (sets[j].has(w)) { pairs.push([i, j]); break; } }
    }
  }
  return pairs;
}

type P = { x: number; y: number; vx: number; vy: number; hx: number; hy: number; r: number; ph: number; glow: number };

export default function KozEvreni() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lang, setLang] = useState<"tr" | "en" | "fr">("tr");
  const [bloom, setBloom] = useState<number | null>(null);
  const bloomRef = useRef<number | null>(null);
  bloomRef.current = bloom;

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = buildLinks();
    let W = 0, H = 0, dpr = 1;
    const mouse = { x: -9999, y: -9999, on: false };
    let raf = 0;

    // Köz-dizeler + atmosferik küçük korlar
    const verses: P[] = [];
    const dust: P[] = [];

    const seed = () => {
      verses.length = 0; dust.length = 0;
      for (let i = 0; i < VERSES.length; i++) {
        const x = Math.random() * W, y = Math.random() * H;
        verses.push({ x, y, vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, hx: x, hy: y, r: 3.2 + Math.random() * 1.6, ph: Math.random() * Math.PI * 2, glow: 0 });
      }
      const N = Math.min(70, Math.floor((W * H) / 24000));
      for (let i = 0; i < N; i++) {
        const x = Math.random() * W, y = Math.random() * H;
        dust.push({ x, y, vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.08, hx: x, hy: y, r: 0.6 + Math.random() * 1.3, ph: Math.random() * Math.PI * 2, glow: 0 });
      }
    };

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (verses.length === 0) seed();
    };

    const wrap = (p: P) => {
      if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
    };

    // İmleçin altındaki köz-dizeyi bul
    const pick = (mx: number, my: number): number => {
      let best = -1, bd = 26 * 26;
      for (let i = 0; i < verses.length; i++) {
        const d = (verses[i].x - mx) ** 2 + (verses[i].y - my) ** 2;
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    };

    let hover = -1;

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      // hafif vinyet zemini
      const bg = ctx.createRadialGradient(W / 2, H * 0.42, 60, W / 2, H * 0.42, Math.max(W, H) * 0.75);
      bg.addColorStop(0, "rgba(28,20,15,0.55)");
      bg.addColorStop(1, "rgba(6,5,4,0.9)");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      const t = performance.now() / 1000;

      // Takımyıldız bağları
      ctx.lineWidth = 1;
      for (const [a, b] of links) {
        const pa = verses[a], pb = verses[b];
        const dx = pa.x - pb.x, dy = pa.y - pb.y;
        const d = Math.hypot(dx, dy);
        const maxD = 320;
        if (d < maxD) {
          const o = (1 - d / maxD) * 0.22 * (1 + 0.5 * (pa.glow + pb.glow));
          ctx.strokeStyle = `rgba(229,64,42,${Math.min(0.5, o)})`;
          ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
        }
      }

      // Toz korları
      for (const p of dust) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; wrap(p); }
        const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 1.4 + p.ph));
        ctx.beginPath();
        ctx.fillStyle = `rgba(229,110,60,${0.18 * tw})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }

      // Köz-dizeler
      const bloomed = bloomRef.current;
      for (let i = 0; i < verses.length; i++) {
        const p = verses[i];
        // imleç ısısı: yakınında tutuş + hafif itme
        let heat = 0;
        if (mouse.on) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
          if (d < 150) {
            heat = 1 - d / 150;
            if (!reduce && d > 0.1) { p.vx += (dx / d) * heat * 0.06; p.vy += (dy / d) * heat * 0.06; }
          }
        }
        p.glow += (heat - p.glow) * 0.08;
        if (i === hover || i === bloomed) p.glow = Math.max(p.glow, 0.9);

        if (!reduce) {
          // eve yumuşak yay + sönümleme
          p.vx += (p.hx - p.x) * 0.0006; p.vy += (p.hy - p.y) * 0.0006;
          p.vx *= 0.96; p.vy *= 0.96;
          p.x += p.vx; p.y += p.vy;
          p.hx += (Math.random() - 0.5) * 0.05; p.hy += (Math.random() - 0.5) * 0.05;
          wrap(p);
        }

        const pulse = 0.7 + 0.3 * Math.sin(t * 1.1 + p.ph);
        const R = p.r * (1 + p.glow * 1.4);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R * 6);
        g.addColorStop(0, `rgba(255,${170 - p.glow * 40},${120 - p.glow * 60},${0.9 * pulse})`);
        g.addColorStop(0.35, `rgba(229,64,42,${0.5 * pulse * (0.6 + p.glow)})`);
        g.addColorStop(1, "rgba(229,64,42,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, R * 6, 0, Math.PI * 2); ctx.fill();
        // çekirdek
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,240,225,${0.85})`;
        ctx.arc(p.x, p.y, Math.max(1.1, R * 0.5), 0, Math.PI * 2); ctx.fill();
      }

      // Hover etiketi (bloom yokken)
      if (bloomed == null && hover >= 0) {
        const p = verses[hover];
        const label = VERSES[hover];
        ctx.font = "italic 300 17px Georgia, serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        const w = Math.min(ctx.measureText(label).width + 28, W - 40);
        const lx = Math.max(w / 2 + 12, Math.min(W - w / 2 - 12, p.x));
        const ly = p.y - 26 < 30 ? p.y + 30 : p.y - 26;
        ctx.fillStyle = "rgba(10,8,7,0.72)";
        ctx.beginPath();
        const rx = lx - w / 2, ry = ly - 17, rw = w, rh = 34, rr = 17;
        ctx.moveTo(rx + rr, ry); ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, rr); ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, rr); ctx.arcTo(rx, ry + rh, rx, ry, rr); ctx.arcTo(rx, ry, rx + rw, ry, rr); ctx.fill();
        ctx.fillStyle = "rgba(241,237,228,0.96)";
        ctx.fillText(label, lx, ly);
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; mouse.on = true;
      hover = bloomRef.current == null ? pick(mouse.x, mouse.y) : -1;
      canvas.style.cursor = hover >= 0 ? "pointer" : "default";
    };
    const onLeave = () => { mouse.on = false; mouse.x = -9999; mouse.y = -9999; hover = -1; };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      if (bloomRef.current != null) { setBloom(null); return; }
      const idx = pick(mx, my);
      if (idx >= 0) setBloom(idx);
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const L = LABELS[lang];

  return (
    <div className="koz-root">
      <style>{`
        .koz-root { position: fixed; inset: 0; background: #060504; overflow: hidden; touch-action: none; }
        .koz-root canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .koz-top { position: absolute; top: 0; left: 0; right: 0; z-index: 3; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); pointer-events: none; }
        .koz-top a, .koz-top span { pointer-events: auto; }
        .koz-title { font-family: var(--font-grotesk, sans-serif); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; color: #F1EDE4; }
        .koz-back { font-family: var(--font-grotesk, sans-serif); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #9a948a; border-bottom: 1px solid #E5402A; padding-bottom: 2px; }
        .koz-hint { position: absolute; left: 0; right: 0; bottom: clamp(1.5rem, 5vh, 3rem); z-index: 3; text-align: center;
          font-family: var(--font-grotesk, sans-serif); font-size: 0.7rem; letter-spacing: 0.24em; text-transform: uppercase; color: #6f6a61; pointer-events: none;
          animation: kozHint 3.5s ease-in-out infinite; }
        @keyframes kozHint { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }
        .koz-bloom { position: absolute; inset: 0; z-index: 4; display: flex; align-items: center; justify-content: center; padding: 2rem;
          background: radial-gradient(120% 90% at 50% 45%, rgba(229,64,42,0.10), rgba(6,5,4,0.78) 60%); cursor: pointer;
          animation: kozFade 0.6s ease both; }
        @keyframes kozFade { from { opacity: 0; } to { opacity: 1; } }
        .koz-verse { font-family: var(--font-serif, Georgia, serif); font-style: italic; font-weight: 300; color: #F5EFE6;
          font-size: clamp(1.8rem, 6vw, 4rem); line-height: 1.3; text-align: center; max-width: 20ch;
          text-shadow: 0 0 40px rgba(229,64,42,0.35); animation: kozRise 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes kozRise { from { opacity: 0; transform: translateY(22px) scale(0.97); } to { opacity: 1; transform: none; } }
        .koz-sign { display: block; margin-top: 1.6rem; font-family: var(--font-grotesk, sans-serif); font-style: normal; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: #E5402A; }
        @media (prefers-reduced-motion: reduce) { .koz-hint { animation: none; } }
      `}</style>

      <canvas ref={canvasRef} aria-label={L.title} />

      <div className="koz-top">
        <span className="koz-title">{L.title}</span>
        <Link href="/" className="koz-back">{L.back}</Link>
      </div>

      {bloom == null && <div className="koz-hint">{L.hint}</div>}

      {bloom != null && (
        <div className="koz-bloom" role="dialog" aria-modal="true" onClick={() => setBloom(null)}>
          <p className="koz-verse">
            {VERSES[bloom]}
            <span className="koz-sign">— Berkay Doğan · {L.close} ✕</span>
          </p>
        </div>
      )}
    </div>
  );
}
