"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SOZLER, sozSlug, KITAP_ADI } from "@/lib/sozler";
import { SozAksiyon } from "./SozAksiyon";

/* Köz Takvimi — her güne bir söz. Yılın günü → 200 sözlük korpusta
   deterministik sıra; ay ızgarasından başka günlere bakılabilir. */

function gunIndeksi(d: Date): number {
  const yilBasi = new Date(d.getFullYear(), 0, 0);
  const gun = Math.floor((d.getTime() - yilBasi.getTime()) / 86400000);
  return ((gun % SOZLER.length) + SOZLER.length) % SOZLER.length;
}

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

export default function KozTakvimi() {
  const [secili, setSecili] = useState<Date | null>(null);
  const [bugun, setBugun] = useState<Date | null>(null);

  useEffect(() => {
    const t = new Date();
    setBugun(t); setSecili(t);
  }, []);

  if (!secili || !bugun) {
    return <div className="tk-root"><div className="tk-yukleniyor" /></div>;
  }

  const soz = SOZLER[gunIndeksi(secili)];
  const kaynak = `${KITAP_ADI[soz.k]}${soz.p ? `, s. ${soz.p}` : ""}`;
  const buGunMu = secili.toDateString() === bugun.toDateString();

  const yil = secili.getFullYear(), ay = secili.getMonth();
  const ilkGun = (new Date(yil, ay, 1).getDay() + 6) % 7; // Pzt=0
  const gunSayisi = new Date(yil, ay + 1, 0).getDate();

  return (
    <div className="tk-root cg">
      <style>{`
        .tk-root { max-width: 980px; margin: 0 auto; padding: clamp(2rem, 5vh, 3.5rem) clamp(1.25rem, 4vw, 3.25rem) 5rem; }
        .tk-grid { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }
        @media (max-width: 820px) { .tk-grid { grid-template-columns: 1fr; } }
        .tk-soz { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.5rem, 3.6vw, 2.4rem); line-height: 1.45; color: var(--ink); text-wrap: balance; }
        .tk-cal { border: 1px solid var(--line); border-radius: 16px; padding: 1.25rem;
          background: var(--glass-bg); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); }
        .tk-cal-bas { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.9rem; }
        .tk-cal-bas button { background: none; border: 1px solid var(--line); border-radius: 8px; color: var(--ink);
          cursor: pointer; padding: 0.3rem 0.6rem; font-size: 0.9rem; }
        .tk-cal-bas button:hover { border-color: var(--accent); color: var(--accent); }
        .tk-gunler { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
        .tk-gunler .bas { font-family: var(--font-grotesk); font-size: 0.56rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--muted); text-align: center; padding: 0.3rem 0; }
        .tk-gun { aspect-ratio: 1; border: none; border-radius: 8px; background: transparent; color: var(--ink);
          font-family: var(--font-grotesk); font-size: 0.78rem; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }
        .tk-gun:hover { background: var(--bg-2); color: var(--accent); }
        .tk-gun[data-secili="1"] { background: var(--accent); color: var(--accent-ink); font-weight: 700; }
        .tk-gun[data-bugun="1"]:not([data-secili="1"]) { box-shadow: inset 0 0 0 1px var(--accent); }
        .tk-yukleniyor { min-height: 40vh; }
      `}</style>

      <div className="tk-grid">
        <div>
          <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--accent)" }}>
            {buGunMu ? "Bugünün sözü" : `${secili.getDate()} ${AYLAR[ay]} sözü`}
          </span>
          <blockquote className="tk-soz" style={{ margin: "1.5rem 0 0" }}>&ldquo;{soz.s}&rdquo;</blockquote>
          <p style={{ marginTop: "1.25rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>
            — Berkay Doğan · {kaynak}
          </p>
          <div style={{ marginTop: "1.75rem" }}>
            <SozAksiyon soz={soz.s} kaynak={kaynak} />
          </div>
          <Link href={`/soz/${sozSlug(soz.s)}`} style={{ display: "inline-block", marginTop: "1.4rem", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>
            Sözün sayfasına git →
          </Link>
        </div>

        <div className="tk-cal">
          <div className="tk-cal-bas">
            <button onClick={() => setSecili(new Date(yil, ay - 1, Math.min(secili.getDate(), 28)))} aria-label="Önceki ay">←</button>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "0.95rem" }}>{AYLAR[ay]} {yil}</span>
            <button onClick={() => setSecili(new Date(yil, ay + 1, Math.min(secili.getDate(), 28)))} aria-label="Sonraki ay">→</button>
          </div>
          <div className="tk-gunler">
            {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"].map((g) => <span key={g} className="bas">{g}</span>)}
            {Array.from({ length: ilkGun }).map((_, i) => <span key={`b${i}`} />)}
            {Array.from({ length: gunSayisi }).map((_, i) => {
              const g = new Date(yil, ay, i + 1);
              return (
                <button key={i} className="tk-gun"
                  data-secili={g.toDateString() === secili.toDateString() ? "1" : "0"}
                  data-bugun={g.toDateString() === bugun.toDateString() ? "1" : "0"}
                  onClick={() => setSecili(g)}>{i + 1}</button>
              );
            })}
          </div>
          <p style={{ marginTop: "0.9rem", fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", textAlign: "center" }}>
            Her güne bir söz — {SOZLER.length} günlük döngü
          </p>
        </div>
      </div>
    </div>
  );
}
