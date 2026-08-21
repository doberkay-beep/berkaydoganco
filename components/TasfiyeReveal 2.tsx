"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/site";

/* Tam ekran açılış perdesi — Tasfiye reveal.
   Görünürlük CSS ile yönetilir: layout'taki satır-içi script, oturumda
   ilk kez açılışta <html data-perde="1"> ekler; bu bileşen daima DOM'da
   durur ama yalnız data-perde="1" iken görünür. "Gir" / kaydırma / Esc
   perdeyi kapatır ve oturumda bir daha açılmaz. JS kapalıysa hiç görünmez. */

const COPY: Record<Lang, { eyebrow: string; tag: string; date: string; count: string[]; enter: string; hint: string }> = {
  tr: { eyebrow: "Perde açılıyor · Yeni kitap", tag: "Yıkmak değil; temizlemek.", date: "25 Ağustos 2026", count: ["Gün", "Saat", "Dk"], enter: "Siteye gir", hint: "Kaydır ya da tıkla" },
  en: { eyebrow: "The curtain rises · New book", tag: "Not to destroy — to purge.", date: "25 August 2026", count: ["Days", "Hrs", "Min"], enter: "Enter the site", hint: "Scroll or click" },
  fr: { eyebrow: "Le rideau se lève · Nouveau livre", tag: "Non pour détruire — pour purifier.", date: "25 août 2026", count: ["Jours", "Hres", "Min"], enter: "Entrer", hint: "Faites défiler ou cliquez" },
};

export function TasfiyeReveal({ lang }: { lang: Lang }) {
  const L = COPY[lang];
  const [v, setV] = useState<number[] | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, new Date("2026-08-25T00:00:00").getTime() - Date.now());
      setV([Math.floor(d / 86400000), Math.floor((d % 86400000) / 3600000), Math.floor((d % 3600000) / 60000)]);
    };
    tick(); const id = setInterval(tick, 30000); return () => clearInterval(id);
  }, []);

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

  const d = v ?? [0, 0, 0];

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
        .perde-count { display: inline-flex; gap: 1.4rem; margin: 1.9rem 0 1rem; padding: 0.9rem 1.6rem;
          border-radius: 100px; background: rgba(30,26,22,0.5); border: 1px solid rgba(241,237,228,0.14);
          -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); }
        .perde-num { display: flex; flex-direction: column; gap: 0.2rem; }
        .perde-num b { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(1.4rem, 4vw, 2rem);
          line-height: 1; color: #E5402A; font-variant-numeric: tabular-nums; }
        .perde-num span { font-size: 0.54rem; letter-spacing: 0.2em; text-transform: uppercase; color: #9a948a; }
        .perde-date { font-family: var(--font-grotesk); font-size: 0.78rem; letter-spacing: 0.28em;
          text-transform: uppercase; color: #F1EDE4; }
        .perde-enter { margin-top: 2.1rem; display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer;
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
        <div className="perde-count">
          {d.map((n, i) => (
            <span key={i} className="perde-num">
              <b suppressHydrationWarning>{String(n).padStart(2, "0")}</b>
              <span>{L.count[i]}</span>
            </span>
          ))}
        </div>
        <div><span className="perde-date">{L.date}</span></div>
        <button className="perde-enter" onClick={close}>{L.enter} <span className="chev" aria-hidden="true">↓</span></button>
        <span className="perde-hint">{L.hint}</span>
      </div>
    </div>
  );
}
