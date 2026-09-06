"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Fragman — Tasfiye'nin sinematik scroll yolculuğu.
   Tam ekran sahneler: karanlık → perde → mahkeme → alıntılar → temizlik →
   kapak + satın alma. IntersectionObserver ile sahne sahne canlanır;
   üstte köz rengi ilerleme çizgisi; arkada süzülen kor zerreleri. */

type Lang = "tr" | "en" | "fr";

type Sahne = { kicker?: string; text: string; quote?: boolean; kaynak?: string };

const COPY: Record<Lang, { title: string; back: string; scroll: string; out: string; buy: string; mahkeme: string; sahneler: Sahne[] }> = {
  tr: {
    title: "Fragman",
    back: "← berkaydogan.co",
    scroll: "Kaydır",
    out: "Çıktı · 25 Ağustos 2026",
    buy: "Kitabı al",
    mahkeme: "Sanık koltuğuna otur",
    sahneler: [
      { text: "Işıklar söner." },
      { text: "Perde açılıyor." },
      { kicker: "Sahne", text: "Sahnede bir mahkeme. Sanık koltuğunda, yazarın kendisi." },
      { text: "Bu bir suçlama değil; bir hesap." },
      { quote: true, text: "Bize ezilenlerin değil, ezenlerin tarafına geçme umudu satıldı.", kaynak: "S. 15" },
      { kicker: "Enkaz", text: "Modern dünyanın enkazından, giyotinini kendi taşıyan insana uzanan bir yüzleşme." },
      { quote: true, text: "Kendi karanlığını bilmeyen insan, aydınlık uğruna dünyayı ateşe vermekten çekinmez.", kaynak: "S. 79" },
      { quote: true, text: "Yaşamak, biraz da geride posa bırakmaktır.", kaynak: "S. 89" },
      { kicker: "Temizlik", text: "Tasfiye, yıkmak değil; temizlemektir." },
    ],
  },
  en: {
    title: "The Trailer",
    back: "← berkaydogan.co",
    scroll: "Scroll",
    out: "Out now · 25 August 2026",
    buy: "Get the book",
    mahkeme: "Take the defendant's chair",
    sahneler: [
      { text: "The lights go down." },
      { text: "The curtain rises." },
      { kicker: "The stage", text: "A courtroom on stage. In the dock — the writer himself." },
      { text: "Not an accusation; a reckoning." },
      { quote: true, text: "Bize ezilenlerin değil, ezenlerin tarafına geçme umudu satıldı.", kaynak: "S. 15" },
      { kicker: "The wreckage", text: "From the wreckage of the modern world, a confrontation reaching toward the one who carries their own guillotine." },
      { quote: true, text: "Kendi karanlığını bilmeyen insan, aydınlık uğruna dünyayı ateşe vermekten çekinmez.", kaynak: "S. 79" },
      { quote: true, text: "Yaşamak, biraz da geride posa bırakmaktır.", kaynak: "S. 89" },
      { kicker: "The cleansing", text: "Tasfiye is not to destroy; it is to cleanse." },
    ],
  },
  fr: {
    title: "La Bande-annonce",
    back: "← berkaydogan.co",
    scroll: "Défiler",
    out: "Paru · 25 août 2026",
    buy: "Acheter le livre",
    mahkeme: "Prendre place au banc des accusés",
    sahneler: [
      { text: "Les lumières s'éteignent." },
      { text: "Le rideau se lève." },
      { kicker: "La scène", text: "Un tribunal sur scène. Au banc des accusés — l'écrivain lui-même." },
      { text: "Pas une accusation ; un règlement de comptes." },
      { quote: true, text: "Bize ezilenlerin değil, ezenlerin tarafına geçme umudu satıldı.", kaynak: "S. 15" },
      { kicker: "Les décombres", text: "Depuis les décombres du monde moderne, une confrontation vers celui qui porte sa propre guillotine." },
      { quote: true, text: "Kendi karanlığını bilmeyen insan, aydınlık uğruna dünyayı ateşe vermekten çekinmez.", kaynak: "S. 79" },
      { quote: true, text: "Yaşamak, biraz da geride posa bırakmaktır.", kaynak: "S. 89" },
      { kicker: "La purification", text: "Tasfiye n'est pas détruire ; c'est purifier." },
    ],
  },
};

function SahneBlok({ s, idx }: { s: Sahne; idx: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => setOn(e.isIntersecting)), { threshold: 0.45 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="fr-sahne" data-on={on ? "1" : "0"} data-i={idx}>
      <div className="fr-icerik">
        {s.kicker && <span className="fr-kicker">{s.kicker}</span>}
        {s.quote ? (
          <>
            <blockquote className="fr-quote">&ldquo;{s.text}&rdquo;</blockquote>
            <span className="fr-kaynak">Tasfiye — {s.kaynak}</span>
          </>
        ) : (
          <p className="fr-text">{s.text}</p>
        )}
      </div>
    </section>
  );
}

export default function Fragman() {
  const [lang, setLang] = useState<Lang>("tr");
  const [prog, setProg] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  /* İlerleme çizgisi */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProg(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Süzülen kor zerreleri */
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = 0, H = 0, raf = 0;
    type P = { x: number; y: number; vy: number; vx: number; r: number; ph: number };
    const ps: P[] = [];
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!ps.length) for (let i = 0; i < 46; i++) ps.push({ x: Math.random() * W, y: Math.random() * H, vy: -(0.1 + Math.random() * 0.28), vx: (Math.random() - 0.5) * 0.1, r: 0.7 + Math.random() * 1.6, ph: Math.random() * Math.PI * 2 });
    };
    const step = () => {
      ctx.clearRect(0, 0, W, H);
      const t = performance.now() / 1000;
      for (const p of ps) {
        p.y += p.vy; p.x += p.vx + Math.sin(t + p.ph) * 0.08;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 1.5 + p.ph));
        ctx.beginPath();
        ctx.fillStyle = `rgba(229, 105, 60, ${0.2 * tw})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };
    resize(); step();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const L = COPY[lang];

  return (
    <div className="fr-root">
      <style>{`
        .fr-root { background: radial-gradient(120% 60% at 50% 0%, #1d1510 0%, #0b0a09 45%, #060504 100%); color: #F1EDE4; min-height: 100svh; }
        .fr-prog { position: fixed; top: 0; left: 0; height: 3px; background: #E5402A; z-index: 10; transition: width 0.1s linear; }
        .fr-dust { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
        .fr-top { position: fixed; top: 0; left: 0; right: 0; z-index: 9; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); }
        .fr-title { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; }
        .fr-back { font-family: var(--font-grotesk); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #9a948a; border-bottom: 1px solid #E5402A; padding-bottom: 2px; }

        .fr-giris { min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1.6rem; text-align: center; position: relative; z-index: 2; padding: 2rem 1.25rem; }
        .fr-giris h1 { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(3.4rem, 12vw, 8rem);
          letter-spacing: -0.04em; line-height: 0.92; }
        .fr-giris .alt { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.1rem, 2.6vw, 1.5rem); color: #c9c2b6; }
        .fr-scrollhint { position: absolute; bottom: clamp(1.5rem, 5vh, 3rem); left: 0; right: 0;
          font-family: var(--font-grotesk); font-size: 0.66rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: #6f6a61; animation: frHint 3s ease-in-out infinite; }
        @keyframes frHint { 0%,100% { opacity: 0.4; transform: translateY(0); } 50% { opacity: 0.9; transform: translateY(5px); } }

        .fr-sahne { min-height: 92svh; display: flex; align-items: center; justify-content: center;
          padding: 3rem clamp(1.25rem, 5vw, 2rem); position: relative; z-index: 2; }
        .fr-icerik { max-width: 720px; text-align: center; opacity: 0; transform: translateY(28px);
          filter: blur(8px); transition: opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1), filter 1s ease; }
        .fr-sahne[data-on="1"] .fr-icerik { opacity: 1; transform: none; filter: blur(0); }
        .fr-kicker { display: block; font-family: var(--font-grotesk); font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase; color: #E5402A; margin-bottom: 1.2rem; }
        .fr-text { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.6rem, 4.6vw, 2.8rem); line-height: 1.4; }
        .fr-quote { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.5rem, 4.2vw, 2.5rem); line-height: 1.45; margin: 0; }
        .fr-kaynak { display: block; margin-top: 1.3rem; font-family: var(--font-grotesk); font-size: 0.68rem;
          letter-spacing: 0.24em; text-transform: uppercase; color: #E5402A; }

        .fr-final { min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1.4rem; text-align: center; position: relative; z-index: 2; padding: 4rem 1.25rem; }
        .fr-final img { width: clamp(200px, 42vmin, 320px); border-radius: 4px;
          box-shadow: 0 44px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(241,237,228,0.07); }
        .fr-out { font-family: var(--font-grotesk); font-size: 0.78rem; letter-spacing: 0.28em; text-transform: uppercase; color: #E5402A; }
        .fr-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; margin-top: 0.6rem; }
        .fr-btn { display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer; text-decoration: none;
          font-family: var(--font-grotesk); font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
          padding: 0.95rem 1.8rem; border-radius: 100px; border: 1px solid transparent;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .fr-fill { background: #E5402A; color: #0b0a09; }
        .fr-fill:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(229,64,42,0.35); }
        .fr-ghost { border-color: rgba(241,237,228,0.28); color: #F1EDE4; background: transparent; }
        .fr-ghost:hover { border-color: #F1EDE4; transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          .fr-icerik { transition: none; opacity: 1; transform: none; filter: none; }
          .fr-scrollhint { animation: none; }
        }
      `}</style>

      <div className="fr-prog" style={{ width: `${(prog * 100).toFixed(2)}%` }} aria-hidden="true" />
      <canvas ref={canvasRef} className="fr-dust" aria-hidden="true" />

      <div className="fr-top">
        <span className="fr-title">Tasfiye — {L.title}</span>
        <Link href="/" className="fr-back">{L.back}</Link>
      </div>

      {/* Giriş */}
      <header className="fr-giris">
        <span className="fr-kicker" style={{ marginBottom: 0 }}>Berkay Doğan</span>
        <h1>Tasfiye</h1>
        <p className="alt">Bir Yazarın Hesabı</p>
        <span className="fr-scrollhint">{L.scroll} ↓</span>
      </header>

      {/* Sahneler */}
      {L.sahneler.map((s, i) => <SahneBlok key={i} s={s} idx={i} />)}

      {/* Final */}
      <footer className="fr-final">
        <img src="/tasfiye-on-kapak.jpg" alt="Tasfiye — kapak" />
        <span className="fr-out">{L.out}</span>
        <div className="fr-ctas">
          <a href="/git/trendyol/" rel="noopener" className="fr-btn fr-fill">{L.buy} →</a>
          <Link href="/mahkeme" className="fr-btn fr-ghost">{L.mahkeme}</Link>
        </div>
      </footer>
    </div>
  );
}
