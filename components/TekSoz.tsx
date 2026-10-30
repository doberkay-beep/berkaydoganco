"use client";

import Link from "next/link";
import { useState } from "react";
import { SOZLER, sozSlug, KITAP_ADI, type Soz } from "@/lib/sozler";

/* TEK SÖZ — ruh hâlini seç, kitaplardan bir dize gelsin. Videosu olan dizeler (R50 çekimleriyle hazırlanan
   "tek söz" Reels'leri) videoyla, diğerleri sade kartla gösterilir. Paylaşım, dizenin kendi /soz/ sayfasına gider. */

const VIDEOLAR: Record<string, string> = {
  "Bir umut daha gökyüzünden kaydı, olmayacakların içine.": "bir-umut",
  "Parça parça eksiliyorum, yavaş yavaş eskiyorum.": "eksiliyorum",
  "Küçücük bir adamdım kendi içimde, büyüdüm ve yalnız kaldım.": "kucucuk",
  "Sensiz yıllarda, sensiz sokaklarda, yalnız şarkılarda.": "sensiz",
};

const HALLER: { ad: string; tema: string }[] = [
  { ad: "Yalnızım", tema: "yalnizlik" },
  { ad: "Özlüyorum", tema: "ask" },
  { ad: "Eskiyorum", tema: "zaman" },
  { ad: "Karanlıktayım", tema: "karanlik" },
  { ad: "Yıkıldım", tema: "yikim" },
  { ad: "Umut arıyorum", tema: "umut" },
  { ad: "Özgürüm", tema: "ozgurluk" },
];

const KIRMIZI = "#e5382c";
const SITE = "https://www.berkaydogan.co";
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };

// Videosu olan dizeler önce gelsin: o hâlde ilk çıkan söz mümkünse görüntülü olsun.
function havuz(tema: string): Soz[] {
  const liste = SOZLER.filter((s) => s.t.includes(tema));
  return [...liste.filter((s) => VIDEOLAR[s.s]), ...liste.filter((s) => !VIDEOLAR[s.s])];
}

export function TekSoz() {
  const [hal, setHal] = useState<string | null>(null);
  const [sira, setSira] = useState(0);
  const [kopyalandi, setKopyalandi] = useState(false);
  const liste = hal ? havuz(hal) : SOZLER.filter((s) => VIDEOLAR[s.s]);
  const soz = liste[sira % liste.length];
  const video = VIDEOLAR[soz.s];
  const adres = `${SITE}/soz/${sozSlug(soz.s)}/`;

  async function paylas() {
    const metin = `“${soz.s}” — Berkay Doğan, ${KITAP_ADI[soz.k]}`;
    if (navigator.share) { try { await navigator.share({ text: metin, url: adres }); return; } catch { return; } }
    await navigator.clipboard.writeText(`${metin}\n${adres}`);
    setKopyalandi(true); setTimeout(() => setKopyalandi(false), 2000);
  }

  return (
    <div>
      <style>{`
        .ts-cip{border:1px solid var(--line);border-radius:999px;padding:.6rem 1.1rem;font-family:var(--font-grotesk);font-size:.9rem;background:transparent;color:inherit;cursor:pointer;transition:all .2s}
        .ts-cip:hover{border-color:${KIRMIZI}}
        .ts-cip[aria-pressed=true]{background:${KIRMIZI};border-color:${KIRMIZI};color:#fff}
        .ts-sahne{display:grid;gap:clamp(2rem,5vw,3.5rem);align-items:center;grid-template-columns:1fr}
        @media (min-width:860px){.ts-sahne{grid-template-columns:minmax(0,360px) 1fr}}
        .ts-dugme{border:none;border-radius:999px;padding:.85rem 1.4rem;font-family:var(--font-grotesk);font-weight:600;cursor:pointer}
      `}</style>

      <p style={{ ...mono, color: "var(--muted)", marginBottom: "1rem" }}>Bugün nasılsın?</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: "clamp(2.5rem, 6vh, 4rem)" }}>
        {HALLER.map((h) => (
          <button key={h.tema} className="ts-cip" aria-pressed={hal === h.tema} onClick={() => { setHal(h.tema); setSira(0); }}>{h.ad}</button>
        ))}
      </div>

      <div className="ts-sahne">
        <div style={{ position: "relative", aspectRatio: "9 / 16", borderRadius: "22px", overflow: "hidden", background: "#050506", boxShadow: "var(--shadow-card)" }}>
          {video ? (
            <video key={video} src={`/tek-soz/${video}.mp4`} poster={`/tek-soz/${video}.jpg`} autoPlay muted loop playsInline
                   style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
                          background: "radial-gradient(circle at 50% 40%, #1a1d24, #050506 75%)" }}>
              <p style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.4rem, 4vw, 1.9rem)", lineHeight: 1.35, color: "#efe9df", textAlign: "center", margin: 0 }}>{soz.s}</p>
            </div>
          )}
        </div>

        <div>
          <p style={{ ...serif, fontStyle: "italic", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.15, margin: "0 0 1.2rem" }}>{soz.s}</p>
          <p style={{ ...mono, color: "var(--muted)", margin: "0 0 2rem" }}>
            Berkay Doğan · {KITAP_ADI[soz.k]}{soz.p ? `, s. ${soz.p}` : ""}
          </p>
          <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
            <button className="ts-dugme" style={{ background: KIRMIZI, color: "#fff" }} onClick={paylas}>{kopyalandi ? "Kopyalandı" : "Paylaş"}</button>
            <button className="ts-dugme" style={{ background: "transparent", color: "inherit", border: "1px solid var(--line)" }} onClick={() => setSira((s) => s + 1)}>Başka bir söz</button>
            <Link href={`/soz/${sozSlug(soz.s)}/`} className="ts-dugme" style={{ background: "transparent", color: "var(--muted)", padding: ".85rem .4rem" }}>Sözün sayfası →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
