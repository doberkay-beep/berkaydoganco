"use client";

import { useEffect } from "react";
import { TASFIYE_URL, type Lang } from "@/lib/site";

/* Tam ekran açılış perdesi — Tasfiye reveal.
   Görünürlük CSS ile yönetilir: layout'taki satır-içi script, oturumda
   ilk kez açılışta <html data-perde="1"> ekler; bu bileşen daima DOM'da
   durur ama yalnız data-perde="1" iken görünür. "Gir" / kaydırma / Esc
   perdeyi kapatır ve oturumda bir daha açılmaz. JS kapalıysa hiç görünmez. */

const COPY: Record<Lang, { eyebrow: string; tag: string; out: string; buy: string; enter: string; hint: string }> = {
  tr: { eyebrow: "Perde açıldı · Yeni kitap", tag: "Yıkmak değil; temizlemek.", out: "Çıktı · 25 Ağustos 2026", buy: "Trendyol'da satın al", enter: "Siteye gir", hint: "Kaydır ya da tıkla" },
  en: { eyebrow: "The curtain is up · New book", tag: "Not to destroy — to purge.", out: "Out now · 25 August 2026", buy: "Buy on Trendyol", enter: "Enter the site", hint: "Scroll or click" },
  fr: { eyebrow: "Le rideau est levé · Nouveau livre", tag: "Non pour détruire — pour purifier.", out: "Paru · 25 août 2026", buy: "Acheter sur Trendyol", enter: "Entrer", hint: "Faites défiler ou cliquez" },
};

export function TasfiyeReveal({ lang }: { lang: Lang }) {
  const L = COPY[lang];

  useEffect(() => {
    const isOpen = () => document.documentElement.getAttribute("data-perde") === "1";
    const dismiss = () => {
      if (!isOpen()) return;
      try { sessionStorage.setItem("bd-perde-seen", "1"); } catch { /* yoksay */ }
      document.documentElement.setAttribute("data-perde", "0");
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") dismiss(); };
    const onWheel = () => dismiss();
    const onTouch = () => dismiss();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const close = () => {
    try { sessionStorage.setItem("bd-perde-seen", "1"); } catch { /* yoksay */ }
    document.documentElement.setAttribute("data-perde", "0");
  };


  return (
    <div className="perde-root" role="dialog" aria-modal="true" aria-label="Tasfiye — 25.08.2026" onClick={close}>
      <style>{`
        .perde-root { display: flex; align-items: center; justify-content: center;
          background: radial-gradient(120% 80% at 50% -10%, #211a15 0%, #0a0806 46%, #050403 100%);
          color: #F1EDE4; overflow: hidden; }
        .perde-root::after { content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(120% 90% at 50% 42%, transparent 55%, rgba(0,0,0,0.66) 100%); }
        .perde-spot { position: absolute; top: -18%; left: 50%; width: 78vmin; height: 78vmin; transform: translateX(-50%);
          background: radial-gradient(closest-side, rgba(229,64,42,0.16), rgba(229,64,42,0.05) 55%, transparent 72%);
          filter: blur(6px); pointer-events: none; }
        .perde-inner { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 2rem 1.25rem; max-width: 620px; }
        .perde-eyebrow { font-family: var(--font-grotesk); font-size: 0.66rem; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase; color: #E5402A; }
        .perde-cover { width: clamp(190px, 40vmin, 300px); border-radius: 4px; margin: 1.6rem 0 1.75rem;
          box-shadow: 0 40px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(241,237,228,0.06);
          animation: perdeRise 1.2s cubic-bezier(0.22,1,0.36,1) both, perdeFloat 7s ease-in-out 1.2s infinite; }
        .perde-title { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(2.6rem, 9vw, 4.4rem);
          letter-spacing: -0.04em; line-height: 0.95; }
        .perde-tag { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.05rem, 2.6vw, 1.5rem); color: #c9c2b6; margin-top: 0.6rem; }
        .perde-out { font-family: var(--font-grotesk); font-size: 0.78rem; letter-spacing: 0.28em;
          text-transform: uppercase; color: #E5402A; margin: 1.7rem 0 0.4rem;
          animation: perdeRise 1s cubic-bezier(0.22,1,0.36,1) both; }
        .perde-ctas { display: flex; gap: 0.75rem; margin-top: 1.6rem; flex-wrap: wrap; justify-content: center; }
        .perde-buy { display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer;
          font-family: var(--font-grotesk); font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
          padding: 0.85rem 1.7rem; border-radius: 100px; background: #E5402A; color: #0b0a09;
          transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .perde-buy:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(229,64,42,0.35); }
        .perde-enter { display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer;
          font-family: var(--font-grotesk); font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
          padding: 0.85rem 1.7rem; border-radius: 100px; border: 1px solid rgba(241,237,228,0.28);
          background: transparent; color: #F1EDE4; transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease; }
        .perde-enter:hover { border-color: #F1EDE4; transform: translateY(-2px); background: rgba(241,237,228,0.05); }
        .perde-enter .chev { animation: perdeBob 1.8s ease-in-out infinite; }
        .perde-hint { margin-top: 1rem; font-size: 0.62rem; letter-spacing: 0.24em; text-transform: uppercase; color: #6f6a61; }
        @keyframes perdeRise { from { opacity: 0; transform: translateY(28px) scale(0.96); } to { opacity: 1; transform: none; } }
        @keyframes perdeFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes perdeBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        @media (prefers-reduced-motion: reduce) {
          .perde-cover { animation: none; }
          .perde-enter .chev { animation: none; }
        }
      `}</style>
      <div className="perde-spot" aria-hidden="true" />
      <div className="perde-inner" onClick={(e) => e.stopPropagation()}>
        <span className="perde-eyebrow">{L.eyebrow}</span>
        <img className="perde-cover" src="/tasfiye-on-kapak.jpg" alt="Tasfiye — kapak" />
        <h2 className="perde-title">Tasfiye</h2>
        <p className="perde-tag">{L.tag}</p>
        <p className="perde-out">{L.out}</p>
        <div className="perde-ctas">
          <a className="perde-buy" href={TASFIYE_URL} target="_blank" rel="noopener noreferrer">{L.buy} ↗</a>
          <button className="perde-enter" onClick={close}>{L.enter} <span className="chev" aria-hidden="true">↓</span></button>
        </div>
        <span className="perde-hint">{L.hint}</span>
      </div>
    </div>
  );
}
