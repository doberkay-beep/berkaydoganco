"use client";

import { useEffect, useState } from "react";
import { type Lang, TRENDYOL_URL, SUBSTACK_URL } from "@/lib/site";

/* Masaüstü için modüler bento pano — hero'nun hemen altında bir "kontrol paneli":
   Tasfiye (büyük feature) + Mürekkep, Dinle, Oku, Tanınırlık, İletişim.
   Liquid-glass kartlar; masaüstünde 4 sütun asimetrik, mobilde tek sütun. */

type C = {
  eyebrow: string; heading: string;
  tasfiyeBadge: string; tasfiyeDate: string; count: string[];
  murekkepKind: string; murekkepCta: string;
  listenTitle: string; listenSub: string;
  readTitle: string; readSub: string;
  recogSub: string;
  contactTitle: string; contactSub: string;
};

const COPY: Record<Lang, C> = {
  tr: {
    eyebrow: "Pano", heading: "Berkay'ın dünyası — tek bakışta",
    tasfiyeBadge: "Yakında", tasfiyeDate: "25 Ağustos 2026", count: ["Gün", "Saat", "Dk"],
    murekkepKind: "Şiir · 2025", murekkepCta: "Satın al",
    listenTitle: "Dinle", listenSub: "Podcast & çalma listeleri",
    readTitle: "Oku", readSub: "Substack'te yazılar",
    recogSub: "Trendyol'da 1. sıra · 10/10 · Valsanat No. 51",
    contactTitle: "İletişim", contactSub: "Lansmanı kaçırma & yaz",
  },
  en: {
    eyebrow: "At a glance", heading: "Berkay's world — in one view",
    tasfiyeBadge: "Coming soon", tasfiyeDate: "25 August 2026", count: ["Days", "Hrs", "Min"],
    murekkepKind: "Poetry · 2025", murekkepCta: "Buy",
    listenTitle: "Listen", listenSub: "Podcast & playlists",
    readTitle: "Read", readSub: "Essays on Substack",
    recogSub: "#1 Poetry on Trendyol · 10/10 · Valsanat No. 51",
    contactTitle: "Contact", contactSub: "Don't miss the launch",
  },
  fr: {
    eyebrow: "En un coup d'œil", heading: "L'univers de Berkay — en une vue",
    tasfiyeBadge: "Bientôt", tasfiyeDate: "25 août 2026", count: ["Jours", "Hres", "Min"],
    murekkepKind: "Poésie · 2025", murekkepCta: "Acheter",
    listenTitle: "Écouter", listenSub: "Podcast & playlists",
    readTitle: "Lire", readSub: "Essais sur Substack",
    recogSub: "N°1 Poésie sur Trendyol · 10/10 · Valsanat N°51",
    contactTitle: "Contact", contactSub: "Ne manquez pas la sortie",
  },
};

function useCountdown() {
  const [v, setV] = useState<number[] | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, new Date("2026-08-25T00:00:00").getTime() - Date.now());
      setV([Math.floor(d / 86400000), Math.floor((d % 86400000) / 3600000), Math.floor((d % 3600000) / 60000)]);
    };
    tick(); const id = setInterval(tick, 30000); return () => clearInterval(id);
  }, []);
  return v ?? [0, 0, 0];
}

export function BentoHub({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const d = useCountdown();

  return (
    <section className="bento cg" aria-label={c.heading}>
      <style>{`
        .bento { padding: clamp(2rem, 5vh, 3.5rem) clamp(1.25rem, 4vw, 3.25rem) clamp(3rem, 7vh, 5rem); max-width: 1200px; margin: 0 auto; }
        .bento-head { display: flex; align-items: baseline; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .bento-eyebrow { display: inline-flex; align-items: center; gap: 0.55rem; font-family: var(--font-grotesk); font-size: 0.66rem; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink); }
        .bento-eyebrow i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); display: inline-block; }
        .bento-head h2 { font-family: var(--font-serif); font-style: italic; font-weight: 300; font-size: clamp(1.05rem, 2.4vw, 1.5rem); color: var(--muted); }

        .bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(132px, auto); gap: 0.9rem; }
        .bento-card { position: relative; display: flex; border-radius: 18px; padding: 1.5rem 1.6rem; overflow: hidden;
          text-decoration: none; color: var(--ink);
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          -webkit-backdrop-filter: blur(18px) saturate(150%); backdrop-filter: blur(18px) saturate(150%);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, background 0.35s ease; }
        .bento-card::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
          background: linear-gradient(140deg, var(--glass-hi), transparent 45%); }
        .bento-card:hover { transform: translateY(-4px); border-color: var(--accent); }
        .bento-card .arw { margin-left: auto; color: var(--accent); transition: transform 0.35s ease; }
        .bento-card:hover .arw { transform: translate(3px,-3px); }
        .bento-kicker { font-family: var(--font-grotesk); font-size: 0.6rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
        .bento-title { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; }
        .bento-sub { font-size: 0.86rem; line-height: 1.45; color: var(--muted); }

        /* A — Tasfiye feature (2x2) */
        .bento-a { grid-column: span 2; grid-row: span 2; align-items: stretch; gap: 1.4rem;
          background: radial-gradient(120% 90% at 85% 0%, rgba(229,64,42,0.14), transparent 55%), var(--glass-bg); }
        .bento-a img { width: clamp(112px, 15vw, 168px); border-radius: 5px; align-self: center; box-shadow: 0 20px 45px rgba(0,0,0,0.4); }
        .bento-a .col { display: flex; flex-direction: column; justify-content: center; gap: 0.7rem; }
        .bento-a .bento-title { font-size: clamp(2rem, 4.5vw, 3rem); }
        .bento-badge { align-self: flex-start; font-size: 0.56rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); border: 1px solid var(--accent); padding: 0.32rem 0.6rem; border-radius: 100px; }
        .bento-count { display: inline-flex; gap: 1rem; margin-top: 0.2rem; }
        .bento-count b { font-family: var(--font-grotesk); font-weight: 700; font-size: 1.35rem; line-height: 1; color: var(--accent); font-variant-numeric: tabular-nums; display: block; }
        .bento-count span { font-size: 0.5rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
        .bento-date { font-family: var(--font-grotesk); font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink); }

        /* B — Mürekkep (2x1) */
        .bento-b { grid-column: span 2; align-items: center; gap: 1.2rem; }
        .bento-b img { width: 74px; border-radius: 4px; box-shadow: 0 14px 30px rgba(0,0,0,0.3); }
        .bento-b .col { display: flex; flex-direction: column; gap: 0.35rem; }
        .bento-b .bento-title { font-size: 1.5rem; }

        /* C, D — küçük (1x1) */
        .bento-sm { grid-column: span 1; flex-direction: column; justify-content: space-between; gap: 0.6rem; }
        .bento-sm .ic { font-size: 1.3rem; color: var(--accent); line-height: 1; }
        .bento-sm .bento-title { font-size: 1.15rem; }

        /* E — Tanınırlık (2x1) */
        .bento-e { grid-column: span 2; align-items: center; gap: 1.1rem; }
        .bento-e .big { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(2.6rem, 5vw, 3.6rem); line-height: 0.9; color: var(--accent); letter-spacing: -0.03em; }
        .bento-e .col { display: flex; flex-direction: column; gap: 0.3rem; }

        /* F — İletişim (2x1) */
        .bento-f { grid-column: span 2; flex-direction: column; justify-content: center; gap: 0.4rem; }
        .bento-f .bento-title { font-size: 1.35rem; }

        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-a { grid-column: span 2; grid-row: span 1; }
          .bento-b, .bento-e, .bento-f { grid-column: span 2; }
          .bento-sm { grid-column: span 1; }
        }
        @media (max-width: 560px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-a, .bento-b, .bento-sm, .bento-e, .bento-f { grid-column: span 1; grid-row: auto; }
          .bento-a { flex-direction: column; }
          .bento-a img { width: clamp(140px, 40vw, 180px); }
        }
      `}</style>

      <div className="bento-head">
        <span className="bento-eyebrow"><i />{c.eyebrow}</span>
        <h2>{c.heading}</h2>
      </div>

      <div className="bento-grid">
        {/* A — Tasfiye */}
        <a href="#books" className="bento-card bento-a">
          <img src="/tasfiye-on-kapak.jpg" alt="Tasfiye" loading="lazy" />
          <div className="col">
            <span className="bento-badge">{c.tasfiyeBadge}</span>
            <span className="bento-title">Tasfiye</span>
            <div className="bento-count">
              {d.map((n, i) => (
                <span key={i}><b suppressHydrationWarning>{String(n).padStart(2, "0")}</b>{c.count[i]}</span>
              ))}
            </div>
            <span className="bento-date">{c.tasfiyeDate}</span>
          </div>
        </a>

        {/* B — Mürekkep ve Köz */}
        <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="bento-card bento-b">
          <img src="/murekkep-ve-koz-on-kapak.jpg" alt="Mürekkep ve Köz" loading="lazy" />
          <div className="col">
            <span className="bento-kicker">{c.murekkepKind}</span>
            <span className="bento-title">Mürekkep ve Köz</span>
            <span style={{ fontSize: "0.82rem", color: "var(--accent)", fontFamily: "var(--font-grotesk)", fontWeight: 500 }}>{c.murekkepCta} →</span>
          </div>
          <span className="arw" aria-hidden="true">↗</span>
        </a>

        {/* C — Dinle */}
        <a href="#media" className="bento-card bento-sm">
          <span className="ic" aria-hidden="true">♪</span>
          <div>
            <span className="bento-title" style={{ display: "block" }}>{c.listenTitle}</span>
            <span className="bento-sub">{c.listenSub}</span>
          </div>
        </a>

        {/* D — Oku */}
        <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="bento-card bento-sm">
          <span className="ic" aria-hidden="true">✎</span>
          <div>
            <span className="bento-title" style={{ display: "block" }}>{c.readTitle}</span>
            <span className="bento-sub">{c.readSub}</span>
          </div>
        </a>

        {/* E — Tanınırlık */}
        <a href="#recognition" className="bento-card bento-e">
          <span className="big">#1</span>
          <div className="col">
            <span className="bento-sub" style={{ color: "var(--ink)" }}>{c.recogSub}</span>
          </div>
          <span className="arw" aria-hidden="true">→</span>
        </a>

        {/* F — İletişim */}
        <a href="#contact" className="bento-card bento-f">
          <span className="bento-title">{c.contactTitle}</span>
          <span className="bento-sub">{c.contactSub}</span>
          <span className="arw" aria-hidden="true" style={{ position: "absolute", top: "1.5rem", right: "1.6rem" }}>→</span>
        </a>
      </div>
    </section>
  );
}
